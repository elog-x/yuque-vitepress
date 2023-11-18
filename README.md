# 语雀 + Elog + VitePress + GitHub Actions + Vercel 文档站点解决方案

## 前言

> 注意：2023/11/18更新：由于语雀官方更新了账号密码登录规则，加上了人机校验，账号密码模式已无法通过 Elog 登录！目前只能使用
> Token 方式同步文档（需要语雀超级会员）  
> 如果你不是语雀超级会员，可以使用 Notion 进行部署文档站点，[参考示例](https://github.com/LetTTGACO/elog-docs)

> VitePress 要求 Node 18及以上版本

## 文档站点工具汇总

- 写作平台：语雀
- 文档平台：[VitePress](https://vitepress.dev/)
- 文档同步：[Elog](https://github.com/LetTTGACO/elog)
- 部署平台：[Vercel](https://vercel.com)

## 博客搭建指南

### Fork模板仓库

[点击 Fork](https://github.com/elog-x/yuque-vitepress) 该模板仓库到个人 Github 账号仓库下并 clone 到本地

### 安装依赖

在项目根目录下运行命令安装依赖

```shell
npm install
```

### 新建本地调试文件

在项目根目录中复制`.elog.example.env`文件并改名为`.elog.env`，此文件将用于本地同步文档时使用

### 配置语雀

参考[示例知识库](https://www.yuque.com/1874w/yuque-vitepress-template)
，选择或新建语雀文档知识库，并按照[文档提示](https://elog.1874.cool/notion/gvnxobqogetukays#login)
配置语雀并获取 `token``login``repo`。并在本地`.elog.env`中写入

```text
YUQUE_TOKEN=获取的Token
YUQUE_LOGIN=获取的login
YUQUE_REPO=获取的repo
```

### 本地调试

在项目根目录运行同步命令

```shell
npm run elog:sync-local
```

### 配置 VitePress

根据 [VitePress](https://vitepress.dev/) 文档，配置你的文档站点直到你满意为止。

1. 修改 VitePress 的配置文件`docs/.vitepress/config.mts`中的导航栏、路由信息等
2. 修改首页信息`docs/index.md`中的文字和路由
3. 更多自定义配置请看 VitePress 文档

> 本文档默认是按照文档目录渲染站点
> URL，可能会存在中文路由，如果想要短路由模式，即站点路由全英文，可前往[进阶配置](https://yuque-vitepress.vercel.app/docs/%E8%BF%9B%E9%98%B6%E9%85%8D%E7%BD%AE/VitePress%E7%9F%AD%E8%B7%AF%E7%94%B1%E6%A8%A1%E5%BC%8F)
> 中阅读

### 启动 VitePress

在项目根目录运行 VitePress 启动命令，打开本地链接

```shell
npm run docs:dev
```

### 提交代码到 github

本地访问没问题直接提交所有文件到 Github 仓库即可

### 部署到 Vercel

注册 Vercel 账号并绑定 Github，在 Vercel 导入 该项目，Vercel 会自动识别出该 VitePress 项目，不需要改动，直接选择 Deploy
部署。部署完成会有一个 Vercel 临时域名，你也可以绑定自己的域名。
![image](https://image.1874.cool/1874/202311190122060.png)

## 自动化同步&部署

### 检查 Github Actions 权限

在 Github 仓库的设置中找到 `Actions-General`，打开流水线写入权限`Workflow permissions`
![image](https://image.1874.cool/1874/202311190123718.png)

### 配置环境变量

在本地运行时，用的是`.elog.env`文件中定义的语雀账号信息，而在 Github Actions 时，需要提前配置环境变量。  
在 Github 仓库的设置中找到 `Secrets and variables`，新增仓库的环境变量和`.elog.env`保持一致即可
![image](https://image.1874.cool/1874/202311190123385.png)

### 自动化部署

当在语雀中改动文档后，手动/自动触发 Github Actions流水线，会重新从语雀增量拉取文档，自动提交代码到 Github 仓库。  
Vercel 会实时监测仓库代码，当有新的提交时都会重新部署博客。如此就实现了自动化部署博客。  
整个流程的关键点就在于：如何手动/自动触发 Github Actions。  
在项目.`github/workflows/sync.yaml`中已经配置了外部 API 触发 Github Actions 事件，所以只需要调用 API 触发流水线即可。

#### 手动触发

为了方便，这里提供一个部署在 Vercel 的免费公用的[**ServerlessAPI**](https://github.com/elog-x/serverless-api)，按照文档配置好
URL 参数并浏览器访问即可触发流水线

```shell
https://serverless-api-elog.vercel.app/api/github?user=xxx&repo=xxx&event_type=deploy&token=xxx
```

#### 自动触发-语雀 webhooks

在语雀知识库 - 更多设置 - 消息推送中可配置语雀 webhooks，填写上面的 Vercel Serverless API。当文档更新时，语雀会调用这个API进行推送，进而触发
Github Actions
> 注意：语雀是国内文档平台，调用国外Vercel 的服务可能会失败，可自行部署 API

> 注意：知识库配置了「自动发布」功能后，文档的 更新/发布 操作暂不会发送 webhooks

## 参考示例

示例 Github 仓库：[https://github.com/elog-x/yuque-vitepress](https://github.com/elog-x/yuque-vitepress)  
示例语雀知识库：[https://www.yuque.com/1874w/yuque-vitepress-template](https://www.yuque.com/1874w/yuque-vitepress-template)  
示例文档站点：[https://yuque-vitepress.vercel.app](https://yuque-vitepress.vercel.app/)  
