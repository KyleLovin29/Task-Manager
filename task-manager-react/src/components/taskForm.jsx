import React from "react";
import Joi from "joi";
import Form from "./common/form";
import { getTask, saveTask } from "../services/taskService";
import { getSeverity } from "../services/severityService";

class TaskForm extends Form {
  state = {
    data: {
      Title: "",
      Task: "",
      Category: "",
      Tags: "",
      severityId: "",
      AdditionalInfo: "",
    },
    Severity: [],
    errors: {},
  };

  schema = Joi.object({
    _id: Joi.string(),
    Title: Joi.string().min(3).required().label("Title"),
    Task: Joi.string().min(3).required().label("Task"),
    Category: Joi.string().min(3).required().label("Category"),
    Tags: Joi.array().label("Tags"),
    severityId: Joi.string().required().label("Severity"),
    AdditionalInfo: Joi.string().label("Additional Info"),
  });

  async populateSeverity() {
    const { data: Severity } = await getSeverity();
    this.setState({ Severity });
  }

  async populateTask() {
    try {
      const taskId = this.props.match.params.id;
      if (taskId === "new") return;

      const { data: task } = await getTask(taskId);
      this.setState({ data: this.mapToViewModel(task) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateSeverity();
    await this.populateTask();
  }

  mapToViewModel(task) {
    return {
      _id: task._id,
      Title: task.Title,
      Task: task.Task,
      Category: task.Category,
      Tags: task.Tags,
      severityId: task.Severity._id,
      AdditionalInfo: task.AdditonalInfo,
    };
  }

  doSubmit = async () => {
    await saveTask(this.state.data);

    this.props.history.push("/tasks");
  };

  render() {
    return (
      <React.Fragment>
        <div className="row"></div>
        <div className="row">
          <h1>Task Form</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("Title", "Title")}
            {this.renderInput("Task", "Task")}
            {this.renderInput("Category", "Category")}
            {this.renderInput("Tags", "Tags")}
            {this.renderSelect("severityId", "Severity", this.state.Severity)}
            {this.renderInput("AdditionalInfo", "Additional Information")}
            {this.renderButton("Save")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default TaskForm;
