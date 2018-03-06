<template lang="html">
  <div class="Container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Container'
}
</script>

<style lang="css">
.Container {
  box-sizing: border-box;
  max-width: 768px;
  padding-left: 36px;
  padding-right: 36px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
