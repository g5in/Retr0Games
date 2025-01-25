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
let sneakY = parseInt(sneak.css("grid-column"))
let sneakX = parseInt(sneak.css("grid-row"))
let sneakSteps = [];
let sneakCells = [sneak]
let i = 0
const apple = $(".apple")
let appleY = parseInt(apple.css("grid-column"))
let appleX = parseInt(apple.css("grid-row"))
let scoreHTML = $(".score span")
let score = 0
let gameStop = false
let data = "d"

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
  sneakCells[score].css("grid-row", `${sneakSteps[sneakSteps.length - score - 1].y}`);
}

//player moves
apple.hide()
sneakBtn.click(() => {
  sneakBtn.text('Stop')
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
    sneakSteps.push({ 'x': sneakX, 'y': sneakY })
    sneakCells.forEach((element) => {
      element.css("grid-column", `${sneakSteps[sneakSteps.length - i - 1].x}`)
      element.css("grid-row", `${sneakSteps[sneakSteps.length - i - 1].y}`)
      i++
    })
    i = 0
    if (sneakSteps.length > score + 2) sneakSteps.shift();
    console.log(sneakCells)
    if (sneakX == appleX && sneakY == appleY) {
      takeApple()
    }
    // sneakBtn.one("click", () => gameStop = true )
    if (sneakX <= 0 || sneakX >= 17 || sneakY <= 0 || sneakY >= 17 || gameStop == true) {
      sneakY = 2
      sneakX = 1
      score = 0
      scoreHTML.text(`${score}`)
      sneakBtn.text("Start")
      apple.hide()
      gameStop = false
      data = "d"
      $(".player-tail").remove()
      sneakSteps = [];
      sneakCells = [sneak]
      alert("GameOver")
      setTimeout(() => clearInterval(timerId), 10)
    }
    apple.css("grid-row", `${appleY}`)
    apple.css("grid-column", `${appleX}`)
  }, 250)
})
