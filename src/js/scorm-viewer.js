/* eslint-disable no-undef */
// js/scorm-viewer.js - Controlador principal del visor
document.addEventListener('DOMContentLoaded', function() {
    // Configuración de los paquetes SCORM
    const scormPackages = [
        { id: 'intro', path: 'scorm/intro/index_lms.html', title: 'Introducción' },
        { id: 'module1', path: 'scorm/1/index.html', title: 'Módulo 1' },
        { id: 'module2', path: 'scorm/2/index.html', title: 'Módulo 2' },
        { id: 'module3', path: 'scorm/3/index.html', title: 'Módulo 3' },
        { id: 'closing', path: 'scorm/closing/index.html', title: 'Conclusión' }
    ];
    
    // Elementos del DOM
    const packageNav = document.getElementById('package-nav');
    const scormContent = document.getElementById('scorm-content');
    const progressBar = document.getElementById('progress-bar');
    const loading = document.getElementById('loading');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Variables de estado
    let currentPackageIndex = 0;
    let scormApi = new ScormAPI();
    
    // Inicializar la navegación
    function initNavigation() {
        packageNav.innerHTML = '';
        scormPackages.forEach((pkg, index) => {
            const button = document.createElement('button');
            button.textContent = pkg.title;
            button.className = 'nav-button';
            if (index === currentPackageIndex) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                loadPackage(index);
            });
            packageNav.appendChild(button);
        });
        
        // Configurar botones de navegación
        updateNavigationButtons();
    }
    
    // Actualizar botones de navegación
    function updateNavigationButtons() {
        prevBtn.disabled = currentPackageIndex === 0;
        nextBtn.disabled = currentPackageIndex === scormPackages.length - 1;
        
        // Actualizar botones de navegación en la barra superior
        const navButtons = packageNav.querySelectorAll('.nav-button');
        navButtons.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === currentPackageIndex);
        });
    }
    
    // Cargar un paquete SCORM
    function loadPackage(index) {
        // Guardar el estado actual antes de cambiar
        if (scormApi.initialized && !scormApi.terminated) {
            scormApi.LMSFinish('');
            scormApi.saveState(scormPackages[currentPackageIndex].id);
        }
        
        // Actualizar el índice y mostrar carga
        currentPackageIndex = index;
        loading.style.display = 'flex';
        scormContent.innerHTML = '';
        
        // Crear una nueva instancia de la API SCORM
        scormApi = new ScormAPI();
        // Cargar el estado guardado si existe
        scormApi.loadState(scormPackages[index].id);
        
        // Actualizar la interfaz
        updateNavigationButtons();
        updateProgressBar();
        
        // Cargar el contenido SCORM sin iframe
        loadScormContent(scormPackages[index].path);
    }
    
    // Cargar contenido SCORM sin iframe
    function loadScormContent(contentPath) {
        // Crear un contenedor div para el contenido
        const contentContainer = document.createElement('div');
        contentContainer.style.width = '100%';
        contentContainer.style.height = '100%';
        contentContainer.style.overflow = 'auto';
        
        // Limpiar contenedor existente y añadir el nuevo
        scormContent.innerHTML = '';
        scormContent.appendChild(contentContainer);
        
        // Cargar el HTML del paquete SCORM mediante fetch
        fetch(contentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // Insertar el HTML en el contenedor
                contentContainer.innerHTML = html;
                
                // Modificar las rutas relativas
                const basePath = contentPath.substring(0, contentPath.lastIndexOf('/') + 1);
                rewriteRelativePaths(contentContainer, basePath);
                
                // Cargar scripts adicionales que puedan ser necesarios
                loadScormScripts(contentContainer, basePath)
                    .then(() => {
                        // Ocultar indicador de carga
                        loading.style.display = 'none';
                        
                        // Notificar al contenido SCORM que está listo
                        setTimeout(() => {
                            if (typeof contentContainer.contentWindow !== 'undefined' && 
                                typeof contentContainer.contentWindow.SCOInitialize === 'function') {
                                contentContainer.contentWindow.SCOInitialize();
                            }
                        }, 500);
                    });
            })
            .catch(error => {
                console.error('Error al cargar el contenido SCORM:', error);
                contentContainer.innerHTML = `<div style="padding: 20px; color: red;">
                    Error al cargar el contenido SCORM: ${error.message}
                </div>`;
                loading.style.display = 'none';
            });
    }
    
    // Reescribir rutas relativas en el HTML
    function rewriteRelativePaths(container, basePath) {
        // Actualizar rutas en imágenes
        container.querySelectorAll('img[src]').forEach(img => {
            if (!img.src.startsWith('http') && !img.src.startsWith('data:')) {
                img.src = basePath + img.getAttribute('src');
            }
        });
        
        // Actualizar rutas en enlaces CSS
        container.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (!link.href.startsWith('http')) {
                link.href = basePath + link.getAttribute('href');
            }
        });
        
        // Actualizar rutas en enlaces
        container.querySelectorAll('a[href]').forEach(a => {
            if (!a.href.startsWith('http') && !a.href.startsWith('#') && !a.href.startsWith('javascript:')) {
                a.href = basePath + a.getAttribute('href');
            }
        });
    }
    
    // Cargar scripts adicionales que puedan ser necesarios
    async function loadScormScripts(container, basePath) {
        const scripts = Array.from(container.querySelectorAll('script[src]'));
        
        // Eliminar los scripts originales para evitar que se ejecuten automáticamente
        scripts.forEach(script => script.remove());
        
        // Cargar cada script manualmente
        for (const script of scripts) {
            let src = script.getAttribute('src');
            if (!src.startsWith('http')) {
                src = basePath + src;
            }
            
            await new Promise((resolve, reject) => {
                const newScript = document.createElement('script');
                newScript.src = src;
                newScript.onload = resolve;
                newScript.onerror = reject;
                container.appendChild(newScript);
            }).catch(error => {
                console.error(`Error al cargar script ${src}:`, error);
            });
        }
    }
    
    // Actualizar la barra de progreso
    function updateProgressBar() {
        const progress = scormApi.getProgress();
        progressBar.style.width = `${progress}%`;
    }
    
    // Configurar event listeners para botones de navegación
    prevBtn.addEventListener('click', () => {
        if (currentPackageIndex > 0) {
            loadPackage(currentPackageIndex - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPackageIndex < scormPackages.length - 1) {
            loadPackage(currentPackageIndex + 1);
        }
    });
    
    // Guardar estado al cerrar la página
    window.addEventListener('beforeunload', () => {
        if (scormApi.initialized && !scormApi.terminated) {
            scormApi.LMSFinish('');
            scormApi.saveState(scormPackages[currentPackageIndex].id);
        }
    });
    
    // Inicializar la aplicación
    initNavigation();
    loadPackage(0);
});