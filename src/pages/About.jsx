function About() {
  return (
    <div>
      <h1>Acerca de esta aplicación</h1>
      <p>Esta aplicación ha sido desarrollada para visualizar contenido SCORM directamente en la página web sin utilizar iframes.</p>
      
      <h2>Características principales</h2>
      <ul>
        <li>Carga de paquetes SCORM desde carpetas locales</li>
        <li>Visualización del contenido SCORM sin iframes</li>
        <li>Guardado de resultados mediante una API REST externa</li>
        <li>Interfaz intuitiva y amigable</li>
      </ul>
      
      <h2>Tecnologías utilizadas</h2>
      <ul>
        <li>React</li>
        <li>Vite</li>
        <li>React Router</li>
        <li>SCORM API</li>
      </ul>
    </div>
  );
}

export default About;