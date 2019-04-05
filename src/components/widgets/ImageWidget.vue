<template>
  <img :src="properties.src" :style="WidgetUtils.renderStyle(properties)" />
</template>
<script>
import WidgetUtils from '../utils/WidgetUtils.js'
export default {
  props: ['properties', 'transition'],
  data () {
    return {
      WidgetUtils: WidgetUtils
    }
  },
  mounted: function () {
    var self = this
    WidgetUtils.initialise(self.properties, self.transition)
  }
}
</script>
<style lang="scss" scoped>

</style>
