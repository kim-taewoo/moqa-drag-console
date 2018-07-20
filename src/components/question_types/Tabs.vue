<template>
  <v-expansion-panel v-model="panel">
    <v-expansion-panel-content>
      <div slot="header">Q{{index+1}}. 객관식<small class="gray--text"> (텍스트)</small></div>
      <div slot="actions"><v-icon class="white--text">keyboard_arrow_down</v-icon> </div>
      <v-tabs
        v-model="active"
        color="cyan"
        dark
        slider-color="yellow"
        fixed-tabs
      >
        <v-tab
          v-for="tab in tabs"
          :key="tab.order"
          ripple
        >
          {{tab.title}}
        </v-tab>
        <v-tab-item
          v-for="tab in tabs"
          :key="tab.order"
        >
          <v-card flat>
            <v-card-text>{{ tab.content }}</v-card-text>
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
    data () {
      return {
        panel: false,
        tabs: [
          {
            order: 1,
            title: '문항',
            content: '내용이 들어갈 자리'
          },
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
</style>
