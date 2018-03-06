<template lang="html">
  <svg :width="width" :height="height" viewBox="0 0 281 402">
    <title>Logo</title>
    <path
      d="M281 402H0V0l281 402zM20 64v318h223L20 64zm151 320l-16 12L2 180l16-12 153 216z"
      fill="#290070"
    />
  </svg>

</template>

<script>
export default {
  props: {
    width: {default: 281},
    height: {default: 402}
  },
  name: 'Logo'
}
</script>

<style lang="css">
</style>
