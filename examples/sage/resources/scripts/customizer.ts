declare const wp: any
declare const $: any

wp.customize('blogname', (value) => {
  value.bind((to) => {
    $('.brand').text(to)
  });
});
