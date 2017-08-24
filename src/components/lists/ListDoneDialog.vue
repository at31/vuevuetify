<template>
  <div v-if="dialog">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Закрытие списка
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              
            <v-text-field label="Заголовок" :value="currList.title"></v-text-field>
            <!--v-text-field label="Окончание" :value="currList.endDate.format('HH:mm DD-MM-YYYY')"></v-text-field-->
            <v-layout row>
            <v-flex xs4>
               <v-subheader>Дата зак.</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-dialog
                  persistent
                  v-model="modal2"
                  lazy>
                  <v-text-field  slot="activator"          
                     label="Дата окончания"
                     v-model="dateEnd"
                     prepend-icon="event"
                     readonly
                     ></v-text-field>
                  <v-date-picker v-model="dateEnd" scrollable>
                     <template scope="{ save, cancel }">
                        <v-card-row actions>
                           <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                           <v-btn flat primary @click.native="save()">Save</v-btn>
                        </v-card-row>
                     </template>
                  </v-date-picker>
               </v-dialog>
            </v-flex>
         </v-layout>
         <v-layout row>
            <v-flex xs4>
               <v-subheader>Время зак.</v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-dialog
                  persistent
                  v-model="modal3"
                  lazy
                  >
                  <v-text-field slot="activator"
                     label="Время окончания"
                     v-model="timeEnd"
                     prepend-icon="event"
                     readonly
                     ></v-text-field>
                  <v-time-picker v-model="timeEnd" actions format="24hr">
                     <template scope="{ save, cancel }">
                        <v-card-row actions>
                           <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                           <v-btn flat primary @click.native="save()">Save</v-btn>
                        </v-card-row>
                     </template>
                  </v-time-picker>
               </v-dialog>
            </v-flex>
         </v-layout>      


            <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="input-1"
                label="Label Text"
                textarea
                v-model="currList.endDesc"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <div class="modal-footer">
            <slot name="footer">
              
             <v-btn class="blue darken-1" flat @click.native="closeAndSave">Закрыть список</v-btn>
             <v-btn class="red darken-1" flat @click.native="close">Отмена</v-btn>
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


    name: 'listDialog',
    data() {
        return {
            dialog: false,
            dateEnd: '',
            timeEnd: '',
            modal2: false,
            modal3: false
        };
    },
    mounted() {
    },
    watch: {
        showDialog: function (n) {
            console.log(n);
            this.dialog = n;
        }
    },
    computed: {
        currList() {
            return this.$store.state.lists.currList;
        },
        showDialog() {
            return this.$store.state.lists.showListDialog;
        }
    },
    methods: {
        close() {
            this.$store.commit('SHOW_LIST_DIALOG', false);
        },
        closeAndSave() {
            console.log(this.currList);
            this.currList.status = 'complete'; // выполнено задание, в дальнейшем возможно статус ставить разный, как пожелает заказчик.
            this.currList.endDate = moment(this.dateEnd + ' ' + this.timeEnd).toDate();
            this.$store.dispatch('updateList', this.currList);
            this.$store.commit('SHOW_LIST_DIALOG', false);
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
