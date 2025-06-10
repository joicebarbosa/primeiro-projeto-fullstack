import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css'; // Certifique-se de que o caminho está correto

// --- REGEX PARA VALIDAÇÃO NO FRONT-END ---
const USERNAME_REGEX = /^[a-zA-Z]+\.[a-zA-Z]+$/;
const SYMBOL_REGEX = /[!@#$%^&*(),.?":{}|<>]/; // Alinhada com o backend

const Signup = () => {
    // --- ESTADOS ---
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState(''); // <-- NOVO ESTADO: FIRST NAME (opcional)
    const [lastName, setLastName] = useState('');   // <-- NOVO ESTADO: LAST NAME (opcional)

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
    const [usernameInputError, setUsernameInputError] = useState('');

    // --- useEffect PARA VALIDAÇÃO DA SENHA EM TEMPO REAL ---
    useEffect(() => {
        setHasMinChars(password.length >= 8);
        setHasUpperCase(/[A-Z]/.test(password));
        setHasSymbol(SYMBOL_REGEX.test(password));
    }, [password]);

    // --- useEffect PARA VALIDAÇÃO DO USERNAME EM TEMPO REAL ---
    useEffect(() => {
        if (username.length > 0) {
            const isValid = USERNAME_REGEX.test(username);
            setIsUsernameValid(isValid);

            if (!isValid) {
                setUsernameInputError('O nome de usuário deve estar no formato: nome.sobrenome');
            } else {
                setUsernameInputError('');
            }
        } else {
            setIsUsernameValid(false);
            setUsernameInputError('');
        }
    }, [username]);

    // O useEffect anterior para validação do email foi removido.

    // --- LÓGICA DE CADASTRO (handleSignup) ---
    const handleSignup = async (e) => {
        e.preventDefault();
        setErrors([]); // Limpa erros anteriores
        setSuccessMessage('');
        setLoading(true);

        const currentFrontEndErrors = [];

        // Validação final do username
        if (username.length === 0) {
            currentFrontEndErrors.push('O nome de usuário não pode estar vazio.');
        } else if (!isUsernameValid) {
            currentFrontEndErrors.push('O nome de usuário deve ser no formato: nome.sobrenome');
        }

        // A validação final do email foi removida.

        // Validação final da senha
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
            return;
        }

        // --- ENVIAR PARA O BACKEND ---
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', {
                username,
                password,
                firstName,  // <-- ENVIANDO O FIRST NAME (pode ser vazio se opcional)
                lastName,   // <-- ENVIANDO O LAST NAME (pode ser vazio se opcional)
            });
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
    // O formulário é válido se todos os campos obrigatórios do FE (username, senha) forem válidos
    const isFormValid = isUsernameValid && hasMinChars && hasUpperCase && hasSymbol;

    return (
        <form onSubmit={handleSignup} className={styles.form}>
            {/* INPUT USERNAME */}
            <input
                type="text"
                placeholder="Nome de Usuário (nome.sobrenome)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
                required // Adicione required se o campo é obrigatório (e no DTO)
            />
            {usernameInputError && <p className={styles.error}>{usernameInputError}</p>}
            {!usernameInputError && username.length === 0 && (
                <p className={styles.instruction}>O nome de usuário deve ser no formato: nome.sobrenome</p>
            )}

            {/* INPUT PASSWORD */}
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required // Adicione required
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

            {/* INPUT FIRST NAME (Opcional) */}
            <input
                type="text"
                placeholder="Primeiro Nome (opcional)"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={styles.input}
            />

            {/* INPUT LAST NAME (Opcional) */}
            <input
                type="text"
                placeholder="Sobrenome (opcional)"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={styles.input}
            />

            {/* BOTÃO CADASTRAR */}
            <button
                type="submit"
                disabled={loading || !isFormValid} // O botão só é habilitado se o form for válido
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
