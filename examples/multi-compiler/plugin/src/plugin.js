const features = ["fancy", "ecma"];

await Promise.all(
  features.map(async (feat) => {
    const { testString } = await import(`./test-module.js`);
    console.log(`${feat}: ${testString}`);
  })
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(console.error);
}
