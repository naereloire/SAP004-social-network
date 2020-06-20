export default () => {
    const container = document.createElement("div");
    container.className = "about-style"
    const template = `
      <div class="about-container">
      
      <section class="about-style-girly">
      <h1>[sejaBemVindaMuiée]</h1>
      <h2>[Sobre a girlyHub!]<h2>   
      <p>Nossa rede foi desenvolvida com base nos pricipios de sororidade,acolhimento e respeito.<br>
      Desejamos criar um ambiente seguro, para pessoas que se indentifiquem como gênero feminino, onde possamos trocar
      conhecimento e apoio que envolvam temas diversos.<br>
      Para que esse ambiente exista é importante seguirmos algumas regras, que estão logo abaixo.
      </p>
      </section>
      <hr>
      
      <section class="about-style-rules">
      <h3>Não é tolerado:</h3>
      <ul>
      <li>Homofobia.</li>
      <li>Transfobia.</li>
      <li>Racismo.</li>
      <li>Discriminação de nenhum tipo.</li>
      </ul>
      </section>
      <hr>
      
      <section class="about-style-tags">
      <h3>Utilização das TAGS de conteúdo:</h3>
      <ul>
      <li>Utilize a TAG correspondente ao conteúdo que deseja compartilhar.</li>
      <li>As TAGS não podem ser editadas</li>
      <li>Utilize os filtros para encontra posts de assuntos específicos.</li>
      </ul>
      </section>
      <hr>
     
    </div>`;
    container.innerHTML = template;
    return container
}