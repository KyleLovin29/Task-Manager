// const Logger = require('./middleware/logger');
const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const users = require("./routes/users");
const tasks = require("./routes/tasks");
const severity = require("./routes/severities");
const auth = require("./routes/auth");
const app = express();
// const logger = new Logger();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/task-manager")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.use(cors());
// app.use("/api/tasks/inmemory", mockService);
app.use("/api/severity", severity);
app.use("/api/tasks", tasks);
app.use("/api/users", users);
app.use("/api/auth", auth);

// logger.on('logEvent', (arg) => {
//     console.log('Sending log to task-log.txt', arg)
// });

// logger.taskLog('test\n');

const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening on port ${port}. . .`));
