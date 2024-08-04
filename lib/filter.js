'use strict';

const { parse } = require('url');

function isExternal(url, config) {
    const exclude = config.safeTransfer.exclude;

    if (!url) return false;

    try {
        // 检查 URL 是否包含错误字符
        if (url.match(/\[.*?\]|\*|[^a-zA-Z0-9\.\/\:\-\_\?\&\=\%\#]/g)) {
            return false; // 包含错误字符，不是有效外部链接
        }

        const data = parse(url);
        const host = data.hostname;
        const sitehost = parse(config.url).hostname || config.url;

        if (!data.protocol || !sitehost) return false;

        if (!host) return false;

        if (exclude && exclude.length) {
            for (const i of exclude) {
                if (host.toLowerCase().includes(i.toLowerCase())) return false;
            }
        }

        if (host !== sitehost) return true;

        return false;
    } catch (err) {
        console.error('ERROR: Failed to parse URL:', url, err);
        return false;
    }
}

module.exports = function (data) {
    const hexo = this;
    const config = hexo.config;

    const exclude = config.safeTransfer.exclude;
    if (exclude && !Array.isArray(exclude)) {
        config.safeTransfer.exclude = [exclude];
    }

    const excludeRel = config.safeTransfer.excludeRel;
    if (excludeRel && !Array.isArray(excludeRel)) {
        config.safeTransfer.excludeRel = [excludeRel];
    }

    const filterExternal = (data) => {
        return data.replace(/<a.*?(href=['"](.*?)['"]).*?>/gi, (str, srcStr, src) => {
            if (!isExternal(src, config)) return str;
            return str.replace(src, config.safeTransfer.proxyUrl + '?goUrl=' + encodeURIComponent(src));
        });
    };

    if (config.safeTransfer.field === 'post') {
        data.content = filterExternal(data.content);
    } else {
        data = filterExternal(data);
    }

    return data;
};

