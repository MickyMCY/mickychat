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

// Funil - DRAG & DROP
const blocos = document.querySelectorAll('.bloco');
const funilArea = document.getElementById('funil-area');

blocos.forEach(bloco => {
  bloco.addEventListener('dragstart', e => {
    e.dataTransfer.setData("tipo", bloco.dataset.tipo);
  });
});

funilArea.addEventListener('dragover', e => e.preventDefault());

let nodeIdCounter = 1;
let nodes = [];

funilArea.addEventListener('drop', e => {
  e.preventDefault();
  const tipo = e.dataTransfer.getData("tipo");

  const pos = {
    x: e.offsetX || 100,
    y: e.offsetY || 100
  };

  const novoNode = {
    id: Date.now().toString(),
    type: tipo === 'mensagem' ? 'messageNode' : 'delayNode',
    position: pos,
    width: 384,
    height: tipo === 'mensagem' ? 200 : 150,
    data: {
      label: tipo === 'mensagem' ? 'Mensagem de Texto' : 'Delay'
    }
  };

  nodes.push(novoNode);
  renderNode(novoNode);
});

function renderNode(node) {
  const item = document.createElement('div');
  item.className = 'funil-item';
  item.style.position = 'absolute';
  item.style.left = `${node.position.x}px`;
  item.style.top = `${node.position.y}px`;
  item.textContent = node.data.label;
  funilArea.appendChild(item);
}

// EXPORTAÇÃO AVANÇADA
document.getElementById('exportar').addEventListener('click', () => {
  const estrutura = {
    data: {
      nodes: nodes
    }
  };
  const blob = new Blob([JSON.stringify(estrutura, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'funil_mickychat.json';
  a.click();
});

// IMPORTAÇÃO AVANÇADA
document.getElementById('importar').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const json = JSON.parse(evt.target.result);
    const dados = json.data?.nodes || [];

    nodes = []; // limpa o array
    funilArea.innerHTML = ''; // limpa a tela

    dados.forEach(node => {
      nodes.push(node);
      renderNode(node);
    });
  };
  reader.readAsText(file);
});

// SUPORTE AUTOMÁTICO
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
      resposta = 'Obrigado pela sugestão! Envie detalhes clicando aqui: <a href="https://wa.me/SEUNUMERO?text=Tenho+uma+sugest%C3%A3o+ou+reclama%C3%A7%C3%A3o" target="_blank">Enviar sugestão</a>';
      break;
    default:
      resposta = 'Desculpe, não entendi sua pergunta.';
  }

  area.innerHTML = resposta;
}

// EXTENSÃO - Simula download
function baixarExtensao() {
  window.open('https://example.com/mickychat-extensao.zip', '_blank');
}
