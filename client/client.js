$(document).ready(function(){
    console.log("yeaaaa");
    $.get(
        "http://127.0.0.1:5000/deals",
        function(response) {
          if(response.items === 0){
            alert('No deals to display');
            return;
          }
          // append to table
          var rowsAsHtml = '';
          $.each(response.items, function (key, value) {
            rowsAsHtml += '<tr id="' + value.id + '"><td>' + value.name + '</td></tr>';
          });
          $('#deal-table').append(rowsAsHtml);
        }
    );
});
