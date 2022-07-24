const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
console.log(context)

context.fillStyle = 'white';
context.fillRect(0,0, canvas.width, canvas.height)

const image = new Image();
image.src = './Img/PelletTown.png';

image.onload = () => {
	context.drawImage(image, -1100 ,-300);
}