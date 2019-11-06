import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './navigation.less';

const statusBarHeight = Taro.getSystemInfoSync().statusBarHeight

class ComponentBaseNavigation extends Component {
  // 使组件外样式类能够完全影响组件内部
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    color: 'white',
    backgroundColor: '#000',
  }

  render() {
    const { backgroundColor, color } = this.props

    const barStyle = {
      paddingTop: `${statusBarHeight}px`,
      backgroundColor,
      color,
    }
    return (
      <View className='navigation'>
        <View className='bar' style={barStyle}>
          {this.props.children}
        </View>
        <View className='placeholder' style={{paddingTop: `${statusBarHeight}px`}} />
      </View>
    )
  }
}

export default ComponentBaseNavigation