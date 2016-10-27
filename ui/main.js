console.log('Loaded!');


var marginLeft = 10;
var img = document.getElementById('mad');

function moveRight(){
	marginLeft = marginLeft + 5;

	img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function(){
	var interval = setInterval(moveRight, 100);
// img.style.marginLeft = '100px';
};