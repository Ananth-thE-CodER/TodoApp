import { StorageService } from "./storageService";

export class ProjectManager {
    constructor() {
        //let storageService = new StorageService();
        this.projects = StorageService.loadProjects();
    }

    addProject(project) {
        this.projects.push(project);
        this.save();
    }

    deleteProject(id) {
        let project = this.projects.filter(p => p.id == id);
        const idx = this.projects.indexOf(project);
        if (idx > -1) {
            this.projects.splice(idx, 1);
        }
        this.save();
    }

    save() {
        StorageService.saveProjects(this.projects);
    }

    getAllProjects() {
        return this.projects;
    }
}
