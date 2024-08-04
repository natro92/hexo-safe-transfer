# 用途 Use

[Github](https://github.com/natro92/hexo-safe-transfer)

添加安全中转页面，方便进行第三方页面跳转。起到防止降低 SEO 等作用。

> Add a safe transfer page to facilitate third-party page jumps. It plays a role in preventing the reduction of SEO.

## 安装 Install

```shell
npm install hexo-safe-transfer --save
```

## 使用 Config

在 hexo 根目录的 `_config.yml` 文件中添加配置：

> Add the configuration to the _config.yml file in the hexo root directory

```shell
safeTransfer:
  enable: true
  field: 'site'
  excludeRel: ['prev', 'next', 'category', 'tag']
  proxyUrl: 'https://safe-trans.natro92.fun'
  exclude:
    - 'localhost:4000'
    - 'natro92.fun'
```

- `enable`：是否启用插件，默认为 `true`。
- `field`：指定需要添加检测属性的位置，可选值为 `site` （全站）或 `post`（仅 post 页面，推荐这个），默认为 `site`。
- `excludeRel`： 根据 rel 来排除翻页等功能按键。
- `proxyUrl`： 使用跳转页，建议使用其他域名挂载即可。
- `exclude`：排除的域名列表，不添加第三方跳转。

>- `enable`: whether to enable the plugin, default is `true`.
>- `field`: specify the location where you want to add the detection attribute, the optional value is `site` (site-wide) or `post` (post page only, recommended), default is `site`.
>- `excludeRel`: according to rel to exclude page flip and other functions.
>- `proxyUrl`: use jump page, suggest to use another domain name to mount.
>- `exclude`: list of excluded domains, do not add third-party jump.

## TODO

因为是后端渲染，所以就没法对评论中的链接进行检测。

> Because it is back-end rendering, there is no way to detect links in comments.
>