// Navegação entre seções
document.querySelectorAll('.sidebar nav ul li').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar nav ul li').forEach(i => i.classList.remove('ativo'));
    item.classList.add('ativo');

    const secao = item.getAttribute('data-section');
    document.querySelectorAll('main.conteudo .secao').forEach(sec => {
      sec.classList.remove('ativa');
      if (sec.id === secao) sec.classList.add('ativa');
    });
  });
});

// Suporte automático
const respostasSuporte = {
  pagamento: 'Você pode pagar via Mpesa ou Emola. Após o pagamento, envie o comprovativo pelo WhatsApp.',
  teste: 'O teste grátis dura 7 dias. Após isso, o sistema será bloqueado até o pagamento.',
  erro: 'Se você já pagou e o sistema não liberou, entre em contato com o suporte.',
  humano: 'Um atendente humano será acionado para te ajudar.',
  sugestao: 'Sua sugestão ou reclamação foi recebida. Obrigado!'
};

function respostaSuporte(chave) {
  const div = document.getElementById('resposta-suporte');
  div.textContent = respostasSuporte[chave] || 'Resposta não disponível.';
}

// Extensão
function baixarExtensao() {
  const link = document.createElement('a');
  link.href = 'https://seusite.com/mchat-helper.zip';
  link.download = 'mchat-helper.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Criar Funil (alert temporário)
function abrirCriadorFunil() {
  alert('Criador de funil será aberto aqui em breve.');
}
