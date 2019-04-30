<template>
  <option :value="value">{{answer.text}}</option>
    
</template>

<script>

  export default {
    name: 'Answer',
    props: {
      answer: {
        type: Object,
        required: true
      },
      value: {
        type: Number,
        required: true
      }
    },
    methods: {
    }
  }
</script>

<style>
</style>
