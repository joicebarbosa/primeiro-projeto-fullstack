import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './componentes/Login';
import Signup from './componentes/Signup';
import MainPage from './componentes/MainPage';
import styles from './App.module.css'; // Importe o arquivo de estilos

const App = () => {
  return (
    <div className={styles.appContainer}> {/* Aplique a classe ao contêiner principal */}
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/main" component={MainPage} />
          <Route path="/" redirectTo="/login" exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;