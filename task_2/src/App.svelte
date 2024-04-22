<script lang="ts">
  let targetCurrency: string = 'USD'
  let convertedCurrency: string = 'RUB';
  let targetValue: number = 0;
  let convertedValue: number = 0;
  let currencyRates: Record<string, number> = {}

  async function convertCurrency(inputField: string) {
    const response = await fetch(`https://open.er-api.com/v6/latest/${targetCurrency}`)
      .then(res => res.json())
    
    currencyRates = response.rates;

    if (inputField === 'targetValue') {
      convertedValue = targetValue * currencyRates[convertedCurrency];
    } else {
      targetValue = convertedValue / currencyRates[convertedCurrency];
    }

    return convertedValue;
  }
  
  $: convertCurrency('targetValue');
</script>

<main>
  <h1>Конвертер валют</h1>

  <section class="currency">
    <div class="currency__item">
      <label class="currency__label" for="target-currency">Выберите тип валюты:</label>
      <select class="currency__select" id="target-currency" bind:value={targetCurrency} on:change={() => convertCurrency('convertedValue')}>
        {#each Object.keys(currencyRates) as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
  
      <label class="currency__amount" for="target-amount">Значение:</label>
      <input class="currency__input-amount" type="number" id="target-amount" bind:value={targetValue} on:input={() => convertCurrency('targetValue')}>
    </div>
  
    <div class="currency__item">
      <label class="currency__label" for="converted-currency">Выберите тип валюты:</label>
      <select class="currency__select" id="converted-currency" bind:value={convertedCurrency} on:change={() => convertCurrency('targetValue')}>
        {#each Object.keys(currencyRates) as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
  
      <label class="currency__amount" for="converted-amount">Значение:</label>
      <input class="currency__input-amount" type="number" id="converted-amount" bind:value={convertedValue} on:input={() => convertCurrency('convertedValue')}>
    </div>
  </section>
</main>