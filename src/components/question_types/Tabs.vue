<template>
  <v-expansion-panel v-model="panel" expand>
    <v-expansion-panel-content>
      <div slot="header">Q{{index+1}}. 객관식<small class="gray--text"> (텍스트)</small></div>
      <div slot="actions"><v-icon class="white--text">keyboard_arrow_down</v-icon> </div>
      <v-tabs
        v-model="active"
        color="cyan"
        dark
        slider-color="yellow"
        fixed-tabs
      >
        <v-tab ripple>
          문항
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-container>
              <v-layout wrap justify-end>
                <v-flex xs12>
                  <v-text-field label="제목"></v-text-field>
                </v-flex>
                <v-flex xs9 v-for="(option,index) in options" :key="index">
                  <v-text-field @click:append="deleteOption(option)" append-icon="delete" :label="(index+1).toString()" v-model="options[index]"></v-text-field>
                </v-flex>
                <v-flex xs9>
                  <v-text-field label="선택지 추가" v-model="anotherOption" @keydown.tab.prevent="addOption"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab
          v-for="tab in tabs"
          :key="tab.order"
          ripple
        >
          {{tab.title}}
        </v-tab>
        <v-tab-item
          v-for="tab in tabs"
          :key="tab.order"
        >
          <v-card flat>
            <v-card-text>{{ tab.content }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
      
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  export default {
    created () {
      console.log(this.tabs)
    },
    props: ['index'],
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
        options: [],
        panel: [true],
        tabs: [
          {
            order: 2,
            title: '옵션',
            content: '내용이 들어갈 자리2'
          },
          {
            order: 3,
            title: '로직',
            content: '내용이 들어갈 자리3'
          },
        ],
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
</style>
