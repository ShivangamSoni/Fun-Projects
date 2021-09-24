/**
 * @author Shivangam Soni <shiavngamsoni99@gmail.com>
 * @see <a href="https://github.com/ShivangamSoni">GitHub</a>
 */
const projects = document.querySelectorAll(".project");
let num = 1;
projects.forEach((project) => (project.style.backgroundImage = `url("./images/${num++}.png")`));
