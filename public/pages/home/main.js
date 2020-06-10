import { createPost, loadPosts } from '../data.js';

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
  <div id="feed-id" class="feed-container">
    <section class="post-box">
     <form id="post-form">
      <textarea id="post-text" name="post" class="textarea-style" rows="5" cols="10"
        placeholder="Escreva uma mensagem."></textarea>
      <div class="btn-container">
        <button class="btn-style"><i class="fas fa-camera-retro fa-2x"></i></button>
        <button type="submit" class="btn-style">Compartilhar</button>
      </div>
      </form>
    </section>
  </div>`;
  container.innerHTML = template;
  return container
}
export const addEventButtons = (page) => {
  if (page === "home") {
    loadPosts(showPosts)
    setTimeout(()=>{document.getElementById("post-form").addEventListener("submit", btnPost)}, 1000)
  }
}


const btnPost = (event) => {
  event.preventDefault();
  const postText = document.getElementById("post-text").value
  if (postText) {
    createPost(postText)
    document.getElementById("post-text").value = ""
  }

}

const showPosts = (post) => {
  const feddContainer = document.getElementById("feed-id");
  const template_feed = `
    <section id="${post.id}" class="publication-box">
    <div class="publication-title">
      <span class="publi-title-span">
        <p>Publicado por ${post.data().name}</p>
      </span>
      <a href="#" class="close-post-btn">&times;</a>
    </div>
    <div class="publi-area">
      <p class="text-style">${post.data().text}</p>
      <p>${post.data().date}</p>
    </div>
    <div class="publication-btns">
      <button class="btn-style"><i class="fas fa-hand-spock fa-2x"></i></button>
      <button class="btn-style"><i class="fas fa-share-alt fa-2x"></i></i></button>
    </div>
    </section>`;
  feddContainer.innerHTML += template_feed;
}
