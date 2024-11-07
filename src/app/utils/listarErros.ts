export function listarErrosUsuario(erros: any[]) {
  const nomeErroDiv = document.getElementById('nomeErro');
  const senhaErroDiv = document.getElementById('senhaErro');
  const emailErroDiv = document.getElementById('emailErro');
  const idadeErroDiv = document.getElementById('idadeErro');

  const divs = [nomeErroDiv, senhaErroDiv, emailErroDiv, idadeErroDiv];

  divs.forEach((div) => {
    if (div) {
      div.innerHTML = ''; // Esvazia o conteúdo da div
    }
  });

  if (!Array.isArray(erros)) {
    alert('Erro desconhecido. Tente novamente mais tarde.');
    return;
  }

  erros.forEach((erro) => {
    // Criar alerta
    const alert = document.createElement('ngb-alert');

    alert.classList.add('alert', 'alert-danger', 'p-1', 'mb-0');

    if (erro.campo === 'nomeErro') {
      const nomeErroDiv = document.getElementById('nomeErro');
      if (nomeErroDiv) {
        alert.textContent = erro.mensagem; // Adicionar mensagem de erro ao alerta
        nomeErroDiv.appendChild(alert);
      }
    }
    if (erro.campo === 'emailErro') {
      const emailErroDiv = document.getElementById('emailErro');
      if (emailErroDiv) {
        alert.textContent = erro.mensagem; // Adicionar mensagem de erro ao alerta
        emailErroDiv.appendChild(alert);
      }
    }
    if (erro.campo === 'senhaErro') {
      const senhaErroDiv = document.getElementById('senhaErro');
      if (senhaErroDiv) {
        alert.textContent = erro.mensagem; // Adicionar mensagem de erro ao alerta
        senhaErroDiv.appendChild(alert);
      }
    }

    if (erro.campo === 'idadeErro') {
      const idadeErroDiv = document.getElementById('idadeErro');
      if (idadeErroDiv) {
        alert.textContent = erro.mensagem; // Adicionar mensagem de erro ao alerta
        idadeErroDiv.appendChild(alert);
      }
    }
  });
}

export function listarErrosEvento(erros: any[]) {
  const tituloErroDiv = document.getElementById('tituloErro');
  const descricaoErroDiv = document.getElementById('descricaoErro');
  const telefoneErroDiv = document.getElementById('telefoneErro');
  const linkErroDiv = document.getElementById('linkErro');
  const localErroDiv = document.getElementById('localErro');
  const bairroErroDiv = document.getElementById('bairroErro');
  const numeroErroDiv = document.getElementById('numeroErro');

  const divs = [
    tituloErroDiv,
    descricaoErroDiv,
    telefoneErroDiv,
    linkErroDiv,
    localErroDiv,
    bairroErroDiv,
    numeroErroDiv,
  ];

  divs.forEach((div) => {
    if (div) {
      div.innerHTML = ''; // Esvazia o conteúdo da div
    }
  });

  if (!Array.isArray(erros)) {
    alert('Erro desconhecido. Tente novamente mais tarde.');
    return;
  }

  erros.forEach((erro) => {
    const alert = document.createElement('ngb-alert');
    alert.classList.add('alert', 'alert-danger', 'p-1', 'mb-0');
    alert.textContent = erro.mensagem;

    if (erro.campo === 'tituloErro') {
      if (tituloErroDiv) {
        tituloErroDiv.appendChild(alert);
      }
    } else if (erro.campo === 'descricaoErro') {
      if (descricaoErroDiv) {
        descricaoErroDiv.appendChild(alert);
      }
    } else if (erro.campo === 'telefoneErro') {
      if (telefoneErroDiv) {
        telefoneErroDiv.appendChild(alert);
      }
    } else if (erro.campo === 'linkErro') {
      if (linkErroDiv) {
        linkErroDiv.appendChild(alert);
      }
    } else if (erro.campo === 'localErro') {
      if (localErroDiv) {
        localErroDiv.appendChild(alert);
      }
    } else if (erro.campo === 'bairroErro') {
      if (bairroErroDiv) {
        bairroErroDiv.appendChild(alert);
      }
    } else if (erro.campo === 'numeroErro') {
      if (numeroErroDiv) {
        numeroErroDiv.appendChild(alert);
      }
    }
  });
}

export function listarErrosAmizade(erro : any) {
  const amizadeErroDiv = document.querySelector('#amizadeErro');

  if (amizadeErroDiv) {
    // Limpa alertas anteriores
    amizadeErroDiv.innerHTML = '';

    // Cria um novo alerta
    const alert = document.createElement('ngb-alert'); // Use um div padrão
    alert.classList.add('alert', 'alert-danger', 'p-1', 'mb-0');
    alert.textContent = erro.error.mensagem;
    

    if (erro.error.tipo === "amizadeErro") {
        amizadeErroDiv.appendChild(alert);
        
    } else {
      const defaultAlert = document.createElement('div');
      defaultAlert.classList.add('alert', 'alert-danger', 'p-1', 'mb-0');
      defaultAlert.textContent = "Erro desconhecido";
      amizadeErroDiv.appendChild(defaultAlert);
    }
  } 
}