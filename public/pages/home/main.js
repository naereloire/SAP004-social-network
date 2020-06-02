// import { greeting } from './data.js';

export default () => {
    const container = document.createElement("div");
    container.className = "feed-style"
    const template = `

    <div class="bio-container">
    <section class="bio-style">
      <div class="capa-style">
        <img class="img-capa" src="./img/gilry-capa.jpg">
      </div>
      <div class="img-perfil">
        <img class="foto-style circular-square" src="./img/diana.jpeg">
      </div>
      <div class="bio-infos">
        <h1 class="text-style">Diana de Themyscira</h1>
        <p class="text-style">Princesa e Heroína</p>
      </div>
    </section>
  </div>
  <div class="feed-container">
    <section class="post-box">
      <textarea id="post" name="post" class="textarea-style" rows="5" cols="10"
        placeholder="Escreva uma mensagem."></textarea>
      <div class="btn-container">
        <button class="btn-style"><i class="fas fa-camera-retro fa-2x"></i></button>
        <button class="btn-style">Compartilhar</button>
      </div>
    </section>
    <section class="publication-box">
      <div class="publication-title">
        <span class="publi-title-span">
          <p>Publicado por Zatanna</p>
        </span>
        <a href="#" class="close-post-btn">&times;</a>
      </div>
      <div class="publi-area">
        <p class="text-style">Publicação de Zatanna</p>
      </div>
      <div class="publication-btns">
        <button class="btn-style"><i class="fas fa-hand-spock fa-2x"></i></button>
        <button class="btn-style"><i class="fas fa-share-alt fa-2x"></i></i></button>
      </div>
    </section>
  </div>

    `;
    container.innerHTML = template;
    return container
}
