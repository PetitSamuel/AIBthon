console.log("yea");
$(document).ready(function(){
    console.log("yeaaaa");
    $.get(
        "http://127.0.0.1:5000",
        function(data) {
           console.log('page content:');
           console.log(data);
        }
    );
});

