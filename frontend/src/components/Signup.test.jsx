import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Estados para rastrear os requisitos da senha
  const [hasMinMaxChars, setHasMinMaxChars] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);

  // Novo estado para a validação do username
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  useEffect(() => {
    // Validação da senha em tempo real
    const validatePassword = (pwd) => {
      setHasMinMaxChars(pwd.length >= 8 && pwd.length <= 70); // Corrigindo para min 8, max 70
      setHasUpperCase(/[A-Z]/.test(pwd));
      setHasSymbol(/[!'#$%"&()*+\-./:;?@[\]^_`~]/.test(pwd)); // Mantenha os símbolos que você quer permitir
    };

    // Validação do username em tempo real
    const validateUsernameFormat = (uname) => {
      // Regex para nome.sobrenome (apenas letras, min 1 letra antes e depois do ponto)
      const regex = /^[a-zA-Z]+\.[a-zA-Z]+$/;
      setIsUsernameValid(regex.test(uname));
    };

    validatePassword(password);
    validateUsernameFormat(username);
  }, [password, username]); // Adicione username como dependência

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage("");

    // Validação final antes de enviar
    if (!isUsernameValid) {
      setErrors(["O nome de usuário deve estar no formato: nome.sobrenome"]);
      return;
    }
    if (!(hasMinMaxChars && hasUpperCase && hasSymbol)) {
      setErrors(["A senha não atende a todos os requisitos de segurança."]);
      return;
    }

    setLoading(true);
    try {
      // Ajuste a URL para a porta correta do seu backend se tiver mudado (ex: 4000)
      const response = await axios.post("http://localhost:3000/auth/signup", {
        username,
        password,
      });
      console.log("Cadastro bem-sucedido:", response.data);
      setSuccessMessage("Cadastro realizado com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Erro ao cadastrar", error.response?.data);
      if (error.response?.data?.message) {
        // Se o backend enviar uma string, ou um array de strings
        if (Array.isArray(error.response.data.message)) {
          setErrors(error.response.data.message);
        } else {
          setErrors([error.response.data.message]);
        }
      } else {
        setErrors(["Erro ao cadastrar. Tente novamente."]);
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    isUsernameValid && hasMinMaxChars && hasUpperCase && hasSymbol;

  return (
    <form onSubmit={handleSignup} className={styles.form}>
      {/* Input do Username */}
      <input
        type="text"
        placeholder="Nome de usuário (nome.sobrenome)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={`${styles.input} ${
          username && !isUsernameValid ? styles.invalidInput : ""
        }`}
      />
      {username && !isUsernameValid && (
        <p className={styles.validationError}>
          Formato inválido. Use nome.sobrenome
        </p>
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
        <p
          className={`${styles.requirement} ${
            hasMinMaxChars ? styles.valid : ""
          }`}
        >
          <span className={styles.checkbox}>{hasMinMaxChars ? "✓" : "✗"}</span>
          Mínimo de 8 e máximo de 70 caracteres.
        </p>
        <p
          className={`${styles.requirement} ${
            hasUpperCase ? styles.valid : ""
          }`}
        >
          <span className={styles.checkbox}>{hasUpperCase ? "✓" : "✗"}</span>
          Pelo menos uma letra maiúscula.
        </p>
        <p className={`${styles.requirement} ${hasSymbol ? styles.valid : ""}`}>
          <span className={styles.checkbox}>{hasSymbol ? "✓" : "✗"}</span>
          Pelo menos um símbolo (Ex: !@#$%&*).
        </p>
      </div>

      {/* Botão de Cadastro */}
      <button
        type="submit"
        disabled={loading || !isFormValid}
        className={styles.button}
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>

      {/* Mensagens de Erro e Sucesso */}
      {errors.length > 0 && (
        <div className={styles.errorContainer}>
          {errors.map((err, index) => (
            <p key={index} className={styles.error}>
              {err}
            </p>
          ))}
        </div>
      )}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </form>
  );
};

export default Signup;
