import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import para redirecionamento
import styles from './Signup.module.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Hook para navegação

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', { username, password });
            console.log('Cadastro bem-sucedido:', response.data);
            setSuccessMessage('Cadastro realizado com sucesso!');
            // Opcional: Redirecionar para a página de login após o sucesso
            setTimeout(() => {
                navigate('/login');
            }, 1500); // Redireciona após 1.5 segundos
        } catch (error) {
            console.error('Erro ao cadastrar', error.response?.data?.message || 'Erro desconhecido');
            setError(error.response?.data?.message || 'Erro ao cadastrar. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSignup} className={styles.form}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
            />
            <button type="submit" disabled={loading} className={styles.button}>
                {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
        </form>
    );
};

export default Signup;