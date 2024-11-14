/*const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/", (req, res) => {
    const { url } = req.query;
 
    if (!url) {
      return res.status(400).json({ error: "Missing URL parameter" });
    }
 
    const http = require("http");
    http.get(url, (response) => {
      res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      });
 
      response.pipe(res);
    });
  });

  app.listen(PORT, () => {
    console.log(`CORS Anywhere server is running on port ${PORT}`);
  });*/

  const express = require("express");
  const cors = require("cors");
  const axios = require("axios");
  
  const app = express();
  const PORT = 3000;
  
  app.use(cors());
  
  app.get("/", async (req, res) => {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).json({ error: "Missing URL parameter" });
    }
  
    try {
      // Faz a requisição para a URL fornecida usando axios
      const response = await axios.get(url, {
        responseType: "stream" // Configura o tipo de resposta como stream para poder usar pipe
      });
  
      // Define os headers de CORS na resposta
      res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      });
  
      // Redireciona a resposta do servidor externo para o cliente
      response.data.pipe(res);
    } catch (error) {
      res.status(500).json({ error: "Erro ao acessar a URL fornecida" });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Servidor CORS Anywhere rodando na porta ${PORT}`);
  });
  
   
   