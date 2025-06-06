import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css'; // Certifique-se de que o caminho está correto

// --- REGEX PARA VALIDAÇÃO NO FRONT-END ---
// Regex para validar o formato nome.sobrenome
const USERNAME_REGEX = /^[a-zA-Z]+\.[a-zA-Z]+$/;

// Regex para caracteres especiais na senha (alinhada com o backend)
// Sua regex no backend: /(?=.*[!@#$%^&*(),.?":{}|<>])/, então usamos os mesmos caracteres
const SYMBOL_REGEX = /[!@#$%^&*(),.?":{}|<>]/;


const Signup = () => {
    // --- ESTADOS ---
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]); // Para erros do backend ou validação inicial do front-end
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Estados para rastrear os requisitos da senha em tempo real (feedback visual)
    const [hasMinChars, setHasMinChars] = useState(false);
    const [hasUpperCase, setHasUpperCase] = useState(false);
    const [hasSymbol, setHasSymbol] = useState(false);

    // Estado para a validação do username no front-end
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [usernameInputError, setUsernameInputError] = useState(''); // RENOMEADO para evitar confusão com o erro de "formato"

    // --- useEffect PARA VALIDAÇÃO DA SENHA EM TEMPO REAL ---
    useEffect(() => {
        setHasMinChars(password.length >= 8);
        setHasUpperCase(/[A-Z]/.test(password));
        setHasSymbol(SYMBOL_REGEX.test(password));
    }, [password]);


    // --- useEffect PARA VALIDAÇÃO DO USERNAME EM TEMPO REAL ---
    useEffect(() => {
        if (username.length > 0) { // Só valida se o campo não estiver vazio
            const isValid = USERNAME_REGEX.test(username);
            setIsUsernameValid(isValid); // Atualiza o estado de validade

            if (!isValid) {
                setUsernameInputError('O nome de usuário deve estar no formato: nome.sobrenome'); // Mensagem de erro para formato inválido
            } else {
                setUsernameInputError(''); // Limpa o erro se for válido
            }
        } else {
            // Se o campo estiver vazio, não mostra erro de formato, mas o considera inválido para submissão
            setIsUsernameValid(false);
            setUsernameInputError(''); // Não mostra erro de formato se o campo estiver vazio
        }
    }, [username]);


    // --- useEffect PARA DEPURAR O ESTADO GERAL DO FORMULÁRIO E O BOTÃO ---
    useEffect(() => {
        // Console logs de depuração (podem ser removidos após testar)
    }, [isUsernameValid, hasMinChars, hasUpperCase, hasSymbol, loading]);


    // --- LÓGICA DE CADASTRO (handleSignup) ---
    const handleSignup = async (e) => {
        e.preventDefault();
        setErrors([]); // Limpa erros anteriores
        setSuccessMessage('');
        setLoading(true);

        const currentFrontEndErrors = [];

        // Validação final do username no momento da submissão
        if (username.length === 0) {
            currentFrontEndErrors.push('O nome de usuário não pode estar vazio.');
        } else if (!isUsernameValid) { // Se não estiver vazio e o formato for inválido
            currentFrontEndErrors.push('O nome de usuário deve ser no formato: nome.sobrenome');
        }
        
        if (password.length === 0) {
            currentFrontEndErrors.push('A senha não pode estar vazia.');
        } else {
            if (!hasMinChars) {
                currentFrontEndErrors.push('A senha deve ter no mínimo 8 caracteres.');
            }
            if (!hasUpperCase) {
                currentFrontEndErrors.push('A senha deve ter pelo menos uma letra maiúscula.');
            }
            if (!hasSymbol) {
                currentFrontEndErrors.push('A senha deve ter pelo menos um símbolo.');
            }
        }

        if (currentFrontEndErrors.length > 0) {
            setErrors(currentFrontEndErrors);
            setLoading(false);
            return; // Impede o envio da requisição se houver erros no front-end
        }

        // --- ENVIAR PARA O BACKEND ---
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

    // --- CONDIÇÃO PARA HABILITAR/DESABILITAR O BOTÃO ---
    const isFormValid = isUsernameValid && hasMinChars && hasUpperCase && hasSymbol;

    return (
        <form onSubmit={handleSignup} className={styles.form}>
            {/* INPUT USERNAME */}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
            />
            {/* Lógica para exibir instrução ou erro de formato do username */}
            {usernameInputError ? ( // Se houver um erro de formato específico, exibe ele
                <p className={styles.error}>{usernameInputError}</p>
            ) : ( // Se não houver erro de formato, verifica se o campo está vazio para exibir a instrução
                username.length === 0 && ( // Esta condição faz a instrução sumir quando algo é digitado e é válido
                    <p className={styles.instruction}>O nome de usuário deve ser no formato: nome.sobrenome</p>
                )
            )}

            {/* INPUT PASSWORD */}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
            />
            {/* REQUISITOS DA SENHA */}
            <div className={styles.passwordRequirements}>
                <p className={`${styles.requirement} ${hasMinChars ? styles.valid : ''}`}>
                    <span className={styles.checkbox}>{hasMinChars ? '✓' : ''}</span>
                    A senha deve ter no mínimo 8 caracteres.
                </p>
                <p className={`${styles.requirement} ${hasUpperCase ? styles.valid : ''}`}>
                    <span className={styles.checkbox}>{hasUpperCase ? '✓' : ''}</span>
                    A senha deve ter pelo menos uma letra maiúscula.
                </p>
                <p className={`${styles.requirement} ${hasSymbol ? styles.valid : ''}`}>
                    <span className={styles.checkbox}>{hasSymbol ? '✓' : ''}</span>
                    A senha deve ter pelo menos um símbolo.
                </p>
            </div>

            {/* BOTÃO CADASTRAR */}
            <button
                type="submit"
                disabled={loading || !isFormValid}
                className={styles.button}
            >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>

            {/* MENSAGENS DE ERRO DO BACKEND (ou erros de validação inicial do front-end) */}
            {errors.length > 0 && (
                <div className={styles.errorContainer}>
                    {errors.map((err, index) => (
                        <p key={index} className={styles.error}>{err}</p>
                    ))}
                </div>
            )}
            {/* MENSAGEM DE SUCESSO */}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
        </form>
    );
};

export default Signup;