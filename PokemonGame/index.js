const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

//parse the array
const collisionsMap = []
//iterate through collissiosn array
for (let i = 0; i < collisions.length; i += 70){
	collisionsMap.push(collisions.slice(i,70 + i ))
}

//render out collissions
class Boundary {
	static width = 48
	static height = 48
	constructor({position}) {
		this.position = position
		this.width = 48
		this.height = 48
	}

	draw() {
		context.fillStyle = 'red'
		context.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
}

//used to render out boundaries in animation loop
const boundaries = []
const offset = {
	x: -1070,
	y: -425
}

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025) {
    	boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
    }
  })
})

//console.log(boundaries)

const image = new Image();
image.src = './Img/PelletTown.png';

const playerImage = new Image()
playerImage.src = './Img/playerDown.png'

image.onload = () => {
	context.drawImage(image, -1070 ,-425);
	context.drawImage(
		playerImage,
		0, 
		0, 
		playerImage.width / 4, 
		playerImage.height,  
		canvas.width / 2 - (playerImage.width / 4) / 2,  
		canvas.height / 2 - playerImage.height / 2,
		playerImage.width / 4, 
		playerImage.height
	)
}

class Sprite {
	constructor({position,velocity, image, frames = {max : 1} }){
		this.position = position 
		this.image = image
		this.frames = frames

		this.image.onload = () => {
			this.image.width / this.frames.max
			this.height = this.image.height
		}
		
	}

	draw() {
		context.drawImage(
		this.image,
		0, 
		0, 
		this.image.width / this.frames.max, // the number represents # of sprites 
		this.image.height,  
		this.position.x, //maintains full width of background
		this.position.y,
		this.image.width / this.frames.max, 
		this.image.height
	  )
	}
}

//find the dimensions and set it as a static image

const player = new Sprite( {
	position: {
		x: canvas.width / 2 - 192/ 4 / 2,  
		y: canvas.height / 2 - 68 / 2,
	},
	image: playerImage,
	//this divides the player image by how many animations there are used for
	// collision detections
	frames: {
		max: 4
	}
})
		// canvas.width / 2 - (this.image.width / 4) / 2,  
		// canvas.height / 2 - this.image.height / 2,



const background = new Sprite({
	position: {
		x: offset.x,
		y: offset.y
	},
	image: image
})

const keys = {
	w: {
		pressed: false
	},
	a: {
		pressed: false
	},
	s: {
		pressed: false
	},
	d: {
		pressed: false
	}

}
console.log(keys)


//object that will move against the player
const movables = [background, ...boundaries]

function rectangularCollision({rectangle1, rectangle2}) {
	return (	
	rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
	rectangle1.position.x <=rectangle2.position.x + rectangle2.width &&
	rectangle1.position.y <=rectangle2.position.y + rectangle2.height &&
	rectangle1.position.y + rectangle1.height >= rectangle2.positon.y
	)
}
function animate() {
	window.requestAnimationFrame(animate)
	background.draw()
	boundaries.forEach(boundary => {
		boundary.draw()

	})
	player.draw()

	
	let moving = true
	if(keys.w.pressed && lastKey === 'w') {
		
for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3
      })
	}
	else if(keys.s.pressed && lastKey === 's') {
		movables.forEach((movable) => {
			movable.position.y -= 3
		})
	}
	else if(keys.a.pressed && lastKey === 'a') {
		movables.forEach((movable) => {
			movable.position.x += 3
		})
	}
	else if(keys.d.pressed && lastKey === 'd') {
		movables.forEach((movable) => {
			movable.position.x -= 3
		})
	}
}
animate()

let lastKey = ''
window.addEventListener('keydown',(e) => {
	switch (e.key){
		case 'w':
			keys.w.pressed = true
			lastKey = 'w'
			break

		case 'a':
			keys.a.pressed = true
			lastKey = 'a'
			break

		case 's':
			keys.s.pressed = true
			lastKey = 's'
			break

		case 'd':
			keys.d.pressed = true
			lastKey = 'd'
			break
	}
})
console.log(keys)

window.addEventListener('keyup',(e) => {
	switch (e.key){
		case 'w':
			keys.w.pressed = false
			break

		case 'a':
			keys.a.pressed = false
			break

		case 's':
			keys.s.pressed = false
			break

		case 'd':
			keys.d.pressed = false
			break
	}
})

