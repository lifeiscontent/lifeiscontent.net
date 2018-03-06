<template lang="html">
  <div :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    sm: {type: String, required: false}
  },
  name: 'GridCell',
  computed: {
    classes () {
      return ['GridCell', `sm-GridCell--${this.sm}`].filter(x => x)
    }
  }
}
</script>

<style lang="css">
.GridCell {
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  width: 100%;
}

.Grid--gutter-36 .GridCell {
  padding-left: 36px;
}

@media screen and (min-width: 768px) {
  .sm-GridCell--1of2 {
    width: 50%;
  }
}
</style>
