import Vue from 'nativescript-vue'
import Vuex from 'vuex';
import NSVuexPersistent from 'nativescript-vuex-persistent';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    NSVuexPersistent({key: 'user'})
  ],
  strict: true,
  modules
});
