// Alterna seções
document.querySelectorAll('.sidebar li').forEach(item => {
  item.addEventListener('click', () => {
    const secao = item.getAttribute('data-section');
    document.querySelectorAll('.secao').forEach(s => s.classList.remove('ativa'));
    document.getElementById(secao).classList.add('ativa');

    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('ativo'));
    item.classList.add('ativo');
  });
});

// Abrir editor de funil
function abrirCriadorFunil() {
  document.querySelectorAll('.secao').forEach(s => s.classList.remove('ativa'));
  document.getElementById('editor-funil').classList.add('ativa');
}

// Entrar no editor via botão
function entrarNoEditor() {
  abrirCriadorFunil();
}

// Suporte automático
function respostaSuporte(tipo) {
  const respostas = {
    pagamento: "Você pode efetuar o pagamento via Mpesa ou Emola. Confirme com nosso suporte.",
    teste: "O teste grátis dura 7 dias e dá acesso a todas funcionalidades básicas.",
    erro: "Verifique se enviou o comprovativo correto. Caso o problema continue, fale com suporte.",
    humano: "Clique no balão do WhatsApp no canto inferior esquerdo para falar com um humano.",
    sugestao: "Envie sua sugestão ou reclamação diretamente no nosso WhatsApp, ficaremos felizes em ouvir!"
  };
  document.getElementById('resposta-suporte').innerText = respostas[tipo] || "Erro inesperado.";
}

// Download extensão
function baixarExtensao() {
  const link = document.createElement('a');
  link.href = 'mchat-helper.zip';
  link.download = 'mchat-helper.zip';
  link.click();
}
