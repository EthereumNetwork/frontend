<template>
  <div>
    <p>{{ msg }} as I'm building out the core functionalities.</p>
    <p>Once it's finished, you will be able to use the search bar to look up addresses, txIDs and other smart contract properties. In the meantime, watch transactions showing up as they get confirmed.</p>
    <p>Currently, the ether price is ${{price.USD}}, the current block number is <nuxt-link :to="'/block/' + blockNumber">{{blockNumber}}</nuxt-link> and the latest transactions are: </p>
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" v-text="header"></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="tx in transactionList">
          <tr>
            <td><nuxt-link :to="'/address/' + tx.from">{{tx.from.slice(0,10)}}...</nuxt-link></td>
            <td><nuxt-link :to="'/address/' + tx.to">{{tx.to.slice(0,10)}}...</nuxt-link></td>
            <td><nuxt-link :to="'/tx/' + tx.hash">{{Math.round(tx.value/1e10)/1e8}} Ether</nuxt-link> (${{Math.round(tx.value/1e16*price.USD)/100}})</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
// import * as ethUtil from 'ethereumjs-util'
// import fetch from 'node-fetch'
import socket from '~plugins/socket.io.js'
export default {
  name: 'explorer',
  props: ['searchField'],
  data () {
    return {
      msg: 'The network explorer is still not fully impplemented,',
      headers: ['from', 'to', 'value'],
      blockNumber: 0,
      transactionList: []
    }
  },
  beforeMount () {
    fetch(process.env.HOST_URL + '/api/block/pending')
    .then((response) => { return response.json() })
    .then((blockData) => {
      this.blockNumber = blockData.number
      this.transactionList = blockData.transactions
    })
  },
  mounted () {
    socket.on('latestTransactions', (blockData) => {
      this.blockNumber = blockData.number
      this.transactionList = blockData.transactions.concat(this.transactionList).slice(0, 200)
    })
  },
  computed: {
    price: function () {
      return this.$store.state.price
    }
  },
  methods: {
    goToTransaction: function (hash) {
      this.$router.push('/tx/' + hash)
    }
  }
}
</script>

<style>
.tableItem {
  cursor: pointer;
  cursor: hand;
}
</style>
