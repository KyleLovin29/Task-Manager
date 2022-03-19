
const EventEmitter = require('events');
// const Logger = require('./logger');
const express = require('express');
const Joi = require('joi');
const app = express();
// const logger = new Logger();

app.use(express.json());

const tasks = [];

// logger.on('logEvent', (arg) => {
//     console.log('Sending log to task-log.txt', arg)
// });

// logger.taskLog('test\n');

app.get('/api/tasks', (req, res) => {
    if(tasks.length === 0) 
        return res.send('You have no tasks.');    
    res.send(tasks);
});
app.get('/api/tasks/:id', (req, res) => {
    const currentTask = tasks.find(c => c.id === parseInt(req.params.id));
    res.send(currentTask);
});

app.post('/api/tasks', (req, res) => {
    const { error } = validateTask(req.body);
    if (error) 
        return res.status(400).send(error.details[0].message); 

    const task = {
        id: tasks.length + 1,
        task: req.body.task
    };

    tasks.push(task);
    res.send(tasks);
});

app.put('/api/tasks/:id', (req, res) => {
    const currentTask = tasks.find(c => c.id === parseInt(req.params.id));

    const { error } = validateTask(req.body);
    if (error) 
        return res.status(400).send(error.details[0].message);

    currentTask.task = req.body.task;
    res.send(tasks);
});

app.delete('/api/tasks/:id', (req, res) => {
    const currentTask = tasks.find(c => c.id === parseInt(req.params.id));

    const index = tasks.indexOf(currentTask);
    tasks.splice(index, 1);

    res.send(tasks);
});


function validateTask(task) {
    const JoiSchema = Joi.object({
        task: Joi.string().min(2).required()
    })
    return JoiSchema.validate(task)
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}. . .`));
