import { createPost, loadPosts, deletePost } from './data.js';

let limitTarget = 0
let limitReal = 0
let limit = 5
let limitcopy = limit
let tagValue = ""
let tags = {
  home: ["Tag", `<i class="fas fa-home fa-1x"></i>`],
  geek: ["Geek", `<i class="fas fa-robot fa-1x"></i>`],
  tech: ["Tech", `<i class="fas fa-laptop-code fa-1x"></i>`],
  autocuidado: ["Autocuidado", `<i class="fas fa-spa fa-1x"></i>`],
  seguranca: ["Segurança", `<i class="fas fa-people-carry fa-1x"></i>`],
  oportunidades: ["Oportunidades", `<i class="fas fa-suitcase fa-1x"></i>`]
}

export default () => {
  const container = document.createElement("div");
  container.className = "feed-style"
  const template = `
    <div class="bio-container">
    <section class="bio-style">
      <div class="capa-style">
        <img class="img-capa" src="./img/capa-inicial.jpg">
      </div>
      <div id="profile-picture" class="img-perfil">
        <img class="foto-style circular-square" src="./img/foto-inicial.jpg">
      </div>
      <div class="bio-infos">
        <h1 class="text-style" id="user-name"></h1>
      </div>
    </section>
  </div>
  <div id="feed-id" class="feed-container">
    <section class="post-box">
    <div class="check-container">
    <input type="checkbox" id="privacy-check"></input>
    <label for="privacy-check">Post Privado</label>
    <select id="select-id" class="btn-style">
    <option value="">Tag</option> 
    <option value="geek">Geek</option> 
    <option value="tech">Tech</option> 
    <option value="autocuidado">Autocuidado</option> 
    <option value="seguranca">Segurança</option> 
    <option value="oportunidades">Oportunidades</option> 
    </select>
    </div>
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
    <button id="btn-ver-mais" class="btn-style">Ver Mais</button>
  </div>`;
  container.innerHTML = template;
  return container
}

export const addRenderEvents = (page) => {
  let timeToRenderPage = 2000
  if (page === "home") {

    loadPosts(clearFeed, showPosts, "", limit)
    setTimeout(() => {
      document.getElementById("post-form").addEventListener("submit", btnPost)
    }, timeToRenderPage)
    document.getElementById("ul-id").addEventListener("click", tagFilter)
    document.getElementById("btn-ver-mais").addEventListener("click", changeLimitPosts)
  }
}

const changeLimitPosts = (event) => {
  limit += 5
  clearLimits()
  loadPosts(clearFeed, showPosts, tagValue, limit)

}
const clearLimits = () => {
  limitcopy = limit
  limitReal = 0
  limitTarget = 0
}


const limitFix = () => {
  limitTarget++
  if (limitTarget === limitcopy) {
    if (limit != limitReal) {
      let difflimit = (limit - limitReal)
      limitcopy += difflimit
      limitReal = 0
      limitTarget = 0
      loadPosts(clearFeed, showPosts, tagValue, limitcopy)
    }
    else {
      clearLimits()
    }
  }
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
    clearLimits()
    loadPosts(clearFeed, showPosts, tagValue, limit)
  }
}

const blockTag = (tagValue) => {
  let select = document.getElementById("select-id")
  if (!tagValue) {
    let keyTags = ["home", "geek", "tech", "autocuidado", "seguranca", "oportunidades"]
    select.innerHTML = ""
    for (let key of keyTags) {
      let keyValidated = key === "home" ? "" : key
      select.innerHTML +=
        `<option value="${keyValidated}">${tags[key][0]}</option>`;

    }

  }
  else {
    select.innerHTML =
      `<option value="${tagValue}">${tags[tagValue][0]}</option>`;
  }
}

const btnPost = (event) => {
  event.preventDefault();
  const postText = document.getElementById("post-text").value
  const tag = document.getElementById("select-id")
  const tagValue = tag.options[tag.selectedIndex].value
  const checkBox = document.getElementById("privacy-check").checked

  if (postText) {
    createPost(postText, tagValue, checkBox)
    document.getElementById("post-text").value = ""
  }
  document.getElementById("privacy-check").checked = false
  clearLimits()
}

const showPosts = (post) => {
  let privacy
  let postData = post.data()
  if (privacyValidation(postData) === "mostrar") {
    if (post.data().privacy) {
      privacy = 'Privado <i class="fas fa-lock"></i>'
    }
    else {
      privacy = 'Publico <i class="fas fa-lock-open"></i>'
    }

    let keyValidated = postData.tag === "" ? "home" : postData.tag;
    const feedContainer = document.getElementById("all-posts-container");
    const template_feed = `
    <section id="${post.id}" class="publication-box">
    <div class="publication-title">
    <span>
    <p><b>Post </b>${privacy}</p>
    </span>
      <span class="publi-title-span"><br>
       <p>Publicado por ${postData.name}</p>
      </span>

      <span>${tags[keyValidated][1]}</span>
      <a href="#" class="delete-post-btn"><i class="fas fa-trash-alt"></i></a>
    </div>
    <div class="publi-area">
      <p class="text-style">${postData.text}</p><hr>
    </div>

    <div class="publication-btns">
      <button class="btn-style"><i class="fas fa-star fa-1x"></i></button>
      <button class="btn-style"><i class="fas fa-share-alt fa-1x"></i></i></button>
      <button class="btn-style"><i class="fas fa-pencil-alt fa-1x"></i></i></button>
      <p>${postData.date}</p><br/><br/><br/>
    </div>
    </section>`;

    feedContainer.innerHTML += template_feed;

    const btnDelete = document.querySelectorAll(".delete-post-btn")
    const catchBtn = (element) => element.addEventListener("click", function (event) {
      deletePost(event.currentTarget.parentElement.parentElement.id)
    })

    btnDelete.forEach(catchBtn)
    limitReal++
  }
  limitFix()
}



const privacyValidation = (postData) => {
  let user = firebase.auth().currentUser;
  if (postData.user_id === user.uid || !postData.privacy) {
    return "mostrar"
  }
  else {
    return "não mostrar"
  }

}
