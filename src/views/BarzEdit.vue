<script>
import cloneDeep from 'lodash.clonedeep'
import { mapState, mapMutations } from 'vuex'

import ArticleEdit from '@/components/ui/article-edit'

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
    ...mapState({
      isValidParams(state) {
        const isValidBar = state.barz.ids.includes(this.barId)
        return isValidBar
      },
      bar(state) {
        return state.barz.entities[this.barId]
      },
    }),
  },
  created() {
    if (!this.isValidParams) return this.$router.push({ name: `404` })
  },
  methods: {
    createUpdateBar() {
      this.UPDATE_BAR(this.bar)
      this.$router.push({ name: `home` })
    },
    openEditArticle(articleId) {
      this.editArticleId = articleId
    },
    closeEditArticle() {
      this.editArticleId = false
    },
    ...mapMutations([`UPDATE_BAR`]),
  },
}
</script>

<template lang="pug">
foobarz-main-content(page="barz-new-edit" :title="bar.name")
  form(@submit.prevent="createUpdateBar")
    foobarz-input(v-model="bar.name")
    .products
      .products__item(
        v-for="(article, index) in bar.articles"
        :key="`${article.id}-title`"
        @click="openEditArticle(article.id)"
      )
        foobarz-article(
          :article="article"
        )

    foobarz-article-edit(
      :article="editedArticle"
      @close="closeEditArticle"
    )



    //- dl.articles
    //-   template(v-for="(article, index) in bar.articles" )
    //-     dt.articles__title(
    //-       :key="`${article.id}-title`"
    //-       :class="editArticle === index ? `articles__title--edit` : ``"
    //-       @click="openEditPanel(index)"
    //-     )
    //-       span.articles__icon
    //-         foobarz-icon(
    //-           :name="article.icon"
    //-           :style="{'--secondary-color': article.color}"
    //-         )
    //-       span.articles__name {{ article.name }}
    //-       span.articles__price {{article.price}}฿
    //-     dd.articles__edit(
    //-       :key="`${article.id}-edit`"
    //-       v-if="editArticle === index"
    //-     )
    //-       foobarz-icon-picker.articles__edit-icon(v-model="article.icon")
    //-       foobarz-input.articles__edit-name(v-model="article.name")
    //-       foobarz-color-picker.articles__edit-color(v-model="article.color")
    //-       foobarz-input.articles__edit-price(type="number" v-model="article.price")

    foobarz-button(type="submit" fab)
      foobarz-icon(name="save" :scale="1.5")
</template>

<style lang="scss" scoped>
.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  grid-gap: 0.5rem;
  padding-top: 1rem;

  &__item {
    width: 100%;
    padding: 100% 0 0;
    position: relative;
    background: var(--c-black);
    border-radius: 0.5rem;

    &--edit {
      padding: 0;
      grid-column: 1 / 4;
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
      // width: 40%;
    }
  }
}
</style>
