<template>
  <v-tabs
    v-model="active"
    color="cyan"
    dark
    slider-color="yellow"
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
</template>

<script>
  export default {
    created () {
      console.log(this.tabs)
    },
    data () {
      return {
        tabs: [
          {
            order: 1,
            title: '문항',
            content: '내용이 들어갈 자리'
          },
          {
            order: 2,
            title: '로직',
            content: '내용이 들어갈 자리2'
          },
          {
            order: 3,
            title: '기타',
            content: '내용이 들어갈 자리3'
          },
        ],
        active: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  }
</script>