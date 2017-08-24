<template>
  <div v-if="dialog">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Задание подробно
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              
            <v-text-field label="Заголовок" :value="currEvent.title"></v-text-field>
            <v-text-field label="Начало" :value="currEvent.start.format('HH:mm DD-MM-YYYY')"></v-text-field>
            <v-text-field label="Окончание" :value="currEvent.end.format('HH:mm DD-MM-YYYY')"></v-text-field>                    

           <v-text-field label="Статус" :value="currEvent.status"></v-text-field> 
            <v-text-field label="Закрыт" :value="ed"></v-text-field> 
             <v-text-field label="Описание закр." :value="currEvent.endDesc"></v-text-field> 
          <div class="modal-footer">
            <slot name="footer">
              
             <v-btn class="blue--text darken-1" flat @click.native="close">Закрыть</v-btn>          
            </slot>
          </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>
<script>
 import moment from 'moment';

export default {
     name: 'eventDetailDialog',
     data() {
         return {
             dialog: false,
             ed: ''
         };
     },
     mounted() {
         if (this.currEvent.status === 'complete') {
             this.ed = moment(this.currEvent.endDate).format('DD-MM-YYYY HH:mm');
         } else {
             this.ed = 'исполняется';
         }
     },
     watch: {
         showDialog: function (n) {
             console.log(n);
             this.dialog = n;
         },
         currEvent: function (n) {
             console.log('this.currEvent.endDesc', this.currEvent.endDesc);
             if (this.currEvent.status === 'complete') {
                 this.ed = moment(this.currEvent.endDate).format('DD-MM-YYYY HH:mm');
             } else {
                 this.ed = 'исполняется';
             }
         }
     },
     computed: {
         currEvent() {
             return this.$store.state.events.currEvent;
         },
         showDialog() {
             return this.$store.state.events.showEventDialog;
         }
     },
     methods: {
         close() {
             this.$store.commit('SHOW_EVENT_DIALOG', false);
         }

     }
};
</script>

<style>
	.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
