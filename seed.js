const { Severity } = require("./models/severity");
const { Task } = require("./models/task");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    name: "Important",
    tasks: [
      {
        Title: "Go To Store",
        Task: "Groceries",
        AdditonalInfo: "I have to go to the store to pick up groceries",
        Category: "Store",
        Tags: "groceries",
      },
    ],
  },
  {
    name: "Very Important",
    tasks: [
      {
        Title: "Chores",
        Task: "Vacuum the house",
        AdditonalInfo: "Take time to vaccuum the house today.",
        Category: "Home",
        Tags: ["Chore", "Home"],
      },
    ],
  },
];

async function seed() {
  await mongoose.connect(config.get("db"));

  await Task.deleteMany({});
  await Severity.deleteMany({});

  for (let severity of data) {
    const { _id: severityId } = await new Severity({
      name: severity.name,
    }).save();
    const tasks = severity.tasks.map((task) => ({
      ...task,
      Severity: { _id: severityId, name: severity.name },
    }));
    await Task.insertMany(tasks);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
