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
  display: block;
  padding: 0.5em 1em;
  width: 100%;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--c-primary-darkest);
  transition: transform 0.25s;

  background: var(--c-accent);
  background-clip: padding-box;
  border: solid 4px green;
  border-image-source: small-round-corner-filled($c-accent);
  border-image-slice: 8;
  border-image-width: 8px;
  border-image-outset: 0;

  &:active {
    transform: translateY(3px);
  }

  &--fab {
    --size: 45px;
    position: fixed;
    width: var(--size);
    height: var(--size);
    right: 0.5rem;
    bottom: calc(var(--navigation-height) + 0.5rem);
    margin: 0;
    padding: 0;
    z-index: var(--zindex-fab);

    border-image-source: big-round-corner($c-accent);
    // border-width: 8px;
    // border-image-width: 16px;

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
    border-image-source: small-round-corner(#f00);
    border-color: currentColor;
  }
}
</style>
