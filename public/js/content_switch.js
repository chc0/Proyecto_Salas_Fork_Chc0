function load_content(option) 
{
  const contentPaths = 
  {
    opciones_usuario: '/components/opciones_usuario.ejs',
    // Update with other options and their corresponding HTML file paths as needed.
    // For example:
    // salas: '/componentes/salas.html',
    // usuarios: '/componentes/usuarios.html',
    // salir: '/componentes/salir.html',
  };

  const contentPath = contentPaths[option];

  if (contentPath) 
  {
    fetch(contentPath)
      .then((response) => response.text())
      .then((htmlContent) => 
      {
        // Update the main-content div with the fetched HTML content.
        document.querySelector('.main-content').innerHTML = htmlContent;
      })
      .catch((error) => 
      {
        console.error('Error fetching content:', error);
      });
  }
}
