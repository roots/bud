const features = ["fancy", "ecma"];

features.map((feat) => {
  console.log(feat);
});

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(console.error);
}
