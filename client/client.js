$("#dialog").dialog({
    autoOpen : false,
    title: 'Upcoming gigs for ',
    draggable: false,
    modal : false,
    height: 700,
    width: 1100,
    show : "blind",
    hide : "blind"
  });
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
            rowsAsHtml += '<div id="' + value.id + '">';
            rowsAsHtml += '<div>' + value.item + '</div>';
            rowsAsHtml += '<div>' + value.price + '</div>';
            rowsAsHtml += '<div>' + value.location + '</div>';
            if(value.website != null)
              rowsAsHtml += '<div>' + value.website + '</div>';
            rowsAsHtml += '<div>' + value.description + '</div>';
            rowsAsHtml += '<div>Buy</div>';
            rowsAsHtml += '</div>';
          });
          $('#deal-list').append(rowsAsHtml);
        }
    );

    $(document).on("click", "#addDeal", function() {
        $("#dialog").dialog("open");
    });
});
