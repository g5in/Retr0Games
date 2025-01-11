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
let sneakWidth = parseInt(sneak.css("width"))
const apple = $(".apple")
let appleY = parseInt(apple.css("grid-column"))
let appleX = parseInt(apple.css("grid-row"))
const start = $(".start")
let scoreHTML = $(".score span")
let score = 0

async function gameOver() {
  sneakY = 2
  sneakX = 2
  apple.hide()
  alert("GameOver")
}

async function takeApple() {
  appleX = Math.floor(Math.random() * 17);
  appleY = Math.floor(Math.random() * 17);
  scoreHTML.text(score++)
}


//player moves
apple.hide()
start.click(() => {
  appleX = Math.floor(Math.random() * 17);
  appleY = Math.floor(Math.random() * 17);
  apple.show()
  $(window).keydown(async (event) => {
    switch (event.key) {
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
          setInterval(() => { sneakX++; }, 1000)
        break;
    }
     await sneak.css("grid-row", `${sneakY}`)
     await sneak.css("grid-column", `${sneakX}`)
    if (sneakX <= 0 || sneakX >= 17 || sneakY <= 0 || sneakY >= 17) {
      gameOver()
    }
    if (sneakX == appleX && sneakY == appleY) {
      takeApple()
    }
    apple.css("grid-row", `${appleY}`)
    apple.css("grid-column", `${appleX}`)
    sneak.css("width", `${sneakWidth}`)
  })
})






