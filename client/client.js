$(document).ready(function(){
    $.get(
        "http://127.0.0.1:5000/deals",
        function(response) {
          if(response.items === 0){
            alert('No deals to display');
            return;
          }
          // append to table
          var rowsAsHtml = '';
          //make pretty
          $.each(response.data, function (key, value) {
            rowsAsHtml += '<li id="' + value.id + '">';
            rowsAsHtml += value.item;
            rowsAsHtml += '<div>' + value.price + '</div>';
            rowsAsHtml += '<div>' + value.location + '</div>';
            if(value.website != null)
              rowsAsHtml += '<div>' + value.website + '</div>';
            rowsAsHtml += '<div>' + value.description + '</div>';
            //add buy button
            rowsAsHtml += '</li>';
          });
          $('#deal-list').append(rowsAsHtml);
        }
    );
});
