import { Project } from "./project";

console.log("PROJECT--->",Project)

export class StorageService {
    static saveProjects(projects) {
        const data = JSON.stringify(projects);
        localStorage.setItem("projects", data);
    }

    static loadProjects() {
        const data = localStorage.getItem("projects");
        if (!data) return [];
        const parsed = JSON.parse(data);
        let project = parsed.map(p => Project.fromJSON(p));
        return project;
    }
}