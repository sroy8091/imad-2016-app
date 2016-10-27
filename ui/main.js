console.log('Loaded!');


var margin-Left = 10;
var img = document.getElementById('mad');

function moveRight(){
	margin-Left = margin-Left + 5;

	img.style.marginLeft = margin-Left + 'px';
}

img.onclick = function(){
	var interval = setInterval(moveRight, 100);
// img.style.marginLeft = '100px';
};