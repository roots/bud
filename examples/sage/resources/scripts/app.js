import {main} from '@scripts/components/main';

console.log(jimmy);

const init = () =>
  window.requestAnimationFrame(function ready() {
    return document.body ? main() : window.requestAnimationFrame(ready);
  });

init();

module?.hot?.accept('./components/main.js', init);
