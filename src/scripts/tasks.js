export class Tasks {
    constructor(name, id, projectId, description, deadline=false, completed=false) {
        this._name = name;
        this.id = id ? id : crypto.randomUUID();
        this._projectId = projectId;
        this._description = description;
        this._deadline = deadline;
        this._completed = completed;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get deadline() {
        return this._deadline;
    }

    get completed() {
        return this._completed;
    }

    static fromJSON(json) {
        const p = new Tasks(json._name, json.id, json._projectId, json._description);
        return p;
    }
} 