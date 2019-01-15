<script>
import Vue from 'vue'
import cloneDeep from 'lodash.clonedeep'
import { mapState, mapMutations, mapGetters } from 'vuex'

import ArticleEdit from '@/components/article/edit'
import { createArticle } from '@/store/default-data'

export default {
  name: `page-bar`,
  components: {
    'foobarz-article-edit': ArticleEdit,
  },
  data() {
    return {
      editArticleId: false,
    }
  },
  computed: {
    barId() {
      return this.$route.params.barId
    },
    editedArticle() {
      if (!this.editArticleId) return false
      return this.bar.articles[this.editArticleId]
    },
    bar() {
      return this.getBar(this.barId)
    },
    ...mapState({
      isValidParams(state) {
        const isValidBar = state.barz.ids.includes(this.barId)
        return isValidBar
      },
    }),
    ...mapGetters([`getBar`]),
  },
  created() {
    if (!this.isValidParams) return this.$router.push({ name: `404` })
  },
  methods: {
    updateBar() {
      this.UPDATE_BAR(this.bar)
      this.$el.blur()
    },
    addProduct() {
      const newProduct = createArticle()
      Vue.set(this.bar.articles, newProduct.id, newProduct)
      this.editArticleId = newProduct.id
    },
    onSave() {
      this.UPDATE_BAR(this.bar)
      this.$router.push({ name: `home` })
    },
    openEditArticle(articleId) {
      this.editArticleId = articleId
    },
    closeEditArticle() {
      this.editArticleId = false
      this.UPDATE_BAR(this.bar)
    },
    onEditProduct() {
      this.UPDATE_BAR(this.bar)
    },
    ...mapMutations([`UPDATE_BAR`]),
  },
}
</script>

<i18n>
{
  "en": {
    "bar-name": "bar name"
  },
  "fr": {
    "bar-name": "nom du bar"
  }
}
</i18n>

<template lang="pug">
foobarz-main-content(page="barz-new-edit" :title="bar.name")
  form(@submit.prevent="updateBar")
    .bar-name
      label.bar-name__label(for="bar-name") {{ $t(`bar-name`) }}
      foobarz-input.bar-name__input(v-model="bar.name" name="bar-name")
    .products
      .products__item(
        v-for="(article, index) in bar.articles"
        :key="`${article.id}-title`"
        @click="openEditArticle(article.id)"
      )
        foobarz-article(
          :article="article"
        )
      button.products__add(
        @click="addProduct"
        type="button"
      )
        foobarz-icon(name="add" :scale="1.5")
    foobarz-article-edit(
      :article="editedArticle"
      @input="onEditProduct"
      @close="closeEditArticle"
    )
    foobarz-button(
      fab
      @click="onSave"
    )
      foobarz-icon(name="save-32" )
</template>

<style lang="scss" scoped>
.bar-name {
  text-align: center;

  &__label {
    color: var(--c-primary);
  }
  &__input /deep/ input {
    text-align: center;
  }
}
.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  grid-gap: 1.5rem 0.5rem;
  padding-top: 1rem;

  &__add,
  &__item {
    width: 100%;
    padding: 100% 0 0;
    position: relative;
    border-radius: 0.5rem;
  }

  &__add {
    background: var(--c-accent-darkest);
    border: 2px dotted var(--c-accent-darker);
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      fill: var(--c-accent);
    }
  }
}

.articles {
  &__title {
    display: flex;
    padding: 0.5rem 0;
    align-items: baseline;

    &--edit {
      background: black;
      border-radius: 0.5rem 0.5rem 0 0;
    }

    &::before {
      content: '';
      flex: 1 1 auto;
      border-bottom: 3px dotted var(--c-primary-darker);
      order: 1;
    }
  }
  &__icon {
    display: block;
    height: 1.5rem;
    width: 1.5rem;

    .icon {
      width: 100%;
      height: 100%;
    }
  }
  &__price {
    order: 2;
  }
  &__edit {
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-gap: 1rem;
    background: black;
    margin: 0;
    padding: 1rem;
    border-radius: 0 0 0.5rem 0.5rem;

    &-name {
      margin: 0;
    }

    &-price {
      margin: 0;
    }
  }
}
</style>
