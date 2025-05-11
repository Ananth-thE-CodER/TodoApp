import { Tasks } from "./tasks";

export class Project {
    constructor(name, description, id) {
        this._name = name;
        this._description = description;
        this.id = id ? id : crypto.randomUUID();
        this._totalTaskCount = 0;
        this._completedTaskCount = 0;
        this._tasks = [];
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get totalTaskCount() {
        return this._totalTaskCount;
    }

    get completedTaskCount() {
        return this._completedTaskCount;
    }

    addTask(task) {
        this._tasks.push(task);
    }

    updateTotalTaskCount() {
        this._totalTaskCount = this._tasks.length;
    }

    updateCompletedTaskCount() {
        let completedTasks = this._tasks.filter((t) => t._completed);
        this._completedTaskCount = completedTasks.length
    }

    static fromJSON(json) {
        const p = new Project(json._name, json._description, json.id);
        p._tasks = json._tasks.map(t => Tasks.fromJSON(t));
        p.updateTotalTaskCount();
        p.updateCompletedTaskCount();
        return p;
    }
}