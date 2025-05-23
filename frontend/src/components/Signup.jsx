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

    // Novo estado para a validação do formato do username
    const [isUsernameFormatValid, setIsUsernameFormatValid] = useState(false);

    // Estado para controle geral da validação do formulário
    const [isFormValid, setIsFormValid] = useState(false); // Começa como FALSE

    useEffect(() => {
        // Validação da senha em tempo real
=======
        const validatePassword = (pwd) => {
            setHasMinMaxChars(pwd.length >= 8 && pwd.length <= 70);
            setHasUpperCase(/[A-Z]/.test(pwd));
            setHasSymbol(/[!@#$%^&*(),.?":{}|<>]/.test(pwd));
        };
        // Validação do username em tempo real
        const validateUsername = (uname) => {
            const regex = /^[a-zA-Z]+\.[a-zA-Z]+$/;
            // O formato do username é válido se não estiver vazio E corresponder à regex
            const isValid = uname.trim() !== '' && regex.test(uname);
            setIsUsernameFormatValid(isValid);

            // -- INÍCIO DOS CONSOLE.LOGS DE DEBUG DO USERNAME --
            console.log('--- Validação Username ---');
            console.log('Username digitado:', uname);
            console.log('Username não vazio (uname.trim() !== ""):', uname.trim() !== '');
            console.log('Regex username corresponde (regex.test(uname)):', regex.test(uname));
            console.log('isUsernameFormatValid (resultado):', isValid);
            console.log('--------------------------');
            // -- FIM DOS CONSOLE.LOGS DE DEBUG DO USERNAME --
        };

        // Chame as funções de validação
        validatePassword(password);
        validateUsername(username);

        // Calcular se o formulário inteiro é válido
        const currentFormValidity = username.trim() !== '' &&
                                    password.trim() !== '' &&
                                    isUsernameFormatValid &&
                                    hasMinMaxChars &&
                                    hasUpperCase &&
                                    hasSymbol;
        setIsFormValid(currentFormValidity);

        // -- INÍCIO DOS CONSOLE.LOGS DE DEBUG GERAIS DO FORMULÁRIO --
        console.log('=== Validação Geral do Formulário ===');
        console.log('username.trim() !== "" :', username.trim() !== '');
        console.log('password.trim() !== "" :', password.trim() !== '');
        console.log('isUsernameFormatValid:', isUsernameFormatValid);
        console.log('hasMinMaxChars:', hasMinMaxChars);
        console.log('hasUpperCase:', hasUpperCase);
        console.log('hasSymbol:', hasSymbol);
        console.log('isFormValid (resultado final):', currentFormValidity);
        console.log('=====================================');
        // -- FIM DOS CONSOLE.LOGS DE DEBUG GERAIS DO FORMULÁRIO --

    }, [username, password, hasMinMaxChars, hasUpperCase, hasSymbol, isUsernameFormatValid]); // Adicionei todos os estados de validação como dependências
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

        // Validação final antes de enviar
        if (!isFormValid) {
            const currentErrors = [];
            if (username.trim() === '') {
                currentErrors.push('O nome de usuário não pode estar vazio.');
            } else if (!isUsernameFormatValid) {
                currentErrors.push('O nome de usuário deve estar no formato: nome.sobrenome');
            }
            if (password.trim() === '') {
                currentErrors.push('A senha não pode estar vazia.');
            } else if (!(hasMinMaxChars && hasUpperCase && hasSymbol)) {
                currentErrors.push('A senha não atende a todos os requisitos de segurança.');
            }
            setErrors(currentErrors);
            return; // Impede o envio se o formulário não for válido
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', { username, password });
            console.log('Cadastro bem-sucedido:', response.data);
            setSuccessMessage('Cadastro realizado com sucesso!');
            setUsername(''); // Limpa o campo de username
            setPassword(''); // Limpa o campo de password
            // Redireciona para login após um pequeno atraso
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
            {/* Input do Username */}
            <input
                type="text"
                placeholder="Nome de usuário (nome.sobrenome)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // Aplica a classe de inválido se o username não estiver vazio e não for válido
                className={`${styles.input} ${username.trim() !== '' && !isUsernameFormatValid ? styles.invalidInput : ''}`}
            />
            {username.trim() !== '' && !isUsernameFormatValid && (
                <p className={styles.validationError}>Formato inválido. Use nome.sobrenome</p>
            )}
            {username.trim() === '' && errors.includes('O nome de usuário não pode estar vazio.') && (
                <p className={styles.validationError}>O nome de usuário não pode estar vazio.</p>
            )}

            {/* Input da Senha */}
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
            />
            <div className={styles.passwordRequirements}>
                <p className={`${styles.requirement} ${hasMinMaxChars ? styles.valid : ''}`}>
                    <span className={styles.checkbox}>{hasMinMaxChars ? '✓' : '✗'}</span>
                    Mínimo de 8 e máximo de 70 caracteres.
                </p>
                <p className={`${styles.requirement} ${hasUpperCase ? styles.valid : ''}`}>
                    <span className={styles.checkbox}>{hasUpperCase ? '✓' : '✗'}</span>
                    Pelo menos uma letra maiúscula.
                </p>
                <p className={`${styles.requirement} ${hasSymbol ? styles.valid : ''}`}>
                    <span className={styles.checkbox}>{hasSymbol ? '✓' : '✗'}</span>
                    Pelo menos um símbolo (Ex: !@#$%&*).
                </p>
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
            {password.trim() === '' && errors.includes('A senha não pode estar vazia.') && (
                <p className={styles.validationError}>A senha não pode estar vazia.</p>
            )}

            {/* Botão de Cadastro */}
            {/* O disabled agora considera o loading E a validação do formulário */}
            <button type="submit" disabled={loading || !isFormValid} className={styles.button}>
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

            {/* Mensagens de Erro e Sucesso */}
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
