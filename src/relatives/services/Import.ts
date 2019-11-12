const getSwaggerApi = (url: string) => {
  return fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
  }).then(res => res.json())
}
// 获取导入仓库数据
export default {
  async fetchSwaggerDoc({ docUrl }: any) {
    let domain = docUrl
    if (domain.indexOf('http') === -1) {
      domain = 'http://' + domain
    }
    domain = domain.substring(0, domain.indexOf('/swagger-ui.html'))

    const swResources = await getSwaggerApi(`${domain}/swagger-resources`)
    const apiDocs = []
    for (const res of swResources) {
      const apiDoc = await getSwaggerApi(`${domain}${res.location}`)
      apiDocs.push(apiDoc)
    }

    return apiDocs
  },
}
