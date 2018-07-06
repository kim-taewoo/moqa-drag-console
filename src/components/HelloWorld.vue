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
          <draggable @start="isDragging=true" @end="isDragging=false" xs12 element="v-flex" v-model="types" :options="{draggable: '.drag-item', ghostClass:'ghost', group:{ name: 'questions', pull: 'clone', put: false}}">
            <v-card class="ma-1 pa-1 secondary drag-item" dark text v-for="(type, index) in types" :key="index">
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
          <draggable xs12 class="main-workplace" xs6 element="v-flex" v-model="workplace" :options="{draggable: '.drag-item', ghostClass:'ghost', scrollSensitivity: 80, scrollSpeed: 30, group: { name: 'questions'}}">
            <v-card class="ma-1 pa-1 secondary drag-item" dark text v-for="(work,index) in workplace" :key="index">
              <v-card-title class="py-0 px-1 question">
                <v-icon>add</v-icon>
                <div class="title">{{ work.title }}</div>
              </v-card-title>
            </v-card>
          </draggable>
        </v-layout>
      </v-card>
      <v-card id="survey-preview" class="ma-2 pa-2" height="100%">

      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    components: {
      draggable
    },
    methods: {
      checkMove (e) {
        console.log(e)
        console.log('data1', this.types, 'data2', this.workplace)
      },
      onMove ({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      }
    },
    data () {
      return {
        types: [
          { id: 0, title: '객관식' },
          { id: 1, title: '주관식' },
          { id: 2, title: '별점형' },
          { id: 3, title: '동영상' },
          { id: 4, title: '퀴즈형' },
          { id: 5, title: '순위형' },
          { id: 6, title: '링크' }
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
</style>