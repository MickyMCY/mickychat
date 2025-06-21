// Gerenciar navegação entre seções
document.querySelectorAll('.sidebar nav ul li').forEach(item => {
  item.addEventListener('click', () => {
    // Remove 'ativo' de todos
    document.querySelectorAll('.sidebar nav ul li').forEach(i => i.classList.remove('ativo'));
    item.classList.add('ativo');

    // Mostrar a seção correta
    const secao = item.getAttribute('data-section');
    document.querySelectorAll('main.conteudo .secao').forEach(sec => {
      if (sec.id === secao) {
        sec.style.display = 'block';
      } else {
        sec.style.display = 'none';
      }
    });
  });
});

// Função do interruptor do funil
function toggleStatus(el) {
  const texto = el.closest('.funil-status').querySelector('.status-text');
  texto.textContent = el.checked ? 'Ativo' : 'Inativo';
}

// Função para abrir o editor do funil (aqui só alert, depois pode expandir)
function entrarNoEditor() {
  // Esconde seções e mostra editor
  document.querySelectorAll('main.conteudo .secao').forEach(sec => sec.style.display = 'none');
  document.getElementById('editor-funil').style.display = 'flex';
}

// Função para abrir o criador de funil (alerta por enquanto)
function abrirCriadorFunil() {
  alert('Aqui você abriria o criador de funil.');
}

// Funções do suporte
const respostasSuporte = {
  pagamento: 'Para efetuar o pagamento, você pode usar Mpesa ou Emola. Após o pagamento, envie uma mensagem no WhatsApp para confirmar.',
  teste: 'O teste grátis dura 7 dias. Após isso, você deverá fazer o pagamento para continuar usando o sistema.',
  erro: 'Se você já efetuou o pagamento e não foi desbloqueado, por favor envie uma mensagem ao suporte para verificarmos.',
  humano: 'Um atendente humano entrará em contato com você o mais breve possível.',
  sugestao: 'Agradecemos sua sugestão ou reclamação. Enviaremos para a equipe responsável.'
};

function respostaSuporte(chave) {
  const divResposta = document.getElementById('resposta-suporte');
  divResposta.textContent = respostasSuporte[chave] || 'Resposta não encontrada.';
}

// Função para baixar extensão (exemplo)
function baixarExtensao() {
  // Link fictício - substitua pelo link real do zip
  const link = document.createElement('a');
  link.href = 'https://seusite.com/mchat-helper.zip';
  link.download = 'mchat-helper.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Botão sair recarrega página para "deslogar"
document.querySelector('section#sair button').addEventListener('click', () => {
  window.location.reload();
});

// Inicializa exibindo só a primeira seção
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('main.conteudo .secao').forEach((sec, i) => {
    sec.style.display = i === 0 ? 'block' : 'none';
  });
});
