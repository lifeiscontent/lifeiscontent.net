<template lang="html">
  <article class="Article">
    <slot />
  </article>
</template>

<script>
export default {
  name: 'Article'
}
</script>

<style lang="css">
.Article {
  min-height: 100%;
}
</style>
