const currency_first = document.getElementById('currency-one');
const amount_first = document.getElementById('amount-one');
const currency_second = document.getElementById('currency-two');
const amount_second = document.getElementById('amount-two');

const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

console.log(currency_first.value);

function calculate() {
  const currencyIndexOne = currency_first.value;
  const currencyIndexTwo = currency_second.value;

  console.log(currencyIndexOne);

  fetch(
    `https://v6.exchangerate-api.com/v6/1d07834c7dec00801d2c6308/latest/${currencyIndexOne}`
  )
    .then(response => response.json())
    .then(data => {
      //   console.log(data);
      const rateValue = data.conversion_rates[currencyIndexTwo];
      console.log(rateValue);
      rate.innerText = `1 ${currencyIndexOne} = ${rateValue} ${currencyIndexTwo}`;
      amount_second.value = (amount_first.value * rateValue).toFixed(2);
      console.log(amount_second.value);
    });
}
// Event listeners
currency_first.addEventListener('change', calculate);
amount_first.addEventListener('input', calculate);
currency_second.addEventListener('change', calculate);
amount_second.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currency_first.value;
  currency_first.value = currency_second.value;
  currency_second.value = temp;
  calculate();
});

