<template>
  <div>
    <div class="form-container">
      <TransactionForm @transactionSubmitted="handleFormSubmit" />
    </div>
    <div class="transaction-list">
      <TransactionList :transactions="transactionList" />
    </div>
  </div>
</template>

<script>
import TransactionServices from './services/TransactionServices';
import TransactionForm from '~/components/TransactionForm.vue';
import TransactionList from '~/components/TransactionList.vue';

export default {
  components: {
    TransactionForm,
    TransactionList
  },
  data() {
    return {
      transactions: [],
      accounts: {},
      transactionList:[],
    };
  },
  async created() {
    try {
      await this.fetchData();
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async fetchData() {
      try {
       
        this.transactions = await TransactionServices.getTransactions();
        this.accounts = await TransactionServices.allAccounts();

       
        this.updateTransactionList();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async handleFormSubmit(formData) {
      try {
        //console.log('Form data:', formData);

        await this.fetchData();
      } catch (error) {
        console.error('Error handling form submit:', error);
      }
    },
    updateTransactionList() {
      // Mapping transactions to include balance
      this.transactionList = this.transactions.map(transaction => {
        const account = this.accounts.find(acc => acc.account_id === transaction.account_id);

        return {
          ...transaction,
          balance: account ? account.balance : null
        };
      });
    }
  }
};
</script>

<style>
.form-container {
  width: 45%;
  float: left;
}

.transaction-list {
  width: 55%;
  float: left;
}
</style>
