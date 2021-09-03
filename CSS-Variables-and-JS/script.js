/**
 * @author Shivangam Soni <shiavngamsoni99@gmail.com>
 * @see <a href="https://github.com/ShivangamSoni">GitHub</a>
 */
const inputs = document.querySelectorAll(".controls input");
inputs.forEach(input => input.addEventListener("change", handleUpdate));
inputs.forEach(input => input.addEventListener("mousemove", handleUpdate));

function handleUpdate(e) {
  const varName = e.target.name;
  const value = e.target.value;
  const unit = e.target.dataset.unit || "";

  document.documentElement.style.setProperty(`--${varName}`, `${value}${unit}`);

  e.target.previousElementSibling.textContent = value.toUpperCase();
}