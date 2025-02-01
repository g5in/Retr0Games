// import { ucs2 } from './node-modules/punycode/';

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

////////////////////////////////////////////////////////////////sneak

const sneak = $(".player")
const sneakBtn = $(".sneak-btn")
const sneakW = $(".sneak-w")
const sneakA = $(".sneak-a")
const sneakS = $(".sneak-s")
const sneakD = $(".sneak-d")
let sneakCoordY = parseInt(sneak.css("grid-column"))
let sneakCoordX = parseInt(sneak.css("grid-row"))
let sneakSteps = [];        //array of step coord
let sneakCells = [sneak]    //array of tail coord
let SneakTailColor = 10

const apple = $(".apple")
let appleCoordY = parseInt(apple.css("grid-column"))
let appleCoordX = parseInt(apple.css("grid-row"))

let scoreHTML = $(".score span")
let score = 0
let gameStop = true
let i = 0           // this var for help
let sneakDirection = "d"
let timerId

function Win() {
  sneakCoordY = 2
  sneakCoordX = 1
  score = 0
  i = 0
  scoreHTML.text(`${score}`)
  sneakBtn.text("Start")
  apple.hide()
  gameStop = true
  sneakDirection = "d"
  SneakTailColor = 10
  $(".player-tail").remove()
  sneakSteps = [];
  sneakCells = [sneak]
  alert("You Win!")
  setTimeout(() => clearInterval(timerId), 10)
}

function Move() {
  sneakW.one("click", () => sneakDirection != "s" ? sneakDirection = "w" : sneakDirection = sneakDirection);
  sneakA.one("click", () => sneakDirection != "d" ? sneakDirection = "a" : sneakDirection = sneakDirection);
  sneakS.one("click", () => sneakDirection != "w" ? sneakDirection = "s" : sneakDirection = sneakDirection);
  sneakD.one("click", () => sneakDirection != "a" ? sneakDirection = "d" : sneakDirection = sneakDirection);
  $(document).one("keydown", (event) => {
    let e = event.key;
    e == "W" || e == "ц" || e == "Ц" ? e = "w" :
      e == "A" || e == "ф" || e == "Ф" ? e = "a" :
        e == "S" || e == "ы" || e == "Ы" ? e = "s" :
          e == "D" || e == "в" || e == "В" ? e = "d" : e = e;
    if (e == "a" && sneakDirection != "d" || e == "d" && sneakDirection != "a"
      || e == "w" && sneakDirection != "s" || e == "s" && sneakDirection != "w") sneakDirection = e
    else sneakDirection = sneakDirection

  });
  return sneakDirection
}

function TakeApple() {
  if (sneakCoordX == appleCoordX && sneakCoordY == appleCoordY) {
    appleCoordX = Math.floor(Math.random() * 16) + 1;
    appleCoordY = Math.floor(Math.random() * 16) + 1;
    score++
    scoreHTML.text(`${score}`)
    SneakTail()
  }
}

function SneakTail() {
  sneakCells.push($('<div class = "player-tail"></div>').appendTo($(".sneak-place")))
  sneakCells[score].css("grid-column", `${sneakSteps[sneakSteps.length - score - 1].x}`)
  sneakCells[score].css("grid-row", `${sneakSteps[sneakSteps.length - score - 1].y}`)
  sneakCells[score].css("background-color", `rgb(${255 - SneakTailColor}, 99, 71)`);
  SneakTailColor += 20
}

function GameOver() {
  sneakCoordY = 2
  sneakCoordX = 1
  score = 0
  i = 0
  scoreHTML.text(`${score}`)
  sneakBtn.text("Start")
  apple.hide()
  gameStop = true
  sneakDirection = "d"
  SneakTailColor = 10
  $(".player-tail").remove()
  sneakSteps = [];
  sneakCells = [sneak]
  alert("GameOver")
  setTimeout(() => clearInterval(timerId), 10)
}


//player Moves
apple.hide()
sneakBtn.click(() => {
  if (gameStop == true) {
    sneakBtn.text('Stop')
    gameStop = false
    appleCoordX = Math.floor(Math.random() * 16) + 1;
    appleCoordY = Math.floor(Math.random() * 16) + 1;
    apple.show()
    timerId = setInterval(() => {
      if (sneakCells.length == 30) Win()
      switch (Move()) {
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
      TakeApple()
      sneakSteps.push({ 'x': sneakCoordX, 'y': sneakCoordY })
      sneakCells.forEach((element) => {
        element.css("grid-column", `${sneakSteps[sneakSteps.length - i - 1].x}`)
        element.css("grid-row", `${sneakSteps[sneakSteps.length - i - 1].y}`)
        i++
      })
      i = 0
      if (sneakSteps.length > score + 2) sneakSteps.shift();
      // console.log(punycode.ucs2.decode(sneakDirection))

      sneakSteps.reverse().forEach((element, index, sneakSteps) => {
        if (element.x == sneakCoordX && element.y == sneakCoordY && index > 3) i = 1;
      })
      sneakSteps.reverse()

      if (sneakCoordX <= 0 || sneakCoordX >= 17 || sneakCoordY <= 0 || sneakCoordY >= 17 || i == 1) GameOver()
      apple.css("grid-row", `${appleCoordY}`)
      apple.css("grid-column", `${appleCoordX}`)
    }, 290)
  } else {
    GameOver()
  }
})

/////////////////////////////////////////////////////////hero-wrapper
const heroWrapper = $(".hero__cards")
const heroArrowL = $(".hero-arrowL")
const heroArrowR = $(".hero-arrowR")
let heroTranslate = 0

heroArrowL.click(() => {
  if (heroTranslate + 400 <= 0) {
    heroTranslate += 400
    heroWrapper.css("transform", `translate(${heroTranslate}px)`)
    console.log(heroTranslate)
  }
})

heroArrowR.click(() => {
  if (heroTranslate - 400 >= -1200) {
    heroTranslate -= 400
    heroWrapper.css("transform", `translate(${heroTranslate}px)`)
  }
})