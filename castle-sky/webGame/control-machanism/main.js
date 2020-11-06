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
	var clearInformation = document.querySelector('span#clearInformation');

	clearInformation.addEventListener('click', function () {
		information.innerHTML = '';
	});

	canvas.addEventListener('touchstart', handler, false);
	canvas.addEventListener('touchmove', handler, false);
	canvas.addEventListener('touchend', handler, false);

	function handler(e) {
		e.preventDefault();
		var html = information.innerHTML;
		html += '<hr><hr>';
		html += 'infromation about ' + e.type + ' as follows: <br>';
		//html += iterateProp(e);
		html += '<hr>touches<br>';
		html += iterateProp(e.touches);
		html += '<br>' + iterateProp(e.touches[0]);
		html += '<hr>targetTouches<br>';
		html += iterateProp(e.targetTouches);
		html += '<br>' + iterateProp(e.targetTouches[0]);
		html += '<hr>changedTouches<br>';
		html += iterateProp(e.changedTouches);
		html += '<br>' + iterateProp(e.changedTouches[0]);
		//html += '<hr>';
		//html += iterateProp(e.changedTouches[0]);
		placeHTML(information, html);
	}
}