<template lang="pug">
  .input
    foobarz-icon.input__decrement(
      v-if="isNumber"
      name="remove-circle"
      :scale="2"
      @click.native="decrement"
    )
    input.input__field(
      :type="type"
      :value="value"
      @input="onInput"
    )
    foobarz-icon.input__increment(
      v-if="isNumber"
      name="add-circle"
      :scale="2"
      @click.native="increment"
    )
</template>

<style lang="scss" scoped>
.input {
  display: flex;
  align-items: center;

  &__field {
    flex: 1 1 auto;
    display: block;
    background: none;
    width: 100%;
    border: 2px solid var(--c-primary);
    padding: 0.5em 0.75em;

    &:focus {
      border-color: var(--c-primary-lighter);
      color: var(--c-accent);
    }
    &[type='number'] {
      text-align: right;
    }
  }
  &__decrement,
  &__increment {
    &:active {
      fill: var(--c-accent);
    }
  }
  &__decrement {
    margin-right: 0.5rem;
  }
  &__increment {
    margin-left: 0.5rem;
  }
}
</style>

<script>
export default {
  name: `foobarz-input`,
  computed: {
    isNumber() {
      return this.type === `number`
    },
  },
  props: {
    type: {
      type: String,
      default: `text`,
      validator(value) {
        return [`text`, `number`].includes(value)
      },
    },
    value: {
      default: ``,
      type: [String, Number],
    },
  },
  methods: {
    onInput($event) {
      let { value } = $event.target
      value = this.isNumber ? ~~value : value
      this.$emit('input', value)
    },
    increment() {
      this.$emit('input', this.value + 10)
    },
    decrement() {
      this.$emit('input', Math.max(0, this.value - 10))
    },
  },
}
</script>
