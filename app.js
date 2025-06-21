// app.js - Script principal do painel MickyChat

// Controla a navegação entre seções do menu lateral
document.querySelectorAll('.sidebar nav ul li').forEach(item => {
  item.addEventListener('click', () => {
    // Remove classe ativa do menu e das seções
    document.querySelectorAll('.sidebar nav ul li').forEach(i => i.classList.remove('ativo'));
    document.querySelectorAll('main.conteudo .secao').forEach(sec => sec.classList.remove('ativa'));

    // Adiciona classe ativa no item clicado
    item.classList.add('ativo');

    // Mostra a seção correspondente
    const secao = document.getElementById(item.dataset.section);
    if (secao) secao.classList.add('ativa');
  });
});

// Simula a geração do QR Code para conectar o WhatsApp
function gerarQRCode() {
  const mensagem = document.getElementById('mensagem-qrcode');
  mensagem.innerHTML = "🔄 A gerar o código QR, aguarde até 1 minuto. Se não aparecer, recarregue a página.";

  // Simula atraso para gerar QR
  setTimeout(() => {
    mensagem.innerHTML = "✅ Código QR gerado! Agora conecte seu WhatsApp.";
    const status = document.getElementById("status-indicador");
    status.classList.remove("desconectado");
    status.classList.add("conectado");
    status.textContent = "Conectado";
  }, 3000);
}

// Exibe a caixa para conexão via número
function mostrarNumero() {
  const box = document.getElementById("conectar-por-numero");
  box.style.display = "block";
}

// Atualiza o código do país selecionado no dropdown com emoji e código
function atualizarCodigo() {
  const select = document.getElementById("pais-select");
  const codigo = document.getElementById("codigo-pais");
  codigo.textContent = select.value;
}

// Simula conexão via número de telefone
function conectarPorNumero() {
  const numero = document.getElementById("numero-wpp").value.trim();
  const codigo = document.getElementById("pais-select").value;
  const status = document.getElementById("status-indicador");
  const mensagem = document.getElementById('mensagem-qrcode');

  if (!numero) {
    alert("Por favor, digite seu número de WhatsApp.");
    return;
  }

  // Atualiza status e mensagem
  status.classList.remove("desconectado");
  status.classList.add("conectado");
  status.textContent = "Conectado";

  mensagem.innerHTML = `<span style="color: green;">✅ Conectado via número ${codigo}${numero}</span>`;

  // Opcional: esconder a caixa de número após conexão
  document.getElementById("conectar-por-numero").style.display = "none";
}

// Respostas automáticas para dúvidas no suporte
function respostaSuporte(tipo) {
  const respostas = {
    pagamento: "Você pode efectuar o pagamento via Mpesa, Emola ou conta bancária.",
    teste: "Oferecemos 7 dias de teste grátis para novos usuários.",
    erro: "Se fez o pagamento e não desbloqueou, envie o comprovativo pelo WhatsApp.",
    humano: "Um de nossos atendentes entrará em contacto com você em breve.",
    sugestao: "Agradecemos sua sugestão. Estamos sempre melhorando!"
  };
  document.getElementById('resposta-suporte').innerText = respostas[tipo] || '';
}

// Simula o download da extensão (apenas link estático)
function baixarExtensao() {
  window.open('extensao.zip', '_blank');
}

// Opcional: função para desconectar WhatsApp (pode ser expandida para logout real)
function desconectar() {
  const status = document.getElementById("status-indicador");
  const mensagem = document.getElementById('mensagem-qrcode');

  status.classList.remove("conectado");
  status.classList.add("desconectado");
  status.textContent = "Desconectado";

  mensagem.innerHTML = "Você desconectou sua conta WhatsApp.";
}
