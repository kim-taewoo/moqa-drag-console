<template>
  <v-tabs
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
  </v-tabs>
</template>

<script>
  export default {
    props: ['work'],
    data () {
      return {
        active: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  }
</script>