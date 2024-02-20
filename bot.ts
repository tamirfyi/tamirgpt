import { Bot } from 'grammy';
import dotenv from 'dotenv';
dotenv.config();

const bot = new Bot(`${process.env.TELEGRAM_BOT_TOKEN}`);

bot.command('ping', async (ctx) => {
  ctx.reply('pong!');
});

bot.start();
