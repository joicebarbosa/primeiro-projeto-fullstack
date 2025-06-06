// frontend/src/components/MainPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css';
import api from '../api/axios'; // Importa a instância customizada do Axios com o interceptor

const MainPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken'); // Tenta obter o token
      
      if (token) {
        try {
          // Usa 'api' (sua instância configurada do Axios). O token será adicionado automaticamente.
          const response = await api.get('/users/me'); 
          setUserData(response.data);
        } catch (err) {
          console.error('Erro ao buscar dados do usuário:', err);
          // Se o erro for 401 (Não Autorizado), significa que o token é inválido/expirado
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('accessToken'); // Remove o token inválido
            navigate('/login'); // Redireciona para o login
            setError('Sessão expirada. Por favor, faça login novamente.');
          } else {
            setError('Erro ao carregar informações do usuário.');
          }
        } finally {
          setLoading(false);
        }
      } else {
        // Se não há token no localStorage, redireciona para login
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]); // navigate é uma dependência do useEffect

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Remove o token ao fazer logout
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
    </div>
  );
};

export default MainPage;