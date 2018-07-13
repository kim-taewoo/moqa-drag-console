<template>
  <v-container fill-height class="pa-0 ma-0" fluid>
    <v-layout>
      <v-flex xs12>
        <v-stepper v-model="e1" style="height: 100%;">
          <v-stepper-header>
            <div class="stepper-header-header justify-center">
              <v-badge left color="green">
                <span slot="badge">퀵</span>
                <h3 class="title">설문 제목</h3>
              </v-badge>
            </div>
            <v-stepper-step :complete="e1 > 1" step="1">기본 설정</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">설문 디자인</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">배포하기</v-stepper-step>
            <div class="stepper-header-footer justify-end">
              <v-btn v-show="e1 !=3" class="primary" @click="e1++">다음 <v-icon>arrow_forward</v-icon></v-btn>
            </div>
          </v-stepper-header>

          <v-stepper-items style="height: 100%">
            <v-stepper-content step="1" style="height:100%;">
              <v-card
                class="mb-5"
                color="grey lighten-1"
                height="80vh"
              ></v-card>

            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                class="mb-5"
                color="grey lighten-1"
                height="80vh"
              ></v-card>

            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                class="mb-5"
                color="grey lighten-1"
                height="80vh"
              ></v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'BasicSetting',
    data () {
      return {
        items: [
          {
            text: 'Dashboard',
            disabled: false
          },
          {
            text: 'Link 1',
            disabled: false
          },
          {
            text: 'Link 2',
            disabled: true
          }
        ],
        e1: 0
      }
    }
  }
</script>

<style>
.stepper-header-header {
  display: inline-flex;
  display: -webkit-inline-box;
  align-items: center;
  -webkit-box-align: center;
  width: 16%;
}
.stepper-header-footer {
  display: inline-flex;
  display: -webkit-inline-box;
  align-items: center;
  -webkit-box-align: center;
  width: 16%;
}
</style>

