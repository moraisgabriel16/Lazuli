document.getElementById('entryForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const formData = new FormData(this);
  
    fetch('/log', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
      this.reset();
    })
    .catch(error => console.error('Erro:', error));
  });
  
  document.getElementById('exitForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const formData = new FormData(this);
  
    fetch('/log-exit', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
      this.reset();
    })
    .catch(error => console.error('Erro:', error));
  });
  