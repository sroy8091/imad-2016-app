console.log('Loaded!');


var marginLeft = 10;
var img = document.getElementById('mad');

function moveRight(marginLeft){
	marginLeft = marginLeft + 5;
	console.log(marginLeft);
	img.style.marginLeft = marginLeft+'px';
}

img.onclick = function(){
	var interval = setInterval(moveRight, 100);
};