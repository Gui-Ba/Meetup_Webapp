import Vue from 'vue'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import App from './App'
import router from './router'
import {store} from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBRJYpjwGJzX9RfxeugeLuCJ5ryh3UPwck',
      authDomain: 'devmeetup-a5f2a.firebaseapp.com',
      databaseURL: 'https://devmeetup-a5f2a.firebaseio.com',
      projectId: 'devmeetup-a5f2a',
      storageBucket: 'gs://devmeetup-a5f2a.appspot.com',
      messagingSenderId: '933902767825'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
