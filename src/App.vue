<template>
  <div id="app">
    <scrollsection v-for="(v, i) in sections" :key="'section'+i.toString()" :index="i" :first="i == 0" :last="i == sections.length - 1" :shared="v.shared" :zone="currentZone" :bgstyle="renderSectionStyle(v)" :sidemargin="v.background.image.marginLeft ? v.background.image.marginLeft : 0">
      <!-- <div slot="background" class="section-background"></div> -->
      <div :id="'inner_section_'+i.toString()" class="section-inner" slot="content">
        <div v-if="v.shouldRender || v.shared" v-for="(w, j) in v.widgets" :key="'widget'+i.toString()+'.'+j.toString()">
          <widgetshell :widget="w" :section="v" :index="i" :zone="v.shared ? currentZone : -1"></widgetshell>
        </div>
      </div>
    </scrollsection>
    <ul class="section-navigation">
      <li v-if="!v.shared" v-for="(v, i) in sections" :key="'section_marker'+i.toString()">
        <div v-on:click="goToSection(i)"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import {EventBus} from './components/utils/EventBus.js'
import {TweenLite} from 'gsap'
import GeneralUtils from './components/utils/GeneralUtils.js'
import ScrollSection from './components/ScrollSection.vue'
import WidgetShell from './components/WidgetShell.vue'
import WidgetUtils from './components/utils/WidgetUtils.js'
export default {
  components: {
    scrollsection: ScrollSection,
    widgetshell: WidgetShell
  },
  name: 'app',
  data () {
    return {
      GeneralUtils: GeneralUtils,
      WidgetUtils: WidgetUtils,
      currentZone: 0,
      innerStyles: [],
      scrollProps: {
        tick: 100,
        shouldPerformCorrection: true
      },
      sections: [
        {
          title: 'Good',
          shouldRender: false,
          shared: false,
          background: {
            color: 'transparent',
            image: {
              url: '../src/assets/slide1BG.jpg',
              size: 'cover',
              position: 'center',
              repeat: 'no-repeat'
            }
          },
          widgets: [
            {
              type: 'block',
              properties: {
                color: '#f58759',
                left: 210,
                top: 20,
                width: 0,
                height: 10,
                opacity: 1
              },
              transition: {
                duration: 2,
                values: {
                  width: 200
                }
              }
            },
            {
              type: 'image',
              properties: {
                src: '../src/assets/screen1.0.svg',
                left: 0,
                top: 80,
                width: 482 * 1.5,
                height: 202 * 1.5,
                opacity: 0
              },
              transition: {
                duration: 2,
                values: {
                  opacity: 1,
                  left: 170
                }
              }
            }
          ]
        },
        {
          title: 'Bad',
          shouldRender: false,
          shared: false,
          background: {
            color: '#fde7de',
            image: {
              url: '',
              size: 'cover',
              position: 'center',
              repeat: 'no-repeat'
            }
          },
          widgets: [
            {
              type: 'text',
              properties: {
                text: 'Another time',
                color: '#ffffff',
                left: 100,
                top: 10,
                width: 500,
                font: 'helvetica',
                size: 30,
                opacity: 0
              },
              transition: {
                duration: 2,
                values: {
                  opacity: 1,
                  left: 400
                }
              }
            },
            {
              type: 'ticker',
              properties: {
                value: 4882,
                color: '#ffffff',
                left: 300,
                top: 90,
                font: 'helvetica',
                size: 120,
                opacity: 0,
                fontWeight: 'bold'
              },
              transition: {
                duration: 0.5,
                values: {
                  opacity: 1,
                  left: 400
                }
              }
            },
            {
              type: 'guage',
              colors: ['#cc0000', '#00cc00', '#0000cc'],
              properties: {
                text: 'Guage Example',
                color: '#ffffff',
                left: 200,
                top: 200,
                width: 500,
                height: 500,
                opacity: 0
              },
              transition: {
                duration: 0.5,
                values: {
                  opacity: 1,
                  top: 210
                }
              },
              chartdata: {
                value: 42,
                total: 100
              }
            }
          ]
        },
        {
          title: 'Ugly',
          shouldRender: false,
          shared: false,
          background: {
            color: 'transparent',
            image: {
              url: '../src/assets/slide3BG.jpg',
              size: 'cover',
              position: 'center',
              repeat: 'no-repeat',
              marginLeft: -50
            }
          },
          widgets: [
            {
              type: 'pie',
              colors: ['#00aeef', '#fdc689', '#7cc576', '#f26d7d', '#a186be', '#ec008c', '#c69c6d', '#ed145b', '#f26522', '#acd373', '#aba000', '#f5989d'],
              properties: {
                text: 'Pie Example',
                color: '#ffffff',
                left: 200,
                top: 100,
                width: 500,
                height: 500,
                opacity: 0
              },
              transition: {
                duration: 0.5,
                values: {
                  opacity: 1,
                  top: 150
                }
              },
              chartdata: {
                one: 200,
                two: 180,
                three: 400,
                four: 92,
                five: 288
              }
            }
          ]
        },
        {
          title: 'More',
          shouldRender: false,
          shared: true,
          background: {
            color: 'transparent',
            image: {
              // url: 'https://cdn2.outdoorphotographer.com/2019/01/Moody_Landscapes_1.jpg',
              // size: 'cover',
              // position: 'center',
              // repeat: 'no-repeat'
            }
          },
          widgets: [
            {
              type: 'text',
              properties: {
                transitionIndex: 0,
                text: 'look at this',
                color: '#ffffff',
                left: 100,
                top: 90,
                width: 500,
                font: 'helvetica',
                size: 30,
                opacity: 0
              },
              transition: [
                {
                  duration: 2,
                  values: {
                    opacity: 0,
                    left: 400
                  }
                },
                {
                  duration: 2,
                  values: {
                    opacity: 1,
                    left: 500
                  }
                },
                {
                  duration: 2,
                  values: {
                    opacity: 1,
                    left: 300
                  }
                }
              ]
            },
            {
              type: 'image',
              properties: {
                src: '../src/assets/keybenefits2.svg',
                color: '#ffffff',
                left: 200,
                top: 500,
                width: 538 * 1.5,
                height: 62 * 1.5,
                opacity: 0
              },
              transition: [
                {
                  duration: 0.5,
                  values: {
                    opacity: 1,
                    top: 500
                  }
                },
                {
                  duration: 0.5,
                  values: {
                    opacity: 1,
                    top: 20
                  }
                },
                {
                  duration: 0.5,
                  values: {
                    opacity: 0,
                    top: -100
                  }
                }
              ]
            }
            // {
            //   type: 'pie',
            //   colors: ['#00aeef', '#fdc689', '#7cc576', '#f26d7d', '#a186be', '#ec008c', '#c69c6d', '#ed145b', '#f26522', '#acd373', '#aba000', '#f5989d'],
            //   properties: {
            //     text: 'Pie Example',
            //     color: '#ffffff',
            //     left: 200,
            //     top: 100,
            //     width: 500,
            //     height: 500,
            //     opacity: 0
            //   },
            //   transition: {
            //     duration: 0.5,
            //     values: {
            //       opacity: 1,
            //       top: 150
            //     }
            //   },
            //   chartdata: {
            //     one: 200,
            //     two: 180,
            //     three: 400,
            //     four: 92,
            //     five: 288
            //   }
            // }
          ]
        }
      ],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    renderSectionStyle: function (section) {
      var styleString = ''
      if (section.background) {
        if (section.background.color) {
          styleString += 'background-color:' + section.background.color + ';'
        }
        if (section.background.image) {
          styleString += 'background-image:url("' + section.background.image.url + '");'
          styleString += 'background-size:' + section.background.image.size + ';'
          styleString += 'background-position:' + section.background.image.position + ';'
          styleString += 'background-repeat:' + section.background.image.repeat + ';'
        }
      }
      return styleString
    },
    pageScrolled: function (e) {
      var self = this
      self.$data.scrollProps.tick = 100
      for (var i = 0; i < self.$data.sections.length; i++) {
        if (GeneralUtils.getMainScrollElement().scrollTop >= i * GeneralUtils.getHeight() - (GeneralUtils.getWindowSize().height / 2)) {
          self.$data.sections[i].shouldRender = true
        }
        self.$data.currentZone = WidgetUtils.getCurrentZone(self.$data.sections.length)
        // console.log(i.toString() + 'current zone = ' + self.$data.currentZone)
      }
      /*
      if (self.$data.scrollProps.shouldPerformCorrection) {
        TweenLite.to(self.$data.scrollProps, 0.25, {tick: 0, onComplete: self.scrollCorrection})
      }
      */
      // self.scrollCorrection()
    },
    scrollCorrection: function () {
      var self = this
      if (self.$data.scrollProps.tick === 0 && self.$data.scrollProps.shouldPerformCorrection) {
        self.goToSection(self.findClosestSection(), 0.25)
      }
      // setTimeout(self.scrollCorrection, 100)
    },
    findClosestSection: function () {
      var lowestDist = 99999999
      var targetIndex = -1
      // var verticalCenter = GeneralUtils.getMainScrollElement().scrollTop + (GeneralUtils.getWindowSize().height / 2)
      var inlineSections = document.getElementsByClassName('inline-section')
      for (var i = 0; i < inlineSections.length; i++) {
        console.log(inlineSections[i].getBoundingClientRect().top + (GeneralUtils.getWindowSize().height / 2))
        var dist = Math.abs((inlineSections[i].getBoundingClientRect().top + (GeneralUtils.getWindowSize().height / 2)) - (GeneralUtils.getWindowSize().height / 2))
        if (dist < lowestDist) {
          lowestDist = dist
          targetIndex = i
        }
      }
      return targetIndex
    },
    goToSection: function (index, duration) {
      var self = this
      var _duration = !duration ? 0.75 : duration
      self.$data.scrollProps.shouldPerformCorrection = false
      if (index < self.$data.sections.length && index >= 0) {
        var scrollStats = {top: GeneralUtils.getMainScrollElement().scrollTop}
        TweenLite.to(scrollStats, _duration, {
          top: GeneralUtils.getHeight() * (index),
          onUpdate: function (stats) {
            GeneralUtils.getMainScrollElement().scrollTop = stats.top
            self.$data.scrollProps.shouldPerformCorrection = false
            // document.getElementsByTagName('html')[0].scrollTo(0, stats.top)
          },
          onUpdateParams: [scrollStats],
          onComplete: function () {
            self.$data.sections[index].shouldRender = true
            setTimeout(function () {
              self.$data.scrollProps.shouldPerformCorrection = true
            }, 500)
          }
        })
      }
    },
    getInnerStyle: function (isShared) {
      var standardStyle = 'width:' + GeneralUtils.getMinWidth().toString() + 'px;height:' + GeneralUtils.getMinHeight().toString() + 'px;margin-left:' + (GeneralUtils.getMinWidth() / -2).toString() + 'px;margin-top:' + (GeneralUtils.getMinHeight() / -2).toString() + 'px;'
      var marginTopShared = GeneralUtils.getMinHeight() / -2
      // console.log(GeneralUtils.getWindowSize())
      if (GeneralUtils.getWindowSize().height < GeneralUtils.getMinHeight() && isShared) {
        // console.log('********* smaller *************')
        marginTopShared = GeneralUtils.getWindowSize().height / -2
      }
      var sharedStyle = 'width:' + GeneralUtils.getMinWidth().toString() + 'px;height:' + GeneralUtils.getMinHeight().toString() + 'px;margin-left:' + (GeneralUtils.getMinWidth() / -2).toString() + 'px;margin-top:' + marginTopShared.toString() + 'px;position: fixed;'
      // var sharedStyle = 'width:' + self.GeneralUtils.getMinWidth().toString() + 'px;height:0px;margin-left:' + (self.GeneralUtils.getMinWidth() / -2).toString() + 'px;margin-top:' + (self.GeneralUtils.getMinHeight() / -2).toString() + 'px;top:' + (window.innerHeight - (self.GeneralUtils.getMinHeight() / 2)).toString() + 'px !important;position: fixed;'
      // var sharedStyle = 'width:' + self.GeneralUtils.getMinWidth().toString() + 'px;height:0px;margin-left:' + (self.GeneralUtils.getMinWidth() / -2).toString() + 'px;margin-top:0px;top:' + ((self.GeneralUtils.getHeight() / 2) - (self.GeneralUtils.getMinHeight() / 2)).toString() + 'px !important;position: fixed;'
      return isShared ? sharedStyle : standardStyle
    },
    setInnerStyles: function (isShared, index) {
      var self = this
      var sectionElement = document.getElementById('inner_section_' + index.toString())
      if (sectionElement) {
        sectionElement.setAttribute('style', self.getInnerStyle(isShared))
      }
    }
  },
  mounted: function () {
    var self = this
    for (var i = 0; i < self.$data.sections.length; i++) {
      self.setInnerStyles(self.$data.sections[i].shared, i)
      // self.$data.innerStyles[i] = self.getInnerStyle(self.$data.sections[i].shared)
    }
    window.addEventListener('scroll', self.pageScrolled)
    self.pageScrolled()
    EventBus.$on('scroll-section-ease-complete', (n) => {
      self.goToSection(n.index)
    })
    EventBus.$on('scroll-section-ease-resized', (n) => {
      self.setInnerStyles(n.shared, n.index)
      self.$data.currentZone = WidgetUtils.getCurrentZone(self.$data.sections.length)
      // self.$data.innerStyles[n.index] = self.getInnerStyle(n.shared)
      // console.log(self.$data.innerStyles)
      // self.goToSection(n.index)
    })
  }
}
</script>

<style lang="scss">
div.section-background{
  width:100%;
  height:100%;
}
div.section-inner{
  position: absolute;
  left: 50%;
  top: 50%;
  > div{
    > div{
      position:absolute;
      > div,img{
        width:100%;
        height:100%;
      }
    }
  }
}
ul.section-navigation{
  display: inline-block;
  width: 30px;
  position:fixed;
  bottom: 5px;
  right: 5px;
  margin:0;
  padding: 0;
  > li{
    display:block;
    padding:2px;
    margin: 0;
    > div{
      background-color: #ffffff;
      width:20px;
      height:20px;
      border-radius:20px;
    }
  }
}
</style>
