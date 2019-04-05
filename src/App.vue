<template>
  <div id="app">
    <scrollsection v-for="(v, i) in sections" :key="'section'+i.toString()" :index="i" :first="i == 0" :last="i == sections.length - 1" :style="renderSectionStyle(v)" :shared="v.shared" :zone="currentZone">
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
      sections: [
        {
          title: 'Good',
          shouldRender: false,
          shared: false,
          background: {
            color: 'transparent',
            image: {
              url: 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2018/06/ultra-wide-mistakes-lead-image.jpg',
              size: 'cover',
              position: 'center',
              repeat: 'no-repeat'
            }
          },
          widgets: [
            {
              type: 'text',
              properties: {
                text: 'this is a test',
                color: '#00cc00',
                left: 100,
                top: 10,
                width: 300,
                font: 'helvetica',
                opacity: 0
              },
              transition: {
                duration: 2,
                values: {
                  opacity: 1,
                  left: 200
                }
              }
            },
            {
              type: 'image',
              properties: {
                src: 'https://cdn.cnn.com/cnnnext/dam/assets/180612102033-01-baobob-tree-restricted-super-tease.jpg',
                color: '#00cc00',
                left: 400,
                top: 200,
                width: 300,
                height: 120,
                opacity: 0
              },
              transition: {
                duration: 2,
                values: {
                  opacity: 1,
                  top: 290
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
            color: 'transparent',
            image: {
              url: 'https://store-images.s-microsoft.com/image/apps.6197.13569891971238701.dab36319-31db-42e5-b32b-edb97c11d8b7.b4ec6763-6d93-4369-87b7-81c25913395f?mode=scale&q=90&h=1080&w=1920',
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
              url: 'https://cdn2.outdoorphotographer.com/2019/01/Moody_Landscapes_1.jpg',
              size: 'cover',
              position: 'center',
              repeat: 'no-repeat'
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
              // transition: {
              //   duration: 2,
              //   values: {
              //     opacity: 1,
              //     left: 400
              //   }
              // }
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
      for (var i = 0; i < self.$data.sections.length; i++) {
        if (GeneralUtils.getMainScrollElement().scrollTop >= i * GeneralUtils.getHeight()) {
          self.$data.sections[i].shouldRender = true
        }
        self.$data.currentZone = WidgetUtils.getCurrentZone(self.$data.sections.length)
        // console.log(i.toString() + 'current zone = ' + self.$data.currentZone)
      }
    },
    goToSection: function (index) {
      var self = this
      if (index < self.$data.sections.length && index >= 0) {
        var scrollStats = {top: GeneralUtils.getMainScrollElement().scrollTop}
        TweenLite.to(scrollStats, 0.75, {
          top: GeneralUtils.getHeight() * (index),
          onUpdate: function (stats) {
            GeneralUtils.getMainScrollElement().scrollTop = stats.top
            // document.getElementsByTagName('html')[0].scrollTo(0, stats.top)
          },
          onUpdateParams: [scrollStats],
          onComplete: function () {
            self.$data.sections[index].shouldRender = true
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
      var sharedStyle = 'width:' + GeneralUtils.getMinWidth().toString() + 'px;height:' + GeneralUtils.getMinHeight().toString() + 'px;margin-left:' + (GeneralUtils.getMinWidth() / -2).toString() + 'px;margin-top:' + marginTopShared.toString() + 'px;position: fixed; background-color:rgba(0,0,0,.2);'
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
      // self.$data.innerStyles[n.index] = self.getInnerStyle(n.shared)
      // console.log(self.$data.innerStyles)
      // self.goToSection(n.index)
    })
  }
}
</script>

<style lang="scss">
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
