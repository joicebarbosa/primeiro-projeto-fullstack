import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css'; // Importa os estilos definidos no arquivo MainPage.module.css
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

const MainPage = () => {
  const navigate = useNavigate(); // Hook para navegar entre as rotas
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserData(response.data);
        } catch (err) {
          console.error('Erro ao buscar dados do usuário', err);
          setError('Erro ao carregar informações do usuário.');
        } finally {
          setLoading(false);
        }
      } else {
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  if (loading) {
    return <div className={styles.container}>Carregando informações...</div>;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error}</p>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Sair
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo, {userData?.username || 'Usuário'}!</h1>
      {userData?.email && <p className={styles.paragraph}>Seu email é: {userData.email}</p>}
      {userData?.firstName && userData?.lastName && (
        <p className={styles.paragraph}>Nome: {userData.firstName} {userData.lastName}</p>
      )}
      {userData?.createdAt && (
        <p className={styles.paragraph}>Conta criada em: {new Date(userData.createdAt).toLocaleDateString()}</p>
      )}

      <div className={styles.actionsPanel}>
        <button className={styles.actionButton}>Editar Perfil</button>
        <button className={styles.actionButton}>Ver Notificações</button>
        {/* Adicione mais botões conforme necessário */}
      </div>

      <div className={styles.tipBox}>
        <p className={styles.tipText}>Dica: Explore todas as funcionalidades do nosso sistema!</p>
      </div>

      {userData?.recentActivity && userData.recentActivity.length > 0 && (
        <div className={styles.recentActivity}>
          <h2>Atividade Recente</h2>
          <ul>
            {userData.recentActivity.map((activity, index) => (
              <li key={index}>{activity.description} - {new Date(activity.timestamp).toLocaleTimeString()}</li>
            ))}
          </ul>
        </div>
      )}

      <p className={styles.paragraph}>Esta é a sua página principal.</p>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Sair
      </button>
      {/* Aqui você pode adicionar mais conteúdo para a sua página principal */}
    </div>
  );
};

export default MainPage;