document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const sneak = $(".player")
const sneakBtn = $(".sneak-btn")
let sneakY = parseInt(sneak.css("grid-column"))
let sneakX = parseInt(sneak.css("grid-row"))
const apple = $(".apple")
let appleY = parseInt(apple.css("grid-column"))
let appleX = parseInt(apple.css("grid-row"))
let scoreHTML = $(".score span")
let score = 0
let gameStop = true
let data

function gameOver() {
  sneakBtn.text("Start")
  sneakY = 2
  sneakX = 2
  apple.hide()
  gameStop = true
  data = null
  alert("GameOver")
}

function takeApple() {
  appleX = Math.floor(Math.random() * 17);
  appleY = Math.floor(Math.random() * 17);
  scoreHTML.text(score++)
}

function move() {
  $(document).one("keydown", (event) => { data = event.key });
  return data
}

//player moves
apple.hide()
sneakBtn.click(() => {
  gameStop = false;
  sneakBtn.text('Stop')
  score = 0
  appleX = Math.floor(Math.random() * 17);
  appleY = Math.floor(Math.random() * 17);
  apple.show()
  const timerId = setInterval(() => {
    switch (move()) {
      case "w":
        sneakY--
        break;
      case "a":
        sneakX--
        break;
      case "s":
        sneakY++
        break;
      case "d":
        sneakX++
        break;
      default:
        break;
    }
    sneak.css("grid-row", `${sneakY}`)
    sneak.css("grid-column", `${sneakX}`)
    if (sneakX == appleX && sneakY == appleY) {
      takeApple()
    }
    sneakBtn.click(() => gameStop = true )
    if (sneakX <= 0 || sneakX >= 17 || sneakY <= 0 || sneakY >= 17 || gameStop == true) {
      gameOver()
      clearInterval(timerId)
    }
    apple.css("grid-row", `${appleY}`)
    apple.css("grid-column", `${appleX}`)
  }, 250)
})
