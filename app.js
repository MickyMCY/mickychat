document.querySelectorAll('.sidebar nav ul li').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar nav ul li').forEach(li => li.classList.remove('ativo'));
    item.classList.add('ativo');

    const secaoId = item.getAttribute('data-section');
    document.querySelectorAll('.secao').forEach(sec => sec.classList.remove('ativa'));
    document.getElementById(secaoId).classList.add('ativa');
  });
});

function gerarQRCode() {
  const mensagem = document.getElementById('mensagem-qrcode');
  mensagem.innerHTML = "🔄 Gerando código QR, aguarde até 1 minuto. Se não aparecer, recarregue a página.";
  setTimeout(() => {
    mensagem.innerHTML = "✅ QR-Code pronto! Agora conecte seu WhatsApp.";
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
  const codigo = document.getElementById("codigo-pais");
  codigo.textContent = select.value;
}

function conectarPorNumero() {
  const numero = document.getElementById("numero-wpp").value.trim();
  const codigo = document.getElementById("pais-select").value;
  const status = document.getElementById("status-indicador");
  const mensagem = document.getElementById('mensagem-qrcode');

  if (!numero) {
    alert("Por favor, digite seu número de WhatsApp.");
    return;
  }

  status.classList.remove("desconectado");
  status.classList.add("conectado");
  status.textContent = "Conectado";

  mensagem.innerHTML = `<span style="color: green;">✅ Conectado via número ${codigo}${numero}</span>`;
}

function respostaSuporte(tipo) {
  const respostas = {
    pagamento: "Você pode efectuar o pagamento via Mpesa, Emola ou conta bancária.",
    teste: "Oferecemos 7 dias de teste grátis para novos usuários.",
    erro: "Se fez o pagamento e não desbloqueou, envie o comprovativo pelo WhatsApp.",
    humano: "Um de nossos atendentes entrará em contacto com você.",
    sugestao: "Agradecemos sua sugestão. Estamos sempre melhorando!"
  };
  document.getElementById('resposta-suporte').innerText = respostas[tipo] || '';
}

function baixarExtensao() {
  window.open('extensao.zip', '_blank');
}
