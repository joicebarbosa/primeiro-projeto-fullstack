import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BackendTest = () => {
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    const fetchBackendMessage = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/teste'); // <-- Mude a porta para 4000
        setBackendMessage(response.data);
      } catch (error) {
      console.error('Erro ao fazer login', error.response?.data?.message || 'Erro desconhecido');
      setError(error.response?.data?.message || 'Usuário ou senha incorretos.');
    }
    };

    fetchBackendMessage();
  }, []);

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