/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { gethistoricalscorskills } from '../utils/cognifit';
import React from 'react';
import { Link } from 'react-router-dom';

const HistoricoPage = () => {
  const [historicos, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const fetchHistorical = async () => {
      try {
        const data = await gethistoricalscorskills(storedToken);
        console.log(data.historicalScoreAndSkills)
        setHistorico(data.historicalScoreAndSkills|| []);
      } catch (err) {
        setError('Error al obtener usuarios');
      } finally {
        setLoading(false);
      }
    };
    fetchHistorical();
    
  }, []);

  const exportCSV = () => {
    const csvRows = [
      ['ID', 'Nombre', 'Email'],
      ...users.map(user => [
        user.id,
        user.user_name || '',
        user.luser_astname || '',
        user.user_email || '',
      ]),
    ];

    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usuarios.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

    <h1 className="text-3xl font-semibold mb-6 text-center">Resumen de Evaluación Cognitiva</h1>

    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">

        <div  >
        <h2>Lista de Datos</h2>
        {loading && <p>Cargando Datos...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        { !error && (
            <>
            <button className='btn btn-info' onClick={exportCSV} style={{ marginBottom: '1rem' }}>
                Exportar CSV
            </button>
            <Link className="btn btn-danger" to="/usuarios">Usuarios</Link>
            <table className='min-w-full table table-auto border-collapse' border={1} cellPadding={8} cellSpacing={0}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>date</th>
                    <th>score</th>
                    <th>type</th>
                    <th>typekey</th>
                    <th>categories</th>
                    <th>skills</th>
                </tr>
                </thead>
                <tbody>
                {historicos.map((historico,index) => (
                    <tr key={historico.id}>
                        <td>{historico.sessionId}</td>
                        <td>{historico.date || '-'}</td>
                        <td>{historico.score || '-'}</td>
                        <td>{historico.type || '-'}</td>
                        <td>{historico.typeKey || '-'}</td>
                        <td>
                            <table>
                            {historico.categories.map((categoria) => (
                                <tr>
                                    <td>{categoria.key}</td>
                                    <td>{categoria.value}</td>
                                </tr>
                            ))}
                            </table>
                        </td>
                        <td>
                            <table>
                            {historico.skills.map((skill) => (
                                <tr>
                                    <td>{skill.key}</td>
                                    <td>{skill.value}</td>
                                </tr>
                            ))}
                            </table>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </>
        )}
        </div>
    </div>
    </div>

  );
};

export default HistoricoPage;
