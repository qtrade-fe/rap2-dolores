const config: IConfig = {
  serve: 'http://127.0.0.1:8081',
  keys: ['some secret hurr'],
  session: {
    key: 'koa:sess',
  },
  work_wx: {
    corpId: 'wwded713f7f22ac9f7',
    agentId: '1000028',
    agentSecret: 'O96D3UinLFeo3peIowkC-cXZtETPqXifLiTYFiyg654',
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
