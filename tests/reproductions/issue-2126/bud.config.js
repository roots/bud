export default async bud => {
  bud.entry('app', ['index.js', 'index.scss']).hash(false).wpjson.enable()
}
