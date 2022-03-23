const express = require('express');
const Joi = require('joi');
const router = express.Router();

const tasks = [];

router.get('/', (req, res) => {
    if(tasks.length === 0) 
        return res.send('You have no tasks.');    
    res.send(tasks);
});
router.get('/:id', (req, res) => {
    const currentTask = tasks.find(c => c.id === parseInt(req.params.id));
    res.send(currentTask);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
    const currentTask = tasks.find(c => c.id === parseInt(req.params.id));

    const { error } = validateTask(req.body);
    if (error) 
        return res.status(400).send(error.details[0].message);

    currentTask.task = req.body.task;
    res.send(tasks);
});

router.delete('/:id', (req, res) => {
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

module.exports = router;