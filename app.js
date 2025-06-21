// Troca de seções
const menuItems = document.querySelectorAll('.sidebar li');
const secoes = document.querySelectorAll('.secao');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(i => i.classList.remove('ativo'));
    item.classList.add('ativo');

    secoes.forEach(sec => sec.classList.remove('ativa'));
    document.getElementById(item.dataset.section).classList.add('ativa');
  });
});

// Funil: Drag & Drop
const blocos = document.querySelectorAll('.bloco');
const funilArea = document.getElementById('funil-area');

blocos.forEach(bloco => {
  bloco.addEventListener('dragstart', e => {
    e.dataTransfer.setData("tipo", bloco.dataset.tipo);
  });
});

funilArea.addEventListener('dragover', e => e.preventDefault());

funilArea.addEventListener('drop', e => {
  e.preventDefault();
  const tipo = e.dataTransfer.getData("tipo");
  const item = document.createElement('div');
  item.className = 'funil-item';
  item.textContent = tipo === 'mensagem' ? '💬 Mensagem de Texto' : '⏱ Delay';
  funilArea.appendChild(item);
});

// Exportar funil
document.getElementById('exportar').addEventListener('click', () => {
  const funil = Array.from(document.querySelectorAll('.funil-item')).map(el => el.textContent);
  const blob = new Blob([JSON.stringify(funil)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'meu_funil.json';
  a.click();
});

// Importar funil
document.getElementById('importar').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const data = JSON.parse(evt.target.result);
    funilArea.innerHTML = '';
    data.forEach(texto => {
      const item = document.createElement('div');
      item.className = 'funil-item';
      item.textContent = texto;
      funilArea.appendChild(item);
    });
  };
  reader.readAsText(file);
});

// Suporte Automático
function respostaSuporte(tipo) {
  const area = document.getElementById('resposta-suporte');
  let resposta = '';

  switch (tipo) {
    case 'pagamento':
      resposta = 'Para efetuar o pagamento, acesse o menu Pagamento ou entre em contato pelo WhatsApp.';
      break;
    case 'teste':
      resposta = 'O teste grátis permite usar o sistema por 7 dias. Após isso, o pagamento será necessário.';
      break;
    case 'erro':
      resposta = 'Se já pagou e ainda não desbloqueou, envie o comprovativo para o suporte.';
      break;
    case 'humano':
      resposta = 'Clique aqui para falar com um humano no WhatsApp: <a href="https://wa.me/SEUNUMERO" target="_blank">Falar com Suporte</a>';
      break;
    case 'sugestao':
      resposta = 'Obrigado pela sugestão! Você pode enviar detalhes clicando aqui: <a href="https://wa.me/SEUNUMERO?text=Tenho+uma+sugest%C3%A3o+ou+reclama%C3%A7%C3%A3o" target="_blank">Enviar sugestão</a>';
      break;
    default:
      resposta = 'Desculpe, não entendi sua pergunta.';
  }

  area.innerHTML = resposta;
}

// Extensão - Simula download
function baixarExtensao() {
  window.open('https://example.com/mickychat-extensao.zip', '_blank');
}
