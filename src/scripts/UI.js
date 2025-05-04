import { Project } from "./project";
import { ProjectManager } from "./projectManager";
import  trashIcon from "../assets/trash-can-outline.svg"

function InitializeEventListeners() {
    let createButton = document.getElementById("new-project-btn");
    let modal = document.getElementById("newProjectModal");

    let submitButton = document.querySelector("button.submit-btn");

    // Create project button click
    createButton.addEventListener("click", (e) => {
        modal.classList.remove("display-none");
    })

    // Close modal
    modal.querySelector(".close-btn span").addEventListener("click", (e) => {
        closeModal();
    })

    // Submit modal
    submitButton.addEventListener("click", (e) => {
        let projectName = document.querySelector("input[name='project-name']").value;
        let projectDesc = document.querySelector("textarea.project-description").value;

        closeModal();

        let project = new Project(projectName, projectDesc);
        let manager = new ProjectManager();
        manager.addProject(project);
        let projects = manager.getAllProjects();
        RenderProjects(projects)
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
                                        <button type="button" class="create-tasks">Create Tasks</button>
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
    
                                        <a class="view-tasks">View Tasks</a>
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
    }
}

function closeModal() {
    document.querySelector("input[name='project-name']").value = '';
    document.querySelector("textarea.project-description").value = '';

    document.getElementById("newProjectModal").classList.add("display-none");
}

function addDeleteListener() {
    let deleteBtns = document.querySelectorAll("a.delete-project")
    let manager = new ProjectManager();
    for (let btn of deleteBtns) {
        btn.addEventListener("click", (e) => {
            manager.deleteProject(btn.dataset.projectid);
        })
    }
}

export { InitializeEventListeners };
export { RenderProjects };