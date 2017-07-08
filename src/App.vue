<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"      
    >
    <img src="/static/logo-pcht.png"  height="56">
      <v-list dense>
      <template v-for="item in items">
        <v-subheader light v-if="item.header" v-text="item.header"></v-subheader>          
        <v-list-item :key="item" v-else>
          <v-divider v-if="item.divider" v-bind:inset="item.inset"></v-divider>
          <v-list-tile v-if="item.listitem" 
          @click.native="onClick(item)" 
          :href="item.path" 
          :router="true">
            <v-list-tile-action>
              <v-icon light>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </template>   
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :class="color">
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer" light></v-toolbar-side-icon>
      <!--v-btn 
        icon
        light
        @click.native.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn-->
      <!--v-btn
        icon
        light
        @click.native.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn-->
      <!--v-btn
        icon
        light
        @click.native.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn-->
      <v-toolbar-title  v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        light
        @click.native.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-container fluid>
        <!--v-slide-y-transition mode="out-in"-->
          <router-view></router-view>
        <!--/v-slide-y-transition-->

      <v-snackbar
      :timeout="3000"
      :success="infoSnackbar.context === 'success'"
      :info="infoSnackbar.context === 'info'"
      :warning="infoSnackbar.context === 'warning'"
      :error="infoSnackbar.context === 'error'"
      :primary="infoSnackbar.context === 'primary'"
      :secondary="infoSnackbar.context === 'secondary'"
      v-model="infoSnackbar.show">
      {{ infoSnackbar.text }}
      <v-btn light flat @click.native="infoSnackbar.show = false">Закрыть</v-btn>
    </v-snackbar>
 <postofficedetaildialog ></postofficedetaildialog>
<eventdetaildialog></eventdetaildialog>
      </v-container>
    </main>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
    >
      <v-list>
        <v-list-item>
          <v-list-tile @click.native="right = !right">
            <v-list-tile-action>
              <v-icon light>compare_arrows</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" :class="color">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import Postofficedetaildialog from '@/components/pos/PostOfficesDetailDialog';
import Eventdetaildialog from '@/components/evnts/Evntdetaildialog';

export default {
    components: {
        Postofficedetaildialog,
        Eventdetaildialog
    },
    props: {
        atitle: {
            type: String,
            default: 'Vue!'
        }
    },
    data() {
        return {
            infoSnackbar: {
                show: false
            },
            clipped: false,
            drawer: true,
            fixed: false,
            items: [
          {title: 'Главная', icon: 'dashboard', listitem: true, path: '/', params: {}},
          {divider: true},
          {header: 'Списки'},
          {title: 'Новый список', icon: 'add', listitem: true, path: '/list-new', params: {}},
          {title: 'Управление списками', icon: 'list', listitem: true, path: '/lists', params: {}},
          {title: 'Сравнение списков', icon: 'compare_arrows', listitem: true, path: '/pogmap'},
          {divider: true},
          {header: 'Задачи'},
          {title: 'Создать новую задачу', icon: 'add', listitem: true, path: '/event-new'},
          {title: 'Редактирование / удаление', icon: 'edit', listitem: true, path: '/events'},
          {divider: true},
          {header: 'Отделения'},
          {title: 'Управление отделениями', icon: 'edit', listitem: true, path: '/post-offices'},
          {divider: true},
          {header: 'Пользователи'},
          {title: 'Управление пользователями', icon: 'people', listitem: true, path: '/users', props: {atitle: 'Управление пользователями'}}
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js',
            color: ''
        };
    },
    beforeRouteEnter(to, from, next) {
        console.log(to, from, next);
    },
    beforeCreate() {
        this.$store.dispatch('loadAllPO');
        this.$store.dispatch('getUsers');
          // this.$store.dispatch('loadAllPO');
    },
    computed: {
        attitle() {
            return this.$store.state.atitle;
        },
        currPO() {
            return this.$store.state.po.currPO;
        }
    },
    watch: {
        '$store.state.infoSnackbar': function (n, o) {
            this.infoSnackbar = n;
        },
        '$route': function (to, from) {
              // console.log(to, from);
        },
        attitle: function (n) {
            this.title = n.title;
            this.color = n.color;
        }
    },
    methods: {
        onClick({path, props}) {
         /*     this.$router.push({
                  path: path,
                  params: params
              });*/
              // this.title = params.title;
        }
    }
};
</script>

<style lang="stylus">
  @import './stylus/main'
  .toolbar--dark .toolbar__title
    color white
</style>
