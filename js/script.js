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
const sneakW = $(".sneak-w")
const sneakA = $(".sneak-a")
const sneakS = $(".sneak-s")
const sneakD = $(".sneak-d")
let sneakCoordY = parseInt(sneak.css("grid-column"))
let sneakCoordX = parseInt(sneak.css("grid-row"))
let sneakSteps = [];
let sneakCells = [sneak]
let sneakTailColor = 10

const apple = $(".apple")
let appleY = parseInt(apple.css("grid-column"))
let appleX = parseInt(apple.css("grid-row"))

let scoreHTML = $(".score span")
let score = 0
let gameStop = true
let i = 0
let data = "d"
let timerId

function takeApple() {
  appleX = Math.floor(Math.random() * 17);
  appleY = Math.floor(Math.random() * 17);
  score++
  scoreHTML.text(`${score}`)
  sneakTail()
}

function move() {
  sneakW.one("click", () => data != "s" ? data = "w" : data = data);
  sneakA.one("click", () => data != "d" ? data = "a" : data = data);
  sneakS.one("click", () => data != "w" ? data = "s" : data = data);
  sneakD.one("click", () => data != "a" ? data = "d" : data = data);
  $(document).one("keydown", (event) => {
    if (event.key == "a" && data != "d" || event.key == "d" && data != "a" || event.key == "w" && data != "s" || event.key == "s" && data != "w") data = event.key
    else data = data
  });
  return data
}

function sneakTail() {
  sneakCells.push($('<div class = "player-tail"></div>').appendTo($(".sneak-place")))
  sneakCells[score].css("grid-column", `${sneakSteps[sneakSteps.length - score - 1].x}`)
  sneakCells[score].css("grid-row", `${sneakSteps[sneakSteps.length - score - 1].y}`)
  sneakCells[score].css("background-color", `rgb(${255-sneakTailColor}, 99, 71)`);
  sneakTailColor+= 20
}

function gameOver() {
  sneakCoordY = 2
  sneakCoordX = 1
  score = 0
  i = 0
  scoreHTML.text(`${score}`)
  sneakBtn.text("Start")
  apple.hide()
  gameStop = true
  data = "d"
  sneakTailColor = 10
  $(".player-tail").remove()
  sneakSteps = [];
  sneakCells = [sneak]
  alert("GameOver")
  setTimeout(() => clearInterval(timerId), 10)
}


//player moves
apple.hide()
sneakBtn.click(() => {
  if (gameStop == true) {
    sneakBtn.text('Stop')
    gameStop = false
  appleX = Math.floor(Math.random() * 17);
  appleY = Math.floor(Math.random() * 17);
  apple.show()
  timerId = setInterval(() => {
    switch (move()) {
      case "w":
        sneakCoordY--
        break;
      case "a":
        sneakCoordX--
        break;
      case "s":
        sneakCoordY++
        break;
      case "d":
        sneakCoordX++
        break;
      default:
        break;
    }
    sneakSteps.push({ 'x': sneakCoordX, 'y': sneakCoordY })
    sneakCells.forEach((element) => {
      element.css("grid-column", `${sneakSteps[sneakSteps.length - i - 1].x}`)
      element.css("grid-row", `${sneakSteps[sneakSteps.length - i - 1].y}`)
      i++
    })
    i = 0
    if (sneakSteps.length > score + 2) sneakSteps.shift();
    if (sneakCoordX == appleX && sneakCoordY == appleY) {
      takeApple()
    }
    sneakSteps.reverse().forEach((element, index, sneakSteps) => {
      if (element.x == sneakCoordX && element.y == sneakCoordY && index > 3) i = 1;
    })
    sneakSteps.reverse()
    if (sneakCoordX <= 0 || sneakCoordX >= 17 || sneakCoordY <= 0 || sneakCoordY >= 17 || i == 1) {
      gameOver()
    }
    apple.css("grid-row", `${appleY}`)
    apple.css("grid-column", `${appleX}`)
  }, 300)
  } else {
    gameOver()
  }
})
