import { projects } from './db/projects';

const contentProject = document.querySelector('.content-projects');

const getProjects = ( project ) => {

    // Get the modal
    let modal = document.getElementById("myModal");
    let modalHeader = document.querySelector('.modal-body');

    let htmlcode = ``

    if(project.code == "model") {
        htmlcode = ``
    } else {
        htmlcode = `
        <a href=${project.code} class="iconf" target="_blank">
            <i class='bx bxl-gitlab' ></i>
        </a>
        `
    }

    let html = `
    <div class="content-img">
        <img src=${project.img} alt="">

        <div class="projects-panel">
            <div>
                <div class="header-panel">
                    <span>Web</span>
                    <p>${project.title}</p>
                </div>
                <div class="stack-panel">
                    <span>Stack</span>
                    <ul class="content-lip">
                        <li>${project.stack[0]}</li>
                        <li>${project.stack[1]}</li>
                        <li>${project.stack[2]}</li>
                    </ul>
                </div>
                <div class="icons-panel">
                    <a href=${project.clip} class="iconf" target="_blank">
                        <i class='bx bx-paperclip'></i>
                    </a>
                    ${htmlcode}
                </div>
            </div>
        </div>
    </div>
    `

    const div = document.createElement('div');
    div.innerHTML = html;
    contentProject.appendChild(div);

    /*=============== MODAL SCORE ===============*/
    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

export const initProject = () => {
    projects.forEach( getProjects );
}