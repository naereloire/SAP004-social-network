/* global document */
export default () => {
  const container = document.createElement('div');

  container.innerHTML = `
    <div class="container-login">
      <img class="logo-img" src="./img/girly-logo.png" alt="imagem do logo">
      <section >
      <h1 class='title'>[girlyHub]</h1>
      <h3 class='subtitle'>Bem vinda!</h3>
    <form class="login-form">
      <input id='email' type='email' class='email-input' , placeholder='  Email'>
      <input id='password' type='password' class='password-input' placeholder='  Senha'>
      <button id='login-btn' class=' login-btn'>Log in</button><br />
    </form>
    <hr>
    <div id="firebaseui-auth"></div>
    <p>Ainda não tem uma conta? <a href="/#register" id="create-account">Crie agora</a></p>
    
    </section>
    <div>
        `;

  return container;
};
