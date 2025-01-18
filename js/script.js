document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const sneak = $(".player")
let sneakY = parseInt(sneak.css("grid-column"))
let sneakX = parseInt(sneak.css("grid-row"))
const apple = $(".apple")
let appleY = parseInt(apple.css("grid-column"))
let appleX = parseInt(apple.css("grid-row"))
const start = $(".start")
let scoreHTML = $(".score span")
let score = 0
let gameStop = true
let data

function gameStoped() {
  sneakY = 2
  sneakX = 2
  apple.hide()
  gameStop = true
}

function gameOver() {
  sneakY = 2
  sneakX = 2
  apple.hide()
  gameStop = true
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
start.click(() => {
  gameStop = false;
  start.text('Stop')
  score = 0
  appleX = Math.floor(Math.random() * 17);
  appleY = Math.floor(Math.random() * 17);
  apple.show()
  setInterval(() => {
    console.log("1")
    if (sneakX <= 0 || sneakX >= 17 || sneakY <= 0 || sneakY >= 17) {
      gameOver()
      return
    }
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
    // start.one("click", () => {
    //   gameStoped()
    // })
    
    if (sneakX == appleX && sneakY == appleY) {
      takeApple()
    }
    apple.css("grid-row", `${appleY}`)
    apple.css("grid-column", `${appleX}`)
  }, 250)
  return
})
