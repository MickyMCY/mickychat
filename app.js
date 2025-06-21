// Navegação do menu lateral
document.querySelectorAll('.sidebar nav ul li').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar nav ul li').forEach(i => i.classList.remove('ativo'));
    item.classList.add('ativo');

    const sectionId = item.getAttribute('data-section');
    document.querySelectorAll('main .secao').forEach(sec => {
      sec.classList.toggle('ativa', sec.id === sectionId);
    });
  });
});

// Elementos conexão
const statusConexao = document.getElementById('statusConexao');
const painelQR = document.getElementById('painelQR');
const painelNumero = document.getElementById('painelNumero');
const btnAbrirQr = document.getElementById('btnAbrirQr');
const btnAbrirNumero = document.getElementById('btnAbrirNumero');
const btnDesconectar = document.getElementById('btnDesconectar');
const mensagemProcesso = document.getElementById('mensagemProcesso');
const qrcodeContainer = document.getElementById('qrcodeContainer');
const mensagemNumero = document.getElementById('mensagemNumero');

let conectado = false;

function atualizarInterface() {
  if (conectado) {
    statusConexao.textContent = 'Conectado';
    statusConexao.classList.remove('desconectado');
    statusConexao.classList.add('conectado');

    btnAbrirQr.style.display = 'none';
    btnAbrirNumero.style.display = 'none';
    btnDesconectar.classList.remove('oculto');

    painelQR.classList.add('oculto');
    painelNumero.classList.add('oculto');
    mensagemProcesso.textContent = '';
    mensagemNumero.textContent = '';
    qrcodeContainer.innerHTML = '';
  } else {
    statusConexao.textContent = 'Desconectado';
    statusConexao.classList.remove('conectado');
    statusConexao.classList.add('desconectado');

    btnAbrirQr.style.display = 'inline-block';
    btnAbrirNumero.style.display = 'inline-block';
    btnDesconectar.classList.add('oculto');

    painelQR.classList.add('oculto');
    painelNumero.classList.add('oculto');
    mensagemProcesso.textContent = '';
    mensagemNumero.textContent = '';
    qrcodeContainer.innerHTML = '';
  }
}

function mostrarPainelQR() {
  painelQR.classList.remove('oculto');
  painelNumero.classList.add('oculto');
  mensagemProcesso.textContent = 'Preparando a geração do QR Code...';
  qrcodeContainer.innerHTML = '';

  // Simulação do QR Code
  setTimeout(() => {
    qrcodeContainer.innerHTML = '<div style="width:240px;height:240px;background: linear-gradient(45deg, #00c2ff, #006699); border-radius:16px; display:flex; align-items:center; justify-content:center; color:#003344; font-weight:700; font-size:1.1rem;">QR Code Aqui</div>';
    mensagemProcesso.textContent = 'QR Code gerado! Escaneie com o WhatsApp.';
  }, 1500);

  // Simula conexão após 12s
  setTimeout(() => {
    conectado = true;
    atualizarInterface();
    mensagemProcesso.textContent = 'Conectado com sucesso.';
  }, 12000);
}

function mostrarPainelNumero() {
  painelNumero.classList.remove('oculto');
  painelQR.classList.add('oculto');
  mensagemNumero.textContent = '';
  mensagemProcesso.textContent = '';
  qrcodeContainer.innerHTML = '';
}

function conectarViaNumero() {
  const pais = document.getElementById('paisSelect').value;
  const numero = document.getElementById('numeroInput').value.trim();

  if (!numero.match(/^\d{7,15}$/)) {
    mensagemNumero.textContent = 'Número inválido. Digite apenas dígitos entre 7 e 15 caracteres.';
    mensagemNumero.style.color = '#e55353';
    return;
  }

  mensagemNumero.style.color = '#76c776';
  mensagemNumero.textContent = `Tentando conectar com ${pais} ${numero}... Aguarde.`;

  // Simula conexão após 5 segundos
  setTimeout(() => {
    conectado = true;
    atualizarInterface();
    mensagemNumero.textContent = `Conectado via número ${pais} ${numero}.`;
  }, 5000);
}

function desconectar() {
  conectado = false;
  atualizarInterface();
}

// Inicializa interface
window.onload = () => {
  atualizarInterface();
};

// Função de suporte (exemplo simples)
function respostaSuporte(tipo) {
  const respostas = {
    pagamento: 'Para efetuar o pagamento, utilize o método X ou Y conforme instruções enviadas.',
    teste: 'O teste grátis funciona por 7 dias e inclui recursos limitados.',
    erro: 'Se o pagamento não desbloqueou, envie o comprovante para nosso suporte via WhatsApp.',
    humano: 'Um atendente humano entrará em contato em breve.',
    sugestao: 'Obrigado pela sugestão! Estamos sempre melhorando nosso serviço.'
  };
  const areaResposta = document.getElementById('resposta-suporte');
  areaResposta.textContent = respostas[tipo] || 'Opção não reconhecida.';
}
