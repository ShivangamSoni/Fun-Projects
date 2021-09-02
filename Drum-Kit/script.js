/**
 * @author Shivangam Soni <shiavngamsoni99@gmail.com>
 * @see <a href="https://github.com/ShivangamSoni">GitHub</a>
 */
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
keys.forEach(key => key.addEventListener('click', playOnClick));
window.addEventListener('keydown', playOnKey);

function playSound(key, audio) {
  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

function playOnKey(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;

  playSound(key, audio);
}

function playOnClick(e) {
  const key = e.target;
  const audio = document.querySelector(`audio[data-key="${e.target.attributes["data-key"].value}"]`);
  if (!audio) return;

  playSound(key, audio);
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}