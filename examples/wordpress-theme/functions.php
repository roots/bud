<?php

/**
 * This file is just an example implementation.
 * It isn't a substitute for an actual asset management solution.
 *
 * Try [@roots/sage](https://github.com/roots/sage).
 */

namespace App;

require_once __DIR__ . '/vendor/autoload.php';

use \Illuminate\Support\Collection;

function partial(string $partial)
{
  $templateFile = realpath(get_theme_file_path("src/partials/{$partial}.php"));
  $templateFile && require_once $templateFile;
}

function getManifest()
{
  $path = realpath(get_theme_file_path('dist/entrypoints.json'));

  if (!$path) throw new \WP_Error('Run yarn build');

  return Collection::make(
    json_decode(
      file_get_contents(
        get_theme_file_path('dist/entrypoints.json')
      )
    )
  );
};

function entrypoint(
  string $name,
  string $type,
  Object $entrypoint
) {
  $entrypoint->modules = Collection::make(
    $entrypoint->$type
  );

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

function bundle(string $bundleName)
{
  $filterHot = fn ($entry) => !strpos($entry->uri, 'hot-update');

  getManifest()
    ->filter(fn ($value, $key) => $key === $bundleName)
    ->map(fn ($item, $name) => (object) [
      'js' => entrypoint($name, 'js', $item),
      'css' => entrypoint($name, 'css', $item)
    ])
    ->each(function ($entrypoint) use ($filterHot) {
      $entrypoint->js->filter($filterHot)->each(
        fn ($entry) =>
        wp_enqueue_script($entry->name, $entry->uri, $entry->deps, null, true)
      );

      $entrypoint->css->filter($filterHot)->each(
        fn ($entry) =>
        wp_enqueue_style($entry->name, $entry->uri, $entry->deps, null)
      );
    });
};

add_action('wp_enqueue_scripts', fn () => bundle('bud-app'), 100);
add_action('enqueue_block_editor_assets', fn () => bundle('bud-editor'), 100);
