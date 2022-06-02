/* eslint-disable no-lone-blocks */
import { baseServices } from "../baseServices";
export class TaskServices extends baseServices {
  constructor() {
    {
      super();
    }
  }

  getListStatusTask = () => this.get("Status/getAll");

  getListPriorityTask = () => this.get("Priority/getAll");

  getListTaskType = () => this.get("TaskType/getAll");

  // task detail
  createTask = (newTask) => this.post("Project/createTask", newTask);

  getTaskDetail = (taskId) =>
    this.get(`Project/getTaskDetail?taskId=${taskId}`);

  updateTask = (task) => this.post("Project/updateTask", task);

  deleteTask = (taskId) => this.delete(`Project/removeTask?taskId=${taskId}`);

  // task comment
  getAllComment = (taskId) => this.get(`Comment/getAll?taskId=${taskId}`);

  insertComment = (newComment) =>
    this.post("Comment/insertComment", newComment);

  editComment = (commentId, newContent) =>
    this.put(
      `Comment/updateComment?id=${commentId}&contentComment=${newContent}`
    );

  deleteComment = (idComment) =>
    this.delete(`Comment/deleteComment?idComment=${idComment}`);
}

export const taskServices = new TaskServices();
