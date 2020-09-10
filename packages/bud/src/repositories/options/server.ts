const server = {
  disableHostCheck: true,
  inline: true,
  changeOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':
      'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers':
      'X-Requested-With, content-type, Authorization',
  },
  writeToDisk: true,
}

export {server as default}
