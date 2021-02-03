<template>
  <div class="hello">
    <h1>{{ ticker }} (${{stockPrice}})</h1>

    <h2>
      $<input v-model="stockTargetPrice" v-on:keyup="calculate" @focus="$event.target.select()" placeholder="Target Price" class="input">
      <input v-model="percentage" v-on:keyup="calculateTarget" @focus="$event.target.select()" placeholder="Percentage" class="input">%
    </h2>

    <table>
    <th>
    <td>Date</td>
    <td>Short Interest</td>

    <tr v-for="val in shortData" :key='val'>
    <td >{{val.date}}</td>
    <td >{{val.shortInterest.toLocaleString()}}</td>
    </tr>
    </th>


    </table>

  </div>
</template>

<script>
export default {
  name: 'Calculator',
  // props: {
  //   ticker: String,
  // },
  data() {
    return {
      apiKey: atob("YnZ0a25zNzQ4djZwaWpuZWJ1MzA="),
      baseAPI: 'https://finnhub.io/api/v1',
      stockPrice: 800,
      stockTargetPrice: 900,
      percentage: 0,
      shortData: [],
      ticker: 'TSLA'
    }
  },
  async mounted() {

    // quote
    const res = await fetch(`${this.baseAPI}/quote?symbol=${this.ticker}&token=${this.apiKey}`);
    const quote = await res.json();
    this.stockPrice = quote.c;
    this.stockTargetPrice = Math.round(this.stockPrice + (this.stockPrice * 15/100)),
    this.calculate();

    // short
    this.short();
  },
  methods: {
    calculate() {
      // debounce
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.percentage = parseFloat(((this.stockTargetPrice - this.stockPrice) / this.stockPrice) * 100).toFixed(2);
      }, 300)
    },

    calculateTarget() {
      // debounce
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.stockTargetPrice = Math.round(this.stockPrice + (this.percentage/100 * this.stockPrice));
      }, 300)
    },

    async short() {
      const startDate = '2020-01-01';
      const nowDate = new Date().toISOString();
      const res = await fetch(`${this.baseAPI}/stock/short-interest?symbol=${this.ticker}&from=${startDate}&to=${nowDate}&token=${this.apiKey}`);
      const short = await res.json();
      this.shortData = short.data;
      // console.log(short);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.input {
  margin: 10px;
  height: 40px;
  width: 20%;
  font-size: 20px;
  text-align: center;
}

table {
  margin: auto;
}
</style>


