const { Telegraf } = require('telegraf');
const axios = require("axios");

const bot = new Telegraf('6682840286:AAH3hbaJYZ3mCR2CzGdz90l2oVzWSZnkrwY');
bot.start((ctx) => ctx.reply('Welcome'));
bot.on('message',async (ctx)=>{
    if(ctx.message.location){
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=d850e45fc88db843029cd4ce3c3dab66`;
        const response = await axios.get(url);
        console.log(response);
        ctx.reply(`${response.data.name} : ${Math.floor(response.data.main.temp - 273.15)} C`);
    }else {
        bot.on((ctx) => ctx.reply('Come here,send me message!Like location,location.Im GONNA come.Where ever you want DOESNT MATTER - Irland ,New York,Brooklyn or Moscow,TELL ME ,WHERE???'));
    }
})
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

