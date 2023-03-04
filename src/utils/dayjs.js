import dayjs from 'dayjs'
// dayjs默认是英文
// 加载中文语言包
import 'dayjs/locale/zh-cn' // 全局使用
// 加载插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export { dayjs }
