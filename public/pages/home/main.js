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
      <textarea id="post-text" name="post" class="textarea-style" rows="5" cols="30"
        placeholder="Escreva uma mensagem."></textarea>
      <div class="btn-container">
        <button class="btn-style"><i class="fas fa-camera-retro fa-2x"></i></button>
        <button type="submit" class="btn-style">Publicar</button>
      </div>
      </form>
    </section>
    <div id="all-posts-container" class="all-posts-box"></div>
  </div>`;
  container.innerHTML = template;
  return container
}
export const addEventButtons = (page) => {
  if (page === "home") {
    loadPosts(clearFeed, showPosts, "")
    setTimeout(() => {
      document.getElementById("post-form").addEventListener("submit", btnPost)
    }, 2000)
    document.getElementById("ul-id").addEventListener("click", tagFilter)
  }
}
const clearFeed = () => {
  document.getElementById("all-posts-container").innerHTML = ""
}

const clearAriaCurrent = () => {
  for (let element of document.getElementById("ul-id").children) {
    element.firstElementChild.removeAttribute('aria-current')
    console.log(element.firstElementChild.ariaCurrent)
  }
}

const tagFilter = (event) => {
  let element_name = event.target.localName
  if (element_name != 'li') {
    clearAriaCurrent()
    console.log(event.target)
    let tagValue;
    if (element_name === 'span') {
      tagValue = event.target.parentElement.parentElement.name
      event.target.parentElement.parentElement.ariaCurrent = "page"
    }
    else {
      tagValue = event.target.parentElement.name
      event.target.parentElement.ariaCurrent = "page"
    }
    clearFeed()
    loadPosts(clearFeed, showPosts, tagValue)
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
        <p>[ ${post.data().name} ] postou: </p>
        
      </span>
      <a href="#" class="delete-post-btn">&times;</a>
    </div>
    <div class="publi-area">
      <p class="text-style">${post.data().text}</p> <hr>
      </div>
      
        
    <div class="publication-btns">
      <button class="btn-style"><i class="fas fa-hand-spock fa-1.5x"></i></button>
      <button class="btn-style"><i class="fas fa-share-alt fa-1.5x"></i></i></button>
      
      <p>${post.data().date}</p><br/><br/><br/>
    </div>
    </section>`;
  feddContainer.innerHTML += template_feed;
}
