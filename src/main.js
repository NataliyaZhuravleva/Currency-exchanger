import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/styles.css';
import CurrencyService from '../src/js/exchanger';

function convert(amount, currency) {
  return parseFloat(amount) * parseFloat(currency).toFixed(2);
}

function clearFields() {
  $('#amount').val("");
  $('#currency').val("noChoosen");
  $('.showConvertedAmount').text("");
  $('.showCurrencyError').text("");
  $('.showErrors').text("");
}

function getElements(amount, currency, response) {
  if (response.conversion_rates) {
    let check = hasOwnProperty.call(response.conversion_rates, `${currency}`);
    console.log(check);
    if (check) {
      let result = 0;
      if (currency === "EUR") {
        result = convert(amount, response.conversion_rates.EUR);
      } else if (currency === "RUB") {
        result = convert(amount, response.conversion_rates.RUB);
      } else if (currency === "CAD") {
        result = convert(amount, response.conversion_rates.CAD);
      } else if (currency === "MXN") {
        result = convert(amount, response.conversion_rates.MXN);
      } else if (currency === "SEK") {
        result = convert(amount, response.conversion_rates.SEK);
      }
      $('.showConvertedAmount').text(`${amount} USD in ${currency} is ${result}`);
    } else {
      $('.showCurrencyError').text(`We don't have an information about ${currency}`);
    }
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}


$(document).ready(function () {
  $('#convert').click(function () {
    let amount = $('#amount').val();

    //let currencyType = $('#currency').val();
    let currencyType="ABC";
    clearFields();


    CurrencyService.getCurrency()
      .then(function (currencyResponse) {
        getElements(amount, currencyType, currencyResponse);
      });


  });
});