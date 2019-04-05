<template>
  <div :style="WidgetUtils.renderStyle(properties)" class="pie-chart resizable-chart">
    <div v-bind:id="chartid"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import WidgetUtils from '../utils/WidgetUtils.js'
  export default {
    data () {
      return {
        message: 'sup dude',
        chartid: 'CHART_' + Math.random().toString().split('.').join('') + Math.random().toString().split('.').join('') + Math.random().toString().split('.').join(''),
        chartObject: undefined,
        WidgetUtils: WidgetUtils
      }
    },
    props: ['chartdata', 'colors', 'textcolor', 'title', 'hovertitle', 'sig', 'properties', 'transition'],
    watch: {
      chartdata: function () {
        var self = this
        if (document.getElementById(self.$data.chartid) !== undefined) {
          this.redrawChart()
        }
      },
      sig: function () {
        var self = this
        self.$data.chartObject.resize()
      }
    },
    mounted: function () {
      var self = this
      WidgetUtils.initialise(self.properties, self.transition)
      self.$data.chartObject = echarts.init(document.getElementById(self.$data.chartid))
      this.redrawChart()
    },
    methods: {
      redrawChart: function () {
        var self = this
        var _data = []
        var _values = []
        var _keys = []
        for (var k in this.chartdata) {
          _keys.push(k)
          _values.push(this.chartdata[k])
          _data.push({name: k, value: this.chartdata[k]})
        }
        var option = {
          title: {
            text: this.title,
            textStyle: {
              color: this.textcolor
            },
            x: 'left'
          },
          color: this.colors,
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'center',
            data: _keys,
            textStyle: {
              color: this.textcolor
            }
          },
          series: [
            {
              name: this.hovertitle,
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: _data
            }
          ]
        }
        self.$data.chartObject.setOption(option)
      }
    }
  }
</script>

<style lang="scss" scoped>
div.pie-chart{
  > div{
    height: 100%;
  }
}
</style>
