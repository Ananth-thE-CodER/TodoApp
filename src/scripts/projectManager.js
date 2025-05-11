import { StorageService } from "./storageService";

export class ProjectManager {
    constructor() {
        this.projects = StorageService.loadProjects();
    }

    addProject(project) {
        this.projects.push(project);
        this.save();
    }

    deleteProject(id) {
        let project = this.projects.filter(p => p.id == id);
        const idx = this.projects.indexOf(project[0]);
        if (idx > -1) {
            this.projects.splice(idx, 1);
        }
        this.save();
    }

    getProject(id) {
        let project = this.projects.filter(p => p.id == id);
        return project[0];
    }

    save() {
        StorageService.saveProjects(this.projects);
    }

    getAllProjects() {
        return this.projects;
    }
}
