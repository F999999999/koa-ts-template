import { configure, getLogger } from 'log4js';
import { log4jsConfig } from '@/config/logger';

configure(log4jsConfig);

export const defaultLogger = getLogger('default');
export const dbLogger = getLogger('db');
export const accessLogger = getLogger('access');
export const successLogger = getLogger('success');
export const errorLogger = getLogger('error');

// logger.trace("Entering cheese testing");
// logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");
