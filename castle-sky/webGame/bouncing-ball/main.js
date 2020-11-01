class vectorDimensionError extends Error {}

class Vector {
	constructor (x=0, y=0) {
		this.x = x;
		this.y = y;
	}

	getXY() {
		return {x: this.x, y: this.y}
	}

	setXY(x, y) {
		this.x = x;
		this.y = y;
	}

	plus(newVector) {
		if (!(newVector instanceof Vector)) {
			throw new vectorDimensionError
		}
		this.x += newVector.x;
		this.y += newVector.y;
	}

	oppositeX() {
		this.x = -this.x;
	}

	oppositeY() {
		this.y = -this.y;
	}
}

window.onload = function () {
	var canvas = document.querySelector('#mainApp');
	var toggleFullscreen = document.querySelector('#toggleFullscreen');

	toggleFullscreen.addEventListener('click', function (e) {
		if (document.fullscreenEnabled) {
			if (!document.fullscreenElement) {
				document.documentElement.requestFullscreen();
				e.target.innerHTML = '取消全屏';
			} else {
				document.exitFullscreen();
				e.target.innerHTML = '全屏模式';
			}
		} else {
			e.target.innerHTML = '你的浏览器不支持全屏模式';
		}
	});

	document.onfullscreenchange = function () {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	var width = canvas.width = window.innerWidth;
	var height = canvas.height = window.innerHeight;
	var ctx = canvas.getContext('2d');
	var velocity = new Vector(4, 4);
	var position = new Vector(width / 2, height / 2);
	var radius = ((height > width) ? width : height) / 20;

	function main () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		var {x, y} = position.getXY();
		if (x > canvas.width || x < 0) {
			velocity.oppositeX();
		}
		if (y > canvas.height || y < 0) {
			velocity.oppositeY();
		}

		//ctx.fillstyle = '';
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();

		position.plus(velocity);
		window.requestAnimationFrame(main);
	}

	main();
}