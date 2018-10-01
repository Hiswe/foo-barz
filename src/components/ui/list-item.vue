<script>
export default {
  name: `foobarz-list-item`,
  props: {
    preventRemove: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
    }
  },

  methods: {
    swipe(alloyFingerEvent) {
      if (this.preventRemove) return
      const open = alloyFingerEvent.direction === `Left`
      this.open = open
    },
    remove() {
      this.$emit(`remove`)
    },
  },
}
</script>

<template lang="pug">
li.list__item(
  v-finger:swipe="swipe"
  :class="{'list__item--open': open}"
  v-on="$listeners"
)
  .list__item-content
    slot
  .list__item-action(
    @click="remove"
    v-if="!preventRemove"
  )
    foobarz-icon(name="delete-forever" :scale="1.5")
</template>


<style lang="scss" scoped>
.list__item {
  $root: &;
  --action-width: 70px;
  border-bottom: 2px solid var(--c-black);
  padding: 0;
  position: relative;
  overflow: hidden;

  &--open {
    & #{$root}-content,
    & #{$root}-action {
      transform: translateX(calc(var(--action-width) * -1));
    }
  }

  &-content,
  &-action {
    transition: transform 0.25s;
  }

  &-content {
    padding: 0.5rem 1rem;
    position: relative;
    z-index: 2;
  }
  &-action {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 100%;
    width: var(--action-width);
    background: Crimson;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      fill: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>

