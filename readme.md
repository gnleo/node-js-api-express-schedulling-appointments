# Agendamento de consulta médica

### **Funcionalidades**

### **Cadastro de usuário**

- [x] Deve ser possível o usuário realizar um cadastro
  - [x] O usuário não precisa estar autenticado no sistema para se cadastrar
  - [x] Não deve ser possível realizar o cadastro de um usuário sem username e senha
  - [x] Não deve ser possível realizar o cadastro de um username já existente
  - [x] Não deve ser possível o usuário cadastrar a permissão de administrador

### **Cadastro de especialidade**

- [x] Deve ser possível um usuário cadastrar uma especialidade
  - [x] O usuário precisa estar autenticado na aplicação
  - [x] Não deve ser possível realizar o cadastro de uma especialidade já existente, ou seja, com o mesmo nome
  - [x] O usuário precisa ter permissão de administrador
  - [x] Não deve ser possível cadastrar uma especialidade com nome vazio

### **Cadastro de médicos**

- [] Deve ser possível cadastrar um médico
  - [x] O médico deve possuir um CRM com 6 dígitos
  - [x] O médico deve estar atrelado a um usuário
  - [] O médico deve ter uma e somente uma especialidade
  - [x] Não deve ser possível cadastrar um médico sem CRM
  - [x] Não deve ser possível cadastrar o mesmo CRM mais de uma vez
