<template>
  <v-container fluid class="pa-2" style="height:inherit">
    

    <v-layout fill-height>     
        <v-flex v-if="drawer" class="xs2">
          <v-layout wrap style="max-height:84vh; overflow-y:auto;">
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

      <v-flex class="xs10 main-workplace-layout" :xs12="!drawer">
        <v-layout wrap fill-height>
          <v-flex xs12>
            <v-card id="main-workplace" class="ma-2" height="100%" tile>
            <v-btn fab dark absolute color="cyan" @click="drawer=!drawer">
              <v-icon dark :class="{sideToggleActive: drawer}">arrow_forward</v-icon>
            </v-btn>
              <v-layout justify-center class="grey lighten-5">
                <v-flex xs12 sm7 md7 lg5 class="text-xs-center">
                  <draggable
                    @change="checkAdd" 
                    class="main-workplace"
                    v-model="workplace" 
                    :options="{
                      ghostClass:'ghost', 
                      scrollSensitivity: 80, 
                      scrollSpeed: 30, 
                      animation: 150,
                      group: { name: 'question_cards'}}"
                    >
                    <transition-group name="'list-complete'" tag="div" type="transition" class="trans-group">

                      <v-card class="my-3 drag-item workplace-card" v-for="(work,index) in workplace" :key="index">
                        <component :is="work.comp" :questionIndex="index"></component>
                      </v-card>

                    </transition-group>
                  </draggable>
                  <v-layout justify-center class="text-xs-center red--text text--lighten-3">
                    <v-flex xs12 pb-3 >
                      <div>
                        카드를 왼쪽에서 끌어오거나 
                      </div>
                      <div>아래 버튼을 클릭해서 카드 추가</div>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout justify-center>
                <v-flex xs12 class="text-xs-center">
                  <v-menu transition="slide-x-transition" top right>
                    <v-btn slot="activator" fab bottom dark color="pink">
                      <v-icon>add</v-icon>
                    </v-btn>
                    <v-card width="380px">
                      <v-layout wrap>
                        <template v-for="(type, index) in types" >
                          <v-flex xs6 v-if="type.title" :key="index" >
                            <v-btn flat v-html="type.title" @click="addCard(type.id)"></v-btn>
                          </v-flex>
                        </template>
                      </v-layout>
                    </v-card>
                  </v-menu>
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
  import MultipleText from '@/components/question_types/MultipleText'
  import StarRating from '@/components/question_types/StarRating'
  import Subjective from '@/components/question_types/Subjective'
  import RankingText from '@/components/question_types/RankingText'
  import TickHorizontal from '@/components/question_types/TickHorizontal'
  import TickVertical from '@/components/question_types/TickVertical'

  export default {
    components: {
      draggable,
      MultipleText,
      StarRating,
      Subjective,
      RankingText,
      TickHorizontal,
      TickVertical
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
      addCard (id) {
        if (id == 0) {
          this.workplace.push({
            id: 0, title: '객관식 <span class="subText">(텍스트)</span>', comp: 'MultipleText'
          })
        } else if (id==4) {
          this.workplace.push({
            id: 4, title: '별점형', comp: 'StarRating'
          })
        } else if (id==5) {
          this.workplace.push({
            id: 5, title: '주관식형', comp: 'Subjective'
          })
        } else if (id==2) {
          this.workplace.push({
            id: 2, title: '순위 선택형 <span class="subText">(텍스트)</span>', comp: 'RankingText'
          })
        } else if (id==6) {
          this.workplace.push({
            id: 6, title: '척도형 <span class="subText">(가로)</span>', comp: 'TickHorizontal'
          })
        } else if (id==7) {
          this.workplace.push({
            id: 7, title: '척도형 <span class="subText">(세로)</span>', comp: 'TickVertical'
          })
        }
      }
      // onMove ({relatedContext, draggedContext}) {
      //   const relatedElement = relatedContext.element;
      //   const draggedElement = draggedContext.element;
      //   return (!relatedElement || !relatedElement.fixed)
      // }
    },
    data () {
      return {
        drawer: true,
        types: [
          { header: '객관식' },
          { id: 0, title: '객관식 <span class="subText">(텍스트)</span>', comp: 'MultipleText' },
          { id: 1, title: '객관식 <span class="subText">(이미지)</span>', comp: null},
          { header: '순위 선택형'},
          { id: 2, title: '순위 선택형 <span class="subText">(텍스트)</span>', comp: 'RankingText'},
          { id: 3, title: '순위 선택형 <span class="subText">(이미지)</span>', comp: null},
          { header: '별점형'},
          { id: 4, title: '별점형', comp: 'StarRating' },
          { header: '주관식형'},
          { id: 5, title: '주관식형', comp: 'Subjective' },
          { header: '척도형'},
          { id: 6, title: '척도형 <span class="subText">(가로)</span>', comp: 'TickHorizontal'},
          { id: 7, title: '척도형 <span class="subText">(세로)</span>', comp: 'TickVertical'},
          { id: 8, title: '척도형 <span class="subText">(원형)</span>', comp: null}
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
  .sideToggleActive {
    transform: rotate(-180deg);
    transition: .3s cubic-bezier(.25,.8,.5,1)
  }
  .main-workplace-layout {
    transition: flex-basis 3500ms inline;
  }
  /* .workplaceSpan {
    flex-basis: 100% !important;
    max-width: 100% !important;
  } */
</style>