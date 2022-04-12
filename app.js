// const Logger = require('./middleware/logger');
const mongoose = require("mongoose");
const express = require("express");
const tasks = require("./routes/tasks");
const database = require("./routes/database");
const app = express();
// const logger = new Logger();
mongoose
  .connect("mongodb://localhost/task-manager")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.use("/api/tasks/inmemory", tasks);
app.use("/api/tasks/", database);

// logger.on('logEvent', (arg) => {
//     console.log('Sending log to task-log.txt', arg)
// });

// logger.taskLog('test\n');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}. . .`));
