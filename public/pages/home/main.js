import { createPost, loadPosts } from '../data.js';

let limit = 5
let tagValue = ""
let tags = {
  home: "Tag",
  geek: "Geek",
  tech: "Tech",
  autocuidado: "Autocuidado",
  seguranca: "Segurança",
  oportunidades: "Oportunidades"
}

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
    <div class="select-container">
    <select id="select-id" class="btn-style">
    <option value="">Tag</option> 
    <option value="geek">Geek</option> 
    <option value="tech">Tech</option> 
    <option value="autocuidado">Autocuidado</option> 
    <option value="seguranca">Segurança</option> 
    <option value="oportunidades">Oportunidades</option> 
    </select>
    <div class="form-container">
     <form id="post-form" class="form-style">
      <textarea id="post-text" name="post" class="textarea-style" rows="5" cols="10"
        placeholder="Escreva uma mensagem."></textarea>
      <div class="btn-container">
        <button class="btn-style"><i class="fas fa-camera-retro fa-2x"></i></button>
        <button type="submit" class="btn-style">Publicar</button>
      </div>
      </form>
    </section>
    <div id="all-posts-container" class="all-posts-box"></div>
    <button id="btn-ver-mais" class="btn-style">Ver Mais</button>
  </div>`;
  container.innerHTML = template;
  return container
}

export const addEventButtons = (page) => {
  if (page === "home") {
    loadPosts(clearFeed, showPosts, "", limit)
    setTimeout(() => {
      document.getElementById("post-form").addEventListener("submit", btnPost)
    }, 2000)
    document.getElementById("ul-id").addEventListener("click", tagFilter)
    document.getElementById("btn-ver-mais").addEventListener("click", changeLimitPosts)
  }
}

const changeLimitPosts = (event) => {
  limit += 5
  loadPosts(clearFeed, showPosts, "", limit)

}

const clearFeed = () => {
  document.getElementById("all-posts-container").innerHTML = ""
}

const clearAriaCurrent = () => {
  for (let element of document.getElementById("ul-id").children) {
    element.firstElementChild.removeAttribute('aria-current')
  }
}

const tagFilter = (event) => {
  limit = 5
  let element_name = event.target.localName
  if (element_name != 'li') {
    clearAriaCurrent()
    if (element_name === 'span') {
      tagValue = event.target.parentElement.parentElement.name
      event.target.parentElement.parentElement.ariaCurrent = "page"

    }
    else {
      tagValue = event.target.parentElement.name
      event.target.parentElement.ariaCurrent = "page"
    }
    clearFeed()
    blockTag(tagValue)
    loadPosts(clearFeed, showPosts, tagValue, limit)
  }
}

const blockTag = (tagValue) => {
  let select = document.getElementById("select-id")
  if (!tagValue) {
    let keyTags = ["home", "geek", "tech", "autocuidado", "seguranca", "oportunidades"]
    select.innerHTML = ""
    for (let key of keyTags) {
      let keyValidated = (key) => key === "home" ? "" : key
      select.innerHTML +=
        `<option value="${keyValidated}">${tags[key]}</option>`;

    }

  }
  else {
    select.innerHTML =
      `<option value="${tagValue}">${tags[tagValue]}</option>`;
  }
}

const btnPost = (event) => {
  event.preventDefault();
  const postText = document.getElementById("post-text").value
  const tag = document.getElementById("select-id")
  const tagValue = tag.options[tag.selectedIndex].value
  if (postText) {
    createPost(postText, tagValue)
    document.getElementById("post-text").value = ""
  }
}

const showPosts = (post) => {
  const feddContainer = document.getElementById("all-posts-container");
  const template_feed = `
    <section id="${post.id}" class="publication-box">
    <div class="publication-title">
      <span class="publi-title-span"><br>
        <p>Publicado por ${post.data().name}</p>
      </span>
      <a href="#" class="close-post-btn">&times;</a>
    </div>
    <div class="publi-area">
      <p class="text-style">${post.data().text}</p>
      <p>${post.data().date}</p><hr>
    </div>
    <div class="publication-btns">
      <button class="btn-style"><i class="fas fa-hand-spock fa-2x"></i></button>
      <button class="btn-style"><i class="fas fa-share-alt fa-2x"></i></i></button>
    </div>
    </section>`;
  feddContainer.innerHTML += template_feed;
}



