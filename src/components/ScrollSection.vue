<template>
  <div :style="'height:'+getHeight()+'px;top:'+getVerticalPosition()+'px;'" class="scroll-section">
    <slot name="content"></slot>
    <a v-if="!first" class="prev-link" v-on:click="prevClicked">PREV</a>
    <a v-if="!last" class="next-link" v-on:click="nextClicked">NEXT</a>
  </div>
</template>
<script>
import {EventBus} from './utils/EventBus.js'
import GeneralUtils from './utils/GeneralUtils.js'
// import {TweenLite} from 'gsap'
export default {
  props: ['index', 'first', 'last', 'shared', 'zone'],
  data () {
    return {
      GeneralUtils: GeneralUtils,
      verticalPosition: 0,
      wHeight: 0
    }
  },
  watch: {
    zone: function () {
      console.log('in zone = ' + this.zone.toString())
    }
  },
  methods: {
    sectionResize: function (e) {
      var self = this
      self.$data.wHeight = GeneralUtils.getHeight()
      self.$data.verticalPosition = self.wHeight * self.index
      EventBus.$emit('scroll-section-ease-resized', {index: self.index, shared: self.shared})
      console.log('resized')
    },
    prevClicked: function (e) {
      var self = this
      EventBus.$emit('scroll-section-ease-complete', {index: self.index - 1})
    },
    nextClicked: function (e) {
      var self = this
      EventBus.$emit('scroll-section-ease-complete', {index: self.index + 1})
    },
    getHeight: function () {
      var self = this
      return self.shared ? 0 : self.$data.wHeight
    },
    getVerticalPosition: function () {
      var self = this
      return self.shared ? 0 : self.$data.verticalPosition
    },
    getSectionStyle: function () {
      var self = this
      var baseStyle = 'height:' + self.getHeight() + 'px;top:' + self.getVerticalPosition() + 'px;'
      if (self.shared) {
        baseStyle += 'position: fixed;'
      }
      return baseStyle
    }
  },
  mounted: function () {
    var self = this
    self.sectionResize()
    window.addEventListener('resize', self.sectionResize)
  }
}
</script>
<style lang="scss" scoped>
div.scroll-section{
  position:absolute;
  left:0;
  right:0;
  > a {
    position:absolute;
    left: 50%;
    width: 50px;
    margin-left: -25px;
    color: #ffffff;
  }
  > a.prev-link {
    top: 5px;
  }
  > a.next-link {
    bottom: 5px;
  }
}
</style>
