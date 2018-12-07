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
    preventTab: {
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

<template lang="pug">
button.foobarz-button(
  :type="type"
  :class="additionalClass"
  :tabindex="preventTab ? -1 : 0"
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
  width: 100%;
  text-transform: uppercase;
  color: var(--c-primary-darkest);
  transition: transform 0.25s;
  border-radius: 0.25rem;
  border: 3px solid var(--c-accent);

  &:active {
    transform: translateY(3px);
  }

  &--fab {
    --size: 50px;
    position: fixed;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    right: 0.5rem;
    bottom: calc(var(--navigation-height) + 0.5rem);
    margin: 0;
    padding: 0;
    border: 0;
    z-index: var(--zindex-fab);

    /deep/ .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      fill: var(--c-black);

      // try to keep the icon as sharp as possible
      // https://stackoverflow.com/a/14068216
      image-rendering: optimizeSpeed; /* STOP SMOOTHING, GIVE ME SPEED  */
      image-rendering: -moz-crisp-edges; /* Firefox */
      image-rendering: -webkit-optimize-contrast; /* Chrome (and eventually Safari) */
      image-rendering: pixelated; /* Chrome */
      image-rendering: optimize-contrast; /* CSS3 Proposed                  */
    }
  }

  &--danger {
    color: red;
    background: none;
    border-color: currentColor;
  }
}
</style>
