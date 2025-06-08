// frontend/src/components/BackendTest.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ou a sua instância 'api' customizada do axios, se preferir testar rotas autenticadas

const BackendTest = () => {
  const [backendMessage, setBackendMessage] = useState('');
  const [error, setError] = useState(null); // <-- DECLARADO AGORA!
  const [loading, setLoading] = useState(true); // <-- Adicionado estado de loading

  useEffect(() => {
    const fetchBackendMessage = async () => {
      try {
        // Altere a porta para 3000, que é a porta padrão do seu backend NestJS,
        // a menos que você tenha explicitamente configurado para 4000.
        const response = await axios.get('http://localhost:3000/users/me'); // Exemplo: buscando o perfil do usuário
        // Se a rota for pública (sem JWT), pode ser /api/teste ou outra rota que você tenha.
        // Se for /users/me, você precisaria do token, então usaria 'api' (sua instância com interceptor).
        setBackendMessage(JSON.stringify(response.data, null, 2)); // Stringify para exibir objetos complexos
        setError(null); // Limpa qualquer erro anterior se a requisição for bem-sucedida
      } catch (err) { // Use 'err' ou 'error' de forma consistente
        console.error('Erro ao buscar mensagem do backend:', err.response?.data?.message || err.message || 'Erro desconhecido');
        // Agora 'setError' existe e pode ser usado
        setError(err.response?.data?.message || 'Erro ao carregar dados do backend.'); 
        setBackendMessage(''); // Limpa a mensagem se houver erro
      } finally {
        setLoading(false); // Sempre define loading como false no final
      }
    };

    fetchBackendMessage();
  }, []); // Dependência vazia para executar apenas uma vez no montagem

  // Adiciona o estado de loading e erro na renderização
  if (loading) {
    return (
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '10px',
        borderRadius: '5px',
        color: 'black',
        zIndex: 1000
      }}>
        <strong>Mensagem do Backend:</strong> Carregando...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '10px',
        borderRadius: '5px',
        color: 'red', // Cor para indicar erro
        zIndex: 1000
      }}>
        <strong>Erro do Backend:</strong> {error}
      </div>
    );
  }

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '10px',
      borderRadius: '5px',
      color: 'black',
      zIndex: 1000
    }}>
      <strong>Mensagem do Backend:</strong> {backendMessage}
    </div>
  );
};

export default BackendTest;