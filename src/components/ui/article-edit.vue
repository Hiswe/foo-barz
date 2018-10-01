<script>
import ColorPicker from '@/components/ui/ColorPicker'
import IconPicker from '@/components/ui/IconPicker'

export default {
  name: `foobarz-article-edit`,
  components: {
    'foobarz-color-picker': ColorPicker,
    'foobarz-icon-picker': IconPicker,
  },
  props: {
    article: {
      type: [Boolean, Object],
      required: true,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit(`close`)
    },
  },
}
</script>

<template lang="pug">
.article-edit(
  v-if="article"
)
  foobarz-icon.article-edit__close(
    name="close"
    :scale="2"
    @click.native="close"

  )
  .article-edit__in
    foobarz-icon-picker.article-edit__icon(
      v-model="article.icon"
    )
    foobarz-input.article-edit__name(
      v-model="article.name"
    )
    foobarz-color-picker.article-edit__color(
      v-model="article.color"
    )
    foobarz-input.article-edit__price(
      v-model="article.price"
      type="number"
    )
</template>

<style lang="scss" scoped>
.article-edit {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.15rem;
  top: 0;
  right: 0;
  bottom: var(--navigation-height);
  left: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(3px);
  z-index: 10;
  padding: 1rem;

  &__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    fill: var(--c-accent);
  }

  &__in {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(40px, 2fr) 1fr;
    grid-template-areas:
      'name name name'
      'icon color price';
    grid-gap: 1rem;
    background: black;
    border: 2px solid var(--c-primary-darker);
    border-radius: 0.5rem;
    margin: 0;
    padding: 2rem 1rem;
  }

  &__name {
    grid-area: name;

    & /deep/ input {
      text-align: center;
    }
  }

  &__color {
    grid-area: color;
  }
  &__icon {
    grid-area: icon;
  }

  &__price {
    grid-area: price;
  }
}
</style>
