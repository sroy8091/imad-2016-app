console.log('Loaded!');


var marginLeft = 0;
var imge = document.getElementById('madi');

function moveRight(marginLeft){
	marginLeft = marginLeft + 5;
	console.log(marginLeft);
	imge.style.marginLeft = marginLeft+'px';
}

imge.onclick = function(){
	var interval = setInterval(moveRight, 100);
};