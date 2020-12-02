<?php

/**
 * This file is just intended to demonstrate
 * the bare necessities of reading from the
 * `@roots/bud-wordpress-manifest` extension's
 * json output. It isn't a substitute for an actual
 * asset management solution.
 *
 * Try [@roots/sage](https://github.com/roots/sage).
 */

require_once __DIR__ . '/vendor/autoload.php';
use Illuminate\Support\Collection;

/**
 * basic theme partial fn
 *
 * @param  {string} $partial
 * @return {void}
 */
function partial(string $partial): void {
  $templateFile = realpath(
    get_theme_file_path(
      "partials/{$partial}.php"
    )
  );

  $templateFile &&
    require_once $templateFile;
}

/**
 * Get manifest.
 *
 * @return {Collection} entrypoint manifest
 */
function getManifest () {
  return Collection::make(
    json_decode(
      file_get_contents(
        get_theme_file_path('dist/entrypoints.json')
      )
    )
  );
};

/**
 * formatItem
 */
function formatItem($name, $type, $item) {
  $items = Collection::make($item->$type);

  return $items->map(
    function ($uri, $index) use ($item, $type, $name) {
      // Unique name for identifying asset in wp
      $name = "{$type}.{$name}.{$index}";

      // True if file depends on wp assets, or runtime/vendor chunks.
      $hasDeps = $type == 'js' &&
        property_exists($item, 'dependencies');

      // If there were dependencies, add the current file to them.
      if ($deps = $hasDeps ? $item->dependencies : []) {
        array_push($item->dependencies, $name);
      }

      return (object) [
        'name' => $name,
        'uri' => $uri,
        'deps' => $deps,
      ];
    }
  );
}

/**
 * Enqueue hook.
 */
$enqueue = function () {
  // Enqueue scripts
  $js = function ($item) {
    $item->js->each(function ($entry) {
      wp_enqueue_script(...[
        $entry->name,
        $entry->uri,
        $entry->deps,
        null,
        false,
      ]);
    });
  };

  // Enqueue styles
  $css = function ($item) {
    $item->css->each(function ($entry) {
      wp_enqueue_style(...[
        $entry->name,
        $entry->uri,
        $entry->deps,
        null,
        false,
      ]);
    });
  };

  // Prepare manifest entries for enqueue
  $prep = function ($item, $name) {
    return (object) [
      'js' => formatItem($name, 'js', $item),
      'css' => formatItem($name, 'css', $item)
    ];
  };

  return getManifest()
    ->map($prep)
    ->each($js)
    ->each($css);
};

/**
 * Enqueue assets.
 */
add_action('wp_enqueue_scripts', $enqueue);
