import './index.css'

class CoolClass {
  hello() {
    return 'world'
  }
}

document.body.innerText = new CoolClass().hello()
