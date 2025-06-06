// frontend/src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Use o axios padrão para o login, ou se preferir, use a instância 'api' aqui também. Para o login inicial, tanto faz.
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { username, password });
            console.log('Login bem-sucedido:', response.data);
            const { access_token } = response.data;

            localStorage.setItem('accessToken', access_token); // Use 'accessToken'
            
            navigate('/main');
        } catch (error) {
            console.error('Erro ao fazer login', error.response?.data?.message || 'Erro desconhecido');
            setError(error.response?.data?.message || 'Usuário ou senha incorretos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleLogin} className={styles.form}>
                <label htmlFor="username" className={styles.label}>Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                />
                <label htmlFor="password" className={styles.label}>Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />
                <button type="submit" disabled={loading} className={styles.button}>
                    {loading ? 'Entrando...' : 'Login'}
                </button>
                {error && <p className={styles.error}>{error}</p>}
                <p>
                    Não tem uma conta? <Link to="/signup" className={styles.signupLink}>Cadastre-se</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;