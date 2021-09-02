const projects = document.querySelectorAll(".project");
let num = 1;
projects.forEach(project => project.style.backgroundImage = `url("./images/${num++}.png")`);