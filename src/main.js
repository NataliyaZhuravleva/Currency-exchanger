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
  $('.showAmountWarning').text("");
  $('.showCurrencyError').text("");
  $('.showErrors').text("");
}

function getElements(amount, currency, response) {
  if (response.conversion_rates) {
    let check = hasOwnProperty.call(response.conversion_rates, `${currency}`);
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
      $('.showConvertedAmount').text(`${amount}USD = ${result}${currency}`);
    } else {
      $('.showCurrencyError').text(`We don't have information about currency you entered or you didn't choose any currency. Please, choose currency from the list above.`);
    }
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}


$(document).ready(function () {
  $('#convert').click(function () {
    let amount = $('#amount').val();
    let currencyType = $('#currency').val();
    clearFields();
    if (amount) {
      CurrencyService.getCurrency()
        .then(function (currencyResponse) {
          getElements(amount, currencyType, currencyResponse);
        });
    } else {
      $('.showAmountWarning').text("Please enter amount (US Dollars) you want to convert");
    }
  });
});