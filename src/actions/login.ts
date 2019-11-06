
import Taro from '@tarojs/taro'

export const wxLogin = async () => {
    try {
        const res = await Taro.login()
        return res.code
    } catch (e) {
        console.log(e)
    }
}

export const userLogin = async () => {
    try {
        await Taro.checkSession()
        if (!Taro.getStorageSync('token')) {
            throw new Error('本地没有缓存token')
        }
    } catch (e) {
        // const code = await wxLogin()
        // 调用后端登录接口
        //   const loginRes = await ...
    }
}
