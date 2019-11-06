import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, WebView } from '@tarojs/components'
import './detail.less'
class Detail extends Component {
  constructor() {
    super(...arguments)
  }

  render() {
    return (<WebView src='https://api.tapai.tv/V1/Shop?plat=mini&token=ADYENFAyVzlXZlZjUDJQYFUwVGMDYAprV2IFbgcoBHdRbAUzBGoFcVYkAW9db1B3B2sHdwA4XzIGOlYlBmAAMAA%2BBDJQMFc2V3JWalB1UG9VO1RtAyMKI1cwBToHNwRbUTUFbwQ0BTZWcwE9XXhQbwdhBzQAOF8mBmtWZQYoAFQAYgRGUGdXUFcyVhJQJFBuVXFUbQMwCmFXawV2BzYEfFEmBWkEIgU2ViIBWV1iUDsHcgc%2FAGtfPgYyVjIGawAyADcEMVA0VzpXLQ%3D%3D'></WebView>)
  }
}

export default Detail