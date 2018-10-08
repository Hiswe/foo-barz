<script>
import ColorPicker from '@/components/form/color-picker'
import IconPicker from '@/components/form/icon-picker'

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
    archive() {
      this.article.archived = true
      this.$emit(`close`)
    },
    noop() {},
  },
}
</script>

<i18n>
{
  "en": {
    "remove": "remove"
  }
}
</i18n>

<template lang="pug">
aside.article-edit(
  v-if="article"
  @click="close"
)
  foobarz-icon.article-edit__close(
    name="close"
    :scale="2"
  )
  .article-edit__in(@click.stop="noop")
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
    .article-edit__actions
      foobarz-button.article-edit__remove(
        @click="archive"
        preventTab
        danger
      ) {{ $t(`remove`) }}
      input.article-edit__submit(
        @focus="close"
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
    grid-auto-rows: auto;
    grid-template-areas:
      'name name name'
      'icon color price'
      'actions actions actions';
    grid-gap: 1rem;
    background: var(--c-primary-darkest);
    border-radius: 0.5rem;
    margin: 0;
    padding: 2rem 1rem;
  }

  & /deep/ input {
    text-align: center;
    background: black;
    border-color: black;
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
  &__actions {
    text-align: center;
    grid-area: actions;
  }
  &__submit {
    width: 5px;
    border: 0 !important;
    clip: rect(0 0 0 0) !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
  }
}
</style>
