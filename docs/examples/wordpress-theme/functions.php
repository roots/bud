<?php

/**
 * This file is just intended to demonstrate
 * the bare necessities of reading from the
 * `@roots/bud-wordpress-manifest` extension's
 * json output. It isn't a substitute for an actual
 * asset management solution.
 *
 * Try [@roots/sage](https://github.com/roots/sage).
 *
 */

require_once __DIR__ . '/vendor/autoload.php';

use \Illuminate\Support\Collection;

/**
 * partial
 *
 * @param  {string} $partial
 * @return {void}
 */
function partial(string $partial): void {
  require_once get_theme_file_path("partials/{$partial}.php");
}


/**
 * Enqueue assets.
 */
add_action('wp_enqueue_scripts', function () {
  parseAssets()->each(function ($entry) {
    $entry->each(function ($asset) {
      $enqueueAsset = $asset->enqueue;
      $enqueueAsset(
        $asset->name,
        $asset->uri,
        $asset->deps,
        ...[null, true]
      );
    });
  });
});

/**
 * Get asset manifest.
 *
 * @return {Collection} asset manifest
 */
function getAssetManifest() {
  return Collection::make(
    json_decode(
      file_get_contents(
        get_theme_file_path('dist/assets.json')
      )
    )
  );
}

/**
 * parseAssets
 *
 * @return {Collection} prepped assets
 */
function parseAssets() {
  /**
   * Get the manifest contents and map its entrypoints.
   */
  return getAssetManifest()->map(
    function ($entrypoint, $name) {
      /**
       * Parse modules from each entrypoint.
       */
      return Collection::make($entrypoint)->map(
        function ($modules, $type)
          use ($entrypoint, $name) {
          $dependencies = Collection::make($entrypoint->dependencies);
          $modules = Collection::make($modules);

          /**
           * Make an object
           */
          return $modules->map(
            function ($module, $index)
              use ($dependencies, $name, $type) {
              // first, make a reference to the current deps.
              $requirements = $dependencies->all();

              // then, add the current module to the collection obj.
              // ensuring each module depends on all
              // that preceeded it.
              $dependencies->push("{$name}/{$type}/{$index}");

              // finally, make and return the module obj.
              return (object) [
                'name' => $dependencies->last(),
                'uri' => $module,
                'deps' => $requirements,
                'enqueue' => sprintf(
                  "wp_enqueue_%s",
                  $type == 'js' ? 'script' : 'style',
                ),
              ];
            }
          );
        }
      )

      /**
       * Exclude the deps key, which is now redundant.
       */
      ->except('dependencies')

      /**
       * Flatten the results, as the outer structure
       * is now redundant.
       */
      ->flatten();
    }
  );
}
