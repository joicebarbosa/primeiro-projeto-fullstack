import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import MainPage from './components/MainPage';
import PrivateRoute from './components/PrivateRoute';
import styles from './App.module.css'; // Importe os estilos

const App = () => {
  return (
    <div className={styles.appContainer}> {/* Aplique a classe aqui */}
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<PrivateRoute />}>
            <Route index element={<MainPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;


// so para teStar o git        