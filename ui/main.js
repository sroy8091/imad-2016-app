console.log('Loaded!');


var marginLeft = 0;
var img = document.getElementById('madi');

function moveRight(marginLeft){
	marginLeft = marginLeft + 5;
	console.log(marginLeft);
	img.style.marginLeft = marginLeft+'px';
}

img.onclick = function(){
	var interval = setInterval(moveRight, 100);
};