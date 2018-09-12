<template lang="pug">
foobarz-main-content(page="information" title="Information")
  foobarz-category(:title="$t(`shareTitle`)")
    p {{ $t(`shareDescription`) }}
    a(:href="homepage") {{ homepageNoProtocol }}
    //- use v-clipboard:copy instead of this.$copyText
    //- for better browser support
    //- https://www.npmjs.com/package/vue-clipboard2#i-want-to-copy-texts-without-a-specific-button
    foobarz-button(
      v-clipboard:copy="homepage"
      v-clipboard:success="onCopy"
    )
      | {{ $t(`shareButton`) }}
  footer.version {{ $t(`version`) }} {{ version }}
</template>

<style lang="scss" scoped>
p {
  text-align: center;
}
a {
  text-decoration: none;
  color: var(--c-text);
  box-shadow: inset 0 -0.08em var(--c-accent), 0 0.08em var(--c-accent);
}
.version {
  margin-top: 2rem;
  padding: 1rem 0 0;
  border-top: 5px solid black;
  text-align: center;
}
</style>

<i18n>
{
  "en": {
    "shareTitle": "Share the app",
    "shareDescription": "The app can be shared with this link",
    "shareButton": "Share",
    "shareCopied": "Link copied!",
    "version": "version"
  }
}
</i18n>

<script>
import { name, homepage, description, version } from '../../package.json'

import Category from '@/components/ui/Category'

export default {
  name: 'page-information',
  components: {
    'foobarz-category': Category,
  },
  data() {
    return {
      homepage,
      version,
      homepageNoProtocol: homepage.replace(`https://`, ``).replace(`/`, ``),
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
  },
}
</script>
