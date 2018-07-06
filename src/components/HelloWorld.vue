<template>
  <v-container fluid full-height class="pa-2">
    <v-layout>
      <v-card id="edit-console" class="ma-2 pa-2" height="100%">
        <v-container class="pa-0">
          <v-layout row wrap>
            <draggable :list="types" :options="{draggable: '.drag-item'}">
              <v-card class="ma-1 pa-1 secondary drag-item" dark text v-for="type in types" :key="type.identifier">
                <v-card-title class="py-0 px-1">
                  <v-icon>add</v-icon>
                  <div class="title">{{ type.title }}</div>
                </v-card-title>
              </v-card>
            </draggable>
          </v-layout>
        </v-container>
      </v-card>
      <v-card id="main-workplace" class="ma-2 pa-2" height="100%">

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
    data () {
      return {
        types: [
          { identifier: 0, title: '객관식' },
          { identifier: 1, title: '주관식' },
          { identifier: 2, title: '별점형' },
          { identifier: 3, title: '동영상' },
          { identifier: 4, title: '퀴즈형' },
          { identifier: 5, title: '순위형' },
          { identifier: 6, title: '링크' }
        ]
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
</style>