const secondHand = document.querySelector(".second-hand");
/**
 * @author Shivangam Soni <shiavngamsoni99@gmail.com>
 * @see <a href="https://github.com/ShivangamSoni">GitHub</a>
 */
const minuteHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
const audio = document.querySelector("audio");

function setTime() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  audio.play();

  const minutes = now.getMinutes();
  const minutesDegrees = ((minutes / 60) * 360) + 90;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

  const hours = now.getHours();
  const hoursDegrees = ((hours / 12) * 360) + 90;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

setInterval(setTime, 1000);