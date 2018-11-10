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
$("#buyDialog").dialog({
    autoOpen : false,
    title: 'Buy',
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
        rowsAsHtml += '<tr id="' + value.id + '">';
        rowsAsHtml += '<td>' + value.item + '</td>';
        rowsAsHtml += '<td>' + value.price + '</td>';
        rowsAsHtml += '<td>' + value.location + '</td>';
        rowsAsHtml += '<td>' + value.website + '</td>';
        rowsAsHtml += '<td>' + value.description + '</td>';
        rowsAsHtml += '<td><button class="btn" id="buyDeal" value="' + value.id + '">Buy</button></td>';
        rowsAsHtml += '</tr>';
      });
      $('#deal-list').append(rowsAsHtml);
    }
  );

  $(document).on("click", "#addDeal", function() {
      $("#dialog").dialog("open");
  });
  $(document).on("click", "#buyDeal", function() {
    var buyDialogAsHtml = '';
    console.log(this.value);
    buyDialogAsHtml += '<button class="btn" id="buy" value="' + this.value + '">Buy</button>';
    $('#buy-table').append(buyDialogAsHtml);
    $("#buyDialog").dialog("open");
  });
});
$(document).on("click", "#buy", function() {
  $.post(
    "http://127.0.0.1:5000/buy",
    this.value,
    function(response) {
      //the words
      console.log("hiiii");
    }
  );
});
