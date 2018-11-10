console.log("yea");
$(document).ready(function(){
    console.log("yeaaaa");
    $.get("localhost:5000/buy", function(data, status){
       console.log("bac");
    }); 
});

