<template>
  <v-container fluid class="pa-2" style="height:inherit">
    <v-layout fill-height>
      <v-flex class="xs2" style="max-height:100%;over-flow:hidden">
        <v-layout wrap>
          <v-flex class="xs12">
            <v-card id="edit-console" class="ma-2 pa-2" tile>
              <v-flex xs12>
                <h2 class="primary--text text--darken-2 mx-1">질문 카드</h2>
              </v-flex>
              <v-flex class="xs12">
                <v-divider></v-divider>
              </v-flex>
              <draggable 
                @start="isDragging=true" 
                @end="isDragging=false" 
                xs12 
                element="v-flex" 
                v-model="types" 
                :options="{
                  draggable: '.drag-item', 
                  sort: false, 
                  ghostClass:'ghost', 
                  group: { name: 'question_cards', pull: 'clone', put: false}}"
                >
                  <template v-for="type in types">
                    <v-subheader v-if="type.header" :key="type.header" class="mt-2 pl-1" style="height:24px">{{ type.header }}</v-subheader>
                    <v-card 
                      v-else-if="type.title" 
                      :key="type.id"
                      :id="type.id"
                      class="mx-1 my-2 pa-2 drag-item question-card"
                      hover>
                      <v-card-title class="py-0 px-0">
                        <div class="subheading" v-html="type.title"></div>
                        <v-spacer></v-spacer>
                        <v-icon>help_outline</v-icon>
                      </v-card-title>
                    </v-card>
                    <!-- <v-divider v-else-if="type.divider" :key="index"></v-divider> -->
                  </template>

                <!-- <v-card 
                  :id="type.id"                   
                  class="mx-1 my-2 pa-2 drag-item" 
                  text
                  hover
                  v-for="(type, index) in types" :key="index" 
                  style="cursor:pointer;"
                >
                  <v-card-title class="py-0 px-1">
                    <v-icon>add</v-icon>
                    <div class="title">{{ type.title }}</div>
                  </v-card-title>
                </v-card> -->
              </draggable>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="xs10">
        <v-layout wrap fill-height>
          <v-flex xs12>
            <v-card id="main-workplace" class="ma-2" height="100%" tile>
              <v-layout justify-center class="grey lighten-5">
                <v-flex xs12 sm10 md8 lg6>
                  <draggable
                    @change="checkAdd" 
                    class="main-workplace"
                    v-model="workplace" 
                    :options="{
                      draggable: '.drag-item', 
                      ghostClass:'ghost', 
                      scrollSensitivity: 80, 
                      scrollSpeed: 30, 
                      animation: 150,
                      group: { name: 'question_cards'}}"
                    >
                    <transition-group :name="'list-complete'" tag="div" type="transition" class="trans-group">
                      <v-card class="my-3 drag-item workplace-card" v-for="(work,index) in workplace" :key="index">
                        <component :is="work.comp"></component>
                      </v-card>
                    </transition-group>
                  </draggable>
                </v-flex>
              </v-layout>
              <v-layout style="position:relative">
                <v-flex xs12 justify-center>
                  <v-btn fab absolute outline top dark color="primary">
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-flex>                
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import draggable from 'vuedraggable'
  import tabs from '@/components/question_types/Tabs'
  import simpleCard from '@/components/question_types/SimpleCard'

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
      },
      // onMove ({relatedContext, draggedContext}) {
      //   const relatedElement = relatedContext.element;
      //   const draggedElement = draggedContext.element;
      //   return (!relatedElement || !relatedElement.fixed)
      // }
    },
    data () {
      return {
        types: [
          { header: '객관식' },
          { id: 0, title: '객관식 <span class="subText">(텍스트)</span>', comp: 'tabs' },
          { id: 1, title: '객관식 <span class="subText">(이미지)</span>', comp: null},
          { header: '순위 선택형'},
          { id: 2, title: '순위 선택형 <span class="subText">(텍스트)</span>', comp: null},
          { id: 3, title: '순위 선택형 <span class="subText">(이미지)</span>', comp: null},
          { header: '별점형'},
          { id: 4, title: '별점형', comp: 'simple-card' },
          { header: '주관식형'},
          { id: 5, title: '주관식형', comp: null },
          { header: '척도형'},
          { id: 6, title: '척도형 <span class="subText">(가로)</span>', comp: null},
          { id: 7, title: '척도형 <span class="subText">(세로)</span>', comp: null},
          { id: 8, title: '척도형 <span class="subText">(원형)</span>', comp: null},
          { id: 9, title: '멀티미디어형', comp: null}
        ],
        workplace: [
        ],
        isDragging: false
      }
    }
  }  
</script>

<style>
   .trans-group {
     min-height: 330px;
   }
   .ghost {
    opacity: .5;
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
   .subText {
     font-size: 0.8rem;
     color: grey;
   }
   .v-stepper__wrapper {
    width: 100%;
    height: 100%;
    min-height: 100%;
  }
  .question-card {
    border: 1px solid #b3d4fc
  }
</style>