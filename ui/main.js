console.log('Loaded!');



var marginLeft = 10;
var img = document.getElementById('mad');
var c = document.getElementById('counter');

//making image move right
// function moveRight(){
// 	marginLeft = marginLeft + 5;

// 	img.style.marginLeft = marginLeft + 'px';
// }

$(document) .ready(function(){

  $("#button1").click(function(){ window.open("https://in.linkedin.com/in/sumit-roy-15a287aa");
});
  $("#button2").click(function(){  window.open("https://github.com/sroy8091");
});
    $("#button3").click(function(){ window.open("https://twitter.com/sroy8091");
});
   $("#button4").click(function(){ window.open("https://www.facebook.com/sumit.roy.925059");
});
  
$('body').scrollspy({target: ".navbar", offset: 50});   

$('.blog').click(function(){open("/blog");});
$("#myNavbar a").on('click', function(event) {

   
    event.preventDefault();

   
    var hash = this.hash;

    
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 500, function(){
      window.location.hash = hash;
    });
});

$("#image1").click(function(){ window.open("www.kgec.ac.in");});
$("#image3").click(function(){ window.open("http://culture.preseed.in/team.html");});
$("#image5").click(function(){ window.open("http://codepen.io/sroy8091/full/JGzXJG");});
});

//onclicking image after 100ms moveRight function will be called
// img.onclick = function(){
// 	var interval = setInterval(moveRight, 100);
// // img.style.marginLeft = '100px';
// };

//creating request
// c.onclick = function(){
//     var request = new XMLHttpRequest();
    
//     request.onreadystatechange = function(){
//       if (request.readyState==XMLHttpRequest.DONE && request.status==200){
//           var counter = request.responseText;
//           document.getElementById('count').innerHTML = counter.toString();
//       }  
//     };
    
//     //making request
    
//     request.open('GET', 'http://sroy8091.imad.hasura-app.io/counter', true);
//     request.send(null);
// };


window.onload = function(){
var button = document.getElementById('submit');

button.onclick = function(){
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
      if (request.readyState==XMLHttpRequest.DONE){
          if(request.status==200){
            alert('Login successfully');
          }
          else if(request.status==403){
            alert('Username or password is incorrect');
          }
          else if(request.status==500){
            alert('Server error');
          }
          else if (request.status==502){
            alert(502);
          }
      }  
    };
    
    var username = document.getElementById('username').value;
    console.log(username);
    var password = document.getElementById('password').value;

    //making request
    
    request.open('POST', '/login', true);
    // request.open('POST', 'localhost:8080/login', true)
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username:username, password:password}));
};

};