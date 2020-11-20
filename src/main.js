import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/styles.css';
import CurrencyService from '../src/js/exchanger';

function convert(amount, currency) {
  parseFloat(amount) * parseFloat(currency);
}

function clearFields() {
  $('#amount').val("");
  $('#currency').val("EUR");
  $('.showConvertedAmount').text("");
  $('.showErrors').text("");
}

function getElements(amount, currency, response) {
  console.log(amount);
  console.log(currency);
  console.log(response);
  if (response.conversion_rates) {
    if (currency === "EUR") {
      console.log(currency);
      const result = convert(amount, response.conversion_rates.EUR);
      $('.showConvertedAmount').text(`${amount} USD in ${currency} is ${result}`);
    } else {
      $('.showErrors').text(`There was an error: ${response}`);
    }
  }
}

$(document).ready(function () {
  $('#convert').click(function () {
    let amount = $('#amount').val();
    let currencyType = $('#currency').val();
    clearFields();


    CurrencyService.getCurrency()
      .then(function (currencyResponse) {
        getElements(amount, currencyType, currencyResponse);
      });


  });
});