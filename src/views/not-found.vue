<script>
export default {
  name: `page-404`,
}
</script>

<i18n>
{
  "en": {
    "not-found": "not found",
    "description": "there's nothing here.",
    "back": "back to homepage",
    "home": "home"
  },
  "fr": {
    "not-found": "page non trouvée",
    "description": "il n'y a rien ici.",
    "back": "retour à l'accueil",
    "home": "accueil"
  }
}
</i18n>

<template lang="pug">
foobarz-main-content(page="404" :title="$t(`not-found`)")
  p.not-found__description {{ $t(`description`) }}
  p.not-found__back {{ $t(`back`) }}
  router-link.not-found__link(to="/") {{ $t(`home`) }}
</template>
