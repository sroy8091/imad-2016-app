console.log('Loaded!');


var marginLeft = 10;
var img = document.getElementById('mad');
var c = document.getElementById('counter');

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
c.onclick = function(){
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
      if (request.readyState==XMLHttpRequest.DONE && request.status==200){
          var counter = request.responseText;
          document.getElementById('count').innerHTML = counter.toString();
      }  
    };
    
    //making request
    
    request.open('GET', 'http://sroy8091.imad.hasura-app.io/counter', true);
    request.send(null);
};

var nameInput = document.getElementById('name');
var name = nameInput.value;
var list = '';
var button = document.getElementById('submit');
button.onclick = function(){
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
      if (request.readyState==XMLHttpRequest.DONE && request.status==200){
          var names = request.responseText;
          names = JSON.parse(names);
        for(var i=0; i<names.length; i++){
              list = '<li>'+names[i]+'</li>';
        }
        document.getElementById('list').innerHTML = list;
      }  
    };
    
    //making request
    
    request.open('GET', 'http://sroy8091.imad.hasura-app.io/submit-name'+name, true);
    request.send(null);
};