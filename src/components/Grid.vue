<template lang="html">
  <div :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    extensions: { type: Array, default: () => [] }
  },
  computed: {
    classes () {
      return ['Grid', ...this.extensions.map(extension => `Grid--${extension}`)]
    }
  },
  name: 'Grid'
}
</script>

<style lang="css">
.Grid {
  display: block;
}

.Grid--gutter-36 {
  margin-left: -36px;
}
</style>
