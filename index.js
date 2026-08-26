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