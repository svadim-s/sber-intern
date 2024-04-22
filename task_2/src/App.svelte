<script lang="ts">
  let baseCurrency: string = 'USD'
  let targetCurrency: string = 'RUB';
  let baseAmount: number = 0;
  let targetAmount: number = 0;
  let currencyRates: Record<string, number> = {}

  async function convertCurrency(inputField: string) {
    const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`)
    const data = await response.json();
    currencyRates = data.rates;

    if (inputField === 'baseAmount') {
      targetAmount = baseAmount * currencyRates[targetCurrency];
    } else {
      baseAmount = targetAmount / currencyRates[targetCurrency];
    }

    return targetAmount;
  }
  
  $: convertCurrency('baseAmount');
  $: baseCurrency;
  $: targetCurrency;
</script>

<main>
  <h1>Конвертер валют</h1>

  <section>
    <div class="currency">
      <label class="select__currency-label" for="base-currency">Выберите тип валюты:</label>
      <select class="select__currency" id="base-currency" bind:value={baseCurrency} on:change={() => convertCurrency('baseAmount')}>
        {#each Object.keys(currencyRates) as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
  
      <label class="currency__amount" for="base-amount">Значение:</label>
      <input type="number" id="base-amount" bind:value={baseAmount} on:input={() => convertCurrency('baseAmount')}>
    </div>
  
    <div class="currency">
      <label class="select__currency-label" for="target-currency">Выберите тип валюты:</label>
      <select class="select__currency" id="base-currency" bind:value={targetCurrency} on:change={() => convertCurrency('targetAmount')}>
        {#each Object.keys(currencyRates) as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
  
      <label class="currency__amount" for="target-amount">Значение:</label>
      <input type="number" id="target-amount" bind:value={targetAmount} on:input={() => convertCurrency('targetAmount')}>
    </div>
  </section>
</main>

<style>
  input {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #fff;
  }

  .select__currency {
    width: 150px;
    height: 30px;
  }

  .select__currency-label {
    margin-right: 10px;
  }

  .currency__amount {
    margin-right: 10px;
  }
</style>
