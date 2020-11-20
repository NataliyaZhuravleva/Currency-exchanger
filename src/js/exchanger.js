export default class CurrencyService {
  static async getCurrency(currency) {
  const currencyResponse = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
  return currencyResponse.json();
}
