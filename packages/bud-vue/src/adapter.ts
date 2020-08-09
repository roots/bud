import {VueLoaderPlugin} from 'vue-loader'

const adapter = () => ({
  make: function () {
    return new VueLoaderPlugin()
  },
})

export default adapter
