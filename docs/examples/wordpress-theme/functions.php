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

use \Illuminate\Support\Collection;

/**
 * partial
 *
 * @param  {string} $partial
 * @return {void}
 */
function partial(string $partial): void
{
    require_once get_theme_file_path("partials/{$partial}.php");
}

/**
 * getManifest
 *
 * @return {Collection} manifest contents
 */
function getManifest()
{
    return Collection::make(
        json_decode(
            file_get_contents(
                get_theme_file_path('dist/entrypoints.json')
            )
        )
    );
}

/**
 * Return asset resource string
 *
 * @param  {string} $uri
 * @return {string}
 */
function getAssetUri(string $uri): string
{
    $baseUrl = "https://demo.valet/app/themes/demo-theme";

    return "{$baseUrl}/dist/{$uri}";
}

/**
 * Enqueue assets.
 */
add_action('wp_enqueue_scripts', function () {
    getManifest()->each(function ($assets, $entry) {
        // dependencies
        $deps = new Collection([]);
        Collection::make($assets)->each(
            function ($asset, $name) use ($deps, $entry) {
                $deps->push("js/$entry/$name");

                wp_enqueue_script($deps->last(), getAssetUri($asset), [], false, true);
            }
        );

        // entrypoint
        wp_enqueue_script("js/${entry}", getAssetUri("${entry}.js"), $deps->toArray(), false, true);
    });
});
