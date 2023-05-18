export default async (bud) => {
  bud.assets(`fonts`).entry(`app`, [`scripts/app`, `styles/app`]).watch([bud.path(`@src`, `*.html`), bud.path(`@src`, `images`)]).serve(3015).splitChunks(false).minimize(false).html({
    template: bud.path(`@src`, `index.html`),
    replace: {
      noScript: `You need to enable JavaScript to run this app`
    }
  });
  console.log(`foo`, `bar`);
};
