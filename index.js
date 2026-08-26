const mineflayer = require('mineflayer');
const serverHttp = require('http');

// Configuración del puerto para Render y servidor web de mantenimiento
const port = process.env.PORT || 3000;

serverHttp.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot AFK 24/7 Activo');
}).listen(port, () => {
  console.log(`Servidor web escuchando en el puerto ${port}`);
});

// Configuración del bot de Minecraft
function crearBot() {
  const bot = mineflayer.createBot({
    host: 'matiasmilos.aternos.me', // Tu IP de Aternos
    port: 40630,                    // Tu puerto de Aternos
    username: 'BotAFK'
  });

  bot.on('spawn', () => {
    console.log('¡Bot en la nube activo!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 4000);
  });

  bot.on('error', err => console.log('Error:', err.message));
  bot.on('end', () => setTimeout(crearBot, 5000));
}

crearBot();
