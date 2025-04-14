![image](https://github.com/user-attachments/assets/47ebf728-742e-41e7-8ff0-50071f4a7f38)![image](https://github.com/user-attachments/assets/48b786f7-4b50-4256-95ee-396c8a80582a)# Projeto Fullstack de Autenticação

![Projeto Fullstack](https://via.placeholder.com/800x400?text=Imagem+do+Projeto)

Este é um projeto fullstack de autenticação composto por um backend em **NestJS** e um frontend em **React**. 
Ele permite que os usuários se registrem, façam login e acessem recursos protegidos.

## 🚀 Tecnologias Utilizadas

### Backend:
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)

### Frontend:
- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)

---

## 🛠️ Configuração do Ambiente

### Pré-requisitos:
- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Banco de dados MySQL configurado

---
## ⚙️ Configuração do Backend

1. Acesse o diretório do backend:

   ```bash
   cd backend
2. Instale as dependências:
  npm install
3. Configure o banco de dados no arquivo src/app.module.ts (host, usuário, senha, etc.).
4. Inicie o servidor:
   npm start
O backend será iniciado na porta 3000.

---

🌐 Configuração do Frontend
1. Acesse o diretório do frontend:
  cd frontend
2. Instale as dependências:
  npm install
3. Inicie o servidor de desenvolvimento:
  npm run start

O frontend tentará iniciar na porta 3000. Caso esta porta já esteja em uso pelo backend, o terminal perguntará se deseja usar a porta 3001.
Responda com y para confirmar.

🖥️ Como Usar

Certifique-se de que o backend e o banco de dados estejam rodando.
Acesse o frontend em http://localhost:3001.

Realize o registro ou login para acessar os recursos protegidos.


Tela de Login
![image](https://github.com/user-attachments/assets/2d775af5-8912-462c-bd31-9a35da2620cf)

Tela de Registro
![image](https://github.com/user-attachments/assets/08a28361-3a96-4033-9c9a-d8b16886351f)

Dashboard
![image](https://github.com/user-attachments/assets/9c87e6ac-0584-4d27-9a44-c874d3076e53)


📜 Scripts Úteis
Backend:
npm start: Inicia o servidor em modo de desenvolvimento.
npm run build: Compila o projeto para produção.
Frontend:
npm run start: Inicia o servidor de desenvolvimento.
npm run build: Gera os arquivos otimizados para produção.

.
📌 Observações
Certifique-se de configurar corretamente as variáveis de ambiente no backend e no frontend.
Não use a configuração synchronize: true do TypeORM em produção.
📄 Licença
Este projeto está licenciado sob a MIT License.





