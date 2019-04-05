<template>
  <div :style="WidgetUtils.renderStyle(widget.properties)">
    <textwidget v-if="widget.type == 'text'" :content="widget.properties.text"></textwidget>
    <imagewidget v-if="widget.type == 'image'"  :content="widget.properties.src"></imagewidget>
    <guagewidget v-if="widget.type == 'guage'" :chartdata="widget.chartdata" :colors="widget.colors" :textcolor="widget.properties.color" :title="widget.properties.text" sig="guage1"></guagewidget>
    <piewidget v-if="widget.type == 'pie'" :chartdata="widget.chartdata" :colors="widget.colors" :textcolor="widget.properties.color" :title="widget.properties.text" :hovertitle="widget.properties.text" sig="pie1"></piewidget>
    <pixiticker v-if="widget.type == 'ticker'" :properties="widget.properties"></pixiticker>
  </div>
</template>
<script>
import WidgetUtils from './utils/WidgetUtils.js'
import TextWidget from './widgets/TextWidget.vue'
import ImageWidget from './widgets/ImageWidget.vue'
import GuageWidget from './widgets/GuageWidget.vue'
import PieWidget from './widgets/PieWidget.vue'
import PixiTicker from './widgets/PixiTicker.vue'
export default {
  components: {
    textwidget: TextWidget,
    imagewidget: ImageWidget,
    guagewidget: GuageWidget,
    piewidget: PieWidget,
    pixiticker: PixiTicker
  },
  props: ['widget', 'section', 'index', 'zone'],
  data () {
    return {
      WidgetUtils: WidgetUtils
    }
  },
  watch: {
    zone: function () {
      var self = this
      if (this.zone > -1) {
        WidgetUtils.initialise(self.widget.properties, self.widget.transition, this.zone)
      }
    }
  },
  mounted: function () {
    var self = this
    WidgetUtils.initialise(self.widget.properties, self.widget.transition, this.zone)
  }
}
</script>
<style lang="scss" scoped>

</style>
