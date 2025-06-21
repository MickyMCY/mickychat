// Troca de seções
const menuItems = document.querySelectorAll('.sidebar li');
const secoes = document.querySelectorAll('.secao');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(i => i.classList.remove('ativo'));
    item.classList.add('ativo');

    secoes.forEach(sec => sec.classList.remove('ativa'));
    document.getElementById(item.dataset.section).classList.add('ativa');
  });
});

// Drag & Drop Funil
const blocos = document.querySelectorAll('.bloco');
const funilArea = document.getElementById('funil-area');

blocos.forEach(bloco => {
  bloco.addEventListener('dragstart', e => {
    e.dataTransfer.setData("tipo", bloco.dataset.tipo);
  });
});

funilArea.addEventListener('dragover', e => e.preventDefault());

funilArea.addEventListener('drop', e => {
  e.preventDefault();
  const tipo = e.dataTransfer.getData("tipo");
  const item = document.createElement('div');
  item.className = 'funil-item';
  item.textContent = tipo === 'mensagem' ? '💬 Mensagem de Texto' : '⏱ Delay';
  funilArea.appendChild(item);
});

// Exportar funil
document.getElementById('exportar').addEventListener('click', () => {
  const funil = Array.from(document.querySelectorAll('.funil-item')).map(el => el.textContent);
  const blob = new Blob([JSON.stringify(funil)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'meu_funil.json';
  a.click();
});

// Importar funil
document.getElementById('importar').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const data = JSON.parse(evt.target.result);
    funilArea.innerHTML = '';
    data.forEach(texto => {
      const item = document.createElement('div');
      item.className = 'funil-item';
      item.textContent = texto;
      funilArea.appendChild(item);
    });
  };
  reader.readAsText(file);
});
