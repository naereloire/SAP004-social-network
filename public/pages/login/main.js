export default () => {
  const container = document.createElement('div');

  container.innerHTML = `
      <div class="container-login">

    <section class='login-img'>
    <img class="logo-img"src="./img/girlylogo.png" alt="imagem do logo">
  </section>
  
          <h1 class='title'>[girlyHub]</h1>
          <h3 class='subtitle'>Bem vinda!</h3>
          <form class="login-form">
          <input id='email' type='email' class= 'email-input', placeholder= '  Email'>
          <input id= 'password' type='password' class= 'password-input' placeholder= '  Senha'>
          <button id='login-btn' class=' login-btn' >Log in</button><br/>
          </form>
          <label class="google-box"><img class="google-logo"src="./img/google.png" alt="logo google"> Entrar com Google </label><br/><br/>
          
          <p>Ainda não tem uma conta? <link rel="" href=""> Crie agora </p></>
        
        <div>`;
  
    return container;
  };