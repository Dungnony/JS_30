  const answerCells = document.querySelectorAll('.cell.empty');
  const draggableFruits = document.querySelectorAll('.answer-cell img');
  let draggedFruit = null;

  draggableFruits.forEach(img => {
    img.addEventListener('dragstart', e => {
      draggedFruit = e.target;
    });
  });

  answerCells.forEach(cell => {
    cell.addEventListener('dragover', e => {
      e.preventDefault(); // cho phép thả
    });

    cell.addEventListener('drop', e => {
      e.preventDefault();
      if (!draggedFruit) return;

      const answerFruit = cell.getAttribute('data-answer');
      const draggedFruitType = draggedFruit.getAttribute('data-fruit');

      if (answerFruit === draggedFruitType) {
        cell.innerHTML = '';
        const img = document.createElement('img');
        img.src = draggedFruit.src;
        img.alt = draggedFruit.alt;
        img.draggable = false;
        img.style.width = '85%';
        img.style.height = '85%';
        img.style.objectFit = 'cover';
        img.style.boxShadow = '0 8px 8px rgba(0, 0, 0, 0.2)';
        cell.appendChild(img);
        alert('Bạn làm đúng!');
      } else {
        alert('Bạn làm sai! Hãy thử lại.');
      }
      draggedFruit = null;
    });
  });