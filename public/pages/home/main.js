// import { greeting } from './data.js';

export default () => {
    const container = document.createElement("div");
    const template = `
<div class="feed-style">
 <section class="bio-style">
  <div class="img-perfil">
   <img class="foto-style circular-square" src="./img/batata.jpeg">
  </div>
  <div class="bio-infos">
   <h1 class="text-style">Diana de Themyscira</h1>
   <p class="text-style">Princesa e Heroína</p>
  </div>
 </section>
 <section class="post-box">
   <textarea id="post" name="post" class="textarea-style" rows="5" cols="10" placeholder="Escreva uma mensagem."></textarea>
  <div class="btn-container">
   <button class="btn-style"><i class="fas fa-camera-retro fa-2x"></i></button>
   <button class="btn-style">Compartilhar</button>
  </div>
 </section>
 <section class="publication-box">
  <div class="publication-title">
   <p>Publicado por Zatanna</p>
   <a href="#" class="close-post-btn">&times;</a>
  </div>
  <div class="publi-area" >
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