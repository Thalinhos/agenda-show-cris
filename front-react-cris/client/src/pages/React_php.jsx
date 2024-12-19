import React, { useState, useEffect } from 'react';

function ReactPHP() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/handleForm.php')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Erro:', error));
  }, []);

  return (
    <div>
      <h1>Mensagem do PHP:</h1>
      <p>{message}</p>
    </div>
  );
}

export default ReactPHP;
