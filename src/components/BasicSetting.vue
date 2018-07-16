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
            <v-stepper-content step="1" style="height:100%; background:#eee">
              <v-container :class="{'pa-0': $vuetify.breakpoint.smAndDown}">
                <v-layout justify-center>
                  <v-flex xs12 sm10 md8 lg6>
                    <h3 class="headline pa-2"><v-icon class="black--text">create</v-icon> 시작하기</h3>
                    <v-card ref="form">
                      <v-card-text>
                        <form action="">
                          <v-text-field
                            ref="title"
                            v-model="title"
                            :rules="[
                              () => !!title || '필수 입력란입니다.',
                              () => !!title && title.length <=25 || '제목은 30자보다 길 수 없습니다.'
                            ]"
                            :error-messages="errorMessages"
                            label="설문 제목"
                            placeholder="프로젝트 이름을 정해주세요"
                            required
                            counter="30"
                          ></v-text-field>
                          <v-text-field
                            ref="reward"
                            :rules="[
                              () => !!reward || '필수 입력란입니다.',
                              addressCheck
                            ]"
                            v-model="reward"
                            label="지급 리워드"
                            placeholder="설문 리워드를 설정해주세요"
                            required
                          ></v-text-field>
                          <v-text-field
                            ref="city"
                            :rules="[() => !!city || '필수 입력란입니다.', addressCheck]"
                            v-model="city"
                            label=""
                            placeholder="자격요건이 안 될 때 리워드를 설정해주세요."
                            required
                          ></v-text-field>
                          <v-text-field
                            ref="state"
                            v-model="state"
                            :rules="[() => !!state || '필수 입력란입니다.']"
                            label="State/Province/Region"
                            required
                            placeholder="TX"
                          ></v-text-field>
                          <v-text-field
                            ref="zip"
                            :rules="[() => !!zip || '필수 입력란입니다.']"
                            v-model="zip"
                            label="ZIP / Postal Code"
                            required
                            placeholder="79938"
                          ></v-text-field>
                          <v-autocomplete
                            ref="country"
                            :rules="[() => !!country || '필수 입력란입니다.']"
                            :items="countries"
                            v-model="country"
                            label="Country"
                            placeholder="Select..."
                            required
                          ></v-autocomplete>
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
        countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
      errorMessages: [],
      title: null, 
      address: null,
      city: null,
      state: null,
      zip: null,
      country: null,
      formHasErrors: false
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
      }
    },
    watch: {
      name () {
        this.errorMessages = []
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

