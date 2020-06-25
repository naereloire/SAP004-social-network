/* global document, window */

const verifyGenderCheck = (event) => {
  if (event.currentTarget.checked) {
    document.getElementById('btn-accept').disabled = false;
  } else {
    document.getElementById('btn-accept').disabled = true;
  }
};

const btnAccept = () => {
  window.location.href = '/#';
};

export default () => {
  const container = document.createElement('div');
  container.className = 'about-style';
  const template = `
      <div class="about-container">
      
      <section class="about-style-girly">
      <h1>[sejaBemVindaMana]</h1><br>
      <h2>[Sobre a girlyHub!]<h2><br>   
      <p>Nossa rede foi desenvolvida com base nos princípios de sororidade, acolhimento e respeito.</p><br>
     <p>Desejamos criar um ambiente seguro, para pessoas que se identifiquem como gênero feminino, onde possamos trocar
      conhecimento e apoio que envolvam temas diversos.</p><br>
      <p>Para que esse ambiente exista é importante seguirmos algumas regras.</p><br>
      <i class="fas fa-angle-double-down fa-2x"></i>
      </section><hr>
      
      <section class="about-style-tags">
      <h3>Uso dae TAGS de conteúdo:</h3><br>
      <ul class="ul-about">
      <li>Utilize a TAG correspondente ao conteúdo que deseja compartilhar.</li><br>
      <li>As TAGS não podem ser editadas</li><br>
      <li>Utilize os filtros para encontra posts de assuntos específicos.</li><br>
      </ul>
      </section><hr>

      <section class="about-style-rules">
      <h3>Não é tolerado:</h3><br>
      <ul class="ul-about">
      <li>Homofobia.</li><br>
      <li>Transfobia.</li><br>
      <li>Racismo.</li><br>
      <li>Atos Discriminatórios.</li><br>
      </ul>
      </section><hr>

      <section class="about-style-rules">
      <h3>Política da Rede:</h3><br>
      <ul class="ul-about">
      <li>Ao entrar nesse rede, declaro que sou parte da comunidade feminina e estou ciente
      das políticas e regras da girlyHub</li><br>
      </ul>
      <div class="container-confirm-gender">
      <input type="checkbox" id="confirm-gender" class="input-gender" name="confirm-gender">
      <label for="confirm-gender" class="label-gender"> Me indentifico como genêro feminino.</label><br>
      </div><br>
      <button id="btn-accept" class="btn-accept-style"  disabled="">Aceitar e Continuar </button>
     </section>
     
    </div>`;
  container.innerHTML = template;
  container.querySelector('#confirm-gender').addEventListener('change', verifyGenderCheck);
  container.querySelector('#btn-accept').addEventListener('click', btnAccept);
  return container;
};
