<template>
  <Page>
    <ActionBar title="Medidor de temperatura" class="action-bar">
      <NavigationButton text="dispositivos" android.systemIcon="ic_menu_back"
                        @tap="goBack"/>
    </ActionBar>
    <ListView for="item in listOfItems" @itemTap="onItemTap">
      <v-template>
        <Label :text="item"/>
      </v-template>
    </ListView>
  </Page>
</template>
<script>
import App from './App';
import {mapState} from 'vuex';

export default {
  computed: mapState(['listOfItems']),
  data() {
    return {

    }
  },
  methods: {
    goBack() {
      this.$navigateTo(App);
    },

    onItemTap() {
      console.log('teste');
    }
  }
}
</script>
<style scoped>
.action-bar {
  background-color: #007bff;
  color: #ffffff;
  font-weight: normal;
}
</style>