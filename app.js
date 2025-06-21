// Navegação do menu
document.querySelectorAll('.sidebar li').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('ativo'));
    item.classList.add('ativo');
    const secaoId = item.getAttribute('data-section');
    document.querySelectorAll('.secao').forEach(sec => sec.classList.remove('ativa'));
    document.getElementById(secaoId).classList.add('ativa');
  });
});

// Funções para a seção Conexão
function gerarQRCode() {
  const mensagem = document.getElementById('mensagem-qrcode');
  const qrcodeArea = document.getElementById('qrcode-area');
  mensagem.style.display = 'block';
  qrcodeArea.style.display = 'none';
  mensagem.innerHTML = "🔄 Gerando QR-Code... pode levar até 1 minuto.";
  
  setTimeout(() => {
    mensagem.innerHTML = "✅ QR-Code gerado! Agora conecte seu WhatsApp.";
    qrcodeArea.style.display = 'block';
    // Aqui você pode definir a imagem real do QR-Code
    // Exemplo: qrcodeArea.innerHTML = '<img src="qr-code-real.png" alt="QR-Code">';
    const status = document.getElementById("status-indicador");
    status.classList.remove("desconectado");
    status.classList.add("conectado");
    status.textContent = "Conectado";
  }, 3000);
}

function mostrarNumero() {
  const box = document.getElementById("conectar-por-numero");
  box.style.display = "block";
}

function atualizarCodigo() {
  const select = document.getElementById("pais-select");
  const codigoSpan = document.getElementById("codigo-pais");
  codigoSpan.textContent = select.value;
}

function conectarPorNumero() {
  const numero = document.getElementById("numero-wpp").value.trim();
  const codigo = document.getElementById("pais-select").value;
  const status = document.getElementById("status-indicador");
  const mensagem = document.getElementById("mensagem-qrcode");
  
  if (!numero) {
    alert("Por favor, digite seu número de WhatsApp.");
    return;
  }
  
  status.classList.remove("desconectado");
  status.classList.add("conectado");
  status.textContent = "Conectado";
  mensagem.style.display = "block";
  mensagem.innerHTML = `<span style="color:green;">✅ Conectado via número ${codigo}${numero}</span>`;
  
  document.getElementById("conectar-por-numero").style.display = "none";
}

// Suporte automático
function respostaSuporte(tipo) {
  const respostas = {
    pagamento: "Você pode efectuar o pagamento via Mpesa, Emola ou conta bancária.",
    teste: "Oferecemos 7 dias de teste grátis para novos usuários.",
    erro: "Se efetuou o pagamento e não foi desbloqueado, envie o comprovativo pelo WhatsApp.",
    humano: "Um de nossos atendentes entrará em contato com você em breve.",
    sugestao: "Agradecemos sua sugestão. Estamos sempre melhorando!"
  };
  document.getElementById("resposta-suporte").innerText = respostas[tipo] || "";
}

// Extensão
function baixarExtensao() {
  window.open('extensao.zip', '_blank');
}

// Função para criar e inserir um novo funil (simples, armazenado localmente)
function criarNovoFunil() {
  const nome = prompt("Digite o nome do novo funil:") || "Funil sem título";
  const funil = { nome, ativo: true };
  let funis = JSON.parse(localStorage.getItem("funis")) || [];
  funis.push(funil);
  localStorage.setItem("funis", JSON.stringify(funis));
  carregarFunis();
}

function carregarFunis() {
  const lista = document.getElementById("lista-funis");
  lista.innerHTML = "";
  const funis = JSON.parse(localStorage.getItem("funis")) || [];
  document.getElementById("contador-funis").textContent = funis.length;
  
  funis.forEach((funil, index) => {
    const card = document.createElement("div");
    card.className = "funil-card";
    
    // Cabeçalho do funil
    const nome = document.createElement("div");
    nome.className = "funil-nome";
    nome.textContent = funil.nome;
    
    // Status do funil
    const status = document.createElement("div");
    status.className = "funil-status";
    status.textContent = "Status: " + (funil.ativo ? "Ativo" : "Inativo");
    
    // Interruptor (simples)
    const interruptor = document.createElement("div");
    interruptor.className = "switch-vertical" + (funil.ativo ? " active" : "");
    const knob = document.createElement("div");
    knob.className = "switch-knob";
    interruptor.appendChild(knob);
    interruptor.onclick = () => {
      funil.ativo = !funil.ativo;
      localStorage.setItem("funis", JSON.stringify(funis));
      carregarFunis();
    };
    
    // Botões de ação: Editar e Menu
    const acoes = document.createElement("div");
    acoes.className = "funil-acoes";
    
    const btnEditar = document.createElement("button");
    btnEditar.className = "btn-editar";
    btnEditar.innerHTML = "➡️";
    btnEditar.onclick = () => editarFunil(index);
    
    const btnMenu = document.createElement("button");
    btnMenu.className = "btn-menu";
    btnMenu.innerText = "⋮";
    btnMenu.onclick = () => menuFunil(index);
    
    acoes.appendChild(btnEditar);
    acoes.appendChild(btnMenu);
    
    card.appendChild(nome);
    card.appendChild(status);
    card.appendChild(interruptor);
    card.appendChild(acoes);
    
    lista.appendChild(card);
  });
}

function editarFunil(index) {
  alert("Editar funil #" + (index + 1) + " (a tela de edição será implementada em breve).");
}

function menuFunil(index) {
  alert("Menu de opções para o funil #" + (index + 1) + " (excluir, duplicar, etc.).");
}

// Carrega os funis salvos ao iniciar
document.addEventListener("DOMContentLoaded", () => {
  carregarFunis();
});
