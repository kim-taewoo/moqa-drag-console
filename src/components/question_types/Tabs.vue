<template>
  <v-expansion-panel v-model="panel" expand>
    <v-expansion-panel-content>
      <div slot="header">Q{{index+1}}. 객관식<small class="gray--text"> (텍스트)</small> <span class="q-title">: {{qTitle}}</span> </div>
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
        <v-tab>
          옵션
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-container>
              <v-layout wrap justify-center>
                <v-flex xs6>
                  <v-switch
                    label="중복 선택 가능"
                    v-model="multiselectSwitch"
                  ></v-switch>
                </v-flex>
                <v-flex xs3>
                  <v-text-field :disabled="!multiselectSwitch" v-model="multiselectMax" type="number"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab>
          로직
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-container>
              <v-layout justify-center>
                <v-flex xs12>
                  <v-card class="logicCard">
                    <v-layout wrap align-baseline>
                      <v-flex xs12>
                        <p class="mb-2">만약 이 문항 {{index + 1}}의 답변이</p> 
                      </v-flex>
                      <v-flex xs9 align-center>
                        <v-select
                          :items="options"
                          label="답변 고르기"
                          outline
                          hide-details
                          height="30px"
                        ></v-select>
                      </v-flex>
                      <v-flex xs3 align-center class="text-xs-left align-end">
                        <div class="ml-3">이라면</div> 
                      </v-flex>
                      <v-flex xs9 class="mt-2">
                        <v-select height="30px" outline hide-details label="목표 문항 고르기">                          
                        </v-select>
                      </v-flex>
                      <v-flex xs3>
                        <div class="ml-3">으로 간다.</div>
                      </v-flex>
                      <v-flex class="xs12">
                        <p class="my-2">그 밖의 모든 경우</p>
                      </v-flex>
                      <v-flex class="xs9">
                        <v-select height="30px" outline hide-details label="다음 문항" :items="logicOption">
                        </v-select>
                      </v-flex>
                      <v-flex class="xs3">
                        <div class="ml-3">으로 간다.</div>
                      </v-flex>
                    </v-layout>
                  </v-card>
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
        logicOption: ['다음문항','자격박탈','설문 종료','3.lorem...'],
        multiselectSwitch: false,
        multiselectMax: 0,
        qTitle: null,
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
.q-title {
  max-width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
