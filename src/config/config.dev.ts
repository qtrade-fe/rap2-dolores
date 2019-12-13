const config: IConfig = {
  serve: 'http://127.0.0.1:8081',
  keys: ['some secret hurr'],
  session: {
    key: 'koa:sess',
  },
  work_wx: {
    corpId: 'wwfe99d324096b2f7e',
    agentId: '1000002',
    agentSecret: 'JDCIdSequQT-5ZAHN9obGpBpknZ3YXKc5A41sHs4B2M',
  },
}
// const config: IConfig = {
//   serve: 'http://dev.qtrade.com.cn:2280',
//   keys: ['some secret hurr'],
//   session: {
//     key: 'koa:sess',
//   },
//   work_wx: {
//     corpId: 'ww2931230e8e77ae73',
//     agentId: '1000065',
//     agentSecret: 'GxcBTE6TUzfkCuJXEdBKao5nZeYB2MoVS8vQhh4M61U',
//   },
// }

export default config
