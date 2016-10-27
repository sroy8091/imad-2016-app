console.log('Loaded!');


var marginLeft = 10;
var img = document.getElementById('mad');
var c = document.getElementById('counter');
var counter = 0;

//making image move right
function moveRight(){
	marginLeft = marginLeft + 5;

	img.style.marginLeft = marginLeft + 'px';
}

//onclicking image after 100ms moveRight function will be called
img.onclick = function(){
	var interval = setInterval(moveRight, 100);
// img.style.marginLeft = '100px';
};

//creating request

var request = new XMLHttpRequest();

request.onreadystatechange = function(){
  if (request.readyState==XMLHttpRequest.DONE && request.status==200){
      var counter = request.responseText;
      s = document.getElementById('t');
      s.innerHTML = counter.toString();
  }  
};

//making request

request.open('GET', 'http://sroy8091.hasura-app.io/counter', true);
request.send;
