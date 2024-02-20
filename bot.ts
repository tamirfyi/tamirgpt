import { Bot } from 'grammy';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const conversations = new Map();

const bot = new Bot(`${process.env.TELEGRAM_BOT_TOKEN}`);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

bot.command('ask', async (ctx) => {
  const chatId = ctx.chat.id.toString();

  const msgText = ctx.message?.text.split(' ');
  const question = msgText?.splice(1).join(' ');

  if (!question) {
    ctx.reply('Please ask a question after the /ask command.');
    return;
  }

  try {
    const history = conversations.get(chatId) || [
      { role: 'system', content: 'You are a helpful assistant.' },
    ];

    const completion = await openai.chat.completions.create({
      messages: [...history, { role: 'user', content: question }],
      model: 'gpt-3.5-turbo',
    });

    const response = completion.choices[0].message.content;

    history.push({ role: 'user', content: question });
    history.push({ role: 'assistant', content: response });

    conversations.set(chatId, history.slice(-10));

    ctx.reply(`${response}`, {
      reply_parameters: {
        message_id: ctx.msg.message_id,
      },
    });
  } catch (error) {
    console.log(error);
    ctx.reply('Could not complete your request. Please try again later');
  }
});

bot.start();
