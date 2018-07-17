<template>
  <v-container fill-height class="pa-0 ma-0" fluid>
    <v-layout>
      <v-flex xs12>
        <v-stepper v-model="e1" style="height: 100%;">
          <v-stepper-header>
            <!-- 작은 화면에서 사라지게 하고 밑으로 위치를 옮길 필요가 있음 -->
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
              <v-container :class="{'pa-0': $vuetify.breakpoint.smAndDown}" grid-list-lg>
                <v-layout justify-center wrap>
                  <v-flex xs12 sm10 md8 lg6>
                    <h3><v-icon>create</v-icon> 기본사항</h3>
                    <v-card ref="form" class="mt-2">
                      <v-card-text>                                                  
                        <form action="">
                          <v-container py-0 grid-list-md >
                            <v-layout row wrap>  
                                <v-flex xs12>
                                  <v-text-field
                                    ref="title"
                                    v-model="title"
                                    :rules="[
                                      () => !!title || '필수 입력란입니다.',
                                      () => !!title && title.length <=25 || '제목은 30자보다 길 수 없습니다.'
                                    ]"
                                    :error-messages="errorMessages"
                                    label="프로젝트 이름"
                                    required
                                    counter="30"
                                  ></v-text-field>
                                </v-flex>

                                <v-flex xs12 lg6>
                                  <v-menu
                                    ref="menu1"
                                    :close-on-content-click="false" 
                                    v-model="menu1"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                                  >
                                    <v-text-field
                                      slot="activator"
                                      v-model="dateFormatted"
                                      label="시작하는 날"
                                      hint="예) 20XX-XX-XX"
                                      persistent-hint
                                      prepend-icon="event"
                                      @blur="date = parseDate(dateFormatted)"
                                    ></v-text-field>
                                    <v-date-picker 
                                      v-model="date" 
                                      no-title 
                                      locale="ko-kr" 
                                      @input="menu1 = false"
                                      :min="new Date(new Date().setDate(new Date().getDate()-1)).toJSON()">
                                    </v-date-picker>
                                  </v-menu>
                                </v-flex>

                                <v-flex xs12 lg6>
                                  <v-menu
                                    ref="menu2"
                                    :close-on-content-click="false" 
                                    v-model="menu2"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                                  >
                                    <v-text-field
                                      slot="activator"
                                      v-model="dateFormattedEnd"
                                      label="끝나는 날"
                                      hint="예) 20XX-XX-XX"
                                      persistent-hint
                                      prepend-icon="event"
                                      @blur="date2 = parseDate(dateFormattedEnd)"
                                    ></v-text-field>
                                    <v-date-picker 
                                      v-model="date2" 
                                      no-title 
                                      locale="ko-kr" 
                                      @input="menu2 = false"
                                      :min="dateFormatted">
                                      </v-date-picker>
                                  </v-menu>
                                </v-flex>
                            
                                <v-flex xs9 mt-3>
                                  <v-slider
                                    v-model="reward"
                                    :max="500"
                                    label="답변 리워드"
                                    thumb-label="always"
                                  >
                                  </v-slider>
                                </v-flex>
                                <v-flex xs3 mt-3>
                                  <v-text-field
                                    v-model="reward"
                                    class="mt-0"
                                    type="number"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex xs9>
                                  <v-slider
                                    v-model="stopReward"
                                    :max= reward
                                    label="중단 리워드"
                                    thumb-label="always"
                                  >
                                  </v-slider>
                                </v-flex>
                                <v-flex xs3>
                                  <v-text-field
                                    v-model="stopReward"
                                    class="mt-0"
                                    type="number"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                  <v-text-field
                                    ref="state"
                                    v-model="state"
                                    :rules="[() => !!state || '필수 입력란입니다.']"
                                    label="설문 기관"
                                    required
                                  ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                  <v-textarea
                                    name="input-7-1"
                                    label="설문 설명"
                                    auto-grow
                                    v-model="description"
                                    row-height="12"
                                  ></v-textarea>
                                </v-flex>


                            </v-layout>
                          </v-container>
                        </form>
                      </v-card-text>


                        <!-- <v-divider class="mt-5"></v-divider>
                        <v-card-actions>
                          <v-btn flat>Cancel</v-btn>
                          <v-spacer></v-spacer>
                          <v-slide-x-reverse-transition>
                            <v-tooltip
                              v-if="formHasErrors"
                              left
                            >
                              <v-btn
                                slot="activator"
                                icon
                                class="my-0"
                                @click="resetForm"
                              >
                                <v-icon>refresh</v-icon>
                              </v-btn>
                              <span>Refresh form</span>
                            </v-tooltip>
                          </v-slide-x-reverse-transition>
                          <v-btn color="primary" flat @click="submit">Submit</v-btn>
                        </v-card-actions> -->
                    </v-card>
                  </v-flex>


                  <v-flex xs12 sm10 md8 lg6 :class="{'mt-3': $vuetify.breakpoint.mdAndDown}">
                    <h3><v-icon>face</v-icon> 응답 대상자 설정</h3>
                    <v-card class="mt-2">
                      <v-card-text>
                        <form>
                          <v-container py-0 grid-list-md>
                            <v-layout row wrap>
                              <v-flex xs9 mt-3>
                                <v-slider
                                  v-model="maxParticipate"
                                  :max="5000"
                                  label="최대 참여 인원"
                                  thumb-label="always"
                                >
                                </v-slider>
                              </v-flex>
                              <v-flex xs3 mt-3>
                                <v-text-field
                                  v-model="maxParticipate"
                                  class="mt-0"
                                  type="number"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12>
                                <v-autocomplete
                                  ref="targetGroup"
                                  :rules="[() => !!targetGroup || '필수 입력란입니다.']"
                                  :items="targetGroups"
                                  v-model="targetGroup"
                                  label="나의 맞춤타겟에서 가져오기"
                                ></v-autocomplete>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </form>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>

              </v-container>
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
      e1: 0,
      targetGroups: [
        "나의 맞춤타겟1",
        "나의 맞춤타겟2",
        "나의 맞춤타겟3",
        "나의 맞춤타겟4",
        "나의 맞춤타겟5"
      ],
      targetGroup: null,
      errorMessages: [],
      title: null, 
      state: null,
      description: null,
      formHasErrors: false,
      reward: 5,
      stopReward: 0,
      date: null,
      date2: null,
      dateFormatted: null,
      dateFormattedEnd: null,
      menu1: false,
      menu2: false,
      maxParticipate: 1000
      }
    },
    computed: {
      form () {
        return {
          name: this.name,
          address: this.address,
          city: this.city,
          state: this.state,
          zip: this.zip,
          country: this.country
        }
      },
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },
    watch: {
      name () {
        this.errorMessages = []
      },
      date (val) {
        this.dateFormatted = this.date
      },
      date2 (val) {
        this.dateFormattedEnd = this.date2
      }
    },
    methods: {
      addressCheck () {
        this.errorMessages = this.address && !this.name
          ? ['Hey! I\'m required']
          : []

        return true
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
        })
      },
      // formatDate (date) {
      //   if (!date) return null

      //   const [year, month, day] = date.split('-')
      //   return `${year}-${month}-${day}`
      // },
      parseDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
  }
</script>

<style>
.stepper-header-header {
  display: inline-flex;
  align-items: center;
  width: 16%;
  justify-content: center;
}
.stepper-header-footer {
  display: inline-flex;
  align-items: center;
  width: 16%;
  justify-content: flex-end;
}
.v-stepper__wrapper {
  width: 100%;
  height: 100%;
}
</style>

