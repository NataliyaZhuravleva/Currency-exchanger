export default class CurrencyService {
  static async getCurrency() {
    try {
      const currencyResponse = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
      if (!currencyResponse.ok) {
        throw Error(currencyResponse.statusText);
      }
      return currencyResponse.json();
    } catch (error) {
      return error.message;
    }
  }
}
