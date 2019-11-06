import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, ScrollView, Image } from '@tarojs/components'
import './index.less'

import data from '../../data/data.json'
import ComponentBaseNavigation from '../../components/navigation/navigation';
import ComponentRefresh from '../../components/refresh/refresh';

class Index extends Component {
  lastTouchY = 0
  isUpper = true
  maxHeight = 50
  validHeight = 30
  config = {
    navigationBarTitleText: '首页',
  }

  constructor() {
    super(...arguments)
    this.state = {
      list: null,
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() { }

  componentDidShow() {
    if (data.Code === 0 && data.Data) {
      this.setState({
        list: data.Data
      })
    }
  }

  componentDidHide() { }

  handleHideModal() {
    this.setState({
      showModal: false
    })
  }

  handleShowModal() {
    this.setState({
      showModal: true
    })
  }

  goDetail(id) {
    // Taro.navigateTo({
    //   url: '/pages/detail/detail'
    // })
  }

  bindrefresh () {
    setTimeout(() => {
      this.setState({
        refreshing: false
      })
    }, 2000)
  }

  onLoadMore() {}

  render() {
    const { list, refreshing } = this.state
    // onRefresh?: any
    // children?: any
    // hasMore?: boolean
    // onLoadMore?: any
    // refreshing?: boolean
    // scrollViewHeight: number
    return (
      <View className='index'>
        <ComponentBaseNavigation backgroundColor='#000000'>
          <View>首页</View>
        </ComponentBaseNavigation>
        <ComponentRefresh hasMore={false} refreshing={refreshing} onRefresh={this.bindrefresh}>
          {
            list && list.map((item) => {
              return (<View className='item' key={item.post.post_id} onClick={this.goDetail}>{item.post.title}</View>)
            })
          }
        </ComponentRefresh>
      </View>
    )
  }
}

export default Index
