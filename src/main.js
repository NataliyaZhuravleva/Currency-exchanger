import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '.css/styles.css';
import CurrencyService from '.js/exchanger';

$(document).ready(function(){
  $('#convert').click(function(){
    let amount = $('#amount').val();
    let currencyType = $('#currency').val();
    CurrencyService.getCurrency();
  })
})