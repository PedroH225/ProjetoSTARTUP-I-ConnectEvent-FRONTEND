export function listarErrosUsuario (erros : any[]) {
  const nomeErroDiv = document.getElementById("nomeErro");
  const senhaErroDiv = document.getElementById("senhaErro");
  const emailErroDiv = document.getElementById("emailErro");
  const idadeErroDiv = document.getElementById("idadeErro");
  
  const divs = [nomeErroDiv, senhaErroDiv, emailErroDiv, idadeErroDiv];
  
  divs.forEach(div => {
      if (div) {
          div.innerHTML = ''; // Esvazia o conteúdo da div
      }
  });
  

  if (!Array.isArray(erros)) {
    alert("Erro desconhecido. Tente novamente mais tarde.")
    return;
  }
  
  
  erros.forEach(erro => {

    // Criar alerta
    const alert = document.createElement("ngb-alert")
  
    alert.classList.add('alert', 'alert-danger', "p-1", 'mb-0')
    

      if (erro.campo === "nomeErro") {
        const nomeErroDiv = document.getElementById("nomeErro");
        if (nomeErroDiv) {
          alert.textContent = erro.mensagem; // Adicionar mensagem de erro ao alerta
          nomeErroDiv.appendChild(alert);
        }
      }
      if (erro.campo === "emailErro") {
        const emailErroDiv = document.getElementById("emailErro");
        if (emailErroDiv) {
          alert.textContent = erro.mensagem; // Adicionar mensagem de erro ao alerta
          emailErroDiv.appendChild(alert);
        }
      }
      if (erro.campo === "senhaErro") {
        const senhaErroDiv = document.getElementById("senhaErro");
        if (senhaErroDiv) {
          alert.textContent = erro.mensagem; // Adicionar mensagem de erro ao alerta
          senhaErroDiv.appendChild(alert);
        }
      }
      if (erro.campo === "idadeErro") {
        const idadeErroDiv = document.getElementById("idadeErro");
        if (idadeErroDiv) {
          alert.textContent = erro.mensagem; // Adicionar mensagem de erro ao alerta
          idadeErroDiv.appendChild(alert);
        }
      }
    });
  }