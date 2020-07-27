import type { Bud } from "./types";

const terminate = (
  options = {
    dump: false,
    timeout: 500,
  }
) => {
  const exit = (code: number) => {
    options.dump ? process.abort() : process.exit(code);
  };

  return () => (err) => {
    if (err && err instanceof Error) {
      console.log(err.message, err.stack);
    }

    setTimeout(exit, options.timeout).unref();
  };
};

export { terminate };
