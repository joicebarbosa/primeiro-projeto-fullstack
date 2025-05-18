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

    const [hasMinMaxChars, setHasMinMaxChars] = useState(false);
    const [hasUpperCase, setHasUpperCase] = useState(false);
    const [hasSymbol, setHasSymbol] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [usernameFormatError, setUsernameFormatError] = useState('');
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

    useEffect(() => {
        const validatePassword = (pwd) => {
            setHasMinMaxChars(pwd.length >= 8 && pwd.length <= 70);
            setHasUpperCase(/[A-Z]/.test(pwd));
            setHasSymbol(/[!'#$%"&()*+\-./:;?@[\]^_`~]/.test(pwd));
        };
        validatePassword(password);

        const validateUsernameFormat = (uname) => {
            if (!/^[a-zA-Z]+\.[a-zA-Z]+$/.test(uname)) {
                setIsUsernameValid(false);
                setUsernameFormatError('O nome de usuário deve ser no formato: nome.sobrenome');
            } else {
                setIsUsernameValid(true);
                setUsernameFormatError('');
            }
        };
        validateUsernameFormat(username);
    }, [username, password]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setUsernameTouched(true);
    };

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
            if (error.response?.data?.message) {
                if (Array.isArray(error.response.data.message)) {
                    setErrors(error.response.data.message);
                } else {
                    setErrors([error.response.data.message]);
                }
            } else {
                setErrors(['Erro ao cadastrar. Tente novamente.']);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSignup} className={styles.form}>
            <div className={styles.usernameContainer}>
                <label htmlFor="username" className={styles.label}>Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    className={styles.input}
                    onBlur={() => setUsernameTouched(true)}
                    aria-label="Username"
                    aria-describedby={usernameTouched && !isUsernameValid ? "usernameError" : null}
                />
                {isUsernameValid && <span className={styles.usernameValidCheck}>✓</span>}
            </div>
            {usernameTouched && !isUsernameValid && <p className={styles.error} id="usernameError">{usernameFormatError}</p>}

            <div className={styles.inputContainer}>
                <label htmlFor="password" className={styles.label}>Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    aria-label="Password"
                    onFocus={() => setShowPasswordRequirements(true)}
                    onBlur={() => {
                        if (!password) {
                            setShowPasswordRequirements(false);
                        }
                    }}
                />
            </div>

            {showPasswordRequirements && (
                <div className={`${styles.passwordRequirements} ${showPasswordRequirements ? styles.visible : ''}`}>
                    <p className={styles.requirement} style={{ color: hasMinMaxChars ? '#4caf50' : '#aaa' }}>
                        <span className={styles.checkbox} style={{ borderColor: hasMinMaxChars ? '#4caf50' : '#ccc', backgroundColor: hasMinMaxChars ? '#4caf50' : 'transparent', color: hasMinMaxChars ? 'white' : 'transparent' }}>
                            {hasMinMaxChars && '✓'}
                        </span>
                        A senha deve ter no mínimo 8 e máximo 70 caracteres.
                    </p>
                    <p className={styles.requirement} style={{ color: hasUpperCase ? '#4caf50' : '#aaa' }}>
                        <span className={styles.checkbox} style={{ borderColor: hasUpperCase ? '#4caf50' : '#ccc', backgroundColor: hasUpperCase ? '#4caf50' : 'transparent', color: hasUpperCase ? 'white' : 'transparent' }}>
                            {hasUpperCase && '✓'}
                        </span>
                        A senha deve ter pelo menos uma letra maiúscula.
                    </p>
                    <p className={styles.requirement} style={{ color: hasSymbol ? '#4caf50' : '#aaa' }}>
                        <span className={styles.checkbox} style={{ borderColor: hasSymbol ? '#4caf50' : '#ccc', backgroundColor: hasSymbol ? '#4caf50' : 'transparent', color: hasSymbol ? 'white' : 'transparent' }}>
                            {hasSymbol && '✓'}
                        </span>
                        A senha deve ter pelo menos um símbolo. Ex: !#$%"&
                    </p>
                </div>
            )}

            <button
                type="submit"
                disabled={loading || !(hasMinMaxChars && hasUpperCase && hasSymbol && isUsernameValid)}
                className={styles.button}
            >
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