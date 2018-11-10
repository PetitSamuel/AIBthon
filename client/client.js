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
  height: 250,
  width: 1100,
  show : "blind",
  hide : "blind"
});
$("#wordsDialog").dialog({
    autoOpen : false,
    title: 'Collect Service',
    draggable: false,
    modal : false,
    height: 250,
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

  $(document).on("click", "#words", function() {
      $('#wordsDialog #word1').val('');
      $('#wordsDialog #word2').val('');
      $('#wordsDialog #word3').val('');
      $("#wordsDialog").dialog("open");
  });

  $(document).on("click", "#buyDeal", function() {
      $('#buyDialog #name').val('');
      $('#buyDialog #cardNumber').val('');
      $('#buyDialog #securityCode').val('');
      $('#buyDialog #expirationDate').val('');
      $('#buyDialog #billingAddress').val('');

    $('#buyDialog button').remove();
    var buyDialogAsHtml = '';
    buyDialogAsHtml += '<button class="btn" id="buy" value="' + this.value + '">Buy</button>';
    $('#buy-table').append(buyDialogAsHtml);
    $("#buyDialog").dialog("open");
  });

  $(document).on("click", "#buy", function() {
    let index = this.value;
    let name = $('#buyDialog #name').val();
    let cardNumber = $('#buyDialog #cardNumber').val();
    let securityCode = $('#buyDialog #securityCode').val();
    let expirationDate = $('#buyDialog #expirationDate').val();
    let address = $('#buyDialog #billingAddress').val();
    if (typeof(name) == undefined || name.length == 0 ||
            typeof(cardNumber) == undefined || cardNumber.length == 0 ||
            typeof(securityCode) == undefined || securityCode.length == 0 ||
            typeof(expirationDate) == undefined || expirationDate.length == 0 ||
            typeof(address) == undefined || address.length == 0) {
        alert("Invalid card details entered.");
        return;
    }
    const buyId = {
        id: index,
        name: name,
        cardNumber: cardNumber,
        securityCode: securityCode,
        expirationDate: expirationDate,
        address: address
    }
      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/buy",
        headers: {
            'content-type': 'application/json'
        },
        data: JSON.stringify(buyId),
        success: function (response){
            if (response.status != 200) {
                alert("Error when processing paiment!");
                return;
            }
            console.log(response);
            alert("Item bought! Please use the following words : " + response.code);
            $("#buyDialog").dialog("close");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Error when processing paiment!");
        }
    });
});

$(document).on("click", "#collect", function() {
  let word1 = $('#wordsDialog #word1').val().trim();
  let word2 = $('#wordsDialog #word2').val().trim();
  let word3 = $('#wordsDialog #word3').val().trim();
  let words = word1 + " " + word2 + " " + word3;
  const wordCollection = {
      words: words
  }
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/collect",
      headers: {
          'content-type': 'application/json'
      },
      data: JSON.stringify(wordCollection),
      success: function (response){
          if (response.status != 200) {
              alert("The words are not valid");
              return;
          }
          console.log(response);
          alert("Collect your service: " + response.code);
          $("#wordsDialog").dialog("close");
      },
      error: function (xhr, ajaxOptions, thrownError) {
          alert("Error when processing payment!");
      }
  });
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
