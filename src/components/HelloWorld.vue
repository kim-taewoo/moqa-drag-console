<template>
  <v-container fluid full-height class="pa-2">
    <v-layout>
      <v-card id="edit-console" class="ma-2 pa-2" height="100%">
        <v-layout row wrap>
          <v-flex xs12>
            <h2 class="primary--text text--darken-2 mx-1">편집 툴</h2>
          </v-flex>
        </v-layout>
        <v-layout>
          <draggable @start="isDragging=true" @end="isDragging=false" xs12 element="v-flex" v-model="types" :options="{draggable: '.drag-item', sort: false, ghostClass:'ghost', group:{ name: 'questions', pull: 'clone', put: false}}">
            <v-card :id="type.id" class="ma-1 pa-1 secondary drag-item console-card" dark text v-for="(type, index) in types" :key="index">
              <v-card-title class="py-0 px-1">
                <v-icon>add</v-icon>
                <div class="title">{{ type.title }}</div>
              </v-card-title>
            </v-card>
          </draggable>
        </v-layout>
      </v-card>
      <v-card id="main-workplace" class="ma-2 pa-2" height="100%">
        <v-layout>
          <v-flex xs12>
            <h2 class="primary--text text--darken-2 mx-1">작업 공간</h2>
          </v-flex>
        </v-layout>
        <v-layout justify-center>
          <draggable @change="checkAdd" xs12 class="main-workplace" xs6 element="v-flex" v-model="workplace" :options="{draggable: '.drag-item', ghostClass:'ghost', scrollSensitivity: 80, scrollSpeed: 30, group: { name: 'questions'}}">
            <v-card class="mx-5 my-3 secondary drag-item workplace-card" dark text v-for="(work,index) in workplace" :key="index">
              <component :is="work.comp" :work="work"></component>
            <!-- <v-tabs
              v-model="active"
              color="cyan"
              dark
              slider-color="yellow"
            >
              <v-tab
                v-for="n in 3"
                :key="n"
                ripple
              >
                Item {{ work.title }}

              </v-tab>
              <v-tab-item
                v-for="n in 3"
                :key="n"
              >
                <v-card flat>
                  <v-card-text>{{ text }}</v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs> -->
            </v-card>
          </draggable>
        </v-layout>
      </v-card>
      <v-card id="survey-preview" class="ma-2 pa-2" height="100%">
        <v-layout row wrap>
          <v-flex xs12>
            <h2 class="primary--text text--darken-2 mx-1">미리보기</h2>
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  import draggable from 'vuedraggable'
  import tabs from './Tabs'
  import simpleCard from './SimpleCard'

  export default {
    components: {
      draggable,
      tabs,
      'simple-card': simpleCard
    },
    methods: {
      checkAdd (e) {
        console.log(e)
        console.log(this.workplace)
      },
      next () {
        const active = parseInt(this.active)
        this.active = (active < 2 ? active + 1 : 0)
      }
    },
    data () {
      return {
        types: [
          { id: 0, title: '객관식', comp: 'tabs' },
          { id: 1, title: '주관식', comp: null},
          { id: 2, title: '별점형', comp: 'simple-card' },
          { id: 3, title: '동영상', comp: null },
          { id: 4, title: '퀴즈형', comp: null },
          { id: 5, title: '순위형', comp: null },
          { id: 6, title: '링크', comp: null }
        ],
        workplace: [
        ],
        isDragging: false
      }
    }
  }  
</script>

<style>
  #edit-console {
    min-height: 505px;
    width: 20%;
  }
   #main-workplace {
     min-height: 505px;
     width: 55%;
   }
   #survey-preview {
     min-height: 505px;
     width: 25%
   }
   .main-workplace {
     min-height: 200px;
   }
   .ghost {
    opacity: .5;
    background: #C8EBFB;
   }
   .question {
     height: 200px;
   }
   .console-card {
     cursor: pointer;
   }
   .workplace-card {
     cursor: pointer;
   }
</style>