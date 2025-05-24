import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import MainPage from './components/MainPage';
import PrivateRoute from './components/PrivateRoute';
import styles from './App.module.css'; // Presume-se que este arquivo exista e tenha o CSS para appContainer
import BackendTest from './components/BackendTest'; // <-- Nova importação

const App = () => {
  return (
    <div
      className={styles.appContainer}
      style={{
        backgroundImage: `url('/assets/background.jpg')`, // Caminho a partir da raiz pública do seu frontend
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BackendTest /> {/* <-- Componente de teste do backend adicionado aqui */}

      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Rota privada para a página principal */}
          <Route path="/main" element={<PrivateRoute />}>
            <Route index element={<MainPage />} /> {/* Rota aninhada para MainPage */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;