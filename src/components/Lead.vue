<template lang="html">
  <p class="Lead">
    <slot />
  </p>
</template>

<script>
export default {
  name: 'Lead'
}
</script>

<style lang="css">
.Lead {
  font-size: 16px;
}
</style>
