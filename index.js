'use strict';

// set default config.
hexo.config.safeTransfer = Object.assign({
    enable: true,
    field: 'site',
    excludeRel: ['prev', 'next', 'category', 'tag'],
    proxyUrl: 'https://safe-trans.natro92.fun',
    exclude: ['localhost:4000', 'natro92.fun', 'github.com']
}, hexo.config.safeTransfer);

const config = hexo.config.safeTransfer;

if (!config.enable) return;

// operate as requirements.
if (config.field === 'post') {
    hexo.extend.filter.register('after_post_render', require('./lib/filter'));
} else {
    hexo.extend.filter.register('after_render:html', require('./lib/filter'));
}
