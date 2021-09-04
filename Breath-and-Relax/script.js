/**
 * @author Shivangam Soni <shiavngamsoni99@gmail.com>
 * @see <a href="https://github.com/ShivangamSoni">GitHub</a>
 */
const container = document.querySelector(".container");
const text = document.querySelector(".relaxer-text"); 

const totalTime = 7500;
const breatheTime = 3000;
const holdTime = 1500;

breathAnimation();

function breathAnimation() {
  text.innerText = 'Breathe In!';
  container.className = "container grow";

  setTimeout(() => {
    text.innerText = 'Hold';

    setTimeout(() => {
      text.innerText = 'Breathe Out!';
      container.className = "container shrink";
    }, holdTime);

  }, breatheTime);
}

setInterval(breathAnimation, totalTime);

/* Settings */
const openSetting = document.querySelector(".setting-btn");
const closeSetting = document.querySelector(".close-btn");
const settingsModal = document.querySelector("#setting");

const videoPlayer = document.querySelector(".bg-video");
const videoSelect = document.querySelector("#videoSelect");

const audioPlayer = document.querySelector(".bg-audio");
const audioSelect = document.querySelector("#audioSelect");

openSetting.addEventListener("click", () => {
  openSetting.classList.add("hide");
  settingsModal.classList.add("active");
});

closeSetting.addEventListener("click", () => {
  settingsModal.classList.remove("active");
  setTimeout(() => {
    openSetting.classList.remove("hide");
  }, 500);
});

videoSelect.addEventListener("change", (e) => {
  videoPlayer.src = `./video/video${e.target.value}.mp4`;
});

audioSelect.addEventListener("change", (e) => {
  audioPlayer.src = `./audio/audio${e.target.value}.mp3`;
});