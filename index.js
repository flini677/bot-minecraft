const mineflayer = require('mineflayer');
const serverHttp = require('http');

const port = process.env.PORT || 3000;

serverHttp.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot AFK 24/7 Activo');
}).listen(port, () => {
  console.log(`Servidor web escuchando en el puerto ${port}`);
});

function crearBot() {
  console.log('Intentando conectar bot a Aternos...');
  
  const bot = mineflayer.createBot({
    host: '185.107.193.177', // Reemplaza esto con los números de la IP (ej: '185.107.193.172')
    port: 40630,
    username: 'BotAFK',
    version: '1.20.4',
    hideErrors: false
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
    setTimeout(crearBot, 5000);
  });
}

crearBot();
