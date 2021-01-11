<template>
  <div class="hello">
    <h1>{{ msg }} (${{stockPrice}})</h1>

    <h2>
      $<input v-model="stockTargetPrice" v-on:keyup="calculate" @focus="$event.target.select()" placeholder="Target Price" class="input">
      <input v-model="percentage" v-on:keyup="calculateTarget" @focus="$event.target.select()" placeholder="Percentage" class="input">%

    </h2>


  </div>
</template>

<script>
export default {
  name: 'Calculator',
  props: {
    msg: String,
  },
  data() {
    return {
      stockPrice: 800,
      stockTargetPrice: 900,
      percentage: 0
    }
  },
  mounted() {
    const key = atob("YnZ0a25zNzQ4djZwaWpuZWJ1MzA=");
    fetch(`https://finnhub.io/api/v1/quote?symbol=TSLA&token=${key}`)
      .then(response => response.json())
      .then(data => {
        this.stockPrice = data.c;
        this.stockTargetPrice = Math.round(this.stockPrice + (this.stockPrice * 15/100)),
        this.calculate();
      }
        );
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
</style>
