<template>
  <Page @loaded="ckeckBluetooth">
    <ActionBar title="Medidor de temperatura" class="action-bar"/>

    <StackLayout class="home-panel p-20">
      <Button class="conectar" text="Encontrar" @tap="connect"/>
      <StackLayout height="700px">
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
      <Button class="enviar" text="Enviar" @tap="send"/>
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

export default {

  data() {
    return {
      gaugeValue: 0,
      enviar: false,
      conectado: false,
      dispositivos: []
    };
  },
  methods: {
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
        filters: [{serviceUUID: '180d'}, {serviceUUID: '180F'}],
        seconds: 4,
        onDiscovered: function (peripheral) {
          console.log("Periperhal encontrado com UUID:" + peripheral.UUID);
        }
      }).then(function (response) {

        console.log("digitalização completa" + response);

      }, function (err) {
        console.log("erro durante a digitalização: " + err);
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
  padding-top: 150px;
  padding-bottom: 150px;
}

.conectar {
  width: 75%;
  border-radius: 99px;
  border-width: 2px;
  border-color: #9DCA56;
  color: #9DCA56;
  background-color: #ffffff;
  font-weight: bold;
  margin-bottom: 300px;
}

.conectar.active {
  background-color: #9DCA56;
  color: #ffffff;
}

.enviar {
  width: 75%;
  border-radius: 99px;
  border-width: 2px;
  border-color: #007bff;
  background-color: #fff;
  color: #007bff;
  font-weight: bold;
  margin-top: 300px;
}

.enviar.active {
  background-color: #007bff;
  color: #ffffff;
}
</style>
