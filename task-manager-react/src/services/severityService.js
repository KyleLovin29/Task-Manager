import http from "./httpServices";
import config from "../config.json";

export function getSeverity() {
  return http.get(config.apiUrl + "/severity");
}
