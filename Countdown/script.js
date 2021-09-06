/**
 * @author Shivangam Soni <shiavngamsoni99@gmail.com>
 * @see <a href="https://github.com/ShivangamSoni">GitHub</a>
 */
const bgImg = document.querySelector("#bg-image");
const title = document.querySelector("#title");
const msg = document.querySelector("#msg");
const days = document.querySelector("#days");
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");

const selections = document.querySelectorAll("input");
selections.forEach(selection => selection.addEventListener("change", change));

// Variables to store ID's of setInterval, to clear the Interval & start a new one
let countdownInterval = null;
let bgImgInterval = null;

// Initially Set to New Year
change("");

// Calls the Countdown & Background functions with appropriate Parameters according to user Input
function change(e) {
  let nextYear = new Date().getFullYear() + 1;
  let newYearsDay = new Date(`01/01/${nextYear}`);

  let today = new Date();
  let year;
  let date = newYearsDay;
  let titleTxt = "New year";
  let msgTxt = nextYear;
  let imgDir = "newYear";

  if(e) {
    switch(e.target.id){
      case "new-year":
        clearInterval(countdownInterval);
        clearInterval(bgImgInterval);
        break;
      case "april-fool":
        year = today.getMonth() >= 3 && today.getDate() >= 1 ? today.getFullYear() + 1 : today.getFullYear();
        date = new Date(`04/01/${year}`);
        titleTxt = "April Fool";
        msgTxt = "Get Ready to Prank";
        imgDir = "aprilFool";
        clearInterval(countdownInterval);
        clearInterval(bgImgInterval);
        break;
      case "x-mas":
        year = today.getMonth() == 11 && today.getDate() >= 25 ? today.getFullYear() + 1 : today.getFullYear();
        date = new Date(`12/25/${year}`);
        titleTxt = "Christmas";
        msgTxt = "Santa's on the Way";
        imgDir = "christmas";
        clearInterval(countdownInterval);
        clearInterval(bgImgInterval);
        break;
      case "birthDate":
        if(today < e.target.valueAsDate){
          alert("Don't Predict the Future. Select a Proper Birth Date.");
          e.target.value = "";
          return;
        } else {
          if(today.getMonth() > e.target.valueAsDate.getMonth()){
            year = today.getFullYear() + 1;
          } else if(today.getMonth() === e.target.valueAsDate.getMonth()) {
            if(today.getDate() >= e.target.valueAsDate.getDate()){
              year = today.getFullYear() + 1;
            } else {
              year = today.getFullYear();
            }
          } else {
            year = today.getFullYear();
          }
          date = new Date(year, e.target.valueAsDate.getMonth(), e.target.valueAsDate.getDate());
          titleTxt = "Your Birthday";
          msgTxt = `Party Hard on ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
          imgDir = "birthday";
          clearInterval(countdownInterval);
          clearInterval(bgImgInterval);
        }
        e.target.value = "";
        break;
      case "anyDate":
        if(today > e.target.valueAsDate){
          alert("Select a Date in Future Please");
          e.target.value = "";
          return;
        } else {
          date = e.target.valueAsDate;
          date.setHours(0, 0, 0, 0);
          titleTxt = "Date";
          msgTxt = `Something Important?? on ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
          imgDir = "other";
          clearInterval(countdownInterval);
          clearInterval(bgImgInterval);
        }
        e.target.value = "";
        break;
      default:
        return;
    }
  }
  countdownInterval = setInterval(countdown, 1000, date, titleTxt, msgTxt);
  setBackground(imgDir);
  bgImgInterval = setInterval(setBackground, 5000, imgDir);
}

// Setting Text on HTML
function countdown(date, titleTxt, msgTxt) {
  const today = new Date();
  const difference = date - today;

  /*
    Since, the difference is in Milliseconds, we have to covert it into required unit.
    e.g., Time(ms) / 1000ms / 60s / 60min / 24h = Days
  */
  const d = Math.floor(difference / 1000 / 60 / 60 / 24);
  const h = Math.floor((difference / 1000 / 60 / 60) % 24);
  const m = Math.floor((difference / 1000 / 60) % 60 );
  const s = Math.floor((difference / 1000) % 60 );

  days.textContent = d < 10 ? `0${d}` : d;
  hours.textContent = h < 10 ? `0${h}` : h;
  minutes.textContent = m < 10 ? `0${m}` : m;
  seconds.textContent = s < 10 ? `0${s}` : s;

  title.textContent = titleTxt;
  msg.textContent = msgTxt;
};

//Setting a Random Background Image
function setBackground(dir) {
  let random = Math.floor(Math.random() * 10) + 1;
  bgImg.src = `./images/${dir}/${random}.jpg`;
};

// Settings Modal
const openSetting = document.querySelector(".setting-btn");
const closeSetting = document.querySelector(".close-btn");
const setting = document.querySelector(".setting");

openSetting.addEventListener("click", () => {
  openSetting.classList.add("hide");
  setting.classList.add("active");
});

closeSetting.addEventListener("click", () => {
  setting.classList.remove("active");
  setTimeout(() => {
    openSetting.classList.remove("hide")
  }, 500);
});