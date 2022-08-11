import platform from '../images/platform.png'
import '../style.css'
import { Player } from './Player/Player'
import { Platform } from './Platform/Platform'

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

for (let i=0; i<4; i++) {
  let lastPlatform = platforms[platforms.length-1]
  platforms = [...platforms,   new Platform(
    Math.floor(Math.random() * 250) + 50, 
    lastPlatform.position.x + 50 + lastPlatform.width,
    Math.floor(Math.random() * 500) + 150, 
    context, platformImg
  )]  
}

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

function animate() {
  console.log(scrollOffset);
  setTimeout(() => {
    requestAnimationFrame(animate) // animation in browser
  }, 1000/100);
  context.clearRect(0, 0, canvas.width, canvas.height);


  if (keys.right.pressed && player.position.x < 500) {
    player.velocity.x = 6
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -6
  } else {
    player.velocity.x = 0
    if (keys.left.pressed) {
      scrollOffset += 6
      platforms.forEach((platform) => platform.position.x += 6)
    } else if (keys.right.pressed) {
      scrollOffset -= 6
      platforms.forEach(platform => platform.position.x -= 6)
      let lastPlatform = platforms[platforms.length-1]
      if (lastPlatform.position.x + lastPlatform.width + 50 <= canvas.width ) {
        platforms.push(
          new Platform(
            Math.floor(Math.random() * 250) + 50, 
            lastPlatform.position.x + 50 + lastPlatform.width,
            Math.floor(Math.random() * 500) + 150, 
            context, platformImg
          )
        )
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
  // console.log(keyCode);
  switch(keyCode) {
    case 32:
      // console.log(keys.up, player.velocity.y);
      if (keys.up.pressed && keys.up.times > 1) return
      keys.up.pressed = true
      keys.up.times += 1
      player.height = 30
      player.velocity.y -= 20
      break
    case 87:
      // console.log(keys.up, player.velocity.y);
      if (keys.up.pressed && keys.up.times === 2) return
      keys.up.pressed = true
      keys.up.times += 1
      player.height = 30
      player.velocity.y -= 20
      break
    case 83:
      // console.log('Down');
      player.height = 15
      break
    case 65:
      keys.left.pressed = true
      // console.log('Left');
      break
    case 68:
      keys.right.pressed = true
      // console.log('Right');
      break
  }
  // // console.log(keys.right.pressed);
})

addEventListener('keyup', ({keyCode}) => {
  // // console.log(keyCode);
  switch(keyCode) {
    case 87:
      // console.log('Up');
      player.height = 30
      break
    case 83:
      // console.log('Down');
      player.height = 30
      player.position.y -= 15
      break
    case 65:
      keys.left.pressed = false
      // console.log('Left');
      player.velocity.x = 0
      break
    case 68:
      keys.right.pressed = false
      // console.log('Right');
      player.velocity.x = 0
      break
  }
  // // console.log(keys.right.pressed);
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
