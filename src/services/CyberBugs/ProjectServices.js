/* eslint-disable no-lone-blocks */
import { baseServices } from "../baseServices";

export class ProjectServices extends baseServices {
  constructor() {
    {
      super();
    }
  }

  createProjects = (newProject) =>
    this.post("Project/createProjectAuthorize", newProject);

  getListProjects = () => this.get("Project/getAllProject");

  getProjectDetail = (projectId) =>
    this.get(`Project/getProjectDetail?id=${projectId}`);

  getListProjectCategory = () => this.get("ProjectCategory");

  updateProject = (projectEdit) =>
    this.put(`Project/updateProject?projectId=${projectEdit.id}`, projectEdit);

  deleteProject = (projectDelete) =>
    this.delete(`Project/deleteProject?projectId=${projectDelete.id}`);

  assignUserProject = (userProjectId) =>
    this.post("Project/assignUserProject", userProjectId);

  removeUserProject = (userProjectId) =>
    this.post("Project/removeUserFromProject", userProjectId);
}

export const projectServices = new ProjectServices();
