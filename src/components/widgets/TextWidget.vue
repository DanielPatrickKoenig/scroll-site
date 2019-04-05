<template>
  <div :style="WidgetUtils.renderStyle(properties)">
    {{properties.text}}
  </div>
</template>
<script>
import WidgetUtils from '../utils/WidgetUtils.js'
export default {
  props: ['properties', 'transition', 'zone'],
  data () {
    return {
      WidgetUtils: WidgetUtils
    }
  },
  watch: {
    zone: function () {
      var self = this
      if (this.zone > -1) {
        console.log('in zone = ' + this.zone.toString())
        WidgetUtils.initialise(self.properties, self.transition, this.zone)
      }
    }
  },
  mounted: function () {
    var self = this
    WidgetUtils.initialise(self.properties, self.transition, this.zone)
  }
}
</script>
<style lang="scss" scoped>

</style>
