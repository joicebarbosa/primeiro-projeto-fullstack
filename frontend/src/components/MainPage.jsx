import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css'; // Importa os estilos definidos no arquivo MainPage.module.css
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

const MainPage = () => {
  const navigate = useNavigate(); // Hook para navegar entre as rotas

  // Define um estado para armazenar os dados do usuário (inicialmente nulo)
  const [userData, setUserData] = useState(null);
  // Define um estado para controlar o carregamento dos dados (inicialmente verdadeiro)
  const [loading, setLoading] = useState(true);
  // Define um estado para armazenar qualquer erro que ocorra durante a busca dos dados
  const [error, setError] = useState('');

  // useEffect é um Hook que executa um efeito colateral no componente
  // O array vazio [] como segundo argumento significa que este efeito será executado apenas uma vez, após a primeira renderização
  useEffect(() => {
    // Define uma função assíncrona para buscar os dados do usuário
    const fetchUserData = async () => {
      // Obtém o token de autenticação do localStorage
      const token = localStorage.getItem('authToken');
      // Verifica se um token existe
      if (token) {
        try {
          // Faz uma requisição GET para a rota 'http://localhost:3000/users/me'
          // Passa o token no cabeçalho 'Authorization' com o esquema 'Bearer'
          const response = await axios.get('http://localhost:3000/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Se a requisição for bem-sucedida, atualiza o estado userData com os dados recebidos
          setUserData(response.data);
        } catch (err) {
          // Se ocorrer um erro na requisição, exibe o erro no console
          console.error('Erro ao buscar dados do usuário', err);
          // Atualiza o estado error com uma mensagem para exibir ao usuário
          setError('Erro ao carregar informações do usuário.');
        } finally {
          // Independente de sucesso ou falha, atualiza o estado loading para falso
          setLoading(false);
        }
      } else {
        // Se não houver token, redireciona o usuário para a página de login
        navigate('/login');
      }
    };

    // Chama a função para buscar os dados do usuário quando o componente é montado
    fetchUserData();
    // O [navigate] no array de dependências faria o efeito rodar novamente se a função navigate mudasse
    // No entanto, navigate geralmente não muda entre renderizações, então [] é apropriado para executar uma vez
  }, [navigate]);

  // Função para lidar com o logout
  const handleLogout = () => {
    // Remove o token de autenticação do localStorage
    localStorage.removeItem('authToken');
    // Redireciona o usuário para a página de login
    navigate('/login');
  };

  // Renderização condicional: se loading for verdadeiro, exibe uma mensagem de carregamento
  if (loading) {
    return <div className={styles.container}>Carregando informações...</div>;
  }

  // Renderização condicional: se error tiver uma mensagem, exibe a mensagem de erro e o botão de logout
  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error}</p>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    );
  }

  // Renderização principal: exibe a saudação com o nome de usuário (se disponível),
  // o email (se disponível), uma mensagem de boas-vindas e o botão de logout
  return (
    <div className={styles.container}>
      {/* Exibe uma saudação com o nome de usuário, ou 'Usuário' se userData ou username não estiverem definidos */}
      <h1 className={styles.title}>Bem-vindo, {userData?.username || 'Usuário'}!</h1>
      {/* Se userData e email existirem, exibe o email do usuário */}
      {userData?.email && <p className={styles.paragraph}>Seu email é: {userData.email}</p>}
      <p className={styles.paragraph}>Esta é a sua página principal.</p>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
      {/* Aqui você pode adicionar mais conteúdo para a sua página principal */}
    </div>
  );
};

export default MainPage;