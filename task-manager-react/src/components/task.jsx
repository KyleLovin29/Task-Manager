import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteTask, getTasks } from "../services/taskService";
import { getSeverity } from "../services/severityService";
import { paginate } from "../utils/paginate";
import SearchBox from "./searchBox";
import TasksTable from "./tasksTable";
import Pagination from "./common/pagination";
import Filter from "./common/filter";
import _ from "lodash";

class Tasks extends Component {
  state = {
    tasks: [],
    severity: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getSeverity();
    const severity = [{ _id: "", name: "All Tasks" }, ...data];

    const { data: tasks } = await getTasks();
    this.setState({ tasks, severity });
  }

  handleDelete = async (task) => {
    const originalTasks = this.state.tasks;
    const tasks = originalTasks.filter((t) => t._id !== task._id);
    this.setState({ tasks });

    try {
      await deleteTask(task._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({ tasks: originalTasks });
    }
  };

  handleComplete = (task) => {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    tasks[index] = { ...tasks[index] };
    tasks[index].complete = !tasks[index].complete;
    this.setState({ tasks });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleFilter = (severity) => {
    this.setState({
      selectedSeverity: severity,
      searchQuery: "",
      currentPage: 1,
    });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedSeverity,
      searchQuery,
      tasks: allTasks,
    } = this.state;

    let filtered = allTasks;
    if (searchQuery)
      filtered = allTasks.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedSeverity && selectedSeverity._id)
      filtered = allTasks.filter(
        (m) => m.severity._id === selectedSeverity._id
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const tasks = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: tasks };
  };

  render() {
    const { length: count } = this.state.tasks;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0)
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="text-center fs-3 fw-bold">No Tasks</p>
            </div>
          </div>
        </div>
      );

    const { totalCount, data: tasks } = this.getPageData();

    return (
      <React.Fragment>
        <div className="row"></div>
        <div className="row">
          <div className="col-3">
            <Filter
              items={this.state.severity}
              selectedItem={this.state.selectedSeverity}
              onItemSelect={this.handleFilter}
            />
          </div>
          <div className="col">
            {user && (
              <Link to="/task/new" className="btn btn-primary mt-4">
                New Task
              </Link>
            )}
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <TasksTable
              tasks={tasks}
              sortColumn={sortColumn}
              onComplete={this.handleComplete}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Tasks;
