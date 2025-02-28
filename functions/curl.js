const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    // URL del comando curl
    const url = 'https://sshx.io/get';

    // Realizar la solicitud HTTP GET
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // Obtener el cuerpo de la respuesta
    const body = await response.text();

    // Simular el comportamiento de "sh -s run"
    // Aquí puedes procesar la respuesta según sea necesario
    return {
      statusCode: 200,
      body: body, // Devolver la salida
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.message}`,
    };
  }
};
