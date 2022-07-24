const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
console.log(context)

context.fillStyle = 'white';
context.fillRect(0,0, canvas.width, canvas.height)

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

window.addEventListener('keydown',(e) => {
	switch (e.key){
		case 'w':

			break
	}
})

