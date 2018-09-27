<template lang="pug">
button.foobarz-button(
  :type="type"
  :class="additionalClass"
  v-on="$listeners"
)
  slot
</template>

<style lang="scss" scoped>
.foobarz-button {
  background: var(--c-accent);
  display: block;
  padding: 0.5em 1em;
  border: 0 none;
  margin-top: 1.5rem;
  width: 100%;
  text-transform: uppercase;
  color: var(--c-primary-darkest);
  transition: transform 0.25s;
  border-radius: 0.25rem;

  &:active {
    transform: translateY(3px);
  }

  &--fab {
    --size: 50px;
    position: fixed;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    right: 1rem;
    bottom: calc(var(--navigation-height) + 1rem);
    margin: 0;
    padding: 0;

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      fill: var(--c-black);
    }
  }

  &--danger {
    color: red;
    background: none;
    border: 3px solid currentColor;
  }
}
</style>

<script>
export default {
  name: `foobarz-button`,
  props: {
    type: {
      type: String,
      default: `button`,
    },
    fab: {
      type: Boolean,
      default: false,
    },
    danger: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    additionalClass() {
      return {
        'foobarz-button--fab': this.fab,
        'foobarz-button--danger': this.danger,
      }
    },
  },
}
</script>
