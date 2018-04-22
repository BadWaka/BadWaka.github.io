# 欢迎使用 Fusion Components


## 项目代码

fusion components基于fusion组件框架，fusion框架项目地址：http://gitlab.baidu.com/psfe/fusion

fusion components托管地址：http://gitlab.baidu.com/fusion/fusion-components

## 开发规范

### 源文件目录结构

``` shell
src
├── components # 组件目录
│     ├── deps # 组件依赖的js文件
│     └── b-tabs # 组件文件夹，必须以 b- 开头
│           ├── demo.html # 组件示例html
│           ├── readme.md # 组件使用文档
│           ├── b-tabs.less  # 组件less源文件（非必需）
│           ├── b-tabs.etpl  # 组件etpl源文件（非必需）
│           └── b-tabs.js   # 组件js源文件
│           └── test.js   # 组件单测js源文件
├── css  # 全局css源文件
├── dep  # 全局依赖的第三方库
├── font # iconfont字体文件
└── js   # 全局js源文件
```

### 组件开发规范

所有组件均在src/components/b-xxx目录下开发，一个组件对应一个独立的文件夹，必须以`b-`作为命名前缀。

组件文件夹中必须包含demo.html及readme.md，分别对应组件示例及组件使用文档。

组件文件夹中必须包含test.js，用作组件的单元测试。

组件js源文件采用amd方式开发。


### 新增组件

若新增组件或组件文件夹结构变化，需对应修改src/components/menu.json文件更新组件导航。

``` javascript
{
    "menu": [
        {
            "name": "标签页",
            "hash": "b-tabs"
        },
        ...
        {
            "name": "对话框",
            "hash": "b-dialog"
        }
    ]
}
```
其中name表示组件名称，hash表示组件目录名。menu数组顺序对应导航数序，可根据实际情况调整。


## 组件发布

### 本地开发

1. [fork fusion-components](http://gitlab.baidu.com/psfe/ps-material-design/forks/new) 到自己的项目中；
2. clone 项目到本地，然后执行

``` shell
npm i
npm run dev
```
就可以开始开发了

### CodeReview

发起[merge request](http://gitlab.baidu.com/fusion/fusion-components/merge_requests/new)，填写详细更新信息，提交给yaochang评审即可。

### 发布

评审通过合入代码以后，代码会自动发布打包，更新到[fusion 组件](http://sfe.baidu.com:8123/doc/)网站上。
