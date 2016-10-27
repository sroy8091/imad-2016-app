console.log('Loaded!');


var marginLeft = 10;
var img = document.getElementById('mad');
var c = document.getElementById('counter');
var counter = 0;

function moveRight(){
	marginLeft = marginLeft + 5;

	img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function(){
	var interval = setInterval(moveRight, 100);
// img.style.marginLeft = '100px';
};

c.onclick = function(){
    document.getElementById('counter').value = "Clicked"
    counter = counter+ 1;
    s = document.getElementById('t');
    // c.value = counter.toString();
    s.innerHTML = counter.toString();
}