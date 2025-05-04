import '../styles/styles.css';
import { InitializeEventListeners } from './UI'
import { RenderProjects } from './UI';
import { ProjectManager } from './projectManager';

class Todo {
    constructor() {
        InitializeEventListeners();
    }

    setupProjects() {
        let manager = new ProjectManager();
        let projects = manager.getAllProjects();
        RenderProjects(projects);
    }
}

const todo = new Todo();
todo.setupProjects();
