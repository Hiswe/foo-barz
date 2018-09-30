<template lang="pug" functional>
header.header
  h1.header__title {{props.title}}
  slot
</template>

<style lang="scss" scoped>
.header {
  &__title {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    font-weight: 300;
    font-size: 1.15em;
    font-variant: small-caps;
    text-transform: uppercase;
    margin: 0;
    padding: 0.5em 1rem;
    background: var(--c-black);
  }
}
</style>
