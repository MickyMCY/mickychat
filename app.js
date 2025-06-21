// Alterna seções ao clicar no menu
document.querySelectorAll('.sidebar li').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('ativo'));
    item.classList.add('ativo');

    const secaoId = item.getAttribute('data-section');
    document.querySelectorAll('.secao').forEach(sec => sec.classList.remove('ativa'));
    document.getElementById(secaoId).classList.add('ativa');
  });
});

// Criar novo funil visualmente
function criarNovoFunil() {
  const funilArea = document.getElementById('lista-funis');
  const novo = document.createElement('div');
  novo.className = 'funil-card';

  const nome = document.createElement('div');
  nome.className = 'funil-nome';
  nome.textContent = 'Funil Sem Nome';

  const status = document.createElement('div');
  status.className = 'funil-status';
  status.textContent = 'Status: Ativo';

  const switchBox = document.createElement('div');
  switchBox.className = 'switch-vertical active';
  const knob = document.createElement('div');
  knob.className = 'switch-knob';
  switchBox.appendChild(knob);

  switchBox.onclick = () => {
    switchBox.classList.toggle('active');
    status.textContent = 'Status: ' + (switchBox.classList.contains('active') ? 'Ativo' : 'Inativo');
  };

  const btnEditar = document.createElement('button');
  btnEditar.className = 'btn-editar';
  btnEditar.innerHTML = '➡️';
  btnEditar.onclick = () => alert('Abrir editor de funil real.');

  const btnMenu = document.createElement('button');
  btnMenu.className = 'btn-menu';
  btnMenu.textContent = '⋮';

  const acoes = document.createElement('div');
  acoes.className = 'funil-acoes';
  acoes.appendChild(btnEditar);
  acoes.appendChild(btnMenu);

  novo.appendChild(nome);
  novo.appendChild(status);
  novo.appendChild(switchBox);
  novo.appendChild(acoes);

  funilArea.appendChild(novo);

  atualizarContadorFunis();
}

function atualizarContadorFunis() {
  const count = document.querySelectorAll('#lista-funis .funil-card').length;
  document.getElementById('contador-funis').textContent = count;
}

// Simula respostas de suporte
function respostaSuporte(tipo) {
  const respostas = {
    pagamento: 'Para efectuar o pagamento, clique no botão de compra e siga as instruções.',
    teste: 'O teste grátis dura 7 dias e permite explorar as funções básicas.',
    erro: 'Se já pagou e não desbloqueou, envie comprovativo no WhatsApp.',
    humano: 'Nossa equipa irá atendê-lo em breve via WhatsApp.',
    sugestao: 'Obrigado! Envie sua sugestão no WhatsApp e será analisada.'
  };

  document.getElementById('resposta-suporte').textContent = respostas[tipo] || 'Opção desconhecida.';
}

// Simula geração de QR-Code
function gerarQRCode() {
  const msg = document.getElementById('mensagem-qrcode');
  const qrArea = document.getElementById('qrcode-area');

  msg.style.display = 'block';
  qrArea.style.display = 'none';

  setTimeout(() => {
    msg.style.display = 'none';
    qrArea.style.display = 'block';
  }, 3000);
}

// Simula conexão via número (pode ser expandido para API real)
function abrirConexaoNumero() {
  alert('Caixa de entrada para inserir número e conectar será exibida aqui futuramente.');
}

// Simula download da extensão
function baixarExtensao() {
  alert('Iniciando download da extensão...');
}
