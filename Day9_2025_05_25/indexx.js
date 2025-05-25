const select = document.getElementById('bgSelect');
    const button = document.getElementById('changeBtn');

    button.addEventListener('click', () => {
      const url = select.value;
      document.body.style.backgroundImage = `url('${url}')`;
    });