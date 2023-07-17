/**
 * Main JS
 */

export const main = () => {
  /**
   * Remove no-js class from body element
   */
  document.body.classList.contains("no-js") &&
    document.body.classList.remove("no-js");

  document.body.classList.add(`text-xl`);
  document.body.classList.add(`text-custom`);
};
