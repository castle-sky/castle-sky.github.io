function placeHTML(dom, html) {
	dom.innerHTML = html;
}

var _toString = Object.prototype.toString;

function isAarry(obj) {
	if (_toString.call(obj) == '[object Array]') {
		return true
	}
	return false
}

function isObject(obj) {
	if (typeof obj == 'object') {
		return true
	}
	return false
}

function iterateProp(obj) {
	var result = '';
	if (isObject(obj)) {
		for (let item in obj) {
			result += item + ': ' + obj[item] +'<br>';
		}
		return result
	} else {
		return typeof obj
	}
}


window.onload = function () {
	var canvas = document.querySelector('canvas#mainApp');
	var fullscreen = document.querySelector('span#fullscreen');
	var information = document.querySelector('span#information');

	canvas.addEventListener('touchstart', handler);
	//canvas.addEventListener('touchmove', handler);
	canvas.addEventListener('touchend', handler);

	function handler(e) {
		e.preventDefault();
		var html = information.innerHTML;
		html += '<hr><hr>';
		html += 'infromation about ' + e.type + ' as follows: <br>';
		//html += iterateProp(e);
		html += '<hr>';
		html += iterateProp(e.touches);
		html += '<hr>';
		html += iterateProp(e.touches[0]);
		html += '<hr>';
		html += iterateProp(e.targetTouches);
		html += '<hr>';
		html += iterateProp(e.changedTouches);
		html += '<hr>';
		html += iterateProp(e.changedTouches[0]);
		placeHTML(information, html);

		console.log(e.type);
		if (e.type == 'touchmove') {
			var playerX = e.touches[0].pageX - canvas.offsetLeft;
			var playerY = e.touches[0].pageY - canvas.offsetTop;
			var html = 'player position: ' + playerX + ' ' + playerY;
			placeHTML(information, html);
		}
	}
}