import { useEffect, useState } from 'react';
import { getUserList } from '../utils/cognifit';
import React from 'react';
import { Link } from 'react-router-dom';

const UsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUserList();
        console.log(data.userAccounts)
        setUsers(data.userAccounts || []);
      } catch (err) {
        setError('Error al obtener usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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
  const handleClick = (token) => {
    sessionStorage.setItem("token", token);
  };
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Lista de Usuarios</h2>
      {loading && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <>
        
          <table border={1} cellPadding={8} cellSpacing={0}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Email</th>
              
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td><Link className='decoration-solid text-blue-600 dark:text-sky-400' to="/historico" onClick={(e)=>handleClick(user.user_token)} >{user.user_name || '-'}</Link></td>
                  <td>{user.user_lastname || '-'}</td>
                  <td>{user.user_email || '-'}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UsersPage;
