import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Complete from "./common/complete";

class TasksTable extends Component {
  columns = [
    {
      path: "Title",
      label: "Title",
      content: (task) => <Link to={`/task/${task._id}`}>{task.Title}</Link>,
    },
    { path: "Task", label: "Task" },
    { path: "Category", label: "Category" },
    { path: "Severity.name", label: "Severity" },
    {
      path: "Complete",
      content: (task) => (
        <Complete
          complete={task.complete}
          onClick={() => this.props.onComplete(task)}
        />
      ),
      label: "Completed",
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (task) => (
      <button
        onClick={() => this.props.onDelete(task)}
        className="btn btn-danger btn-sm"
      >
        X
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { tasks, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={tasks}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default TasksTable;
