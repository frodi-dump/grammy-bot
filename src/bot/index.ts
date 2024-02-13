import { config } from 'config';
import { Bot } from 'grammy';
import { run } from '@grammyjs/runner';
import { logger } from 'logger';
import { createContextConstructor } from './context';
import { errorHandler } from './handlers';
import { updateLogger } from './middlewares';

export const startBot = async () => {
  const bot = new Bot(config.BOT_TOKEN, {
    ContextConstructor: createContextConstructor({ logger }),
  });

  if (config.isDev) {
    bot.use(updateLogger());
  }

  bot.command('start', ctx => ctx.reply('Welcome! Up and running.'));

  bot.on('message', ctx => ctx.reply('Got another message!'));

  bot.catch(errorHandler);

  await bot.init();

  logger.info({
    msg: 'bot running...',
    username: bot.botInfo.username,
  });

  return run(bot);
};
