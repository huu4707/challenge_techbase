import BootStrapService from './app';
const bootStrapService = new BootStrapService().app;
import { logger } from './utils/logger';

bootStrapService.listen(bootStrapService.get('port'), (): void => {
  logger.info({
    label: 'service start',
    message: `App is running at http://localhost:${bootStrapService.get('port')} in mode ${bootStrapService.get(
      'env'
    )} `
  });
});
