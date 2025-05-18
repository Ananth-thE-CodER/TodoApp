import { Project } from "./project";
import { ProjectManager } from "./projectManager";
import  trashIcon from "../assets/trash-can-outline.svg"
import emptyIcon from "../assets/man.png"
import { Tasks } from "./tasks";

function InitializeEventListeners() {
    let createButton = document.getElementById("new-project-btn");
    let modal = document.getElementById("newProjectModal");
    let projectDeleteModal = document.getElementById("projectDeleteModal");
    let submitButton = document.querySelector("button.submit-btn");
    let taskModal = document.getElementById("newTaskModal");

    // Create project button click
    createButton.addEventListener("click", (e) => {
        modal.classList.remove("display-none");
    })

    // Close modal
    modal.querySelector(".close-btn span").addEventListener("click", (e) => {
        closeProjectModal();
    })

    // Submit modal
    submitButton.addEventListener("click", (e) => {
        let projectName = document.querySelector("input[name='project-name']").value;
        let projectDesc = document.querySelector("textarea.project-description").value;

        closeProjectModal();

        let project = new Project(projectName, projectDesc);
        let manager = new ProjectManager();
        manager.addProject(project);
        let projects = manager.getAllProjects();
        RenderProjects(projects)
    })
    
    // Attach event listener to confirm button of project delete modal.
    projectDeleteModal.querySelector("div.close-btn").addEventListener("click", (e) => {
        closeDeleteModal();
    })

    projectDeleteModal.querySelector("button.confirm").addEventListener("click", (e) => {
        confirmDeleteProject();
    })

    taskModal.querySelector(".close-btn").addEventListener("click", (e) => {
        closeTaskModal();
    })

    taskModal.querySelector("button.confirm").addEventListener("click", (e) => {
        createTask(taskModal.querySelector("input#taskProjectId").value);
    })
}

function RenderProjects(projects) {
    let projectHTML = undefined;
    if (projects.length) {
        projectHTML = '<div class="project-grid">'
        for (const project of projects) {
            projectHTML += `<div class="project-card">
                                <div class="project-header">
                                    <div class="project-title">
                                        <span>${project.name}</span>
                                    </div>
                                    <div class="project-btns">
                                        <button type="button" class="create-task" data-projectID="${project.id}">Create Task</button>
                                    </div>
                                </div>
                                <div class="project-body">
                                    <div class="project-desc">
                                        ${project.description}
                                    </div>
                                </div>
                                <div class="project-footer">
                                    <div class="task-info">
                                        <div class="task-status">
                                            <span class="task-completed">${project.completedTaskCount}</span>/<span class="task-total">${project.totalTaskCount}</span> Completed.
                                        </div>
    
                                        <a class="view-tasks" data-projectId="${project.id}">View Tasks</a>
                                    </div>
                                    <div class="project-btns">
                                        <a class="delete-project" data-projectID="${project.id}">
                                            <img src="${trashIcon}" alt="Delete Project">
                                        </a>
                                    </div>
                                </div>
                            </div>`
        }
        projectHTML += `</div>`
        let appContent = document.querySelector("div.app-content");
        appContent.innerHTML = projectHTML;

        addDeleteListener();
        createTaskListener();
        viewTaskListener();
    }
    else {
        projectHTML = `<div class="empty-board">
                            <div class="empty-div">
                                <img src="${emptyIcon}" alt="Empty Projects" class="empty-img">
                                <div class="empty-text">
                                    <span class="empty-msg">Oops!! You don't seem to have created any projects yet.</span>
                                    <span class="empty-msg">Click the "New Project" button on top right to get started.</span>
                                </div>
                            </div>
                        </div>`
        let appContent = document.querySelector("div.app-content");
        appContent.innerHTML = projectHTML;
    }
}

