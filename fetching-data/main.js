const poemChoose = document.querySelector('select');
const poemDisplay = document.querySelector('pre');
const poemEditButton = document.querySelector('#edit');
const poemSubmit = document.querySelector('#submit');
const poemEditer = document.querySelector('textarea');

poemChoose.onchange = function() {
	const poem = poemChoose.value;
	updateDisplay(poem);
};

function updateDisplay(poem) {
	poem = poem.replace(' ', '');
	poem = poem.toLowerCase();
	let url = poem + '.txt';
	
	let request = new XMLHttpRequest();
	request.open('GET', url);
	request.responseType = 'text';
	request.onload = function() {
		poemDisplay.textContent = request.response;
	};
	request.send();
}
updateDisplay('Verse 1');
poemChoose.value = 'Verse 1';

//编辑按钮
poemEditButton.addEventListener('click', edit);

function edit() {
	poemDisplay.textContent = poemEditer.value;
}

poemEditer.value = '';

//提交按钮
poemSubmit.addEventListener('click', submitEditer);

function submitEditer() {
	var poem = poemChoose.value;
	poem = poem.replace(' ', '');
	poem = poem.toLowerCase();
	let url = poem + '.txt';
	
	let request = new XMLHttpRequest();
	request.open('PATCH', url);
	request.onload = function() {
		console.log(request.status);
	};
	request.send();
}