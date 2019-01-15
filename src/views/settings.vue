<script>
import { mapMutations } from 'vuex'

import { name, homepage, description, version } from '../../package.json'

import Category from '@/components/ui/Category'

export default {
  name: 'page-settings',
  components: {
    'foobarz-category': Category,
  },
  data() {
    return {
      homepage,
      version,
      homepageNoProtocol: homepage.replace(`https://`, ``).replace(`/`, ``),
      lang: `en`,
    }
  },
  methods: {
    onCopy() {
      if (!navigator.share) return this.notifyCopy()
      return navigator
        .share({
          title: name.replace(`-`, ` `),
          text: description,
          url: homepage,
        })
        .catch(error => {
          this.notifyCopy()
        })
    },
    notifyCopy() {
      this.$notify(this.$t(`shareCopied`))
    },
    reset() {
      this.RESET()
      window.localStorage.removeItem(`foo-barz`)
    },
    ...mapMutations([`RESET`]),
  },
}
</script>

<i18n>
{
  "en": {
    "language": "language",
    "shareTitle": "Share the app",
    "shareDescription": "The app can be shared with this link",
    "shareButton": "Share",
    "dangerZone": "danger zone",
    "shareCopied": "Link copied!",
    "reset": "Reset",
    "version": "version"
  }
}
</i18n>

<template lang="pug">
foobarz-main-content(page="information" :title="$t(`settings`)")
  foobarz-category(:title="$t(`language`)")
    label.radio
      input.radio__input(type="radio" name="lang" value="en" v-model="lang")
      span.radio__label en
    label.radio
      input.radio__input(type="radio" name="lang" value="fr" v-model="lang")
      span.radio__label fr

  foobarz-category(:title="$t(`shareTitle`)")
    p {{ $t(`shareDescription`) }}
    a(:href="homepage") {{ homepageNoProtocol }}
    //- use v-clipboard:copy instead of this.$copyText
    //- for better browser support
    //- https://www.npmjs.com/package/vue-clipboard2#i-want-to-copy-texts-without-a-specific-button
    foobarz-button.information__copy(
      v-clipboard:copy="homepage"
      v-clipboard:success="onCopy"
    ) {{ $t(`shareButton`) }}
  hr.separator
  p {{ $t(`dangerZone`) }}
  foobarz-button(
    @click.passive="reset"
    danger
  ) {{ $t(`reset`) }}
  footer.version {{ $t(`version`) }} {{ version }}
</template>

<style lang="scss" scoped>
.information__copy {
  margin-top: 1.5rem;
}
p {
  text-align: center;
}
a {
  text-decoration: none;
  color: var(--c-text);
  box-shadow: inset 0 -0.08em var(--c-accent), 0 0.08em var(--c-accent);
}
.separator {
  border: none;
  border-top: 5px solid black;
  margin-top: 2rem;
}
.version {
  margin-top: 2rem;
  padding: 1rem 0 0;
  border-top: 5px solid black;
  text-align: center;
}

.radio {
  display: inline-block;
}
.radio + .radio {
  margin-left: 2rem;
}
.radio__input {
  border: 0 !important;
  clip: rect(0 0 0 0) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
}
.radio__label {
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
}
.radio__label::before {
  content: '';
  width: 16px;
  height: 20px;
  margin-right: 0.5rem;
  display: inline-block;
}
.radio__input:checked + .radio__label::before {
  background: arrow($c-primary);
}
</style>
