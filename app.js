
// const Logger = require('./middleware/logger');
const express = require('express');
const tasks = require('./routes/tasks');
const app = express();
// const logger = new Logger();

app.use(express.json());
app.use('/api/tasks', tasks);

// logger.on('logEvent', (arg) => {
//     console.log('Sending log to task-log.txt', arg)
// });

// logger.taskLog('test\n');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}. . .`));
