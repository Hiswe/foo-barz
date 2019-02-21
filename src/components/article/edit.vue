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
    bubbleInput() {
      this.$emit(`input`)
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
    "remove": "remove",
    "save": "save",
    "product-name": "product name",
    "product-price": "product price"
  },
  "fr": {
    "remove": "enlever",
    "save": "sauver",
    "product-name": "nom de l'article",
    "product-price": "prix"
  }
}
</i18n>

<template lang="pug">
aside.article-edit(
  v-if="article"
  @click.stop="noop"
)
  foobarz-icon.article-edit__close(
    name="close"
    :scale="1"
    @click.native="close"
  )
  .article-edit__fields
    foobarz-input.article-edit__name(
      :label="$t( `product-name` )"
      v-model="article.name"
      @input="bubbleInput"
    )
    foobarz-input.article-edit__price(
      :label="$t( `product-price` )"
      v-model="article.price"
      type="number"
      @input="bubbleInput"
    )
    .article-edit__icon-preview
      foobarz-article(
        :article="article"
        simple
      )
    foobarz-icon-picker.article-edit__icon(
      v-model="article.icon"
      @input="bubbleInput"
    )
    foobarz-color-picker.article-edit__color(
      v-model="article.color"
      @input="bubbleInput"
    )
  .article-edit__actions
    foobarz-icon.article-edit__remove(
      name="delete-forever"
      @click.native="archive"
      :scale="2"
    )
    foobarz-button.article-edit__save(
      @click="close"
      preventTab
    ) {{ $t(`save`) }}
    input.article-edit__submit(
      @focus="close"
    )
</template>

<style lang="scss" scoped>
.article-edit {
  --side-columns: calc(var(--picker-size) * 2 + 8px);
  position: fixed;
  top: 0;
  right: 0;
  bottom: var(--navigation-height);
  left: 0;
  z-index: 10;
  padding: 1rem 1rem;
  background: var(--c-primary-darkest);
  border-radius: 0.5rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  z-index: var(--zindex-edit-product);
  overflow: auto;

  &__fields {
    margin: auto 0;
    display: grid;
    align-items: center;
    grid-template-columns: var(--side-columns) 1fr var(--side-columns);
    grid-auto-rows: auto;
    grid-template-areas:
      'name name name'
      '. price .'
      'icon icon-preview color';
    grid-gap: 0.5rem 0;
  }
  &__close {
    align-self: flex-end;
    fill: var(--c-accent);
    flex: 0 0 auto;
  }
  & /deep/ input {
    text-align: center;
    background-color: black;
  }
  &__name {
    grid-area: name;

    & /deep/ input {
      text-align: center;
    }
  }
  &__price {
    grid-area: price;
  }
  &__color {
    grid-area: color;
  }
  &__icon {
    grid-area: icon;
  }
  &__actions {
    text-align: center;
    grid-area: actions;
    display: flex;
    align-items: center;
  }
  &__save {
    margin-left: auto;
    flex: 0 0 auto;
    width: auto;
  }
  &__remove {
    fill: red;
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
.article-edit__icon-preview {
  position: relative;
  height: 100px;
  grid-area: icon-preview;
}
</style>
