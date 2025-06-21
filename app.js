function mostrarSecao(id) {
  document.querySelectorAll('.secao').forEach(sec => sec.classList.remove('ativa'));
  document.getElementById(id).classList.add('ativa');

  document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('ativo'));
  const item = Array.from(document.querySelectorAll('.sidebar li')).find(li =>
    li.textContent.includes(id.charAt(0).toUpperCase())
  );
  if (item) item.classList.add('ativo');
}
