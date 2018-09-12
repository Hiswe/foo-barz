<template lang="pug">
button.foobarz-button(:type="type")
  slot
</template>

<style lang="scss" scoped>
.foobarz-button {
  background: var(--c-accent);
  display: block;
  padding: 0.75em 1em;
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
  },
}
</script>
