const mineflayer = require('mineflayer');
const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot AFK 24/7 Activo');
});

function conectarBot() {
  console.log('Intentando conectar bot a Aternos...');
  
  const bot = mineflayer.createBot({
    host: 'caterpillar.aternos.host', // IP dinámica directa para evitar el bloqueo de Render
    port: 40630,
    username: 'BotAFK'
  });

  bot.on('spawn', () => {
    console.log('¡Bot en la nube activo!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 4000);
  });

  bot.on('error', err => console.log('Error del bot:', err.message));
  bot.on('end', () => {
    console.log('Bot desconectado. Reintentando en 5s...');
    setTimeout(conectarBot, 5000);
  });
}

server.listen(port, () => {
  console.log(`Servidor web escuchando en el puerto ${port}`);
  conectarBot();
});
