<template lang="pug">
  .input
    foobarz-icon.input__decrement(
      v-if="type === `number`"
      name="remove-circle"
      :scale="2"
      @click.native="decrement"
    )
    input.input__field(
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
    )
    foobarz-icon.input__increment(
      v-if="type === `number`"
      name="add-circle"
      :scale="2"
      @click.native="increment"
    )
</template>

<style lang="scss" scoped>
.input {
  margin-top: 1rem;
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
    margin-right: 1rem;
  }
  &__increment {
    margin-left: 1rem;
  }
}
</style>

<script>
export default {
  name: `foobarz-input`,
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
    increment() {
      this.$emit('input', this.value + 10)
    },
    decrement() {
      this.$emit('input', Math.max(0, this.value - 10))
    },
  },
}
</script>
