$("#dialog").dialog({
    autoOpen : false,
    title: 'Propose an Item or Service',
    draggable: false,
    modal : false,
    height: 250,
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

    $(document).on("click", "#addDeal", function() {
        $('#dialog #item').val('');
        $('#dialog #price').val('');
        $('#dialog #website').val('');
        $('#dialog #location').val('');
        $('#dialog #description').val('');
        $('#dialog #iban').val('');
        $("#dialog").dialog("open");
    });

    $(document).on("click", "#submitNewDeal", function() {
        console.log("deal submitted");
        var item = $('#dialog #item').val();
        var price = $('#dialog #price').val();
        var website = $('#dialog #website').val();
        var location = $('#dialog #location').val();
        var description = $('#dialog #description').val();
        var iban = $('#dialog #iban').val();
        const newDeal = {
            'item': item,
            'price': price,
            'website': website,
            'location': location,
            'description': description,
            'iban': iban
        }
        fetch('http://127.0.0.1:5000/deal', {
            method: 'POST',
            mode: "cors", // or without this line
            body: JSON.stringify(newDeal),
            headers: {
              'content-type': 'application/json'
            }
          }).then(response => {      
            if (response.status !== 200) {
                console.log(response);
                alert("Error when creating deal.");
                return;
            } 
            console.log(response);
            alert ("Deal successfully created!");
            $("#dialog").dialog("close");
          });
    });
});
