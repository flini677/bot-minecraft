const mineflayer = require('mineflayer');
const http = require('http');

const port = process.env.PORT || 3000;

// Servidor web activo para UptimeRobot
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot AFK 24/7 Activo');
});

function conectarBot() {
  console.log('Intentando conectar bot a Aternos...');

  const bot = mineflayer.createBot({
    host: 'caterpillar.aternos.host',
    port: 40630,
    username: 'BotAFK',
    checkTimeoutInterval: 60000 // Da 60s antes de considerar tiempo de espera agotado
  });

  bot.on('spawn', () => {
    console.log('¡Bot en la nube activo!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 4000);
  });

  bot.on('error', err => console.log('Error del bot:', err.message));

  bot.on('end', (reason) => {
    console.log('Bot desconectado. Razón:', reason);
    // Espera 15 segundos antes de reintentar para no saturar Aternos
    setTimeout(conectarBot, 15000);
  });
}

server.listen(port, () => {
  console.log(`Servidor web escuchando en el puerto ${port}`);
  conectarBot();
});
