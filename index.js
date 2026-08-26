const mineflayer = require('mineflayer');
const http = require('http');

// Servidor web simple para que Render mantenga vivo el servicio
http.createServer((req, res) => {
  res.write("Bot de Minecraft activo 24/7");
  res.end();
}).listen(process.env.PORT || 3000);

function crearBot() {
  const bot = mineflayer.createBot({
    host: 'matiasmilos.aternos.me',
    port: 40630,
    username: 'BotAFK',
    version: '1.20.4'
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

const http = require('http');
const port = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot AFK 24/7 Activo');
}).listen(port, () => {
  console.log(`Servidor web escuchando en el puerto ${port}`);
});
