<template>
  <div id="app">
    <scrollsection v-for="(v, i) in sections" :key="'section'+i.toString()" :topoffset="v.shared ? sharedOffset.top : 0" :index="i" :first="i == 0" :last="i == sections.length - 1" :shared="v.shared" :zone="currentZone" :bgstyle="renderSectionStyle(v)" :sidemargin="v.background.image.marginLeft ? v.background.image.marginLeft : 0">
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
      innerScale: 1.5,
      sharedOffset: {
        top: 0,
        zone: 0
      },
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
              type: 'image',
              properties: {
                src: '../src/assets/slide2_image1.svg',
                left: 182,
                top: 150,
                width: 231 * 1.2,
                height: 242 * 1.2,
                opacity: 0
              },
              transition: {
                duration: 2,
                values: {
                  opacity: 1,
                  top: 200
                }
              }
            },
            {
              type: 'image',
              properties: {
                src: '../src/assets/slide2_image2.svg',
                left: 467,
                top: 150,
                width: 228 * 1.2,
                height: 309 * 1.2,
                opacity: 0
              },
              transition: {
                duration: 2,
                values: {
                  opacity: 1,
                  top: 200
                }
              }
            },
            {
              type: 'image',
              properties: {
                src: '../src/assets/slide2_image3.svg',
                left: 746,
                top: 150,
                width: 222 * 1.2,
                height: 309 * 1.2,
                opacity: 0
              },
              transition: {
                duration: 2,
                values: {
                  opacity: 1,
                  top: 200
                }
              }
            },
            {
              type: 'image',
              properties: {
                src: '../src/assets/slide2_image4.svg',
                left: 455,
                top: 20,
                width: 229 * 1.3,
                height: 75 * 1.3,
                opacity: 0
              },
              transition: {
                duration: 2,
                values: {
                  opacity: 1,
                  top: 10
                }
              }
            }
          ]
        },
        {
          title: 'three',
          shouldRender: false,
          shared: false,
          background: {
            color: 'transparent',
            image: {
              url: '../src/assets/slide3BG.jpg',
              size: 'cover',
              position: 'center',
              repeat: 'no-repeat'
            }
          },
          widgets: [
            {
              type: 'block',
              properties: {
                color: '#9a3366',
                left: 168,
                top: 380,
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
                src: '../src/assets/slide3_image1.svg',
                left: 0,
                top: 250,
                width: 210 * 1.5,
                height: 60 * 1.5,
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
          title: 'four',
          shouldRender: false,
          shared: false,
          background: {
            color: 'transparent',
            image: {
              url: '../src/assets/slide4BG.jpg',
              size: '100% 100%',
              position: 'center',
              repeat: 'no-repeat'
            }
          },
          widgets: [
            {
              type: 'block',
              properties: {
                color: '#ffffff',
                left: 168,
                top: 450,
                width: 0,
                height: 1,
                opacity: 1
              },
              transition: {
                duration: 2,
                values: {
                  width: 900
                }
              }
            },
            {
              type: 'image',
              properties: {
                src: '../src/assets/slide4_image1.svg',
                left: 0,
                top: 120,
                width: 200 * 1,
                height: 133 * 1,
                opacity: 0
              },
              transition: {
                duration: 2,
                values: {
                  opacity: 1,
                  left: 260
                }
              }
            },
            {
              type: 'image',
              properties: {
                src: '../src/assets/slide4_image2.svg',
                left: 290,
                top: 0,
                width: 271 * 1,
                height: 367 * 1,
                opacity: 0
              },
              transition: {
                duration: 2,
                values: {
                  opacity: 1
                }
              }
            },
            {
              type: 'image',
              properties: {
                src: '../src/assets/slide4_image3.svg',
                left: 700,
                top: 40,
                width: 271 * 1,
                height: 367 * 1,
                opacity: 0
              },
              transition: {
                duration: 2,
                values: {
                  opacity: 1,
                  left: 650
                }
              }
            },
            {
              type: 'image',
              properties: {
                src: '../src/assets/slide4_image4.svg',
                left: 100,
                top: 480,
                width: 511 * 1.6,
                height: 33 * 1.6,
                opacity: 0
              },
              transition: {
                duration: 2,
                values: {
                  opacity: 1,
                  left: 220
                }
              }
            }
          ]
        },
        {
          title: 'Five',
          shouldRender: false,
          shared: false,
          background: {
            color: '#3fa5a5',
            image: {
              url: '../src/assets/slide5BG.png',
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
                  duration: 1,
                  values: {
                    opacity: 1,
                    top: 500
                  }
                },
                {
                  duration: 1,
                  values: {
                    opacity: 1,
                    top: 110
                  }
                },
                {
                  duration: 1,
                  values: {
                    opacity: 0,
                    top: -400
                  }
                },
                {
                  duration: 1,
                  values: {
                    opacity: 0,
                    top: -400
                  }
                }
              ]
            }
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
    adjustTopOffset: function () {
      var self = this
      if (self.$data.currentZone !== self.$data.sharedOffset.zone) {
        self.$data.sharedOffset.zone = self.$data.currentZone
        TweenLite.to(self.$data.sharedOffset, 1, {top: self.$data.currentZone * GeneralUtils.getWindowSize().height})
      }
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
      if (self.$data.scrollProps.shouldPerformCorrection) {
        // TweenLite.to(self.$data.scrollProps, 0.25, {tick: 0, onComplete: self.scrollCorrection})
        self.adjustTopOffset()
      }
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
      self.$data.currentZone = index
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
      self.adjustTopOffset()
    },
    getInnerStyle: function (isShared) {
      var baseSize = 700
      var scale = GeneralUtils.getWindowSize().height / baseSize
      var standardStyle = 'width:' + GeneralUtils.getMinWidth().toString() + 'px;height:' + GeneralUtils.getMinHeight().toString() + 'px;margin-left:' + (GeneralUtils.getMinWidth() / -2).toString() + 'px;margin-top:' + (GeneralUtils.getMinHeight() / -2).toString() + 'px;transform:scale(' + scale.toString() + ')'
      var marginTopShared = GeneralUtils.getMinHeight() / -2
      // console.log(GeneralUtils.getWindowSize())
      if (GeneralUtils.getWindowSize().height < GeneralUtils.getMinHeight() && isShared) {
        // console.log('********* smaller *************')
        marginTopShared = GeneralUtils.getWindowSize().height / -2
      }
      var sharedStyle = 'width:' + GeneralUtils.getMinWidth().toString() + 'px;height:' + GeneralUtils.getMinHeight().toString() + 'px;margin-left:' + (GeneralUtils.getMinWidth() / -2).toString() + 'px;margin-top:' + marginTopShared.toString() + 'px;position: absolute;transform:scale(' + scale.toString() + ')'
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
