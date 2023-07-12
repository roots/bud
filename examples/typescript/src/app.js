const el = document.querySelector('body');
if (el)
    el.style.backgroundColor = `black`;
if (import.meta.webpackHot)
    import.meta.webpackHot.accept(console.error);
export {};
