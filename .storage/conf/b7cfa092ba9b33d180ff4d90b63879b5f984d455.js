export default async (bud) => {
  bud.entry(`app`, [`scripts/index`, `styles/app`]).watch([bud.path(`@src`, `images`)]).serve(3015).html();
};