function RenderTasks(project, tasks) {
    let taskHTML = undefined;
    if (tasks.length) {
        taskHTML = '<div class="tasks-grid">'
        for (const task of tasks) {
            taskHTML += `<div class="tasks-card">
                                <div class="task-header">
                                    <div class="task-title">
                                        <span>${task.name}</span>
                                    </div>
                                    <div class="task-btns">
                                        <button type="button" class="edit-task" data-taskID="${task.id}" data-projectId="${project.id}">Edit Task</button>
                                    </div>
                                </div>
                                <div class="task-body">
                                    <div class="task-desc">
                                        ${task.description}
                                    </div>
                                </div>
                                <div class="task-footer">
                                    <div class="task-info">
                                        <div class="task-status">
                                            <div class="task-date">
                                                <span class="task-date">Deadline: ${task.deadline ? task.deadline : ''}</span>
                                            </div>
                                            <div class="task-completed">
                                                <span class="task-completed">Completed: </span>
                                                <input type="checkbox" class="task-completed" ${task.completed ? 'checked' : ''}>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="task-btns">
                                        <a class="delete-project" data-projectID="${project.id}">
                                            <img src="${trashIcon}" alt="Delete Project">
                                        </a>
                                    </div>
                                </div>
                            </div>`
        }
        taskHTML += `</div>`
        let appContent = document.querySelector("div.app-content");
        appContent.innerHTML = taskHTML;

        // addDeleteListener();
        editTaskListener();
        // viewTaskListener();
    }
    else {
        taskHTML = `<div class="empty-board">
                            <div class="empty-div">
                                <img src="${emptyIcon}" alt="Empty Projects" class="empty-img">
                                <div class="empty-text">
                                    <span class="empty-msg">Oops!! You don't seem to have created any projects yet.</span>
                                    <span class="empty-msg">Click the "New Project" button on top right to get started.</span>
                                </div>
                            </div>
                        </div>`
        let appContent = document.querySelector("div.app-content");
        appContent.innerHTML = taskHTML;
    }
}

function closeProjectModal() {
    document.querySelector("input[name='project-name']").value = '';
    document.querySelector("textarea.project-description").value = '';

    document.getElementById("newProjectModal").classList.add("display-none");
}

function createTask(projectId) {
    let taskModal = document.getElementById("newTaskModal");
    let manager = new ProjectManager();

    let taskTitle = taskModal.querySelector("input.task-name").value;
    let taskDesc = taskModal.querySelector("textarea.task-description").value;
    let taskDeadline = taskModal.querySelector("input.task-deadline").value;
    let taskCompleted = taskModal.querySelector("input.task-completed").checked;

    closeTaskModal();

    if (!taskTitle && !taskDesc) return;
    
    let task = new Tasks(taskTitle, null, projectId, taskDesc, taskDeadline, taskCompleted);
    let project = manager.getProject(projectId);

    project.addTask(task);

    project.updateTotalTaskCount();
    project.updateCompletedTaskCount();

    let projects = manager.getAllProjects();
    RenderProjects(projects);

    manager.save();
}

function addDeleteListener() {
    let deleteBtns = document.querySelectorAll("a.delete-project")
    
    for (let btn of deleteBtns) {
        btn.addEventListener("click", (e) => {
            let modal = document.getElementById("projectDeleteModal");
            modal.querySelector("input#project-id-input").value = btn.dataset.projectid;
            modal.classList.remove("display-none");
        })
    }
}

function createTaskListener() {
    let createTaskBtns = document.querySelectorAll("button.create-task");

    for (const btn of createTaskBtns) {
        btn.addEventListener("click", (e) => {
            let modal = document.getElementById("newTaskModal");
            modal.querySelector("input#taskProjectId").value = btn.dataset.taskid;
            modal.classList.remove("display-none");
        })
    }
}

function closeTaskModal() {
    document.getElementById("newTaskModal").classList.add("display-none");
}

function confirmDeleteProject() {
    let projectId = document.getElementById("project-id-input");
    let manager = new ProjectManager();
    closeDeleteModal();
    manager.deleteProject(projectId.value);
    let projects = manager.getAllProjects();
    RenderProjects(projects);
}

function closeDeleteModal() {
    document.getElementById("projectDeleteModal").classList.add("display-none");
}

function viewTaskListener() {
    let viewTaskBtns = document.querySelectorAll("a.view-tasks");
    let manager = new ProjectManager();
    
    for (let btn of viewTaskBtns) {
        btn.addEventListener("click", (e) => {
            let projectId = e.target.dataset.projectid;
            let project = manager.getProject(projectId);
            let tasks = project._tasks;
            RenderTasks(project, tasks);
        })
    }
}

function editTaskListener() {
    let editTaskBtns = document.querySelectorAll("button.edit-task");
    let manager = new ProjectManager();

    for (const btn of editTaskBtns) {
        btn.addEventListener("click", (e) => {
            let modal = document.getElementById("editTasksModal");
            let projectId = e.target.dataset.projectid;
            let project = manager.getProject(projectId);
            let task = project.getTask(btn.dataset.taskid);
            if (!task) throw Error("Task not found!!");
            modal.querySelector("input.task-name").value = task._name;
            modal.querySelector("textarea.task-description").innerText = task._description;
            modal.querySelector("input.task-deadline").value = task._deadline;
            if (task._completed) {
                modal.querySelector("input.task-completed").setAttribute("checked", true);
            }
            modal.querySelector("input#taskId").value = btn.dataset.taskid;
            modal.classList.remove("display-none");
        })
    }
}

export { InitializeEventListeners };
export { RenderProjects };