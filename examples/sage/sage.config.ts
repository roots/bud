import {Sage} from '@roots/sage';

export default (sage: Sage) =>
  sage
    .entry({
      app: ['**/app.{js,css}'],
      editor: ['**/editor.{js,css}'],
      customizer: ['**/customizer.{js,css}'],
    })
    .assets(['assets/images'])
    .persist(false);
