<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <v-btn @click.native="PdfCreate">PDF</v-btn>

<tablev></tablev>

  </div>
</template>

<script>
import Tablev from './Tablev';

export default {
    name: 'hello',
    components: {
        Tablev
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        };
    },
    mounted() {
        // console.log(this.atitle);
        this.$store.commit('ATITLE', {title: 'Главная', color: ''});
    },
    methods: {
        PdfCreate() {
            var docDefinition = {content: 'This is an sample PDF printed with pdfMake'};
            pdfMake.createPdf(docDefinition).open();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
</style>
