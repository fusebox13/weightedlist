<template>
  <label :for="uuid">
    <select v-model="answerIndex">
      <option value="-1" disabled selected>{{question.label}}</option>
      <Answer 
        v-for="(answer, key) in question.answers" 
        :answer="answer"
        :key="key"
        :value="key"
      ></Answer>
    </select>
  </label>
</template>

<script>
import Answer from "@/components/Answer"
  export default {
    name: 'Question',
    components: {
      Answer
    },
    props: {
      question: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        selectedAnswerIndex: -1
      }
    },
    watch: {
      selectedAnswerIndex(newVal, oldVal) {
        this.$store.dispatch("WeightedList/setWeight", {
          questionId: this.index,
          answerId: newVal,
        });
      }
    },
    computed: {
      uuid() {
        return 'question-' + this.index; 
      },
      answerIndex: {
        get() {
          return this.$store.state.WeightedList.questions[this.index].selectedAnswerIndex;
        },
        set(value) {
          this.$store.dispatch("WeightedList/answer", {
            questionId: this.index,
            answerId: value,
          });
        }
      }
    },
    created() {
      this.$store.dispatch("WeightedList/reset")
    }
  }
</script>

<style lang="scss">
  label {
    font-weight: 800;
    margin-bottom: 1em;
    select { 
      display: block;
      padding: 0.5em;
      width: 100%;
    }
  }
</style>
