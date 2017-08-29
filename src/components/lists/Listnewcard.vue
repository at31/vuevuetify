<template>
<v-card>
<v-card-row class="green lighten-3">
    <v-card-title><span class="">Новый список</span></v-card-title>
            </v-card-row>
    <v-card-text>        
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Заголовок</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="title"
              label="заголовок"
              id="title"
              v-model="newList.title"
              :append-icon="'settings_voice'"
              :append-icon-cb="titleVoiceEnter"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs4>
            <v-subheader>Описание</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="description"
              label="описание"
              id="description"
              v-model="newList.description"
              :append-icon="'settings_voice'"
              :append-icon-cb="descriptionVoiceEnter"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs4>
            <v-subheader>Исполнитель</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-select
              v-bind:items="users"
              v-model="newList.executor"
              label="Выберите исполнителя"
              dark
              single-line
              
            ></v-select>
          </v-flex>
        </v-layout>

       

    </v-card-text>        
            <v-divider></v-divider>
        <v-card-row actions>
        <v-btn @click.native="confirmNewBtn" success light>
            <v-icon light>done</v-icon>
            Подтвердить создание
        </v-btn>        
        </v-card-row>
        <v-card-row actions>
        <v-btn @click.native="pdfCreate" default light>
            <v-icon light>picture_as_pdf</v-icon>
            PDF
        </v-btn>        
        </v-card-row>   
            </v-card>
</template>

<script>
    let self = '';
    export default {
        name: 'listnewcard',
        data() {
            return {
                newList: {
                    title: '',
                    description: '',
                    executor: '',
                    path: [],
                    evnts: [],
                    endDesc: '',
                    endDate: false
                }
            };
        },
        mounted() {
            self = this;
            console.log(this.users);
        },
        watch: {
    
        },
        computed: {
            users() {
                return this.$store.state.users.users;
            },
            fNewList() {
                return this.$store.state.lists.newList4Print;
            }
        },
        methods: {
            titleVoiceEnter() {
                voiceSetup('title');
            },
            descriptionVoiceEnter() {
                voiceSetup('description');
            },
            confirmNewBtn() {
                this.$store.dispatch('saveNewList', this.newList);
                /* this.$router.push({
                    path: '/',
                    params: {
                        hi: 'hi @at31'
                    }
                }); */
            },
            pdfCreate() {
                var dd = {
                    content: [
                        {
                            text: 'За работу!',
                            style: 'header',
                            alignment: 'center'
                        },
                        {
                            text: this.fNewList.description,
                            style: 'header',
                            bold: false
                        },
                        {
                            text: 'Задачи',
                            style: 'header',
                            bold: false
                        },
                        {
                            ul: this.fNewList.evnts
                        },
                        {
                            text: 'Маршрут',
                            style: 'header',
                            bold: false
                        },
                        {
                            ul: this.fNewList.path
                        }
                    ],
                    styles: {
                        header: {
                            fontSize: 18,
                            bold: true,
                            alignment: 'justify'
                        }
                    }
                };
                pdfMake.createPdf(dd).open();
            }
        }
    };

    function voiceSetup(fname) {
        var SpeechRecognition = '';
        var recognition = '';
        var noteContent = '';
        try {
            console.log('fname');
            SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
        } catch (e) {
            console.error(e);
            self.$store.commit('INFO_SNACKBAR', {show: true, context: 'error',
                text: 'ошибка подключения распознования голоса'});
        }
        recognition.onresult = function (event) {
            var current = event.resultIndex;
            var transcript = event.results[current][0].transcript;
            var mobileRepeatBug = (current === 1 && transcript === event.results[0][0].transcript);

            if (!mobileRepeatBug) {
                noteContent += transcript;
                self.newList[fname] = noteContent;
            }
        };

        recognition.onstart = function () {
            self.$store.commit('INFO_SNACKBAR', {show: true, context: 'success', text: 'система готова к распознованию голоса'});
        };

        recognition.onspeechend = function () {
    //
        };

        recognition.onerror = function (event) {
            if (event.error === 'no-speech') {
                self.$store.commit('INFO_SNACKBAR', {show: true, context: 'error', text: 'Попробуйте еще раз'});
            }
        };

        recognition.start();
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
   
</style>
