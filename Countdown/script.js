let interval = null;

const title = document.querySelector("#title");
const msg = document.querySelector("#msg");
const days = document.querySelector("#days");
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");

const selections = document.querySelectorAll("input");
selections.forEach(selection => selection.addEventListener("change", change));

// Initially Set to New Year
change("");

function change(e) {
  let nextYear = new Date().getFullYear() + 1;
  let newYearsDay = new Date(`01/01/${nextYear}`);

  let today = new Date();
  let year;
  let date = newYearsDay;
  let titleTxt = "New year";
  let msgTxt = nextYear;

  if(e) {
    switch(e.target.id){
      case "new-year":
        clearInterval(interval);
        break;
      case "april-fool":
        year = today.getMonth() >= 3 && today.getDate() >= 1 ? today.getFullYear() + 1 : today.getFullYear();
        date = new Date(`04/01/${year}`);
        titleTxt = "April Fool";
        msgTxt = "Get Ready to Prank";
        clearInterval(interval);
        break;
      case "x-mas":
        year = today.getMonth() == 11 && today.getDate() >= 25 ? today.getFullYear() + 1 : today.getFullYear();
        date = new Date(`12/25/${year}`);
        titleTxt = "Christmas";
        msgTxt = "Santa's on the Way";
        clearInterval(interval);
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
          clearInterval(interval);
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
          clearInterval(interval);
        }
        e.target.value = "";
        break;
      default:
        return;
    }
  }
  console.log(date);
  interval = setInterval(countdown, 1000, date, titleTxt, msgTxt);
}

function countdown(date, titleTxt, msgTxt) {
  const today = new Date();
  const difference = date - today;

  days.textContent = Math.floor(difference / 1000 / 60 / 60 / 24);
  hours.textContent = Math.floor((difference / 1000 / 60 / 60) % 24);
  minutes.textContent = Math.floor((difference / 1000 / 60) % 60 );
  seconds.textContent = Math.floor((difference / 1000) % 60 );

  title.textContent = titleTxt;
  msg.textContent = msgTxt;
};

/*
function setBackground() {
  let random = Math.floor(Math.random() * 4) + 1;
  document.body.style.backgroundImage = `url(../images/${random}.png)`;
};
*/

// Settings
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