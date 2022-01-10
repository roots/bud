
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog','54c'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive','f4c'),
    exact: true
  },
  {
    path: '/blog/release-v5.0.0',
    component: ComponentCreator('/blog/release-v5.0.0','165'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags','e13'),
    exact: true
  },
  {
    path: '/blog/tags/release',
    component: ComponentCreator('/blog/tags/release','f3f'),
    exact: true
  },
  {
    path: '/contributors',
    component: ComponentCreator('/contributors','3e6'),
    exact: true
  },
  {
    path: '/releases',
    component: ComponentCreator('/releases','236'),
    exact: true
  },
  {
    path: '/releases/5.0.0',
    component: ComponentCreator('/releases/5.0.0','0b1'),
    exact: true
  },
  {
    path: '/releases/archive',
    component: ComponentCreator('/releases/archive','d3c'),
    exact: true
  },
  {
    path: '/releases/tags',
    component: ComponentCreator('/releases/tags','8ac'),
    exact: true
  },
  {
    path: '/releases/tags/release',
    component: ComponentCreator('/releases/tags/release','b40'),
    exact: true
  },
  {
    path: '/api',
    component: ComponentCreator('/api','a68'),
    routes: [
      {
        path: '/api/',
        component: ComponentCreator('/api/','34b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api',
        component: ComponentCreator('/api/bud-api','2c6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/api',
        component: ComponentCreator('/api/bud-api/api','f78'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/api/call',
        component: ComponentCreator('/api/bud-api/api/call','10a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/api/dump',
        component: ComponentCreator('/api/bud-api/api/dump','35a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/api/processqueue',
        component: ComponentCreator('/api/bud-api/api/processqueue','ce7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade',
        component: ComponentCreator('/api/bud-api/facade','b91'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/alias',
        component: ComponentCreator('/api/bud-api/facade/alias','0db'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/assets',
        component: ComponentCreator('/api/bud-api/facade/assets','c91'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/autoload',
        component: ComponentCreator('/api/bud-api/facade/autoload','dfa'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/config',
        component: ComponentCreator('/api/bud-api/facade/config','39c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/copy',
        component: ComponentCreator('/api/bud-api/facade/copy','fb7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/css',
        component: ComponentCreator('/api/bud-api/facade/css','07c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/define',
        component: ComponentCreator('/api/bud-api/facade/define','4f6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/devtool',
        component: ComponentCreator('/api/bud-api/facade/devtool','929'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/entry',
        component: ComponentCreator('/api/bud-api/facade/entry','5cd'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/experiments',
        component: ComponentCreator('/api/bud-api/facade/experiments','795'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/externals',
        component: ComponentCreator('/api/bud-api/facade/externals','2f0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/extract',
        component: ComponentCreator('/api/bud-api/facade/extract','e52'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/hash',
        component: ComponentCreator('/api/bud-api/facade/hash','23e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/js',
        component: ComponentCreator('/api/bud-api/facade/js','d3a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/minimize',
        component: ComponentCreator('/api/bud-api/facade/minimize','e97'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/override',
        component: ComponentCreator('/api/bud-api/facade/override','941'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/persist',
        component: ComponentCreator('/api/bud-api/facade/persist','282'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/provide',
        component: ComponentCreator('/api/bud-api/facade/provide','77a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/proxy',
        component: ComponentCreator('/api/bud-api/facade/proxy','acc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/publicpath',
        component: ComponentCreator('/api/bud-api/facade/publicpath','447'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/run',
        component: ComponentCreator('/api/bud-api/facade/run','0b3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/runtime',
        component: ComponentCreator('/api/bud-api/facade/runtime','6e6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/serve',
        component: ComponentCreator('/api/bud-api/facade/serve','707'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/setpublicpath',
        component: ComponentCreator('/api/bud-api/facade/setpublicpath','b81'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/splitchunks',
        component: ComponentCreator('/api/bud-api/facade/splitchunks','0de'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/template',
        component: ComponentCreator('/api/bud-api/facade/template','33b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/use',
        component: ComponentCreator('/api/bud-api/facade/use','32a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/version',
        component: ComponentCreator('/api/bud-api/facade/version','255'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/watch',
        component: ComponentCreator('/api/bud-api/facade/watch','de0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-api/facade/webpackconfig',
        component: ComponentCreator('/api/bud-api/facade/webpackconfig','f50'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-babel/mixin',
        component: ComponentCreator('/api/bud-babel/mixin','cd1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-babel/name2',
        component: ComponentCreator('/api/bud-babel/name2','8a2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-babel/register',
        component: ComponentCreator('/api/bud-babel/register','360'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/build',
        component: ComponentCreator('/api/bud-build/build','975'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/build/init',
        component: ComponentCreator('/api/bud-build/build/init','809'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/build/items',
        component: ComponentCreator('/api/bud-build/build/items','662'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/build/loaders',
        component: ComponentCreator('/api/bud-build/build/loaders','76c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/build/make',
        component: ComponentCreator('/api/bud-build/build/make','c81'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/build/register',
        component: ComponentCreator('/api/bud-build/build/register','58d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/build/registered',
        component: ComponentCreator('/api/bud-build/build/registered','c26'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/build/rules',
        component: ComponentCreator('/api/bud-build/build/rules','919'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/build/writefinalconfig',
        component: ComponentCreator('/api/bud-build/build/writefinalconfig','dc6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/item',
        component: ComponentCreator('/api/bud-build/item','108'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/item/constructor',
        component: ComponentCreator('/api/bud-build/item/constructor','908'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/item/getloader',
        component: ComponentCreator('/api/bud-build/item/getloader','ca9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/item/loader',
        component: ComponentCreator('/api/bud-build/item/loader','87b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/item/make',
        component: ComponentCreator('/api/bud-build/item/make','4fd'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/item/mergeoptions',
        component: ComponentCreator('/api/bud-build/item/mergeoptions','2e0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/item/options',
        component: ComponentCreator('/api/bud-build/item/options','202'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/item/setloader',
        component: ComponentCreator('/api/bud-build/item/setloader','062'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/item/setoptions',
        component: ComponentCreator('/api/bud-build/item/setoptions','a5a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/items',
        component: ComponentCreator('/api/bud-build/items','8e0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/items/default',
        component: ComponentCreator('/api/bud-build/items/default','3a5'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/loader',
        component: ComponentCreator('/api/bud-build/loader','82a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/loader/constructor',
        component: ComponentCreator('/api/bud-build/loader/constructor','c39'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/loader/make',
        component: ComponentCreator('/api/bud-build/loader/make','b8a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/loader/normalizeinput',
        component: ComponentCreator('/api/bud-build/loader/normalizeinput','384'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/loader/src',
        component: ComponentCreator('/api/bud-build/loader/src','132'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/loaders',
        component: ComponentCreator('/api/bud-build/loaders','f6f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/loaders/default',
        component: ComponentCreator('/api/bud-build/loaders/default','1a0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule',
        component: ComponentCreator('/api/bud-build/rule','c72'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/constructor',
        component: ComponentCreator('/api/bud-build/rule/constructor','f65'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/exclude',
        component: ComponentCreator('/api/bud-build/rule/exclude','ee6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/generator',
        component: ComponentCreator('/api/bud-build/rule/generator','84f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/getexclude',
        component: ComponentCreator('/api/bud-build/rule/getexclude','a33'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/getgenerator',
        component: ComponentCreator('/api/bud-build/rule/getgenerator','05c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/getparser',
        component: ComponentCreator('/api/bud-build/rule/getparser','89a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/gettest',
        component: ComponentCreator('/api/bud-build/rule/gettest','5ca'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/gettype',
        component: ComponentCreator('/api/bud-build/rule/gettype','228'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/getuse',
        component: ComponentCreator('/api/bud-build/rule/getuse','66a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/make',
        component: ComponentCreator('/api/bud-build/rule/make','f0d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/parser',
        component: ComponentCreator('/api/bud-build/rule/parser','1d9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/setexclude',
        component: ComponentCreator('/api/bud-build/rule/setexclude','181'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/setgenerator',
        component: ComponentCreator('/api/bud-build/rule/setgenerator','e52'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/setparser',
        component: ComponentCreator('/api/bud-build/rule/setparser','ef1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/settest',
        component: ComponentCreator('/api/bud-build/rule/settest','c43'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/settype',
        component: ComponentCreator('/api/bud-build/rule/settype','fab'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/setuse',
        component: ComponentCreator('/api/bud-build/rule/setuse','28a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/test',
        component: ComponentCreator('/api/bud-build/rule/test','418'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/type',
        component: ComponentCreator('/api/bud-build/rule/type','46c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rule/use',
        component: ComponentCreator('/api/bud-build/rule/use','a1c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rules',
        component: ComponentCreator('/api/bud-build/rules','c51'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rules/css',
        component: ComponentCreator('/api/bud-build/rules/css','ec9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rules/csv',
        component: ComponentCreator('/api/bud-build/rules/csv','b24'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rules/font',
        component: ComponentCreator('/api/bud-build/rules/font','f24'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rules/html',
        component: ComponentCreator('/api/bud-build/rules/html','1be'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rules/image',
        component: ComponentCreator('/api/bud-build/rules/image','61d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rules/js',
        component: ComponentCreator('/api/bud-build/rules/js','2e2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rules/json5',
        component: ComponentCreator('/api/bud-build/rules/json5','b78'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rules/svg',
        component: ComponentCreator('/api/bud-build/rules/svg','520'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rules/toml',
        component: ComponentCreator('/api/bud-build/rules/toml','855'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rules/xml',
        component: ComponentCreator('/api/bud-build/rules/xml','b42'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-build/rules/yml',
        component: ComponentCreator('/api/bud-build/rules/yml','4cb'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-cache/cache2',
        component: ComponentCreator('/api/bud-cache/cache2','da1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-cache/cache2/boot',
        component: ComponentCreator('/api/bud-cache/cache2/boot','fad'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-cache/cache2/directory',
        component: ComponentCreator('/api/bud-cache/cache2/directory','bd6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-cache/cache2/enabled',
        component: ComponentCreator('/api/bud-cache/cache2/enabled','05a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-cache/cache2/hashfilecontents',
        component: ComponentCreator('/api/bud-cache/cache2/hashfilecontents','3a6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-cache/cache2/type',
        component: ComponentCreator('/api/bud-cache/cache2/type','8ec'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-cache/cache2/version',
        component: ComponentCreator('/api/bud-cache/cache2/version','c58'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compiler/compiler',
        component: ComponentCreator('/api/bud-compiler/compiler','1f8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compiler/compiler/before',
        component: ComponentCreator('/api/bud-compiler/compiler/before','5f4'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compiler/compiler/callback',
        component: ComponentCreator('/api/bud-compiler/compiler/callback','4fb'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compiler/compiler/compile',
        component: ComponentCreator('/api/bud-compiler/compiler/compile','e55'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compiler/compiler/config',
        component: ComponentCreator('/api/bud-compiler/compiler/config','4b7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compiler/compiler/errors',
        component: ComponentCreator('/api/bud-compiler/compiler/errors','451'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compiler/compiler/instance',
        component: ComponentCreator('/api/bud-compiler/compiler/instance','835'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compiler/compiler/invoke',
        component: ComponentCreator('/api/bud-compiler/compiler/invoke','79b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compiler/compiler/iscompiled',
        component: ComponentCreator('/api/bud-compiler/compiler/iscompiled','70a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compiler/compiler/progress',
        component: ComponentCreator('/api/bud-compiler/compiler/progress','fb5'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compiler/compiler/stats',
        component: ComponentCreator('/api/bud-compiler/compiler/stats','09c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compress/boot',
        component: ComponentCreator('/api/bud-compress/boot','be1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compress/budcompressionextension',
        component: ComponentCreator('/api/bud-compress/budcompressionextension','0b0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compress/budcompressionextension/options',
        component: ComponentCreator('/api/bud-compress/budcompressionextension/options','4d1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compress/budcompressionextension/options/algorithm',
        component: ComponentCreator('/api/bud-compress/budcompressionextension/options/algorithm','e76'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compress/budcompressionextension/options/compressionoptions',
        component: ComponentCreator('/api/bud-compress/budcompressionextension/options/compressionoptions','0d3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compress/budcompressionextension/options/deleteoriginalassets',
        component: ComponentCreator('/api/bud-compress/budcompressionextension/options/deleteoriginalassets','d06'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compress/budcompressionextension/options/filename',
        component: ComponentCreator('/api/bud-compress/budcompressionextension/options/filename','635'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compress/budcompressionextension/options/minratio',
        component: ComponentCreator('/api/bud-compress/budcompressionextension/options/minratio','f88'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compress/budcompressionextension/options/test',
        component: ComponentCreator('/api/bud-compress/budcompressionextension/options/test','f76'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compress/budcompressionextension/options/threshold',
        component: ComponentCreator('/api/bud-compress/budcompressionextension/options/threshold','f61'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-compress/name2',
        component: ComponentCreator('/api/bud-compress/name2','b8f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-criticalcss/budcriticalcssplugin',
        component: ComponentCreator('/api/bud-criticalcss/budcriticalcssplugin','5ca'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-criticalcss/budcriticalcssplugin/api',
        component: ComponentCreator('/api/bud-criticalcss/budcriticalcssplugin/api','3a1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-criticalcss/budcriticalcssplugin/make',
        component: ComponentCreator('/api/bud-criticalcss/budcriticalcssplugin/make','88f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-criticalcss/budcriticalcssplugin/name',
        component: ComponentCreator('/api/bud-criticalcss/budcriticalcssplugin/name','3d9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-criticalcss/budcriticalcssplugin/options',
        component: ComponentCreator('/api/bud-criticalcss/budcriticalcssplugin/options','a66'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-dashboard/dashboard',
        component: ComponentCreator('/api/bud-dashboard/dashboard','4d1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-dashboard/dashboard/bootstrap',
        component: ComponentCreator('/api/bud-dashboard/dashboard/bootstrap','98c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-dashboard/dashboard/close',
        component: ComponentCreator('/api/bud-dashboard/dashboard/close','e62'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-dashboard/dashboard/instance',
        component: ComponentCreator('/api/bud-dashboard/dashboard/instance','1d6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-dashboard/dashboard/render',
        component: ComponentCreator('/api/bud-dashboard/dashboard/render','d3e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-dashboard/dashboard/rerender',
        component: ComponentCreator('/api/bud-dashboard/dashboard/rerender','6fc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-dashboard/dashboard/run',
        component: ComponentCreator('/api/bud-dashboard/dashboard/run','39f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-dashboard/dashboard/stderr',
        component: ComponentCreator('/api/bud-dashboard/dashboard/stderr','c61'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-dashboard/dashboard/stdout',
        component: ComponentCreator('/api/bud-dashboard/dashboard/stdout','016'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-emotion/boot',
        component: ComponentCreator('/api/bud-emotion/boot','73e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-emotion/name2',
        component: ComponentCreator('/api/bud-emotion/name2','65e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-entrypoints/make',
        component: ComponentCreator('/api/bud-entrypoints/make','395'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-entrypoints/name2',
        component: ComponentCreator('/api/bud-entrypoints/name2','f92'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-esbuild/api',
        component: ComponentCreator('/api/bud-esbuild/api','f04'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-esbuild/boot',
        component: ComponentCreator('/api/bud-esbuild/boot','506'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-esbuild/name2',
        component: ComponentCreator('/api/bud-esbuild/name2','01f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-esbuild/options',
        component: ComponentCreator('/api/bud-esbuild/options','084'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-eslint/make',
        component: ComponentCreator('/api/bud-eslint/make','e34'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-eslint/mixin',
        component: ComponentCreator('/api/bud-eslint/mixin','149'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-eslint/name2',
        component: ComponentCreator('/api/bud-eslint/name2','1bf'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-eslint/options',
        component: ComponentCreator('/api/bud-eslint/options','f90'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions',
        component: ComponentCreator('/api/bud-extensions','2e3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller',
        component: ComponentCreator('/api/bud-extensions/controller','bb5'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/api',
        component: ComponentCreator('/api/bud-extensions/controller/api','431'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/app',
        component: ComponentCreator('/api/bud-extensions/controller/app','e75'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/boot',
        component: ComponentCreator('/api/bud-extensions/controller/boot','a61'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/booted',
        component: ComponentCreator('/api/bud-extensions/controller/booted','c32'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/constructor',
        component: ComponentCreator('/api/bud-extensions/controller/constructor','625'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/get',
        component: ComponentCreator('/api/bud-extensions/controller/get','363'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/getoption',
        component: ComponentCreator('/api/bud-extensions/controller/getoption','6a2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/log',
        component: ComponentCreator('/api/bud-extensions/controller/log','e15'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/make',
        component: ComponentCreator('/api/bud-extensions/controller/make','908'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/mergeoption',
        component: ComponentCreator('/api/bud-extensions/controller/mergeoption','a6a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/mergeoptions',
        component: ComponentCreator('/api/bud-extensions/controller/mergeoptions','9fe'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/meta',
        component: ComponentCreator('/api/bud-extensions/controller/meta','5d6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/mixin',
        component: ComponentCreator('/api/bud-extensions/controller/mixin','29c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/modulelogger',
        component: ComponentCreator('/api/bud-extensions/controller/modulelogger','bed'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/mutateoptions',
        component: ComponentCreator('/api/bud-extensions/controller/mutateoptions','8ae'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/name',
        component: ComponentCreator('/api/bud-extensions/controller/name','194'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/options',
        component: ComponentCreator('/api/bud-extensions/controller/options','2dc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/register',
        component: ComponentCreator('/api/bud-extensions/controller/register','986'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/registered',
        component: ComponentCreator('/api/bud-extensions/controller/registered','894'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/set',
        component: ComponentCreator('/api/bud-extensions/controller/set','079'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/setoption',
        component: ComponentCreator('/api/bud-extensions/controller/setoption','30a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/setoptions',
        component: ComponentCreator('/api/bud-extensions/controller/setoptions','1bd'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/controller/when',
        component: ComponentCreator('/api/bud-extensions/controller/when','259'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions',
        component: ComponentCreator('/api/bud-extensions/extensions','eb1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/add',
        component: ComponentCreator('/api/bud-extensions/extensions/add','6b7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/boot',
        component: ComponentCreator('/api/bud-extensions/extensions/boot','b6a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/booted',
        component: ComponentCreator('/api/bud-extensions/extensions/booted','6cf'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/bootextension',
        component: ComponentCreator('/api/bud-extensions/extensions/bootextension','866'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/bootextensions',
        component: ComponentCreator('/api/bud-extensions/extensions/bootextensions','00c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/enqueue',
        component: ComponentCreator('/api/bud-extensions/extensions/enqueue','e62'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/importextension',
        component: ComponentCreator('/api/bud-extensions/extensions/importextension','aa4'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/injectextensions',
        component: ComponentCreator('/api/bud-extensions/extensions/injectextensions','895'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/make',
        component: ComponentCreator('/api/bud-extensions/extensions/make','f9a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/makecontroller',
        component: ComponentCreator('/api/bud-extensions/extensions/makecontroller','682'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/processqueue',
        component: ComponentCreator('/api/bud-extensions/extensions/processqueue','137'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/queue',
        component: ComponentCreator('/api/bud-extensions/extensions/queue','584'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/registered',
        component: ComponentCreator('/api/bud-extensions/extensions/registered','f75'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/registerextension',
        component: ComponentCreator('/api/bud-extensions/extensions/registerextension','c5a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/registerextensions',
        component: ComponentCreator('/api/bud-extensions/extensions/registerextensions','c74'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/repository',
        component: ComponentCreator('/api/bud-extensions/extensions/repository','288'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-extensions/extensions/setcontroller',
        component: ComponentCreator('/api/bud-extensions/extensions/setcontroller','6ac'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/asyncfactory',
        component: ComponentCreator('/api/bud-framework/asyncfactory','401'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/atleastone',
        component: ComponentCreator('/api/bud-framework/atleastone','210'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/bootstrapper',
        component: ComponentCreator('/api/bud-framework/bootstrapper','e9f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/bootstrapper/app',
        component: ComponentCreator('/api/bud-framework/bootstrapper/app','197'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/bootstrapper/constructor',
        component: ComponentCreator('/api/bud-framework/bootstrapper/constructor','424'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/bootstrapper/ident',
        component: ComponentCreator('/api/bud-framework/bootstrapper/ident','0cd'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/build',
        component: ComponentCreator('/api/bud-framework/build','833'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/build/abstract',
        component: ComponentCreator('/api/bud-framework/build/abstract','ac2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/build/abstract/items',
        component: ComponentCreator('/api/bud-framework/build/abstract/items','cb6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/build/abstract/loaders',
        component: ComponentCreator('/api/bud-framework/build/abstract/loaders','341'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/build/abstract/make',
        component: ComponentCreator('/api/bud-framework/build/abstract/make','0b3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/build/abstract/rules',
        component: ComponentCreator('/api/bud-framework/build/abstract/rules','4f6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/build/interface',
        component: ComponentCreator('/api/bud-framework/build/interface','db8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/build/interface/config',
        component: ComponentCreator('/api/bud-framework/build/interface/config','278'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/build/interface/items',
        component: ComponentCreator('/api/bud-framework/build/interface/items','5a6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/build/interface/loaders',
        component: ComponentCreator('/api/bud-framework/build/interface/loaders','8cf'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/build/interface/make',
        component: ComponentCreator('/api/bud-framework/build/interface/make','85b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/build/interface/rules',
        component: ComponentCreator('/api/bud-framework/build/interface/rules','6c4'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/cache2',
        component: ComponentCreator('/api/bud-framework/cache2','20f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/cache2/abstract',
        component: ComponentCreator('/api/bud-framework/cache2/abstract','a8a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/cache2/abstract/directory',
        component: ComponentCreator('/api/bud-framework/cache2/abstract/directory','c35'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/cache2/abstract/hashfilecontents',
        component: ComponentCreator('/api/bud-framework/cache2/abstract/hashfilecontents','ac9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/cache2/abstract/version',
        component: ComponentCreator('/api/bud-framework/cache2/abstract/version','be1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/cache2/interface',
        component: ComponentCreator('/api/bud-framework/cache2/interface','ebd'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/cache2/interface/directory',
        component: ComponentCreator('/api/bud-framework/cache2/interface/directory','a96'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/cache2/interface/hashfilecontents',
        component: ComponentCreator('/api/bud-framework/cache2/interface/hashfilecontents','09d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/cache2/interface/version',
        component: ComponentCreator('/api/bud-framework/cache2/interface/version','248'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/compiler',
        component: ComponentCreator('/api/bud-framework/compiler','7b4'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/compiler/before',
        component: ComponentCreator('/api/bud-framework/compiler/before','d58'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/compiler/callback',
        component: ComponentCreator('/api/bud-framework/compiler/callback','c76'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/compiler/compile',
        component: ComponentCreator('/api/bud-framework/compiler/compile','104'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/compiler/instance',
        component: ComponentCreator('/api/bud-framework/compiler/instance','3e0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/compiler/iscompiled',
        component: ComponentCreator('/api/bud-framework/compiler/iscompiled','851'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/compiler/progress',
        component: ComponentCreator('/api/bud-framework/compiler/progress','482'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/compiler/stats',
        component: ComponentCreator('/api/bud-framework/compiler/stats','3a1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/configuration',
        component: ComponentCreator('/api/bud-framework/configuration','7f8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/configuration/build',
        component: ComponentCreator('/api/bud-framework/configuration/build','15e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/configuration/cache',
        component: ComponentCreator('/api/bud-framework/configuration/cache','bbe'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/configuration/cli',
        component: ComponentCreator('/api/bud-framework/configuration/cli','958'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/configuration/extension',
        component: ComponentCreator('/api/bud-framework/configuration/extension','9a5'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/configuration/features',
        component: ComponentCreator('/api/bud-framework/configuration/features','09b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/configuration/fileformat',
        component: ComponentCreator('/api/bud-framework/configuration/fileformat','94a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/configuration/hashformat',
        component: ComponentCreator('/api/bud-framework/configuration/hashformat','540'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/configuration/location',
        component: ComponentCreator('/api/bud-framework/configuration/location','34a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/configuration/log',
        component: ComponentCreator('/api/bud-framework/configuration/log','22d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/configuration/mode',
        component: ComponentCreator('/api/bud-framework/configuration/mode','d69'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/configuration/name',
        component: ComponentCreator('/api/bud-framework/configuration/name','f40'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/configuration/patterns',
        component: ComponentCreator('/api/bud-framework/configuration/patterns','3c8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/configuration/server',
        component: ComponentCreator('/api/bud-framework/configuration/server','92f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/configuration/theme',
        component: ComponentCreator('/api/bud-framework/configuration/theme','198'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/constructor',
        component: ComponentCreator('/api/bud-framework/constructor','ad3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/dashboard',
        component: ComponentCreator('/api/bud-framework/dashboard','4f7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/dashboard/instance',
        component: ComponentCreator('/api/bud-framework/dashboard/instance','8e8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/dashboard/render',
        component: ComponentCreator('/api/bud-framework/dashboard/render','1f9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/dashboard/rerender',
        component: ComponentCreator('/api/bud-framework/dashboard/rerender','f8c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/dashboard/run',
        component: ComponentCreator('/api/bud-framework/dashboard/run','3a3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/dashboard/stderr',
        component: ComponentCreator('/api/bud-framework/dashboard/stderr','89c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/dashboard/stdout',
        component: ComponentCreator('/api/bud-framework/dashboard/stdout','31e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/dependencies',
        component: ComponentCreator('/api/bud-framework/dependencies','fb9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/dependencies/client',
        component: ComponentCreator('/api/bud-framework/dependencies/client','310'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/dependencies/install',
        component: ComponentCreator('/api/bud-framework/dependencies/install','c2c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/env',
        component: ComponentCreator('/api/bud-framework/env','dcd'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/env/getpublicenv',
        component: ComponentCreator('/api/bud-framework/env/getpublicenv','2bd'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extension',
        component: ComponentCreator('/api/bud-framework/extension','c04'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extension/compilerplugin',
        component: ComponentCreator('/api/bud-framework/extension/compilerplugin','154'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extension/compilerplugin/apply',
        component: ComponentCreator('/api/bud-framework/extension/compilerplugin/apply','925'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extension/compilerplugin/make',
        component: ComponentCreator('/api/bud-framework/extension/compilerplugin/make','9cf'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extension/module',
        component: ComponentCreator('/api/bud-framework/extension/module','b4c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extension/module/api',
        component: ComponentCreator('/api/bud-framework/extension/module/api','bd6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extension/module/boot',
        component: ComponentCreator('/api/bud-framework/extension/module/boot','d96'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extension/module/mixin',
        component: ComponentCreator('/api/bud-framework/extension/module/mixin','996'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extension/module/name',
        component: ComponentCreator('/api/bud-framework/extension/module/name','69b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extension/module/options',
        component: ComponentCreator('/api/bud-framework/extension/module/options','6e0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extension/module/register',
        component: ComponentCreator('/api/bud-framework/extension/module/register','e93'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extension/module/when',
        component: ComponentCreator('/api/bud-framework/extension/module/when','266'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extension/name',
        component: ComponentCreator('/api/bud-framework/extension/name','818'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extensions',
        component: ComponentCreator('/api/bud-framework/extensions','3cb'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extensions/add',
        component: ComponentCreator('/api/bud-framework/extensions/add','6bc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extensions/bootextensions',
        component: ComponentCreator('/api/bud-framework/extensions/bootextensions','701'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extensions/enqueue',
        component: ComponentCreator('/api/bud-framework/extensions/enqueue','8e0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extensions/make',
        component: ComponentCreator('/api/bud-framework/extensions/make','8cc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extensions/processqueue',
        component: ComponentCreator('/api/bud-framework/extensions/processqueue','26f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extensions/queue',
        component: ComponentCreator('/api/bud-framework/extensions/queue','8bc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/extensions/registerextensions',
        component: ComponentCreator('/api/bud-framework/extensions/registerextensions','6db'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/factory',
        component: ComponentCreator('/api/bud-framework/factory','c6a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework',
        component: ComponentCreator('/api/bud-framework/framework','656'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/api',
        component: ComponentCreator('/api/bud-framework/framework/api','02d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/await',
        component: ComponentCreator('/api/bud-framework/framework/await','e03'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/bindmethod',
        component: ComponentCreator('/api/bud-framework/framework/bindmethod','e96'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/build',
        component: ComponentCreator('/api/bud-framework/framework/build','61f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/cache',
        component: ComponentCreator('/api/bud-framework/framework/cache','d6a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/children',
        component: ComponentCreator('/api/bud-framework/framework/children','13b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/close',
        component: ComponentCreator('/api/bud-framework/framework/close','01e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/compiler',
        component: ComponentCreator('/api/bud-framework/framework/compiler','6ee'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/complete',
        component: ComponentCreator('/api/bud-framework/framework/complete','742'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/constructor',
        component: ComponentCreator('/api/bud-framework/framework/constructor','14a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/container',
        component: ComponentCreator('/api/bud-framework/framework/container','8d9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/dashboard',
        component: ComponentCreator('/api/bud-framework/framework/dashboard','daf'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/debug',
        component: ComponentCreator('/api/bud-framework/framework/debug','d3b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/dependencies',
        component: ComponentCreator('/api/bud-framework/framework/dependencies','b96'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/dump',
        component: ComponentCreator('/api/bud-framework/framework/dump','b64'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/env',
        component: ComponentCreator('/api/bud-framework/framework/env','885'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/error',
        component: ComponentCreator('/api/bud-framework/framework/error','628'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/extensions',
        component: ComponentCreator('/api/bud-framework/framework/extensions','9ef'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/get',
        component: ComponentCreator('/api/bud-framework/framework/get','5f6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/haschildren',
        component: ComponentCreator('/api/bud-framework/framework/haschildren','35a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/hooks',
        component: ComponentCreator('/api/bud-framework/framework/hooks','dcc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/info',
        component: ComponentCreator('/api/bud-framework/framework/info','edd'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/ischild',
        component: ComponentCreator('/api/bud-framework/framework/ischild','752'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/isdevelopment',
        component: ComponentCreator('/api/bud-framework/framework/isdevelopment','985'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/isproduction',
        component: ComponentCreator('/api/bud-framework/framework/isproduction','87d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/isroot',
        component: ComponentCreator('/api/bud-framework/framework/isroot','6f2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/json',
        component: ComponentCreator('/api/bud-framework/framework/json','5b1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/log',
        component: ComponentCreator('/api/bud-framework/framework/log','db3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/logger',
        component: ComponentCreator('/api/bud-framework/framework/logger','e55'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/make',
        component: ComponentCreator('/api/bud-framework/framework/make','893'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/maybecall',
        component: ComponentCreator('/api/bud-framework/framework/maybecall','8f2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/mixin',
        component: ComponentCreator('/api/bud-framework/framework/mixin','14c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/mode',
        component: ComponentCreator('/api/bud-framework/framework/mode','c63'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/name',
        component: ComponentCreator('/api/bud-framework/framework/name','b46'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/options',
        component: ComponentCreator('/api/bud-framework/framework/options','a41'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/path',
        component: ComponentCreator('/api/bud-framework/framework/path','569'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/pipe',
        component: ComponentCreator('/api/bud-framework/framework/pipe','fd2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/project',
        component: ComponentCreator('/api/bud-framework/framework/project','09c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/root',
        component: ComponentCreator('/api/bud-framework/framework/root','e66'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/sequence',
        component: ComponentCreator('/api/bud-framework/framework/sequence','c16'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/server',
        component: ComponentCreator('/api/bud-framework/framework/server','9ed'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/services',
        component: ComponentCreator('/api/bud-framework/framework/services','0d1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/setpath',
        component: ComponentCreator('/api/bud-framework/framework/setpath','c0f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/store',
        component: ComponentCreator('/api/bud-framework/framework/store','f0b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/success',
        component: ComponentCreator('/api/bud-framework/framework/success','910'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/tap',
        component: ComponentCreator('/api/bud-framework/framework/tap','d8d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/time',
        component: ComponentCreator('/api/bud-framework/framework/time','9cb'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/timeend',
        component: ComponentCreator('/api/bud-framework/framework/timeend','967'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/ts',
        component: ComponentCreator('/api/bud-framework/framework/ts','380'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/usingtsnode',
        component: ComponentCreator('/api/bud-framework/framework/usingtsnode','7c6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/warn',
        component: ComponentCreator('/api/bud-framework/framework/warn','311'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/when',
        component: ComponentCreator('/api/bud-framework/framework/when','deb'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/framework/yml',
        component: ComponentCreator('/api/bud-framework/framework/yml','e4a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/hooks',
        component: ComponentCreator('/api/bud-framework/hooks','3e6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/hooks/async',
        component: ComponentCreator('/api/bud-framework/hooks/async','b70'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/hooks/filter',
        component: ComponentCreator('/api/bud-framework/hooks/filter','a78'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/hooks/filterasync',
        component: ComponentCreator('/api/bud-framework/hooks/filterasync','595'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/hooks/hook',
        component: ComponentCreator('/api/bud-framework/hooks/hook','536'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/hooks/limitedentryobject',
        component: ComponentCreator('/api/bud-framework/hooks/limitedentryobject','6fd'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/hooks/limitedplugin',
        component: ComponentCreator('/api/bud-framework/hooks/limitedplugin','b9a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/hooks/map',
        component: ComponentCreator('/api/bud-framework/hooks/map','8b2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/hooks/on',
        component: ComponentCreator('/api/bud-framework/hooks/on','50c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/index',
        component: ComponentCreator('/api/bud-framework/index','b15'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item',
        component: ComponentCreator('/api/bud-framework/item','392'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/abstract',
        component: ComponentCreator('/api/bud-framework/item/abstract','3f4'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/abstract/loader',
        component: ComponentCreator('/api/bud-framework/item/abstract/loader','1c5'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/abstract/make',
        component: ComponentCreator('/api/bud-framework/item/abstract/make','795'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/abstract/mergeoptions',
        component: ComponentCreator('/api/bud-framework/item/abstract/mergeoptions','074'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/abstract/options',
        component: ComponentCreator('/api/bud-framework/item/abstract/options','144'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/abstract/setloader',
        component: ComponentCreator('/api/bud-framework/item/abstract/setloader','ef3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/abstract/setoptions',
        component: ComponentCreator('/api/bud-framework/item/abstract/setoptions','ec1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/constructoroptions',
        component: ComponentCreator('/api/bud-framework/item/constructoroptions','e0b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/constructoroptions/loader',
        component: ComponentCreator('/api/bud-framework/item/constructoroptions/loader','c92'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/constructoroptions/options',
        component: ComponentCreator('/api/bud-framework/item/constructoroptions/options','2b3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/interface',
        component: ComponentCreator('/api/bud-framework/item/interface','094'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/interface/loader',
        component: ComponentCreator('/api/bud-framework/item/interface/loader','d8e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/interface/make',
        component: ComponentCreator('/api/bud-framework/item/interface/make','958'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/interface/mergeoptions',
        component: ComponentCreator('/api/bud-framework/item/interface/mergeoptions','d93'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/interface/options',
        component: ComponentCreator('/api/bud-framework/item/interface/options','549'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/interface/setloader',
        component: ComponentCreator('/api/bud-framework/item/interface/setloader','d1a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/interface/setoptions',
        component: ComponentCreator('/api/bud-framework/item/interface/setoptions','56e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/options',
        component: ComponentCreator('/api/bud-framework/item/options','3ce'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/output',
        component: ComponentCreator('/api/bud-framework/item/output','eef'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/output/loader',
        component: ComponentCreator('/api/bud-framework/item/output/loader','dbe'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/item/output/options',
        component: ComponentCreator('/api/bud-framework/item/output/options','acc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/items',
        component: ComponentCreator('/api/bud-framework/items','0c6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/loader',
        component: ComponentCreator('/api/bud-framework/loader','578'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/loader/abstract',
        component: ComponentCreator('/api/bud-framework/loader/abstract','372'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/loader/abstract/make',
        component: ComponentCreator('/api/bud-framework/loader/abstract/make','467'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/loader/abstract/normalizeinput',
        component: ComponentCreator('/api/bud-framework/loader/abstract/normalizeinput','916'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/loader/abstract/src',
        component: ComponentCreator('/api/bud-framework/loader/abstract/src','e6a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/loader/factory',
        component: ComponentCreator('/api/bud-framework/loader/factory','490'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/loader/interface',
        component: ComponentCreator('/api/bud-framework/loader/interface','b3e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/loader/interface/make',
        component: ComponentCreator('/api/bud-framework/loader/interface/make','c75'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/loader/interface/normalizeinput',
        component: ComponentCreator('/api/bud-framework/loader/interface/normalizeinput','a92'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/loader/interface/src',
        component: ComponentCreator('/api/bud-framework/loader/interface/src','7a9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/loaders',
        component: ComponentCreator('/api/bud-framework/loaders','60a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/locations',
        component: ComponentCreator('/api/bud-framework/locations','881'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/locations/dist',
        component: ComponentCreator('/api/bud-framework/locations/dist','e88'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/locations/project',
        component: ComponentCreator('/api/bud-framework/locations/project','00c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/locations/src',
        component: ComponentCreator('/api/bud-framework/locations/src','52d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/logger',
        component: ComponentCreator('/api/bud-framework/logger','d15'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/logger/config',
        component: ComponentCreator('/api/bud-framework/logger/config','8a6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/logger/constructor',
        component: ComponentCreator('/api/bud-framework/logger/constructor','0e8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/logger/context',
        component: ComponentCreator('/api/bud-framework/logger/context','18f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/logger/enabled',
        component: ComponentCreator('/api/bud-framework/logger/enabled','2d0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/logger/flags',
        component: ComponentCreator('/api/bud-framework/logger/flags','ffb'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/logger/instance',
        component: ComponentCreator('/api/bud-framework/logger/instance','fb0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/logger/instantiate',
        component: ComponentCreator('/api/bud-framework/logger/instantiate','9d3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/logger/interactive',
        component: ComponentCreator('/api/bud-framework/logger/interactive','608'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/logger/level',
        component: ComponentCreator('/api/bud-framework/logger/level','cce'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/logger/makeinstance',
        component: ComponentCreator('/api/bud-framework/logger/makeinstance','bef'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/logger/options',
        component: ComponentCreator('/api/bud-framework/logger/options','873'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/logger/scoped',
        component: ComponentCreator('/api/bud-framework/logger/scoped','1dc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/logger/secrets',
        component: ComponentCreator('/api/bud-framework/logger/secrets','009'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/logger/stream',
        component: ComponentCreator('/api/bud-framework/logger/stream','1d2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/loose',
        component: ComponentCreator('/api/bud-framework/loose','627'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/maybe',
        component: ComponentCreator('/api/bud-framework/maybe','6b3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/mode',
        component: ComponentCreator('/api/bud-framework/mode','5c3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/module',
        component: ComponentCreator('/api/bud-framework/module','756'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/modules',
        component: ComponentCreator('/api/bud-framework/modules','1a8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/options',
        component: ComponentCreator('/api/bud-framework/options','83e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/options/config',
        component: ComponentCreator('/api/bud-framework/options/config','493'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/options/extensions',
        component: ComponentCreator('/api/bud-framework/options/extensions','53b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/options/services',
        component: ComponentCreator('/api/bud-framework/options/services','21d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/peers',
        component: ComponentCreator('/api/bud-framework/peers','4e7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/peers/interface',
        component: ComponentCreator('/api/bud-framework/peers/interface','390'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/peers/interface/app',
        component: ComponentCreator('/api/bud-framework/peers/interface/app','849'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/peers/interface/discover',
        component: ComponentCreator('/api/bud-framework/peers/interface/discover','9ab'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/peers/interface/getmanifest',
        component: ComponentCreator('/api/bud-framework/peers/interface/getmanifest','862'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/peers/interface/getpackagemanifestpath',
        component: ComponentCreator('/api/bud-framework/peers/interface/getpackagemanifestpath','b91'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/peers/interface/isextension',
        component: ComponentCreator('/api/bud-framework/peers/interface/isextension','3dc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/peers/peer',
        component: ComponentCreator('/api/bud-framework/peers/peer','66d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/peers/peer/name',
        component: ComponentCreator('/api/bud-framework/peers/peer/name','aee'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/peers/peer/source',
        component: ComponentCreator('/api/bud-framework/peers/peer/source','d4e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/peers/peer/type',
        component: ComponentCreator('/api/bud-framework/peers/peer/type','681'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/peers/peer/ver',
        component: ComponentCreator('/api/bud-framework/peers/peer/ver','99a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/peers/repository',
        component: ComponentCreator('/api/bud-framework/peers/repository','5bb'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/plugininstance',
        component: ComponentCreator('/api/bud-framework/plugininstance','1fe'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/plugininstance/apply',
        component: ComponentCreator('/api/bud-framework/plugininstance/apply','295'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/plugins',
        component: ComponentCreator('/api/bud-framework/plugins','6d7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/project',
        component: ComponentCreator('/api/bud-framework/project','0ba'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/project/abstract',
        component: ComponentCreator('/api/bud-framework/project/abstract','c77'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/project/abstract/haspeerdependency',
        component: ComponentCreator('/api/bud-framework/project/abstract/haspeerdependency','a67'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/project/abstract/peers',
        component: ComponentCreator('/api/bud-framework/project/abstract/peers','e3e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/project/abstract/repository',
        component: ComponentCreator('/api/bud-framework/project/abstract/repository','a0f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/project/interface',
        component: ComponentCreator('/api/bud-framework/project/interface','e03'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/project/interface/buildprofile',
        component: ComponentCreator('/api/bud-framework/project/interface/buildprofile','a28'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/project/interface/buildprofile1',
        component: ComponentCreator('/api/bud-framework/project/interface/buildprofile1','a72'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/project/interface/haspeerdependency',
        component: ComponentCreator('/api/bud-framework/project/interface/haspeerdependency','ba6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/project/interface/peers',
        component: ComponentCreator('/api/bud-framework/project/interface/peers','f73'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/project/interface/writeprofile',
        component: ComponentCreator('/api/bud-framework/project/interface/writeprofile','a73'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule',
        component: ComponentCreator('/api/bud-framework/rule','4da'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/abstract',
        component: ComponentCreator('/api/bud-framework/rule/abstract','0b2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/abstract/getexclude',
        component: ComponentCreator('/api/bud-framework/rule/abstract/getexclude','c9b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/abstract/getgenerator',
        component: ComponentCreator('/api/bud-framework/rule/abstract/getgenerator','bd3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/abstract/getparser',
        component: ComponentCreator('/api/bud-framework/rule/abstract/getparser','868'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/abstract/gettest',
        component: ComponentCreator('/api/bud-framework/rule/abstract/gettest','661'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/abstract/gettype',
        component: ComponentCreator('/api/bud-framework/rule/abstract/gettype','085'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/abstract/getuse',
        component: ComponentCreator('/api/bud-framework/rule/abstract/getuse','f5c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/abstract/make',
        component: ComponentCreator('/api/bud-framework/rule/abstract/make','030'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/abstract/setexclude',
        component: ComponentCreator('/api/bud-framework/rule/abstract/setexclude','492'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/abstract/setgenerator',
        component: ComponentCreator('/api/bud-framework/rule/abstract/setgenerator','508'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/abstract/setparser',
        component: ComponentCreator('/api/bud-framework/rule/abstract/setparser','36b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/abstract/settest',
        component: ComponentCreator('/api/bud-framework/rule/abstract/settest','fac'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/abstract/settype',
        component: ComponentCreator('/api/bud-framework/rule/abstract/settype','15b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/abstract/setuse',
        component: ComponentCreator('/api/bud-framework/rule/abstract/setuse','59a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/abstract/test',
        component: ComponentCreator('/api/bud-framework/rule/abstract/test','4ed'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/abstract/use',
        component: ComponentCreator('/api/bud-framework/rule/abstract/use','06c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/interface',
        component: ComponentCreator('/api/bud-framework/rule/interface','5e8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/interface/getexclude',
        component: ComponentCreator('/api/bud-framework/rule/interface/getexclude','80c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/interface/getgenerator',
        component: ComponentCreator('/api/bud-framework/rule/interface/getgenerator','69b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/interface/getparser',
        component: ComponentCreator('/api/bud-framework/rule/interface/getparser','71a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/interface/gettest',
        component: ComponentCreator('/api/bud-framework/rule/interface/gettest','cec'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/interface/gettype',
        component: ComponentCreator('/api/bud-framework/rule/interface/gettype','4aa'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/interface/getuse',
        component: ComponentCreator('/api/bud-framework/rule/interface/getuse','312'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/interface/make',
        component: ComponentCreator('/api/bud-framework/rule/interface/make','c83'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/interface/setexclude',
        component: ComponentCreator('/api/bud-framework/rule/interface/setexclude','90b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/interface/setgenerator',
        component: ComponentCreator('/api/bud-framework/rule/interface/setgenerator','0fd'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/interface/setparser',
        component: ComponentCreator('/api/bud-framework/rule/interface/setparser','db1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/interface/settest',
        component: ComponentCreator('/api/bud-framework/rule/interface/settest','f0e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/interface/settype',
        component: ComponentCreator('/api/bud-framework/rule/interface/settype','be0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/interface/setuse',
        component: ComponentCreator('/api/bud-framework/rule/interface/setuse','3d9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/interface/test',
        component: ComponentCreator('/api/bud-framework/rule/interface/test','69b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/interface/use',
        component: ComponentCreator('/api/bud-framework/rule/interface/use','511'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/options',
        component: ComponentCreator('/api/bud-framework/rule/options','c60'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/options/exclude',
        component: ComponentCreator('/api/bud-framework/rule/options/exclude','159'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/options/generator',
        component: ComponentCreator('/api/bud-framework/rule/options/generator','a55'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/options/parser',
        component: ComponentCreator('/api/bud-framework/rule/options/parser','2e1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/options/test',
        component: ComponentCreator('/api/bud-framework/rule/options/test','a70'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/options/type',
        component: ComponentCreator('/api/bud-framework/rule/options/type','935'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/options/use',
        component: ComponentCreator('/api/bud-framework/rule/options/use','a36'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/output',
        component: ComponentCreator('/api/bud-framework/rule/output','b8e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/output/exclude',
        component: ComponentCreator('/api/bud-framework/rule/output/exclude','953'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/output/generator',
        component: ComponentCreator('/api/bud-framework/rule/output/generator','df7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/output/parser',
        component: ComponentCreator('/api/bud-framework/rule/output/parser','cdd'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/output/test',
        component: ComponentCreator('/api/bud-framework/rule/output/test','671'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/output/type',
        component: ComponentCreator('/api/bud-framework/rule/output/type','00e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/output/use',
        component: ComponentCreator('/api/bud-framework/rule/output/use','d3b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/parser',
        component: ComponentCreator('/api/bud-framework/rule/parser','494'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rule/parser/parse',
        component: ComponentCreator('/api/bud-framework/rule/parser/parse','152'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/rules',
        component: ComponentCreator('/api/bud-framework/rules','515'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server',
        component: ComponentCreator('/api/bud-framework/server','736'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/application',
        component: ComponentCreator('/api/bud-framework/server/application','3b1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/application/listen',
        component: ComponentCreator('/api/bud-framework/server/application/listen','75e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/configuration',
        component: ComponentCreator('/api/bud-framework/server/configuration','6ec'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/configuration/browser',
        component: ComponentCreator('/api/bud-framework/server/configuration/browser','51d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/configuration/dev',
        component: ComponentCreator('/api/bud-framework/server/configuration/dev','e62'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/configuration/disablehostcheck',
        component: ComponentCreator('/api/bud-framework/server/configuration/disablehostcheck','ceb'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/configuration/filename',
        component: ComponentCreator('/api/bud-framework/server/configuration/filename','eb5'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/configuration/middleware',
        component: ComponentCreator('/api/bud-framework/server/configuration/middleware','5a8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/configuration/proxy',
        component: ComponentCreator('/api/bud-framework/server/configuration/proxy','b7e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/configuration/publicpath',
        component: ComponentCreator('/api/bud-framework/server/configuration/publicpath','e1d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/configuration/watch',
        component: ComponentCreator('/api/bud-framework/server/configuration/watch','d76'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/instance',
        component: ComponentCreator('/api/bud-framework/server/instance','cbc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/interface',
        component: ComponentCreator('/api/bud-framework/server/interface','4c3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/interface/application',
        component: ComponentCreator('/api/bud-framework/server/interface/application','8d5'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/interface/close',
        component: ComponentCreator('/api/bud-framework/server/interface/close','6a0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/interface/config',
        component: ComponentCreator('/api/bud-framework/server/interface/config','a6b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/interface/getwatchedfiles',
        component: ComponentCreator('/api/bud-framework/server/interface/getwatchedfiles','209'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/interface/instance',
        component: ComponentCreator('/api/bud-framework/server/interface/instance','607'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/interface/middleware',
        component: ComponentCreator('/api/bud-framework/server/interface/middleware','5ee'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/interface/run',
        component: ComponentCreator('/api/bud-framework/server/interface/run','173'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/interface/watcher',
        component: ComponentCreator('/api/bud-framework/server/interface/watcher','afe'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/server/middleware',
        component: ComponentCreator('/api/bud-framework/server/middleware','a63'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/service',
        component: ComponentCreator('/api/bud-framework/service','dea'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/service/boot',
        component: ComponentCreator('/api/bud-framework/service/boot','4f7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/service/booted',
        component: ComponentCreator('/api/bud-framework/service/booted','5a0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/service/bootstrap',
        component: ComponentCreator('/api/bud-framework/service/bootstrap','963'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/service/bootstrapped',
        component: ComponentCreator('/api/bud-framework/service/bootstrapped','9d8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/service/dump',
        component: ComponentCreator('/api/bud-framework/service/dump','c0d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/service/ident',
        component: ComponentCreator('/api/bud-framework/service/ident','9f0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/service/log',
        component: ComponentCreator('/api/bud-framework/service/log','8d8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/service/logger',
        component: ComponentCreator('/api/bud-framework/service/logger','db1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/service/register',
        component: ComponentCreator('/api/bud-framework/service/register','b3b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/service/registered',
        component: ComponentCreator('/api/bud-framework/service/registered','4d2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/services',
        component: ComponentCreator('/api/bud-framework/services','963'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/store',
        component: ComponentCreator('/api/bud-framework/store','746'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/store/get',
        component: ComponentCreator('/api/bud-framework/store/get','c75'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/store/ident',
        component: ComponentCreator('/api/bud-framework/store/ident','c88'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/store/repository',
        component: ComponentCreator('/api/bud-framework/store/repository','72e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-framework/tapable',
        component: ComponentCreator('/api/bud-framework/tapable','5b6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-hooks',
        component: ComponentCreator('/api/bud-hooks','ed9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-hooks/hooks',
        component: ComponentCreator('/api/bud-hooks/hooks','8ff'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-hooks/hooks/async',
        component: ComponentCreator('/api/bud-hooks/hooks/async','e24'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-hooks/hooks/filter',
        component: ComponentCreator('/api/bud-hooks/hooks/filter','3b9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-hooks/hooks/filterasync',
        component: ComponentCreator('/api/bud-hooks/hooks/filterasync','adf'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-hooks/hooks/on',
        component: ComponentCreator('/api/bud-hooks/hooks/on','562'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-imagemin/boot',
        component: ComponentCreator('/api/bud-imagemin/boot','32c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-imagemin/mixin',
        component: ComponentCreator('/api/bud-imagemin/mixin','5aa'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-imagemin/name2',
        component: ComponentCreator('/api/bud-imagemin/name2','2dc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-imagemin/register',
        component: ComponentCreator('/api/bud-imagemin/register','e58'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-library/api',
        component: ComponentCreator('/api/bud-library/api','0eb'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-library/name2',
        component: ComponentCreator('/api/bud-library/name2','09a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-mdx/boot',
        component: ComponentCreator('/api/bud-mdx/boot','908'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-mdx/mixin',
        component: ComponentCreator('/api/bud-mdx/mixin','816'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-mdx/name2',
        component: ComponentCreator('/api/bud-mdx/name2','43e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-postcss/mixin',
        component: ComponentCreator('/api/bud-postcss/mixin','a3c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-postcss/name2',
        component: ComponentCreator('/api/bud-postcss/name2','bf3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-postcss/register',
        component: ComponentCreator('/api/bud-postcss/register','d19'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-preset-recommend/budpresetrecommend',
        component: ComponentCreator('/api/bud-preset-recommend/budpresetrecommend','d92'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-preset-recommend/budpresetrecommend/name',
        component: ComponentCreator('/api/bud-preset-recommend/budpresetrecommend/name','474'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-preset-recommend/name2',
        component: ComponentCreator('/api/bud-preset-recommend/name2','a24'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-preset-wordpress/name2',
        component: ComponentCreator('/api/bud-preset-wordpress/name2','704'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-prettier/name2',
        component: ComponentCreator('/api/bud-prettier/name2','26f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-purgecss/api',
        component: ComponentCreator('/api/bud-purgecss/api','3ec'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-purgecss/name2',
        component: ComponentCreator('/api/bud-purgecss/name2','6ec'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-react/boot',
        component: ComponentCreator('/api/bud-react/boot','f11'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-react/name2',
        component: ComponentCreator('/api/bud-react/name2','2fa'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-sass/boot',
        component: ComponentCreator('/api/bud-sass/boot','bb0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-sass/name2',
        component: ComponentCreator('/api/bud-sass/name2','0ad'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-sass/register',
        component: ComponentCreator('/api/bud-sass/register','613'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-server/server',
        component: ComponentCreator('/api/bud-server/server','df7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-server/server/application',
        component: ComponentCreator('/api/bud-server/server/application','aa6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-server/server/close',
        component: ComponentCreator('/api/bud-server/server/close','757'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-server/server/config',
        component: ComponentCreator('/api/bud-server/server/config','c50'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-server/server/getwatchedfiles',
        component: ComponentCreator('/api/bud-server/server/getwatchedfiles','1b3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-server/server/instance',
        component: ComponentCreator('/api/bud-server/server/instance','206'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-server/server/middleware',
        component: ComponentCreator('/api/bud-server/server/middleware','bd8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-server/server/processmiddlewares',
        component: ComponentCreator('/api/bud-server/server/processmiddlewares','a04'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-server/server/run',
        component: ComponentCreator('/api/bud-server/server/run','472'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-server/server/watcher',
        component: ComponentCreator('/api/bud-server/server/watcher','da5'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-solid/boot',
        component: ComponentCreator('/api/bud-solid/boot','94a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-solid/name2',
        component: ComponentCreator('/api/bud-solid/name2','15d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-stylelint/make',
        component: ComponentCreator('/api/bud-stylelint/make','872'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-stylelint/name2',
        component: ComponentCreator('/api/bud-stylelint/name2','0a5'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-stylelint/options',
        component: ComponentCreator('/api/bud-stylelint/options','2d7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-tailwindcss/api',
        component: ComponentCreator('/api/bud-tailwindcss/api','903'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-tailwindcss/boot',
        component: ComponentCreator('/api/bud-tailwindcss/boot','cec'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-tailwindcss/name2',
        component: ComponentCreator('/api/bud-tailwindcss/name2','7ff'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-terser/api',
        component: ComponentCreator('/api/bud-terser/api','14a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-terser/api/terser',
        component: ComponentCreator('/api/bud-terser/api/terser','1ea'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-terser/boot',
        component: ComponentCreator('/api/bud-terser/boot','76b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-terser/name2',
        component: ComponentCreator('/api/bud-terser/name2','a27'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-terser/options',
        component: ComponentCreator('/api/bud-terser/options','e55'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-typescript/api',
        component: ComponentCreator('/api/bud-typescript/api','42b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-typescript/boot',
        component: ComponentCreator('/api/bud-typescript/boot','d2b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-typescript/name2',
        component: ComponentCreator('/api/bud-typescript/name2','9b9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-vue/boot',
        component: ComponentCreator('/api/bud-vue/boot','9c8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-vue/name2',
        component: ComponentCreator('/api/bud-vue/name2','d2c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-wordpress-dependencies/make',
        component: ComponentCreator('/api/bud-wordpress-dependencies/make','698'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-wordpress-dependencies/name2',
        component: ComponentCreator('/api/bud-wordpress-dependencies/name2','b3b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-wordpress-externals/make',
        component: ComponentCreator('/api/bud-wordpress-externals/make','8a6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-wordpress-externals/name2',
        component: ComponentCreator('/api/bud-wordpress-externals/name2','a67'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-wordpress-manifests/make',
        component: ComponentCreator('/api/bud-wordpress-manifests/make','f6b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud-wordpress-manifests/name2',
        component: ComponentCreator('/api/bud-wordpress-manifests/name2','6e8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud/bud',
        component: ComponentCreator('/api/bud/bud','741'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud/bud/options',
        component: ComponentCreator('/api/bud/bud/options','db5'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud/config',
        component: ComponentCreator('/api/bud/config','5ae'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud/extensions',
        component: ComponentCreator('/api/bud/extensions','600'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/bud/factory',
        component: ComponentCreator('/api/bud/factory','fbc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container',
        component: ComponentCreator('/api/container/container','ab7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/all',
        component: ComponentCreator('/api/container/container/all','d8d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/constructor',
        component: ComponentCreator('/api/container/container/constructor','56f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/count',
        component: ComponentCreator('/api/container/container/count','0fc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/each',
        component: ComponentCreator('/api/container/container/each','df7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/every',
        component: ComponentCreator('/api/container/container/every','e5e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/fromentries',
        component: ComponentCreator('/api/container/container/fromentries','aa2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/get',
        component: ComponentCreator('/api/container/container/get','f5e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/getentries',
        component: ComponentCreator('/api/container/container/getentries','c4d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/getkeys',
        component: ComponentCreator('/api/container/container/getkeys','0d7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/getmap',
        component: ComponentCreator('/api/container/container/getmap','0bd'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/getvalues',
        component: ComponentCreator('/api/container/container/getvalues','0c3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/has',
        component: ComponentCreator('/api/container/container/has','05d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/ident',
        component: ComponentCreator('/api/container/container/ident','404'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/is',
        component: ComponentCreator('/api/container/container/is','65e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isarray',
        component: ComponentCreator('/api/container/container/isarray','e98'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isdefined',
        component: ComponentCreator('/api/container/container/isdefined','305'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isempty',
        component: ComponentCreator('/api/container/container/isempty','7de'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isfalse',
        component: ComponentCreator('/api/container/container/isfalse','bd5'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isfunction',
        component: ComponentCreator('/api/container/container/isfunction','bcf'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isinstanceof',
        component: ComponentCreator('/api/container/container/isinstanceof','a10'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isinstanceofany',
        component: ComponentCreator('/api/container/container/isinstanceofany','f82'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isnotarray',
        component: ComponentCreator('/api/container/container/isnotarray','770'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isnotempty',
        component: ComponentCreator('/api/container/container/isnotempty','186'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isnotfunction',
        component: ComponentCreator('/api/container/container/isnotfunction','83a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isnotinstanceof',
        component: ComponentCreator('/api/container/container/isnotinstanceof','66f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isnotinstanceofany',
        component: ComponentCreator('/api/container/container/isnotinstanceofany','51e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isnotnull',
        component: ComponentCreator('/api/container/container/isnotnull','6f7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isnotnumber',
        component: ComponentCreator('/api/container/container/isnotnumber','ed7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isnotstring',
        component: ComponentCreator('/api/container/container/isnotstring','631'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isnull',
        component: ComponentCreator('/api/container/container/isnull','1a0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isnumber',
        component: ComponentCreator('/api/container/container/isnumber','6db'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isstring',
        component: ComponentCreator('/api/container/container/isstring','838'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/istrue',
        component: ComponentCreator('/api/container/container/istrue','849'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/isundefined',
        component: ComponentCreator('/api/container/container/isundefined','68a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/merge',
        component: ComponentCreator('/api/container/container/merge','bcb'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/mergestore',
        component: ComponentCreator('/api/container/container/mergestore','e81'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/mutate',
        component: ComponentCreator('/api/container/container/mutate','4bb'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/mutatestore',
        component: ComponentCreator('/api/container/container/mutatestore','3c7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/remove',
        component: ComponentCreator('/api/container/container/remove','e05'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/repository',
        component: ComponentCreator('/api/container/container/repository','ca2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/set',
        component: ComponentCreator('/api/container/container/set','4ef'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/setstore',
        component: ComponentCreator('/api/container/container/setstore','904'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/transform',
        component: ComponentCreator('/api/container/container/transform','66f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/transformstore',
        component: ComponentCreator('/api/container/container/transformstore','11a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/container/unique',
        component: ComponentCreator('/api/container/container/unique','a7a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/container/repository',
        component: ComponentCreator('/api/container/repository','b55'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/criticalcsswebpackplugin',
        component: ComponentCreator('/api/critical-css-webpack-plugin/criticalcsswebpackplugin','7d5'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/criticalcsswebpackplugin/apply',
        component: ComponentCreator('/api/critical-css-webpack-plugin/criticalcsswebpackplugin/apply','480'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/criticalcsswebpackplugin/compilation',
        component: ComponentCreator('/api/critical-css-webpack-plugin/criticalcsswebpackplugin/compilation','122'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/criticalcsswebpackplugin/constructor',
        component: ComponentCreator('/api/critical-css-webpack-plugin/criticalcsswebpackplugin/constructor','b8f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/criticalcsswebpackplugin/criticalentry',
        component: ComponentCreator('/api/critical-css-webpack-plugin/criticalcsswebpackplugin/criticalentry','5a0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/criticalcsswebpackplugin/entrypoints',
        component: ComponentCreator('/api/critical-css-webpack-plugin/criticalcsswebpackplugin/entrypoints','8e6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/criticalcsswebpackplugin/generatecritical',
        component: ComponentCreator('/api/critical-css-webpack-plugin/criticalcsswebpackplugin/generatecritical','254'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/criticalcsswebpackplugin/getmergedcssmodules',
        component: ComponentCreator('/api/critical-css-webpack-plugin/criticalcsswebpackplugin/getmergedcssmodules','c50'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/criticalcsswebpackplugin/htmlinject',
        component: ComponentCreator('/api/critical-css-webpack-plugin/criticalcsswebpackplugin/htmlinject','ce2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/criticalcsswebpackplugin/maybehashname',
        component: ComponentCreator('/api/critical-css-webpack-plugin/criticalcsswebpackplugin/maybehashname','7cc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/criticalcsswebpackplugin/options',
        component: ComponentCreator('/api/critical-css-webpack-plugin/criticalcsswebpackplugin/options','fa0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/criticalcsswebpackplugin/plugin',
        component: ComponentCreator('/api/critical-css-webpack-plugin/criticalcsswebpackplugin/plugin','2b9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/criticalcsswebpackplugin/processassets',
        component: ComponentCreator('/api/critical-css-webpack-plugin/criticalcsswebpackplugin/processassets','43f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/criticalcsswebpackplugin/vfile',
        component: ComponentCreator('/api/critical-css-webpack-plugin/criticalcsswebpackplugin/vfile','f58'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/criticalcsswebpackplugin/webpack',
        component: ComponentCreator('/api/critical-css-webpack-plugin/criticalcsswebpackplugin/webpack','145'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/options',
        component: ComponentCreator('/api/critical-css-webpack-plugin/options','813'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/options/criticaloptions',
        component: ComponentCreator('/api/critical-css-webpack-plugin/options/criticaloptions','5b0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/options/hash',
        component: ComponentCreator('/api/critical-css-webpack-plugin/options/hash','60f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/critical-css-webpack-plugin/options/replace',
        component: ComponentCreator('/api/critical-css-webpack-plugin/options/replace','2cd'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/dependencies/dependencies',
        component: ComponentCreator('/api/dependencies/dependencies','1cc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/dependencies/dependencies/client',
        component: ComponentCreator('/api/dependencies/dependencies/client','b35'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/dependencies/dependencies/constructor',
        component: ComponentCreator('/api/dependencies/dependencies/constructor','44d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/dependencies/dependencies/isyarn',
        component: ComponentCreator('/api/dependencies/dependencies/isyarn','2aa'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/dependencies/dependencies/path',
        component: ComponentCreator('/api/dependencies/dependencies/path','4cc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/dependencies/idependencymanager',
        component: ComponentCreator('/api/dependencies/idependencymanager','bdc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/dependencies/idependencymanager/install',
        component: ComponentCreator('/api/dependencies/idependencymanager/install','811'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/dependencies/idependencymanager/onmessage',
        component: ComponentCreator('/api/dependencies/idependencymanager/onmessage','9a9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/dependencies/idependencymanager/path',
        component: ComponentCreator('/api/dependencies/idependencymanager/path','dc2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/dependencies/idependencymanager/uninstall',
        component: ComponentCreator('/api/dependencies/idependencymanager/uninstall','354'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/dependencies/npm',
        component: ComponentCreator('/api/dependencies/npm','f16'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/dependencies/npm/install',
        component: ComponentCreator('/api/dependencies/npm/install','507'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/dependencies/npm/uninstall',
        component: ComponentCreator('/api/dependencies/npm/uninstall','f0b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/dependencies/yarn',
        component: ComponentCreator('/api/dependencies/yarn','3b6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/dependencies/yarn/install',
        component: ComponentCreator('/api/dependencies/yarn/install','198'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/dependencies/yarn/uninstall',
        component: ComponentCreator('/api/dependencies/yarn/uninstall','9c0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/entrypoints-webpack-plugin/entrypointswebpackplugin',
        component: ComponentCreator('/api/entrypoints-webpack-plugin/entrypointswebpackplugin','e5b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/entrypoints-webpack-plugin/entrypointswebpackplugin/addtomanifest',
        component: ComponentCreator('/api/entrypoints-webpack-plugin/entrypointswebpackplugin/addtomanifest','d5d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/entrypoints-webpack-plugin/entrypointswebpackplugin/apply',
        component: ComponentCreator('/api/entrypoints-webpack-plugin/entrypointswebpackplugin/apply','5ff'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/entrypoints-webpack-plugin/entrypointswebpackplugin/assets',
        component: ComponentCreator('/api/entrypoints-webpack-plugin/entrypointswebpackplugin/assets','047'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/entrypoints-webpack-plugin/entrypointswebpackplugin/compilation',
        component: ComponentCreator('/api/entrypoints-webpack-plugin/entrypointswebpackplugin/compilation','1d7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/entrypoints-webpack-plugin/entrypointswebpackplugin/compiler',
        component: ComponentCreator('/api/entrypoints-webpack-plugin/entrypointswebpackplugin/compiler','4d9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/entrypoints-webpack-plugin/entrypointswebpackplugin/constructor',
        component: ComponentCreator('/api/entrypoints-webpack-plugin/entrypointswebpackplugin/constructor','472'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/entrypoints-webpack-plugin/entrypointswebpackplugin/getentrypointfiles',
        component: ComponentCreator('/api/entrypoints-webpack-plugin/entrypointswebpackplugin/getentrypointfiles','322'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/entrypoints-webpack-plugin/entrypointswebpackplugin/name',
        component: ComponentCreator('/api/entrypoints-webpack-plugin/entrypointswebpackplugin/name','56a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/entrypoints-webpack-plugin/entrypointswebpackplugin/plugin',
        component: ComponentCreator('/api/entrypoints-webpack-plugin/entrypointswebpackplugin/plugin','8a2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/entrypoints-webpack-plugin/entrypointswebpackplugin/processassets',
        component: ComponentCreator('/api/entrypoints-webpack-plugin/entrypointswebpackplugin/processassets','e92'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/entrypoints-webpack-plugin/entrypointswebpackplugin/publicpath',
        component: ComponentCreator('/api/entrypoints-webpack-plugin/entrypointswebpackplugin/publicpath','d2d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/entrypoints-webpack-plugin/entrypointswebpackplugin/type',
        component: ComponentCreator('/api/entrypoints-webpack-plugin/entrypointswebpackplugin/type','e2b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer',
        component: ComponentCreator('/api/filesystem/filecontainer','c7b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/basedir',
        component: ComponentCreator('/api/filesystem/filecontainer/basedir','0ff'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/constructor',
        component: ComponentCreator('/api/filesystem/filecontainer/constructor','365'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/ensure',
        component: ComponentCreator('/api/filesystem/filecontainer/ensure','836'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/ensuredir',
        component: ComponentCreator('/api/filesystem/filecontainer/ensuredir','b7d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/exists',
        component: ComponentCreator('/api/filesystem/filecontainer/exists','706'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/fs',
        component: ComponentCreator('/api/filesystem/filecontainer/fs','b77'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/has',
        component: ComponentCreator('/api/filesystem/filecontainer/has','0db'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/ls',
        component: ComponentCreator('/api/filesystem/filecontainer/ls','bcd'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/path',
        component: ComponentCreator('/api/filesystem/filecontainer/path','3b1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/read',
        component: ComponentCreator('/api/filesystem/filecontainer/read','8f8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/readjson',
        component: ComponentCreator('/api/filesystem/filecontainer/readjson','680'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/require',
        component: ComponentCreator('/api/filesystem/filecontainer/require','40e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/resolve',
        component: ComponentCreator('/api/filesystem/filecontainer/resolve','3ea'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/set',
        component: ComponentCreator('/api/filesystem/filecontainer/set','aab'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/setdisk',
        component: ComponentCreator('/api/filesystem/filecontainer/setdisk','873'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/write',
        component: ComponentCreator('/api/filesystem/filecontainer/write','246'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filecontainer/writejson',
        component: ComponentCreator('/api/filesystem/filecontainer/writejson','760'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filesystem2',
        component: ComponentCreator('/api/filesystem/filesystem2','466'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filesystem2/basedir',
        component: ComponentCreator('/api/filesystem/filesystem2/basedir','8c9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filesystem2/get',
        component: ComponentCreator('/api/filesystem/filesystem2/get','347'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filesystem2/make',
        component: ComponentCreator('/api/filesystem/filesystem2/make','702'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/filesystem/filesystem2/path',
        component: ComponentCreator('/api/filesystem/filesystem2/path','194'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-prettier/inkprettier',
        component: ComponentCreator('/api/ink-prettier/inkprettier','d3f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/defaulttheme',
        component: ComponentCreator('/api/ink-use-style/defaulttheme','c87'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/defaulttheme/colors',
        component: ComponentCreator('/api/ink-use-style/defaulttheme/colors','af9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/defaulttheme/columns',
        component: ComponentCreator('/api/ink-use-style/defaulttheme/columns','c7a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/defaulttheme/maxheight',
        component: ComponentCreator('/api/ink-use-style/defaulttheme/maxheight','40c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/defaulttheme/maxwidth',
        component: ComponentCreator('/api/ink-use-style/defaulttheme/maxwidth','5ce'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/defaulttheme/screens',
        component: ComponentCreator('/api/ink-use-style/defaulttheme/screens','09a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/defaulttheme/spacing',
        component: ComponentCreator('/api/ink-use-style/defaulttheme/spacing','9b3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/styles',
        component: ComponentCreator('/api/ink-use-style/styles','a71'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/styles/bounds',
        component: ComponentCreator('/api/ink-use-style/styles/bounds','774'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/styles/col',
        component: ComponentCreator('/api/ink-use-style/styles/col','ad7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/styles/colors',
        component: ComponentCreator('/api/ink-use-style/styles/colors','380'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/styles/ctx',
        component: ComponentCreator('/api/ink-use-style/styles/ctx','5d3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/styles/screen',
        component: ComponentCreator('/api/ink-use-style/styles/screen','402'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/styles/setcolors',
        component: ComponentCreator('/api/ink-use-style/styles/setcolors','216'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/styles/setscreens',
        component: ComponentCreator('/api/ink-use-style/styles/setscreens','055'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/styles/spacing',
        component: ComponentCreator('/api/ink-use-style/styles/spacing','202'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/theme',
        component: ComponentCreator('/api/ink-use-style/theme','ac5'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/theme/colors',
        component: ComponentCreator('/api/ink-use-style/theme/colors','efe'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/theme/columns',
        component: ComponentCreator('/api/ink-use-style/theme/columns','29f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/theme/maxheight',
        component: ComponentCreator('/api/ink-use-style/theme/maxheight','e20'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/theme/maxwidth',
        component: ComponentCreator('/api/ink-use-style/theme/maxwidth','76b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/theme/screens',
        component: ComponentCreator('/api/ink-use-style/theme/screens','259'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/theme/screentuple',
        component: ComponentCreator('/api/ink-use-style/theme/screentuple','ad8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/theme/spacing',
        component: ComponentCreator('/api/ink-use-style/theme/spacing','797'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/ink-use-style/usestyle',
        component: ComponentCreator('/api/ink-use-style/usestyle','91f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin',
        component: ComponentCreator('/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin','711'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/apply',
        component: ComponentCreator('/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/apply','246'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/constructor',
        component: ComponentCreator('/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/constructor','74e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/dir',
        component: ComponentCreator('/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/dir','bca'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/done',
        component: ComponentCreator('/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/done','6e8'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/entrypointsname',
        component: ComponentCreator('/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/entrypointsname','661'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/file',
        component: ComponentCreator('/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/file','c48'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/format',
        component: ComponentCreator('/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/format','971'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/isbuildable',
        component: ComponentCreator('/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/isbuildable','e04'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/manifestcontent',
        component: ComponentCreator('/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/manifestcontent','907'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/manifestexists',
        component: ComponentCreator('/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/manifestexists','162'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/manifestpath',
        component: ComponentCreator('/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/manifestpath','48b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/path',
        component: ComponentCreator('/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/path','d87'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/plugin',
        component: ComponentCreator('/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/plugin','ae3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/wordpressname',
        component: ComponentCreator('/api/merged-manifest-webpack-plugin/mergedmanifestwebpackplugin/wordpressname','15f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/sage/name2',
        component: ComponentCreator('/api/sage/name2','5d7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/sage/register',
        component: ComponentCreator('/api/sage/register','cca'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin',
        component: ComponentCreator('/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin','469'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/apply',
        component: ComponentCreator('/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/apply','e1f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/compilation',
        component: ComponentCreator('/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/compilation','52f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/constructor',
        component: ComponentCreator('/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/constructor','350'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/filename',
        component: ComponentCreator('/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/filename','2ec'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/manifest',
        component: ComponentCreator('/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/manifest','b13'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/normalmodulefactory',
        component: ComponentCreator('/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/normalmodulefactory','b12'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/plugin',
        component: ComponentCreator('/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/plugin','293'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/processassets',
        component: ComponentCreator('/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/processassets','436'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/useddependencies',
        component: ComponentCreator('/api/wordpress-dependencies-webpack-plugin/wordpressdependencieswebpackplugin/useddependencies','675'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/wordpress-externals-webpack-plugin/wordpressexternals',
        component: ComponentCreator('/api/wordpress-externals-webpack-plugin/wordpressexternals','61c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/wordpress-externals-webpack-plugin/wordpressexternals/apply',
        component: ComponentCreator('/api/wordpress-externals-webpack-plugin/wordpressexternals/apply','106'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/wordpress-externals-webpack-plugin/wordpressexternals/constructor',
        component: ComponentCreator('/api/wordpress-externals-webpack-plugin/wordpressexternals/constructor','942'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/wordpress-externals-webpack-plugin/wordpressexternals/externals',
        component: ComponentCreator('/api/wordpress-externals-webpack-plugin/wordpressexternals/externals','d12'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/wordpress-externals-webpack-plugin/wordpressexternals/name',
        component: ComponentCreator('/api/wordpress-externals-webpack-plugin/wordpressexternals/name','e3c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/api/wordpress-externals-webpack-plugin/wordpressexternals/stage',
        component: ComponentCreator('/api/wordpress-externals-webpack-plugin/wordpressexternals/stage','df7'),
        exact: true,
        'sidebar': "sidebar"
      }
    ]
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs','95d'),
    routes: [
      {
        path: '/docs/',
        component: ComponentCreator('/docs/','565'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.alias',
        component: ComponentCreator('/docs/bud.alias','074'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.assets',
        component: ComponentCreator('/docs/bud.assets','c46'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.define',
        component: ComponentCreator('/docs/bud.define','f95'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.devtool',
        component: ComponentCreator('/docs/bud.devtool','157'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.entry',
        component: ComponentCreator('/docs/bud.entry','f3c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.env',
        component: ComponentCreator('/docs/bud.env','d98'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.externals',
        component: ComponentCreator('/docs/bud.externals','a62'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.get',
        component: ComponentCreator('/docs/bud.get','4ac'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.hash',
        component: ComponentCreator('/docs/bud.hash','f6a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.hooks/',
        component: ComponentCreator('/docs/bud.hooks/','19e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.hooks/reference',
        component: ComponentCreator('/docs/bud.hooks/reference','66c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.make',
        component: ComponentCreator('/docs/bud.make','8a2'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.minimize',
        component: ComponentCreator('/docs/bud.minimize','d72'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.mode/',
        component: ComponentCreator('/docs/bud.mode/','76a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.mode/bud.isDevelopment',
        component: ComponentCreator('/docs/bud.mode/bud.isDevelopment','434'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.mode/bud.isProduction',
        component: ComponentCreator('/docs/bud.mode/bud.isProduction','08d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.path',
        component: ComponentCreator('/docs/bud.path','aed'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.provide',
        component: ComponentCreator('/docs/bud.provide','cc6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.proxy',
        component: ComponentCreator('/docs/bud.proxy','79b'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.publicPath',
        component: ComponentCreator('/docs/bud.publicPath','b1f'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.runtime',
        component: ComponentCreator('/docs/bud.runtime','dbe'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.serve',
        component: ComponentCreator('/docs/bud.serve','187'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.setPath',
        component: ComponentCreator('/docs/bud.setPath','5df'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.setPublicPath',
        component: ComponentCreator('/docs/bud.setPublicPath','acc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.splitChunks',
        component: ComponentCreator('/docs/bud.splitChunks','296'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.tap',
        component: ComponentCreator('/docs/bud.tap','293'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.template',
        component: ComponentCreator('/docs/bud.template','1c7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.use',
        component: ComponentCreator('/docs/bud.use','056'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/docs/bud.when',
        component: ComponentCreator('/docs/bud.when','a44'),
        exact: true,
        'sidebar': "sidebar"
      }
    ]
  },
  {
    path: '/extensions',
    component: ComponentCreator('/extensions','0d8'),
    routes: [
      {
        path: '/extensions/',
        component: ComponentCreator('/extensions/','8d3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/bud-babel',
        component: ComponentCreator('/extensions/bud-babel','318'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/bud-criticalcss',
        component: ComponentCreator('/extensions/bud-criticalcss','0d1'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/bud-emotion',
        component: ComponentCreator('/extensions/bud-emotion','3e4'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/bud-entrypoints',
        component: ComponentCreator('/extensions/bud-entrypoints','d8d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/bud-esbuild',
        component: ComponentCreator('/extensions/bud-esbuild','325'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/bud-eslint',
        component: ComponentCreator('/extensions/bud-eslint','324'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/bud-imagemin',
        component: ComponentCreator('/extensions/bud-imagemin','887'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/bud-library',
        component: ComponentCreator('/extensions/bud-library','2bc'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/bud-postcss',
        component: ComponentCreator('/extensions/bud-postcss','a1a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/bud-react',
        component: ComponentCreator('/extensions/bud-react','0f7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/bud-sass',
        component: ComponentCreator('/extensions/bud-sass','60a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/bud-solid',
        component: ComponentCreator('/extensions/bud-solid','339'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/bud-tailwindcss',
        component: ComponentCreator('/extensions/bud-tailwindcss','501'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/bud-typescript',
        component: ComponentCreator('/extensions/bud-typescript','f10'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/bud-vue',
        component: ComponentCreator('/extensions/bud-vue','e98'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/presets/bud-preset-recommend',
        component: ComponentCreator('/extensions/presets/bud-preset-recommend','de6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/extensions/presets/bud-preset-wordpress',
        component: ComponentCreator('/extensions/presets/bud-preset-wordpress','569'),
        exact: true,
        'sidebar': "sidebar"
      }
    ]
  },
  {
    path: '/guides',
    component: ComponentCreator('/guides','f2f'),
    routes: [
      {
        path: '/guides/',
        component: ComponentCreator('/guides/','5ee'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/advanced-use/architecture',
        component: ComponentCreator('/guides/advanced-use/architecture','abb'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/advanced-use/node',
        component: ComponentCreator('/guides/advanced-use/node','b75'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/advanced-use/writing-an-extension',
        component: ComponentCreator('/guides/advanced-use/writing-an-extension','1d9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/bud-cli/',
        component: ComponentCreator('/guides/bud-cli/','03d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/bud-cli/build',
        component: ComponentCreator('/guides/bud-cli/build','25c'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/bud-cli/clean',
        component: ComponentCreator('/guides/bud-cli/clean','4cb'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/bud-cli/doctor',
        component: ComponentCreator('/guides/bud-cli/doctor','38e'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/bud-cli/install',
        component: ComponentCreator('/guides/bud-cli/install','d17'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/general-use/',
        component: ComponentCreator('/guides/general-use/','1db'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/general-use/config-env',
        component: ComponentCreator('/guides/general-use/config-env','ae0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/general-use/config-static',
        component: ComponentCreator('/guides/general-use/config-static','d06'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/general-use/config-ts',
        component: ComponentCreator('/guides/general-use/config-ts','5a9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/general-use/hashing',
        component: ComponentCreator('/guides/general-use/hashing','2c7'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/general-use/multi-compiler',
        component: ComponentCreator('/guides/general-use/multi-compiler','08a'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/getting-started/',
        component: ComponentCreator('/guides/getting-started/','dd0'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/getting-started/assets',
        component: ComponentCreator('/guides/getting-started/assets','a46'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/getting-started/building',
        component: ComponentCreator('/guides/getting-started/building','89d'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/getting-started/config',
        component: ComponentCreator('/guides/getting-started/config','ce6'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/getting-started/developing',
        component: ComponentCreator('/guides/getting-started/developing','a46'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/getting-started/entrypoints',
        component: ComponentCreator('/guides/getting-started/entrypoints','813'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/getting-started/extending',
        component: ComponentCreator('/guides/getting-started/extending','3e3'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/getting-started/optimizing',
        component: ComponentCreator('/guides/getting-started/optimizing','9c9'),
        exact: true,
        'sidebar': "sidebar"
      },
      {
        path: '/guides/installation',
        component: ComponentCreator('/guides/installation','84d'),
        exact: true,
        'sidebar': "sidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/','230'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
