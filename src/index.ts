import { logger } from 'logger';
import { startBot } from 'bot';

startBot()
  .then(runner => {
    const stopRunner = () => {
      logger.info('shutdown');
      return runner.isRunning() && runner.stop();
    };
    process.once('SIGINT', stopRunner);
    process.once('SIGTERM', stopRunner);
  })
  .catch(logger.error);
