import http from "./httpServices";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/tasks";

function taskUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getTasks() {
  return http.get(apiEndpoint);
}

export function getTask(taskId) {
  return http.get(taskUrl(taskId));
}

export function saveTask(task) {
  if (task._id) {
    const body = { ...task };
    delete body._id;
    return http.put(taskUrl(task._id), body);
  }

  return http.post(apiEndpoint, task);
}

export function deleteTask(taskId) {
  return http.delete(taskUrl(taskId));
}
