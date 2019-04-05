import {TweenLite} from 'gsap'
import GeneralUtils from './GeneralUtils.js'
function renderStyle (properties) {
  var styleString = ''
  for (var p in properties) {
    // console.log(self.transition)
    // var propValue = self.transition[p] ? self.properties[p] : self.properties[p]
    // console.log(propValue)
    switch (p) {
      case 'left': {
        styleString += 'left:' + properties[p] + 'px;'
        break
      }
      case 'top': {
        styleString += 'top:' + properties[p] + 'px;'
        break
      }
      case 'width': {
        styleString += 'width:' + properties[p] + 'px;'
        break
      }
      case 'height': {
        styleString += 'height:' + properties[p] + 'px;'
        break
      }
      case 'font': {
        styleString += 'font-family:' + properties[p] + ';'
        break
      }
      case 'size': {
        styleString += 'font-size:' + properties[p] + 'px;'
        break
      }
      case 'color': {
        styleString += 'color:' + properties[p] + ';'
        break
      }
      case 'lineHeight': {
        styleString += 'line-height:' + properties[p] + 'px;'
        break
      }
      case 'opacity': {
        styleString += 'opacity:' + properties[p] + ';'
        break
      }
    }
  }
  return styleString
}
function initialise (properties, transition, zone) {
  if (zone > -1) {
    TweenLite.to(properties, transition[Number(zone)].duration, transition[Number(zone)].values)
  } else {
    TweenLite.to(properties, transition.duration, transition.values)
  }
}
function generateID () {
  return 'widget_' + Math.random().toString().split('.').join('') + Math.random().toString().split('.').join('') + Math.random().toString().split('.').join('')
}
function inHotZone (index) {
  var threshold = 150
  var winHeight = GeneralUtils.getWindowSize().height
  var sectionTop = winHeight * index
  var scrollPosition = GeneralUtils.getMainScrollElement().scrollTop
  return scrollPosition > sectionTop - threshold && scrollPosition < sectionTop + threshold
}
function getCurrentZone (sectionCount) {
  var zone = 0
  // var threshold = 150
  var winHeight = GeneralUtils.getWindowSize().height
  var scrollPosition = GeneralUtils.getMainScrollElement().scrollTop
  for (var i = 0; i < sectionCount; i++) {
    var sectionTop = winHeight * i
    if (scrollPosition >= sectionTop - 1) {
      zone = i
    }
  }
  return zone
}
const WidgetUtils = {
  renderStyle: renderStyle,
  initialise: initialise,
  generateID: generateID,
  inHotZone: inHotZone,
  getCurrentZone: getCurrentZone
}
export default WidgetUtils
