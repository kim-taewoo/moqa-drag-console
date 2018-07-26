<template>
  <v-expansion-panel v-model="panel" expand>
    <v-expansion-panel-content>
      <div slot="header">Q{{questionIndex+1}}. 순위 선택형<small class="gray--text"> (텍스트)</small> <span class="q-title">: {{qTitle}}</span> </div>
      <div slot="actions"><v-icon class="white--text">keyboard_arrow_down</v-icon> </div>
      <v-tabs
        v-model="active"
        color="cyan"
        dark
        slider-color="yellow"
        fixed-tabs
      >
        <v-tab>
          문항
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-container>
              <v-layout wrap justify-center>
                <v-flex xs10>
                  <v-text-field label="제목" v-model="qTitle"></v-text-field>
                </v-flex>
                <v-flex xs9 offset-xs1 v-for="(option,index) in options" :key="index">
                  <v-text-field @click:append="deleteOption(option)" append-icon="delete" :label="(index+1).toString()" v-model="options[index]"></v-text-field>
                </v-flex>
                <v-flex xs9 offset-xs1>
                  <v-text-field label="선택지 (Tab 키로 추가)" v-model="anotherOption" @keydown.tab.prevent="addOption"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>        
      </v-tabs>
      
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>

  export default {
    name: 'RankingText',
    props: ['questionIndex'],
    methods: {
      addOption () {
        if (this.anotherOption) {
          this.options.push(this.anotherOption)
          this.anotherOption = null
          this.feedback = null  
        } else {
          this.feedback = "빈칸 선택지는 사용할 수 없습니다."
        }
      },
      deleteOption (option) {
        this.options = this.options.filter(opt => {
          return opt != option
        })
      }
    },
    data () {
      return {
        rules: {
          option: [
            val => (val || '').length > 0 || this.feedback
          ]
        },
        feedback: null,
        anotherOption: null,
        logicCardOrder: 0,
        logicCards: [],
        options: [],
        logicOption: ['다음문항','자격박탈','설문 종료','3.lorem...'],
        multiselectSwitch: false,
        multiselectMax: 0,
        qTitle: null,
        panel: [true],
        active: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  }
</script>

<style>
.v-expansion-panel__header {
  background:#00BCD4;
  color: white;
}
.header__icon {
  color: white;
}
.q-title {
  max-width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
