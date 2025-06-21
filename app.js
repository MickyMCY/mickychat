// Controle de navegação das seções
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
const mensagemProcesso = document.getElementById('mensagemProcesso');
const qrcodeContainer = document.getElementById('qrcodeContainer');
const mensagemNumero = document.getElementById('mensagemNumero');

let conectado = false; // Estado simulado

// Mostrar painel QR Code e ocultar número
function mostrarPainelQR() {
  painelQR.classList.remove('oculto');
  painelNumero.classList.add('oculto');
  mensagemProcesso.textContent = 'Preparando conexão, aguarde...';
  qrcodeContainer.innerHTML = ''; // limpa QR anterior
  mensagemNumero.textContent = '';
  gerarQRCodeSimulado();
}

// Mostrar painel número e ocultar QR Code
function mostrarPainelNumero() {
  painelNumero.classList.remove('oculto');
  painelQR.classList.add('oculto');
  mensagemNumero.textContent = '';
  qrcodeContainer.innerHTML = '';
  mensagemProcesso.textContent = '';
}

// Simula geração do QR Code e conexão
function gerarQRCodeSimulado() {
  // Simulação: após 1.5 segundos "QR code" aparece
  setTimeout(() => {
    qrcodeContainer.innerHTML = '<div style="width: 240px; height: 240px; background: linear-gradient(45deg, #00c2ff, #006699); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #003344; font-weight: 700; font-size: 1.1rem;">QR Code Aqui</div>';
    mensagemProcesso.textContent = 'QR Code gerado. Escaneie com seu WhatsApp.';
  }, 1500);

  // Simula conexão após 12 segundos
  setTimeout(() => {
    conectado = true;
    statusConexao.classList.remove('desconectado');
    statusConexao.classList.add('conectado');
    statusConexao.textContent = 'Conectado';
    mensagemProcesso.textContent = 'Conexão estabelecida com sucesso.';
  }, 12000);
}

// Conectar via número
function conectarViaNumero() {
  const pais = document.getElementById('paisSelect').value;
  const numero = document.getElementById('numeroInput').value.trim();

  if (!numero.match(/^\d{7,15}$/)) {
    mensagemNumero.textContent = 'Número inválido. Digite somente dígitos entre 7 e 15 caracteres.';
    mensagemNumero.style.color = '#e55353';
    return;
  }

  mensagemNumero.style.color = '#76c776';
  mensagemNumero.textContent = `Tentando conectar com ${pais} ${numero}... Aguarde.`;

  // Simula conexão após 5 segundos
  setTimeout(() => {
    conectado = true;
    statusConexao.classList.remove('desconectado');
    statusConexao.classList.add('conectado');
    statusConexao.textContent = 'Conectado';
    mensagemNumero.textContent = `Conexão realizada com número ${pais} ${numero}.`;
    painelNumero.classList.add('oculto');
  }, 5000);
}

// Para suporte simples - exemplo
function respostaSuporte(tipo) {
  const container = document.getElementById('resposta-suporte');
  let resposta = '';
  switch(tipo) {
    case 'pagamento':
      resposta = 'Para efectuar o pagamento, siga as instruções no seu painel de pagamento.';
      break;
    case 'teste':
      resposta = 'Você pode testar o sistema gratuitamente por 7 dias.';
      break;
    case 'erro':
      resposta = 'Se o pagamento foi realizado e o acesso não foi liberado, entre em contato conosco via WhatsApp.';
      break;
    case 'humano':
      resposta = 'Estamos aqui para ajudar! Um atendente humano entrará em contato em breve.';
      break;
    case 'sugestao':
      resposta = 'Obrigado pela sua sugestão! Iremos analisar e melhorar o sistema.';
      break;
    default:
      resposta = 'Selecione uma opção para receber ajuda.';
  }
  container.textContent = resposta;
}

// Função placeholder extensão
function baixarExtensao() {
  alert('Função para baixar extensão ainda não implementada.');
}
