/**
 * @author Shivangam Soni <shiavngamsoni99@gmail.com>
 * @see <a href="https://github.com/ShivangamSoni">GitHub</a>
 */
const panels = document.querySelectorAll(".panel");
panels.forEach((panel) => panel.addEventListener("click", toggleOpen));
panels.forEach((panel) => panel.addEventListener("transitionend", toggleOpenActive));

function toggleOpen(e) {
  e.target.classList.toggle('open');
}
function toggleOpenActive(e) {
  if(e.propertyName.includes("flex")) {
    e.target.classList.toggle("open-active"); 
  }
}

const splash = document.querySelector(".splash");
setTimeout(() => splash.classList.add("close"), 2000);