<template>
  <v-container class="pa-0">
    <v-layout class="mt-3">
      <v-flex xs12 sm6 md3>
        <v-select
          v-model="searchStatus"
          :items="filter_status"
          label="설문 상태 필터"
          outline
        ></v-select>
      </v-flex>
      <v-flex ml-2 xs12 sm6 md3>
        <v-text-field
          label="제목 검색"
          outline
          height="60px"
          v-model="searchTitle"
        ></v-text-field>
      </v-flex>
      <v-flex text-xs-right xs12>
        <v-btn top large class="primary">
          <v-icon dark>add</v-icon>
          새로 만들기
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="filteredSurveys"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.surveyId }}</td>
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.num_participate }}</td>
            <td class="text-xs-right">{{ props.item.num_max_participate }}</td>
            <td class="text-xs-right">{{ props.item.time_period }}</td>
            <td class="text-xs-right">{{ props.item.status }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'SurveyList',
    computed: {
      filteredSurveys() {
        if (this.searchStatus == '모든 설문' && this.searchTitle == '') {
          return this.loadedSurveys
        } else if (this.searchStatus != '모든 설문' && this.searchTitle == '') {
          return this.loadedSurveys.filter(survey => {
            return survey.status == this.searchStatus
          })
        } 
        else if (this.searchStatus != '모든 설문' && this.searchTitle ) {
          return this.loadedSurveys.filter(survey =>{
            return survey.status == this.searchStatus && survey.title.toLowerCase().includes(this.searchTitle.toLowerCase())
          })
        } else if (this.searchStatus == '모든 설문' && this.searchTitle) {
          return this.loadedSurveys.filter(survey => {
            return survey.title.toLowerCase().includes(this.searchTitle.toLowerCase())
          })
        }
      }
    },
    data () {
      return {
        filter_status: ['모든 설문','작성중','심사 대기중','진행중','완료'],
        searchStatus: '모든 설문',
        searchTitle: '',
        headers: [
          {
            text: 'ID',
            align: 'left',
            sortable: false,
            value: 'surveyId'
          },
          { text: '제목', value: 'title', align: 'left', sortable: false},
          { text: '참여인원', value: 'num_participate', align: 'right' },
          { text: '최대참여인원', value: 'num_max_participate', align: 'right' },
          { text: '설문기간', value: 'time_period', align: 'right' },
          { text: '상태', value: 'status', align: 'right' }
        ],
        loadedSurveys: [
          {
            value: false,
            surveyId: '1',
            title: '예시 제목 1',
            num_max_participate: 120,
            num_participate: 24,
            time_period: '2018-07-12 00:00:00.0 ~ 2018-08-12 00:00:00.0',
            status: '작성중'
          },
          {
            value: false,
            surveyId: '2',
            title: '예시 제목 2',
            num_max_participate: 99,
            num_participate: 37,
            time_period: '2018-07-12 00:00:00.0 ~ 2018-08-12 00:00:00.0',
            status: '심사 대기중'
          },
          {
            value: false,
            surveyId: '3',
            title: '예시 제목 3',
            num_max_participate: 33,
            num_participate: 23,
            time_period: '2018-07-12 00:00:00.0 ~ 2018-08-12 00:00:00.0',
            status: '진행중'
          },
          {
            value: false,
            surveyId: '4',
            title: '예시 제목 4',
            num_max_participate: 98,
            num_participate: 67,
            time_period: '2018-07-12 00:00:00.0 ~ 2018-08-12 00:00:00.0',
            status: '완료'
          },
          {
            value: false,
            surveyId: '5',
            title: '예시 제목 5',
            num_max_participate: 75,
            num_participate: 49,
            time_period: '2018-09-01 00:00:00.0 ~ 2018-08-12 00:00:00.0',
            status: '작성중'
          },
          {
            value: false,
            surveyId: '6',
            title: '예시 제목 6',
            num_max_participate: 96,
            num_participate: 94,
            time_period: '2018-02-12 00:00:00.0 ~ 2018-08-12 00:00:00.0',
            status: '진행중'
          },
          {
            value: false,
            surveyId: '7',
            title: '예시 제목 7',
            num_max_participate: 160,
            num_participate: 98,
            time_period: '2018-07-12 00:00:00.0 ~ 2018-08-12 00:00:00.0',
            status: '심사대기중'
          },
          {
            value: false,
            surveyId: '8',
            title: '예시 제목 8',
            num_max_participate: 444,
            num_participate: 87,
            time_period: '2018-08-12 00:00:00.0 ~ 2018-08-12 00:00:00.0',
            status: '진행중'
          },
          {
            value: false,
            surveyId: '9',
            title: '예시 제목 9',
            num_max_participate: 214,
            num_participate: 51,
            time_period: '2018-07-12 00:00:00.0 ~ 2018-08-12 00:00:00.0',
            status: '작성중'
          },
          {
            value: false,
            surveyId: '10',
            title: '예시 제목 10',
            num_max_participate: 424,
            num_participate: 65,
            time_period: '2018-07-15 00:00:00.0 ~ 2018-08-12 00:00:00.0',
            status: '완료'
          }
        ]
      }
    }
  }
</script>

<style>
</style>

