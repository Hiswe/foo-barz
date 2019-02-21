<script>
import { colorList } from '@/store/default-data'
import globalEvents from '@/global-events.js'

export default {
  name: `foobarz-icon-picker`,
  data() {
    return {
      colorList: colorList.slice(),
    }
  },
  props: {
    value: {
      default: `#000`,
      type: String,
    },
  },
  methods: {
    setColor(color) {
      this.$emit('input', color)
    },
  },
}
</script>

<i18n>
{
  "en": {
    "color": "color"
  },
  "fr": {
    "color": "couleur"
  }
}
</i18n>

<template lang="pug">
.foobarz-color-picker
  ul.foobarz-color-picker__list
    li.foobarz-color-picker__color(
      v-for="color in colorList"
      :key="color"
      @click="setColor(color)"
    )
      .foobarz-color-picker__bucket(:style="{background: color}")
</template>

<style lang="scss" scoped>
@import './form-mixins';

.foobarz-color-picker {
  &__list {
    background: var(--c-primary-lighter);
    list-style: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    background-clip: padding-box;
    border: solid 4px $c-primary-darker;
    background-color: #000;
    border-image-source: small-round-corner-filled(#000);
    border-image-slice: 8;
    border-image-width: 8px;
    border-image-outset: 0;
  }

  &__bucket {
    height: var(--picker-size);
    width: var(--picker-size);
    background: black;
  }
}
</style>
