
const EventEmitter = require('events');
const fs = require('fs');

class Logger extends EventEmitter {
    taskLog(test) {
        fs.appendFileSync('./task-log.txt', test);

        this.emit('logEvent', 'Logged');
    }
}

module.exports = Logger;