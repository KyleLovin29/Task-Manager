
const EventEmitter = require('events');
const Logger = require('./logger');
const logger = new Logger();
var i = 0;

logger.on('logEvent', (arg) => {
    console.log('Sending log to task-log.txt', arg)
});

logger.taskLog('test\n');