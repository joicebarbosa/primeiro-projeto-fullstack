import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Estados para rastrear os requisitos da senha
    const [hasMinMaxChars, setHasMinMaxChars] = useState(false);
    const [hasUpperCase, setHasUpperCase] = useState(false);
    const [hasSymbol, setHasSymbol] = useState(false);

    useEffect(() => {
        // Função para validar a senha em tempo real
        const validatePassword = (pwd) => {
            setHasMinMaxChars(pwd.length >= 8 && pwd.length <= 70);
            setHasUpperCase(/[A-Z]/.test(pwd));
            setHasSymbol(/[!'#$%"&()*+\-./:;?@[\]^_`~]/.test(pwd));
        };

        validatePassword(password);
    }, [password]);

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrors([]);
        setSuccessMessage('');
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', { username, password });
            console.log('Cadastro bem-sucedido:', response.data);
            setSuccessMessage('Cadastro realizado com sucesso!');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (error) {
            console.error('Erro ao cadastrar', error.response?.data);
            if (error.response?.data?.message && Array.isArray(error.response.data.message)) {
                setErrors(error.response.data.message);
            } else {
                setErrors([error.response?.data?.message || 'Erro ao cadastrar. Tente novamente.']);
            }
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
            <p className={styles.instruction}>O nome de usuário deve ser no formato: nome.sobrenome</p>

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
            />
            <div className={styles.passwordRequirements}>
                <p className={`${styles.requirement} ${hasMinMaxChars ? styles.valid : ''}`}>
                    <span className={styles.checkbox}>{hasMinMaxChars && '✓'}</span>
                    A senha deve ter no mínimo 8 e máximo 70 caracteres.
                </p>
                <p className={`${styles.requirement} ${hasUpperCase ? styles.valid : ''}`}>
                    <span className={styles.checkbox}>{hasUpperCase && '✓'}</span>
                    A senha deve ter pelo menos uma letra maiúscula.
                </p>
                <p className={`${styles.requirement} ${hasSymbol ? styles.valid : ''}`}>
                    <span className={styles.checkbox}>{hasSymbol && '✓'}</span>
                    A senha deve ter pelo menos um símbolo. Ex: !'#$%"&()*+-./:;?@[]^_`~
                </p>
            </div>

            <button type="submit" disabled={loading || !(hasMinMaxChars && hasUpperCase && hasSymbol)} className={styles.button}>
                {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>

            {errors.length > 0 && (
                <div className={styles.errorContainer}>
                    {errors.map((err, index) => (
                        <p key={index} className={styles.error}>{err}</p>
                    ))}
                </div>
            )}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
        </form>
    );
};

export default Signup;