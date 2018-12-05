<script>
export default {
  name: `foobarz-input`,
  computed: {
    isNumber() {
      return this.type === `number`
    },
    htmlFor() {
      return this.id || this.name
    },
    _id() {
      return this.id ? this.id : this.name ? this.name : false
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
    name: {
      type: String,
    },
    id: {
      type: String,
    },
    label: {
      type: String,
    },
  },
  methods: {
    onInput($event) {
      let { value } = $event.target
      value = this.isNumber ? ~~value : value
      this.$emit('input', value)
    },
    onEnter($event) {
      $event.target.blur()
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

<template lang="pug">
  .input
    label.input__label(
      v-if="label"
      :for="htmlFor"
    ) {{ label }}
    .input__field-wrapper
      foobarz-icon.input__decrement(
        v-if="isNumber"
        name="remove-circle"
        :scale="2"
        @click.native="decrement"
      )
      input.input__field(
        :type="type"
        :value="value"
        :name="name"
        :id="htmlFor"
        @input="onInput"
        @keyup.enter="onEnter"
      )
      foobarz-icon.input__increment(
        v-if="isNumber"
        name="add-circle"
        :scale="2"
        @click.native="increment"
      )
</template>

<style lang="scss" scoped>
@import './form-mixins';

.input {
  @include label();

  &__field-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
  }
  &__field {
    flex: 1 1 100%;
    display: block;
    background: none;
    width: 100%;
    border: 2px solid var(--c-primary);
    padding: 0.5em 0.75em;
    // needed for Firefox sizing
    min-width: 0;

    &:focus {
      border-color: var(--c-primary-lighter);
      color: var(--c-accent);
    }
    &[type='number'] {
      text-align: right;
      // need textfield for Firefox
      appearance: textfield;

      // remove spinner for Safari
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
  &__decrement,
  &__increment {
    flex: 0 0 1.5rem;

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
