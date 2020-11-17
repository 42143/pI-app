<template>
  <Page @loaded="ckeckBluetooth">
    <ActionBar title="Lista de dispositivos" class="action-bar">
      <NavigationButton text="dispositivos" android.systemIcon="ic_menu_back"
                        @tap="goToPageList"/>
    </ActionBar>

    <StackLayout class="home-panel">
      <Button class="btn-primary conectar" :class="{active:isConnect}" text="Encontrar"
              @tap="connect" v-if=""
      />
      <Button class="btn-primary conectar stop" :class="{active:isStopConnect}" text="Stop"
              @tap="stopConnect"
      />
      <StackLayout height="550px">
        <RadRadialGauge>
          <RadialScale v-tkRadialGaugeScales minimum="0"
                       maximum="60" radius="0.90">
            <ScaleStyle v-tkRadialScaleStyle majorTicksCount="7"
                        minorTicksCount="9" lineThickness="0"
                        labelsCount="7" ticksOffset="0"/>
            <RadialBarIndicator v-tkRadialScaleIndicators
                                minimum="0" maximum="10.2" location="0.97">
              <BarIndicatorStyle
                  v-tkRadialBarIndicatorStyle fillColor="#dddddd"/>
            </RadialBarIndicator>
            <RadialBarIndicator v-tkRadialScaleIndicators
                                minimum="10.2" maximum="20.4" location="0.97">
              <BarIndicatorStyle
                  v-tkRadialBarIndicatorStyle fillColor="#9DCA56"/>
            </RadialBarIndicator>
            <RadialBarIndicator v-tkRadialScaleIndicators
                                minimum="20.4" maximum="30.6" location="0.97">
              <BarIndicatorStyle
                  v-tkRadialBarIndicatorStyle fillColor="#F0C44D"/>
            </RadialBarIndicator>
            <RadialBarIndicator v-tkRadialScaleIndicators
                                minimum="30.6" maximum="40.8" location="0.97">
              <BarIndicatorStyle
                  v-tkRadialBarIndicatorStyle fillColor="#E27633"/>
            </RadialBarIndicator>
            <RadialBarIndicator v-tkRadialScaleIndicators
                                minimum="40.8" maximum="60" location="0.97">
              <BarIndicatorStyle
                  v-tkRadialBarIndicatorStyle fillColor="#A7010E"/>
            </RadialBarIndicator>
            <RadialNeedle v-tkRadialScaleIndicators :value="gaugeValue"/>
          </RadialScale>
        </RadRadialGauge>
      </StackLayout>
      <Button class="btn-primary enviar" text="Enviar" @tap="send"/>
    </StackLayout>
  </Page>
</template>

<script>
import Vue from "nativescript-vue";

import RadGauge from "nativescript-ui-gauge/vue";
// require the plugin
import {Bluetooth} from '@nativescript-community/ble';


import * as application from "@nativescript/core/application";

var bluetooth = new Bluetooth();

Vue.use(RadGauge);

import Lists from './Lists';
import {mapMutations, mapGetters} from 'vuex';

export default {
  computed: mapGetters(['listDevices']),
  data() {
    return {
      gaugeValue: 0,
      enviar: false,
      isConnect: false,
      isStopConnect: false,
      dispositivos: []
    };
  },
  methods: {
    ...mapMutations(['SET_LIST_OF_ITEMS']),

    /**
     * navegation page list
     */
    goToPageList() {
      this.$navigateTo(Lists);
    },

    /**
     * conectar no bluetooth
     */
    ckeckBluetooth() {
      bluetooth.isBluetoothEnabled().then((check) => {
        if (!check) {
          console.log('bluetooth não foi ativado');
          bluetooth.enable().then((enabled) => {
            switch (enabled) {
              case true:
                alert({
                  title: 'Bluetooth',
                  message: 'O bluetooth foi ativado',
                  okButtonText: 'Ok'
                }).then(() => {
                  console.log('bluettoth está ligado')
                })
                break;
              case false:
                alert({
                  title: 'Bluetooth',
                  message: 'O bluetooth não foi ativado, app será encerrado',
                  okButtonText: 'Ok'
                }).then(() => {
                  console.log('bluettoth não foi ligado')
                  application.android.foregroundActivity.finish();
                })
            }
          });
        } else {
          console.log('bluetooth ja esta ativado');
        }
      });
    },

    connect() {
      bluetooth.startScanning({
        serviceUUIDs: [],
        seconds: 5,
        onDiscovered: (peripheral) => {
          console.log("Periperhal encontrado com UUID:" + peripheral.advertismentData.serviceUUIDs);
          console.log(peripheral.advertismentData.localName);
          console.log(peripheral.RSSI);
          this.SET_LIST_OF_ITEMS(peripheral);
          this.isConnect = true;
        }
      }).then(() => {

        console.log("digitalização completa");
        alert({
          title: 'digitalização completa',
          message: 'quantidade de dispositivos foi encontrado:' + ':' +this.listDevices,
          okButtonText: 'Ok'
        });

        this.isConnect = false;
        this.isStopConnect = false;

      }, (err) => {
        console.log("erro durante a digitalização: " + err);
      });
    },
    stopConnect() {
      bluetooth.stopScanning().then(() => {
        console.log("parou scanning");
        this.isStopConnect = true;
      });
    },

    send() {
      console.log("Button was pressed");
      this.gaugeValue = this.gaugeValue + 1 % 7;
      this.enviar = true;
    },
  }
}
</script>
<style scoped>
.action-bar {
  background-color: #007bff;
  color: #ffffff;
  font-weight: normal;
}

.home-panel {
  padding-top: 100px;
  padding-bottom: 100px;
}

.btn-primary {
  width: 75%;
  border-radius: 99px;
  border-width: 2px;
  font-weight: bold;
}

.conectar {
  border-color: #9DCA56;
  color: #9DCA56;
  background-color: #ffffff;
  margin-bottom: 100px;
}

.conectar.stop {
  color: #A7010E;
  border-color: #A7010E;
  margin-bottom: 50px;
}

.conectar.active {
  background-color: #9DCA56;
  color: #ffffff;
}

.conectar.stop.active {
  background-color: #A7010E;
  color: #ffffff;
}

.enviar {
  border-color: #007bff;
  background-color: #fff;
  color: #007bff;
}

.enviar.active {
  background-color: #007bff;
  color: #ffffff;
}
</style>
