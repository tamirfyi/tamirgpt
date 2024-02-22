import { Bot } from 'grammy';
import dotenv from 'dotenv';
import { findOrCreateUser } from './auth';
dotenv.config();

import prisma from '../prisma/prismaClient';

const bot = new Bot(`${process.env.TELEGRAM_BOT_TOKEN}`);

bot.command('new', async (ctx) => {
  const user = await findOrCreateUser(ctx.from?.id);
});

// const conversations = new Map();
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// bot.command('ask', async (ctx) => {
//   const chatId = ctx.chat.id.toString();

//   const msgText = ctx.message?.text.split(' ');
//   const question = msgText?.splice(1).join(' ');

//   if (!question) {
//     ctx.reply('Please ask a question after the /ask command.');
//     return;
//   }

//   try {
//     const history = conversations.get(chatId) || [
//       { role: 'system', content: 'You are a helpful assistant.' },
//     ];

//     const completion = await openai.chat.completions.create({
//       messages: [...history, { role: 'user', content: question }],
//       model: 'gpt-3.5-turbo',
//     });

//     const response = completion.choices[0].message.content;

//     history.push({ role: 'user', content: question });
//     history.push({ role: 'assistant', content: response });

//     conversations.set(chatId, history.slice(-10));

//     ctx.reply(`${response}`, {
//       reply_parameters: {
//         message_id: ctx.msg.message_id,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     ctx.reply('Could not complete your request. Please try again later');
//   }
// });

// //Custom keyboard buttons
// //Will send exactly what the button text consists of
// bot.command('custom', async (ctx) => {
//   const labels = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'dalle'];

//   const buttonRows = labels.map((label) => [Keyboard.text(label)]);
//   const keyboard = Keyboard.from(buttonRows)
//     .placeholder('Testing placeholder')
//     .resized()
//     .oneTime();

//   await ctx.reply(ctx.msg.text, {
//     reply_markup: keyboard,
//   });
// });

// //Inline keybords
// bot.command('inline', async (ctx) => {
//   const keyboard = new InlineKeyboard();

//   keyboard
//     .row()
//     .text('gpt-3.5-turbo', 'gpt-3.5-turbo')
//     .row()
//     .text('gpt-4', 'gpt-4')
//     .row()
//     .text('gpt-4.5-turbo', 'gpt-4.5-turbo')
//     .row()
//     .text('dalle', 'dalle');

//   await ctx.reply('Please select the model you would like to use!', {
//     reply_markup: keyboard,
//   });
// });

// bot.callbackQuery('gpt-3.5-turbo', async (ctx) => {
//   // You can respond via message response (commented out) or the top-bar
//   // await ctx.reply(`You selected ${ctx.callbackQuery.data}`)
//   await ctx.answerCallbackQuery({
//     text: `You selected ${ctx.callbackQuery.data}`,
//   });
// });

// bot.callbackQuery('gpt-4', async (ctx) => {
//   // await ctx.reply(`You selected ${ctx.callbackQuery.data}`)
//   await ctx.answerCallbackQuery({
//     text: `You selected ${ctx.callbackQuery.data}`,
//   });
// });

// bot.callbackQuery('gpt-4.5-turbo', async (ctx) => {
//   // await ctx.reply(`You selected ${ctx.callbackQuery.data}`)
//   await ctx.answerCallbackQuery({
//     text: `You selected ${ctx.callbackQuery.data}`,
//   });
// });

// bot.callbackQuery('dalle', async (ctx) => {
//   // await ctx.reply(`You selected ${ctx.callbackQuery.data}`)
//   await ctx.answerCallbackQuery({
//     text: `You selected ${ctx.callbackQuery.data}`,
//   });
// });

bot.start();
