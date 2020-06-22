import { createPost, loadPosts, deletePost, saveImage, saveLike, savePostEdit } from './data.js';
let privacy = false
let limitTarget = 0
let limitReal = 0
let limit = 5
let limitcopy = limit
let tagValue = ""
let tags = {
  home: ["Tag", `<i  class=" icons fas fa-home fa-1x"></i>`],
  geek: ["Geek", `<i class="icons fas fa-robot fa-1x"></i>`],
  tech: ["Tech", `<i class="icons fas fa-laptop-code fa-1x"></i>`],
  autocuidado: ["Autocuidado", `<i class="icons fas fa-spa fa-1x"></i>`],
  seguranca: ["Segurança", `<i class="icons fas fa-people-carry fa-1x"></i>`],
  oportunidades: ["Oportunidades", `<i class="icons fas fa-suitcase fa-1x"></i>`]
}

export default () => {
  const container = document.createElement("div");
  container.className = "feed-style"
  const template = `
    <div class="bio-container">
    <section class="bio-style">
      <div id="cover-picture" class="capa-style">
      <img id="cover-image" class="img-capa" src="./img/capa-inicial.jpg">
      </div>
      <div id="profile-picture" class="img-perfil">
        <img id="image-profile" class="foto-style circular-square" src="./img/foto-inicial.jpg">
      </div>
      <div class="bio-infos">
        <h1 class="text-style" id="user-name"></h1>
      </div>
    </section>
  </div>
  <div id="feed-id" class="feed-container">
    <section class="post-box">
    <div class="check-container">
    <label class="container">Privado
  <input type="checkbox" id="privacy-check">
  <span class="checkmark"></span>
</label>
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
        <input name="post-img" type="file" id="input-photo" class="btn-photo"></input>
        <label class="btn-style" for="input-photo"><i class="icons fas fa-camera-retro fa-2x"></i></label>
        <button type="submit" class="btn-style">Publicar</button>
      </div>
      </form>
    </section>
    <div id="all-posts-container" class="all-posts-box"></div>
    <button id="btn-ver-mais" class="btn-more btn-style">Ver Mais</button>
    <input type="file" id="file-input">
    <input type="file" id="file-cover-input">
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
      document.getElementById("input-photo").addEventListener("change", changePhotoIcon)

    }, timeToRenderPage)

    document.getElementById("ul-id").addEventListener("click", tagFilter)
    document.getElementById("btn-ver-mais").addEventListener("click", changeLimitPosts)
  }
}

const changeLimitPosts = (event) => {
  limit += 5
  clearLimits()
  loadPosts(clearFeed, showPosts, tagValue, limit, privacy)

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
      loadPosts(clearFeed, showPosts, tagValue, limitcopy, privacy)
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

        } else {
            tagValue = event.target.parentElement.name
            event.target.parentElement.ariaCurrent = "page"
        } clearFeed()
        blockTag(tagValue)
        loadPosts(clearFeed, showPosts, tagValue, limit)
    }
    else {
      tagValue = event.target.parentElement.name
      event.target.parentElement.ariaCurrent = "page"
    }
    if (tagValue === "privados") {
      privacy = true
      blockPrivacyBox(true)
      blockTag()
      clearLimits()
      loadPosts(clearFeed, showPosts, "", limit, privacy)
    }
    else {
      privacy = false
      blockPrivacyBox(false)
      blockTag(tagValue)
      clearLimits()
      loadPosts(clearFeed, showPosts, tagValue, limit)
    }
  }

const blockTag = (tagValue) => {

  let select = document.getElementById("select-id")
  if (!select) {
    return
  }
  if (!tagValue) {
    let keyTags = ["home", "geek", "tech", "autocuidado", "seguranca", "oportunidades"]
    select.innerHTML = ""
    for (let key of keyTags) {
      let keyValidated = key === "home" ? "" : key
      select.innerHTML +=
        `<option value="${keyValidated}">${tags[key][0]}</option>`;


    }
}}

const btnPost = (event) => {
  event.preventDefault();

  const postText = document.getElementById("post-text").value;
  const tag = document.getElementById("select-id");
  const tagValue = tag.options[tag.selectedIndex].value;
  const checkBox = document.getElementById("privacy-check").checked;
  let photoFile = document.getElementById("input-photo");

  if (photoFile.value) {
    postPhoto(photoFile).then((url) => {
      createPost(postText, tagValue, checkBox, url)
      document.getElementById("post-text").value = ""

      photoFile.value = ""
      rollBackPhotoIcon(photoFile)
    })
  }
  else if (postText) {
    createPost(postText, tagValue, checkBox, "")
    document.getElementById("post-text").value = ""
  }
  if (!privacy) {
    document.getElementById("privacy-check").checked = false
  }
  clearLimits()
}

const showPosts = (post) => {
  let privacy
  let postData = post.data()
  let templateImg = ""
  let templateDeletBtn = ""
  let templateBtnEdit = ""

  if (firebase.auth().currentUser.uid === postData.user_id) {
    templateDeletBtn = `
    <span><a href="#" class="delete-post-btn"><i class="icon-del fas fa-trash-alt"></i></a></span>`
    templateBtnEdit = `
    <button id="edit-${post.id}" class="btn-style"><i class="icons fas fa-pencil-alt fa-1x"></i></i></button>
    `
  }

  if (postData.urlImg) {
    templateImg = `<img src=${postData.urlImg} class='img-feed'>`
  }
  if (privacyValidation(postData)) {
    if (post.data().privacy) {
      privacy = 'Privado <i class="icons fas fa-lock fa-1x"></i>'
    }
    else {
      privacy = 'Publico <i class="icons fas fa-lock-open fa-1x"></i>'
    }

    let keyValidated = postData.tag === "" ? "home" : postData.tag;
    const feedContainer = document.getElementById("all-posts-container");
    const template_feed = `
    <section id="${post.id}" class="publication-box">
        <div class="publication-title">
          <div class="span-container">
            <span><p>Post ${privacy}</p></span>
            <span>${tags[keyValidated][1]}</span>
            ${templateDeletBtn}
          </div>
        </div>
        <div class="publi-area">
            ${templateImg}<br>
          <p class="text-style">${postData.text}</p>
          <hr>
        </div>
        <div class="publication-btns">
          <span>
            <p>Publicado por ${postData.name}</p>
            <p>${postData.date}</p>
          </span>
          <div class="btns-post-container">
          <button class="btn-style like-post-btn"><i class="icons fas fa-star fa-1x">${postData.user_like.length}</i></button>
            <button class="btn-style"><i class="icons far fa-comment-dots fa-1x"></i></i></button>
            ${templateBtnEdit}
      </div>
    
    </div>
</section > `;

    feedContainer.insertAdjacentHTML('beforeend', template_feed);
    if (templateBtnEdit) {
      document.getElementById(`edit-${post.id}`).addEventListener("click", (event) => {
        editPost(event, post.id, postData.text)
      })
    }

    const btnDelete = document.querySelectorAll(".delete-post-btn")
    const catchBtn = (element) => element.addEventListener("click", function (event) {
      deletePost(event.currentTarget.parentElement.parentElement.parentElement.parentElement.id)
    })

    btnDelete.forEach(catchBtn)
    limitReal++

    const btnLike = document.querySelectorAll(".like-post-btn")
    const catchBtnLk = (element) => element.addEventListener("click", function (event) {
    const user = firebase.auth().currentUser.uid 
      saveLike(event.currentTarget.parentElement.parentElement.parentElement.id, user)
      event.preventDefault();

     })
      
    btnLike.forEach(catchBtnLk)
  

  }
  limitFix()
}

const blockPrivacyBox = (lock) => {
  const checkBox = document.getElementById("privacy-check")
  if (!checkBox) {
    return
  }
  if (lock) {
    checkBox.checked = true;
    checkBox.disabled = true;
  }
  else {
    checkBox.checked = false;
    checkBox.disabled = false;
  }
}

const postPhoto = (photoElement) => {
  let urlImg
  let namePhotoFile = photoElement.value.split("\\").pop();
  let photoFile = photoElement.files[0];
  urlImg = saveImage(namePhotoFile, photoFile)
  return urlImg
}

const privacyValidation = (postData) => {
  let user = firebase.auth().currentUser;
  return (postData.user_id === user.uid || !postData.privacy)
}

const changePhotoIcon = (event) => {
  let labelInputPhoto = event.currentTarget.labels[0]
  labelInputPhoto.className = "img-check"
  labelInputPhoto.innerHTML = '<i class="img-check icons fas fa-check-square fa-2x"></i>'
}

const rollBackPhotoIcon = (photoElement) => {
  let label = photoElement.labels[0]
  label.className = "btn-style"
  label.innerHTML = '<i class="icons fas fa-camera-retro fa-2x"></i>'
}

const editPost = (event, postId, currentText) => {
  let editedText
  let textArea = event.currentTarget.parentNode.parentNode.parentNode.children[1]
  textArea.querySelector("p").style.display = "none"
  let template_edit_area = `
  <form id="post-form-edit" class="form-style">
      <textarea id="post-text-edit" name="post" class="textarea-style" rows="5" cols="30">${currentText}</textarea>
      <div class="btn-edit">
      <button type="button" id="btn-cancel-edit" class="btn-style">Cancelar</button>
      <button type="button" id="btn-save-edit" class="btn-style">Salvar</button>
    </div>
    </form>
  `
  textArea.insertAdjacentHTML('beforeend', template_edit_area);

  document.getElementById("btn-cancel-edit").addEventListener("click", (event) => {
    let form = document.getElementById("post-form-edit")
    textArea.removeChild(form)
    textArea.children[1].style.display = "block"
  });

  document.getElementById("btn-save-edit").addEventListener("click", (event) => {
    editedText = document.getElementById("post-text-edit").value
    savePostEdit(postId, editedText)
  })
}