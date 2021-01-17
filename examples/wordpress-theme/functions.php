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

namespace App;

require_once __DIR__ . '/vendor/autoload.php';

use \Illuminate\Support\Collection;

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
function entrypoint($name, $type, $entrypoint) {
  $entrypoint->modules = Collection::make($entrypoint->$type);

  $hasDependencies = $type == 'js' &&
    property_exists($entrypoint, 'dependencies');

  $entrypoint->dependencies = Collection::make(
    $hasDependencies
      ? $entrypoint->dependencies
      : [],
  );

  return $entrypoint->modules->map(
    function ($module, $index) use ($type, $name, $entrypoint) {
      $name = "{$type}.{$name}.{$index}";

      $dependencies = $entrypoint->dependencies->all();

      $entrypoint->dependencies->push($name);

      return (object) [
        'name' => $name,
        'uri' => $module,
        'deps' => $dependencies,
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
        true,
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
      ]);
    });
  };

  // Prepare manifest entries for enqueue
  $prep = function ($item, $name) {
    return (object) [
      'js' => entrypoint($name, 'js', $item),
      'css' => entrypoint($name, 'css', $item)
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
