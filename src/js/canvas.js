import platform from '../images/platform.png'
import '../style.css'
import { Player } from './Player/Player'
import { Platform } from './Platform/Platform'
import { Points } from './Points/Points';

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const platformImg = new Image()
platformImg.src = platform

canvas.width = 1280 
canvas.height = 720

const player = new Player(context)

let platforms = [
  new Platform(400, -100, canvas.height - 50, context, platformImg),
]

function addPlatforms(n) {
  let lastPlatform
  if (n === 1) {
    lastPlatform= platforms[platforms.length-1]
    platforms = [...platforms,   new Platform(
      Math.floor(Math.random() * 250) + 50, 
      lastPlatform.position.x + 50 + lastPlatform.width,
      Math.floor(Math.random() * 500) + 150, 
      context, platformImg
    )]  
  }
  else {
    for (let i=0; i<4; i++) {
      lastPlatform= platforms[platforms.length-1]
      platforms = [...platforms,   new Platform(
        Math.floor(Math.random() * 250) + 50, 
        lastPlatform.position.x + 50 + lastPlatform.width,
        Math.floor(Math.random() * 500) + 150, 
        context, platformImg
      )]  
    }
  }
}

addPlatforms(4)

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  },
  up: {
    pressed: false,
    times: 0
  },
  down: {
    pressed: false
  }
}

let scrollOffset = 0

const points = new Points(context)

function animate() {
  setTimeout(() => {
    requestAnimationFrame(animate) // animation in browser
  }, 10);
  context.clearRect(0, 0, canvas.width, canvas.height);

  // show points
  if (points.points !== -scrollOffset) {
    points.points = -scrollOffset
  }
  points.draw()

  // player and platforms motion
  if (keys.right.pressed && player.position.x < 500) {
    player.velocity.x = 6
  } else if (keys.left.pressed && player.position.x >= 100) {
    if (scrollOffset >= 0 && player.position.x === 100) {
      console.log(scrollOffset, player.position.x, player.velocity.x, 123123);
      player.velocity.x = 0
    }
    else {
      console.log(scrollOffset, player.position.x, player.velocity.x, 33333);
      player.velocity.x = -6
    }
  } else {
    player.velocity.x = 0
    if (keys.left.pressed) {
      if (scrollOffset >= 0 && player.position.x <= 100) {
        console.log(scrollOffset, player.position.x, player.velocity.x, 5555);
        player.velocity.x = 0
      } else {
        scrollOffset += 6
        platforms.forEach((platform) => platform.position.x += 6)
      }
    } else if (keys.right.pressed) {
      scrollOffset -= 6
      platforms.forEach(platform => platform.position.x -= 6)
      let lastPlatform = platforms[platforms.length-1]
      if (lastPlatform.position.x + lastPlatform.width + 50 <= canvas.width ) {
        addPlatforms(1)
        if (platforms.length > 30) platforms.shift()
      }
    }

  }

  //platform vertical collision detection
  platforms.forEach((platform) => {
    platform.draw()
    if (player.position.y + player.height <= platform.position.y + 1
      && player.position.y + player.height + player.velocity.y >= platform.position.y + 1
      && player.position.x + player.width >= platform.position.x 
      && player.position.x <= platform.position.x + platform.width
      ) {
        player.velocity.y = 0
        keys.up.pressed = false
        keys.up.times = 0
      }
  })

  player.update()
}

animate()

addEventListener('keydown', ({keyCode}) => {
  switch(keyCode) {
    case 32:
      if (keys.up.pressed && keys.up.times > 1) return
      keys.up.pressed = true
      keys.up.times += 1
      player.height = 30
      player.velocity.y -= 20
      break
    case 87:
      if (keys.up.pressed && keys.up.times === 2) return
      keys.up.pressed = true
      keys.up.times += 1
      player.height = 30
      player.velocity.y -= 20
      break
    case 83:
      player.height = 15
      break
    case 65:
      keys.left.pressed = true
      break
    case 68:
      keys.right.pressed = true
      break
  }
})

addEventListener('keyup', ({keyCode}) => {
  switch(keyCode) {
    case 87:
      player.height = 30
      break
    case 83:
      player.height = 30
      player.position.y -= 15
      break
    case 65:
      keys.left.pressed = false
      player.velocity.x = 0
      break
    case 68:
      keys.right.pressed = false
      player.velocity.x = 0
      break
  }
})

addEventListener('keypress', (e) => {
  e.preventDefault()
})

// addEventListener('resize', () => {
  // canvas.width = window.innerWidth
  // canvas.height = window.innerHeight
  // platforms = [new Platform(Math.max(Math.floor(Math.random() * 300), 50), 100, 200), new Platform(Math.max(Math.floor(Math.random() * 300), 50),  350, 500)]
  // player.position.y = player.position.y > canvas.height ? canvas.height - player.height : player.position.y
// })
