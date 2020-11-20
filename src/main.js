import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '.css/styles.css';
import CurrencyService from '.js/exchanger';

function getElements(response){
  if (response.conversion_rates) {
    //convert function
  } else {
    $('showErrors').text(`There was an error: ${response}`);
  }
}

$(document).ready(function(){
  $('#convert').click(function(){
    let amount = $('#amount').val();
    let currencyType = $('#currency').val();
    (async function(){
      const currencyResponse = await CurrencyService.getCurrency(currencyType);
      getElements(currencyResponse);
    });
   

  });
});