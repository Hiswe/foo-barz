<template lang="pug">
foobarz-main-content(page="barz-new-edit" :title="bar.name")
  form(@submit.prevent="createUpdateBar")
    foobarz-input(v-model="bar.name")
    dl.articles
      template(v-for="(article, index) in bar.articles" )
        dt.articles__title(
          :key="`${article.id}-title`"
          @click="openEditPanel(index)"
        )
          span.articles__icon
            foobarz-icon(
              :name="article.icon"
              :style="{'--secondary-color': article.color}"
            )
          span.articles__name {{ article.name }}
          span.articles__price {{article.price}}฿
        dd.articles__edit(
          :key="`${article.id}-edit`"
          v-if="editArticle === index"
        )
          foobarz-icon-picker(v-model="article.icon")
          foobarz-color-picker(v-model="article.color")
          foobarz-input.articles__edit-name(v-model="article.name")
          foobarz-input.articles__edit-price(type="number" v-model="article.price")

    foobarz-button(type="submit")
      | {{ $t(`submit-update`) }}
</template>

<style lang="scss" scoped>
.articles {
  &__title {
    display: flex;
    padding: 0.5rem 0;
    align-items: baseline;

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
    display: flex;
    background: black;
    margin: 0;
    padding: 1rem;
    border-radius: 0.5rem;

    &-name {
      flex: 1 1 auto;
    }

    &-price {
      width: 40%;
      margin-left: 1rem;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "submit-new": "create",
    "submit-update": "update"
  }
}
</i18n>

<script>
import cloneDeep from 'lodash.clonedeep'
import { mapState, mapMutations } from 'vuex'

import ColorPicker from '@/components/ui/ColorPicker'
import IconPicker from '@/components/ui/IconPicker'

export default {
  name: `page-bar`,
  components: {
    'foobarz-color-picker': ColorPicker,
    'foobarz-icon-picker': IconPicker,
  },
  data() {
    return {
      editArticle: false,
    }
  },
  computed: {
    barId() {
      return this.$route.params.barId
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
    openEditPanel(index) {
      if (this.editArticle === index) {
        return (this.editArticle = false)
      }
      this.editArticle = index
    },
    ...mapMutations([`UPDATE_BAR`]),
  },
}
</script>

