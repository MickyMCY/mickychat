// Gerenciamento do menu lateral
const menuItems = document.querySelectorAll('.sidebar nav ul li');
const secoes = document.querySelectorAll('.secao');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove ativo de todos
    menuItems.forEach(i => i.classList.remove('ativo'));
    // Esconde todas seções
    secoes.forEach(s => s.classList.remove('ativa'));
    // Ativa o clicado e a seção correspondente
    item.classList.add('ativo');
    const idSecao = item.getAttribute('data-section');
    document.getElementById(idSecao).classList.add('ativa');
  });
});

// FUNIL BUILDER: Drag & Drop básico
const blocos = document.querySelectorAll('.bloco');
const funilArea = document.getElementById('funil-area');

let draggedBloco = null;

blocos.forEach(bloco => {
  bloco.addEventListener('dragstart', e => {
    draggedBloco = bloco;
    e.dataTransfer.effectAllowed = 'move';
  });
});

funilArea.addEventListener('dragover', e => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
});

funilArea.addEventListener('drop', e => {
  e.preventDefault();
  if (!draggedBloco) return;

  // Criar um novo bloco no funil
  const tipo = draggedBloco.getAttribute('data-tipo');
  const novoItem = document.createElement('div');
  novoItem.classList.add('funil-item');
  novoItem.setAttribute('draggable', 'true');

  if (tipo === 'texto') {
    novoItem.textContent = '💬 Mensagem de texto
