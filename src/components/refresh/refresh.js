import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import './refresh.less'

import refreshIcon from '../../assets/imgs/refresh.png'
import loadingIcon from '../../assets/imgs/loading.png'
import doneIcon from '../../assets/imgs/done.png'

const systemInfo = Taro.getSystemInfoSync()

class ComponentRefresh extends Component {
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
      showModal: false,
      refreshStatus: 'init',
      refreshHeight: 0,
      refreshing: false,
      loading: false,
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() { }

  componentDidShow() {

  }

  componentDidHide() { }

  componentWillReceiveProps(newProps) {
    if (!newProps.refreshing) {
      this.setState({
        refreshHeight: 0
      }, () => {
      })
      const loadingAnimate = setTimeout(() => {
        this.setState({
          refreshStatus: 'done'
        })
        clearTimeout(loadingAnimate)
      }, 200)
    }
  }
  handleTouchMove(e) {
    const curTouch = e.touches[0]
    const moveY = (curTouch.pageY - this.lastTouchY) * .3
    if (
      !this.isUpper ||
      moveY < 0 ||
      moveY > 2 * this.maxHeight ||
      this.state.refreshStatus === 'loading'
    ) {
      return
    }
    if (moveY < this.validHeight) {
      this.setState({
        refreshHeight: moveY,
        refreshStatus: 'pulldown'
      })
    } else {
      this.setState({
        refreshHeight: moveY,
        refreshStatus: 'readyrefresh'
      })
    }
  }
  handleScrollToLower() {
    if (this.props.hasMore && this.props.onLoadMore && this.state.refreshStatus !== 'loading') {
      this.props.onLoadMore()
    }
  }
  handleTouchStart(e) {
    const curTouch = e.touches[0]
    this.lastTouchY = curTouch.pageY
  }
  handleTouchEnd() {
    console.log('手指离开', this.state.refreshStatus)
    this.lastTouchY = 0
    if (this.state.refreshStatus === 'readyrefresh') {
      this.setState({
        refreshStatus: 'loading',
        refreshHeight: this.maxHeight
      })
      if (this.props.onRefresh) {
        this.props.onRefresh()
      }
    } else {
      this.setState({
        refreshHeight: 0
      })
    }
  }
  handleScrollToUpeper() {
    this.isUpper = true
  }
  handleScroll() {
    this.isUpper = false
  }

  render() {
    const { refreshStatus, refreshHeight } = this.state
    return (
      <ScrollView 
        className="refresh-scroll-view"
        style={{ height: systemInfo.screenHeight - systemInfo.statusBarHeight - 40 + 'px' }}
        onScrollToUpper={this.handleScrollToUpeper.bind(this)} 
        onScroll={this.handleScroll.bind(this)}
        onScrollToLower={this.handleScrollToLower.bind(this)}
        scrollY={true}>
        <View className={refreshStatus === 'loading' ? 'loading refresh-icon-view' : 'refresh-icon-view'} style={{ height: refreshHeight + 'px' }}>
          <Image className={refreshStatus === 'loading' ? 'loading refresh-icon' : 'refresh-icon'} src={refreshIcon} style={{ transform: `rotate(${(refreshHeight / this.maxHeight) * 360}deg)` }}></Image>
        </View>
        <View
          className="refresh-body-view"
          onTouchMove={this.handleTouchMove.bind(this)}
          onTouchStart={this.handleTouchStart.bind(this)}
          onTouchEnd={this.handleTouchEnd.bind(this)}
        >
          {this.props.children}
        </View>
        <View className="load-more-view">
          {
            this.props.hasMore ? (
              <Image className="load-more-icon loading" src={loadingIcon}></Image>
            ) : (
                <Image className="load-more-icon" src={doneIcon}></Image>
              )
          }
        </View>
      </ScrollView>
    )
  }
}

export default ComponentRefresh
