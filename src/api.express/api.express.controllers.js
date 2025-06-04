const fs = require('fs');
const path = require('path');

// Caminho da pasta de controllers
const controllersPath = path.join(__dirname, '../controllers');

// Carrega todos os controllers e armazena as instâncias
const controllers = fs.readdirSync(controllersPath)
  .filter(file => file.endsWith('.js'))  // Filtra apenas arquivos .js
  .map(file => {
    // Importa dinamicamente cada controller
    const ControllerClass = require(path.join(controllersPath, file)).default || require(path.join(controllersPath, file));

    // Verifica se a classe possui o método build
    if (typeof ControllerClass.build === 'function') {
      // Retorna a instância do controller
      return ControllerClass.build();
    } else {
      console.warn(`O arquivo ${file} não possui o método build`);
      return null; // Ignora arquivos que não possuem o método necessário
    }
  })
  .filter(instance => instance); // Remove instâncias nulas

// Exporta todas as rotas geradas
module.exports = controllers;
