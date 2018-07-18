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

            <v-stepper-step :complete="e1 > 1" step="1" editable>기본 설정</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2" editable>설문 디자인</v-stepper-step>

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
                                <!-- 날짜 및 '리워드' 유효하지 않은 값을 입력했을 경우 경고 후 리셋 하도록 로직 설정이 필요함 -->
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
                    <h3><v-icon>how_to_reg</v-icon> 응답 대상자 설정</h3>
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
                                  :items="targetGroups"
                                  v-model="targetGroup"
                                  label="나의 맞춤타겟 가져오기"
                                ></v-autocomplete>
                              </v-flex>
                              <v-flex class="xs9" @click.stop="newTargetDialog = true">
                                <v-text-field readonly disabled label="새로 대상 설정하기" >

                                </v-text-field>
                              </v-flex>
                              <v-flex class="xs3">
                                <v-dialog v-model="newTargetDialog" scrollable persistent fullscreen hide-overlay transition="dialog-bottom-transition">
                                  <v-btn slot="activator" color="primary" ref="newTargetBtn">설정</v-btn>
                                  <v-card>
                                    <!-- <v-toolbar class="primary" dark dense>
                                      <v-toolbar-title>타겟 설정</v-toolbar-title>
                                      <v-spacer></v-spacer>
                                      <v-btn icon dark @click.native="newTargetDialog = false">
                                        <v-icon>close</v-icon>
                                      </v-btn>
                                    </v-toolbar> -->
                                    <v-card-title class="primary white--text title">
                                      <v-icon dark>people</v-icon>
                                      타겟설정
                                      <v-spacer></v-spacer>
                                      <v-dialog max-width="290" persistent v-model="addTargetDialog">
                                        <v-btn slot="activator" flat dark>현재 설정 맞춤타겟에 추가</v-btn>
                                        <v-card>
                                          <v-card-title>맞춤타겟에 추가</v-card-title>
                                          <v-card-text>
                                            <v-text-field v-model="addedTargetGroup" counter="25" label="맞춤타겟 이름"></v-text-field>
                                          </v-card-text>
                                          <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="green darken-1" flat @click.native="addTargetDialog = false">취소</v-btn>
                                            <v-btn color="green darken-1" flat @click.native="addTargetDialog = false">저장</v-btn>
                                          </v-card-actions>
                                        </v-card>
                                      </v-dialog>
                                      <v-btn dark class="subheading" flat @click.native="newTargetDialog = false">
                                        적용하기
                                      </v-btn>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text>
                                      <v-container class="pa-0">
                                        <v-layout justify-center>
                                          <v-flex xs12 sm10 md8>
                                            <template v-for="(item, index) in newTargetOptions">
                                              <v-subheader v-if="item.header" :key="item.header" class="primary--text">{{ item.header }}</v-subheader>
                                              <div class="px-3" v-else-if="item.options" :key="index">
                                                <v-layout wrap>
                                                  <v-flex xs12 wrap sm4 v-for="(option,index2) in item.options" :key="index2">
                                                    <v-checkbox :label="option" hide-details></v-checkbox>
                                                  </v-flex>
                                                </v-layout>
                                              </div>
                                              <v-divider v-else-if="item.divider" :key="index"></v-divider>
                                            </template>
                                            <v-layout wrap>
                                              <v-flex xs12 class="px-3">
                                                <v-subheader class="px-0 primary--text">직업</v-subheader>
                                                <!-- <v-autocomplete
                                                  ref="job"
                                                  :items="jobs"
                                                  v-model="job"
                                                  label="직업군 검색하기"
                                                ></v-autocomplete> -->
                                                <v-layout wrap>
                                                    <v-flex xs12 sm4 v-for="(job,index) in jobs" :key="index">
                                                      <v-checkbox :label="job" :value="job" v-model="selectedJob" hide-details></v-checkbox>
                                                    </v-flex>
                                                </v-layout>
                                              </v-flex>
                                              <v-flex xs12>
                                                <v-divider></v-divider>
                                              </v-flex>
                                              <v-flex xs12 class="px-3">
                                                <v-subheader class="px-0 primary--text">최종학력</v-subheader>
                                                  <!-- <v-autocomplete
                                                    ref="education"
                                                    :items="educations"
                                                    v-model="education"
                                                    label="학력 검색하기"
                                                  ></v-autocomplete> -->
                                                  <v-layout wrap>
                                                    <v-flex xs12 sm4 v-for="(education,index) in educations" :key="index">
                                                      <v-checkbox :label="education" :value="education" v-model="selectedEducation" hide-details></v-checkbox>
                                                    </v-flex>
                                                  </v-layout>
                                              </v-flex>
                                              <v-flex xs12>
                                                <v-divider></v-divider>
                                              </v-flex>
                                              <v-flex xs12>
                                                <v-subheader class="primary--text">통신사</v-subheader>
                                                <v-layout wrap class="px-3">
                                                  <v-flex xs12 sm4 v-for="(cellphone,index) in cellphones" :key="index">
                                                    <v-checkbox :label="cellphone" v-model="selectedCellphone" :value="cellphone" hide-details></v-checkbox>
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>
                                              <v-flex class="xs12">
                                                <v-divider></v-divider>
                                              </v-flex>
                                              <v-flex xs12>
                                                <v-subheader class="primary--text">개인소득수준</v-subheader>
                                                <v-layout wrap class="px-3">
                                                  <v-flex xs12 sm4 v-for="(indIncome,index) in indIncomes" :key="index">
                                                    <v-checkbox :label="indIncome" v-model="selectedIndIncome" :value="indIncome" hide-details></v-checkbox>
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>
                                              <v-flex xs12>
                                                <v-subheader class="primary--text">가구소득수준</v-subheader>
                                                <v-layout wrap class="px-3">
                                                  <v-flex xs12 sm4 v-for="(famIncome,index) in famIncomes" :key="index">
                                                    <v-checkbox :label="famIncome" v-model="selectedFamIncome" :value="famIncome" hide-details></v-checkbox>
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>
                                            </v-layout>
                                          </v-flex>
                                        </v-layout>
                                      </v-container>
                                    </v-card-text>
                                  </v-card>
                                </v-dialog>
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
      maxParticipate: 1000,
      newTargetDialog: false,
      addTargetDialog: false,
      addedTargetGroup: null,
      selectedJob: [],
      jobs: [
        '전체','경찰/군인/소방관','고등학생','관리직(사장,간부,고위공무원 등)','교직(교사,유치원교사,학원강사 등)','금융업','기능직(자동차정비,운전기사,안경사,택시기사 등)','기타','농업/임업/광업/수산업/축산업','대학생/대학원생','무직','방송인/언론인/기자','사무직(일반사무직,일반 공무원 등)','생산/노무직(생산감독,경비원,공장근로자 등)','서비스직(요식업,숙박업,미용실근로자 등)','자영업 및 개인사업(도소매업,숙박업,미용업,프리랜서 등)','전문직(의사,판검사,예술가,종교인,운동선수 등)','주부','중학생','퇴직/연금생활자','판매직(상점점원,보험설계사,노점상 등','IT/정보통신업'
      ],
      selectedEducation: [],
      educations: [
        '전체','고등학교 재학','고등학교 졸업','대학교 재학','대학교 졸업','대학원(박사)','대학원(석사)','전문대 재학','전문대 졸업','중학교 재학','중학교 졸업','초등학교 재학','초등학교 졸업'
      ],
      selectedCellphone: [],
      cellphones: ['전체','기타','KT','LG U+','SKT'],
      selectedIndIncome: [],
      indIncomes: [
        '월 200만원 이상 ~ 월 300만원 미만','월 300만원 이상 ~ 월 400만원 미만','월 400만원 이상 ~ 월 500만원 미만','월 500만원 이상 ~ 월 600만원 미만','월 600만원 이상 ~ 월 700만원 미만','월 700만원 이상 ~ 월 800만원 미만','월 800만원 이상 ~ 월 900만원 미만','월 900만원 이상 ~ 월 1000만원 미만'
      ],
      selectedFamIncome: [],
      famIncomes: [
        '월 200만원 이상 ~ 월 300만원 미만','월 300만원 이상 ~ 월 400만원 미만','월 400만원 이상 ~ 월 500만원 미만','월 500만원 이상 ~ 월 600만원 미만','월 600만원 이상 ~ 월 700만원 미만','월 700만원 이상 ~ 월 800만원 미만','월 800만원 이상 ~ 월 900만원 미만','월 900만원 이상 ~ 월 1000만원 미만'
      ],
      newTargetOptions: [
        { header: '성별' },
        { 
          options: [
            '전체','남자','여자'
          ]
        },
        { divider: true },
        { header: '연령대' },
        {
          options: [
            '전체','10대','20대','30대','40대','50대','60대 이상'
          ]
        },
        { divider: true },
        { header: '거주지역'},
        {
          options: [
            '전지역','강원도','경기도','경상남도','경상북도','광주광역시','대구광역시','대전광역시','부산광역시','서울특별시','세종특별자치시','울산광역시','인천광역시','전라남도','전라북도','제주특별자치도','충청남도','충청북도'
          ]
        },
        { divider: true },
        { header: '결혼여부' },
        {
          options: [
            '전체','기타','기혼','미혼'
          ]
        },
        { divider: true },
        { header: '가구구성' },
        {
          options: [
            '전체','1인 가구','모','배우자','부','연인','자녀','조부모','친구','형제/자매/남매'
          ]
        },
        { divider: true }
      ]

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
      },
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
.v-list-tile {
  justify-content: flex-start;
}
.v-input--checkbox {
  margin-top: 8px;
}
</style>

