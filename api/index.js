
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistema Hospitalar</title>
  <link rel="stylesheet" href="css/style.css">
</head>

<body>

  <div class="container">
    <h2>🏥 Sistema Hospitalar</h2>

    <form id="formLogin">
      <input
        id="usuario"
        name="usuario"
        type="text"
        placeholder="Usuário"
        autocomplete="username"
        required
      >

      <input
        id="senha"
        name="senha"
        type="password"
        placeholder="Senha"
        autocomplete="current-password"
        required
      >

      <button type="submit" id="botaoEntrar">Entrar</button>

      <p id="mensagem" role="alert"></p>
    </form>
  </div>

  <script>
    const formLogin = document.getElementById("formLogin");
    const campoUsuario = document.getElementById("usuario");
    const campoSenha = document.getElementById("senha");
    const botaoEntrar = document.getElementById("botaoEntrar");
    const mensagem = document.getElementById("mensagem");

    formLogin.addEventListener("submit", async function(event) {
      event.preventDefault();

      const usuario = campoUsuario.value.trim();
      const senha = campoSenha.value;

      if (!usuario || !senha) {
        mensagem.textContent = "Preencha o usuário e a senha.";
        return;
      }

      botaoEntrar.disabled = true;
      mensagem.textContent = "Verificando acesso...";

      try {
        const resposta = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            usuario: usuario,
            senha: senha
          })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
          throw new Error(dados.erro || "Usuário ou senha inválidos.");
        }

        mensagem.textContent = "Login realizado.";

        switch (dados.tipo) {
          case "triagem":
            window.location.href = "triagem.html";
            break;

          case "medico":
            window.location.href = "medica.html";
            break;

          case "atendimento":
            window.location.href = "atendimento.html";
            break;

          default:
            mensagem.textContent =
              "Login realizado, mas o tipo de usuário não possui uma página configurada.";
            botaoEntrar.disabled = false;
        }

      } catch (erro) {
        mensagem.textContent =
          erro.message || "Não foi possível conectar ao servidor.";

        botaoEntrar.disabled = false;
      }
    });
  </script>

</body>
</html>
