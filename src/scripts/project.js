export class Project {
    constructor(name, description) {
        this._name = name;
        this._description = description;
        this.id = crypto.randomUUID();
        this._totalTaskCount = 0;
        this._completedTaskCount = 0;
        this._tasks = [];

        console.log("Project class defined");
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

    static fromJSON(json) {
        console.log("PROJECT FROMJSON")
        const p = new Project(json._name, json._description);
        //p.tasks = json.tasks.map(t => Task.fromJSON(t));
        return p;
    }
}