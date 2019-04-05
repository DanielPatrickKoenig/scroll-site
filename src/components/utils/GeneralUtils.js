function getWindowSize () {
  return {width: window.innerWidth, height: window.innerHeight}
}
function getMinHeight () {
  return 600
}
function getMinWidth () {
  return 1200
}
function getHeight () {
  var actualHeight = window.innerHeight
  return actualHeight < getMinHeight() ? getMinHeight() : actualHeight
}
function getWidth () {
  var actualWidth = window.innerWidth
  return actualWidth < getMinWidth() ? getMinWidth() : actualWidth
}
function getMainScrollElement () {
  return document.getElementsByTagName('html')[0]
}
const GeneralUtils = {
  getHeight: getHeight,
  getWidth: getWidth,
  getMinHeight: getMinHeight,
  getMinWidth: getMinWidth,
  getWindowSize: getWindowSize,
  getMainScrollElement: getMainScrollElement
}
export default GeneralUtils
