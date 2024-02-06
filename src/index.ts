import { config } from 'config'
import { Bot } from 'grammy'
import { run } from '@grammyjs/runner'
import { logger } from 'logger'

const startBot = async () => {
  const bot = new Bot(config.BOT_TOKEN)

  bot.command('start', ctx => ctx.reply('Welcome! Up and running.'))

  bot.on('message', ctx => ctx.reply('Got another message!'))

  await bot.init()

  logger.info({
    msg: 'bot running...',
    username: bot.botInfo.username,
  })

  return run(bot)
}

startBot()
  .then(runner => {
    const stopRunner = () => {
      logger.info('shutdown')
      return runner.isRunning() && runner.stop()
    }
    process.once('SIGINT', stopRunner)
    process.once('SIGTERM', stopRunner)
  })
  .catch(logger.error)
