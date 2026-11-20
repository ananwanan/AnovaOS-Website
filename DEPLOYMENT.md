# 自有 Linux 服务器部署

发布链路为官网仓库 main → GitHub 托管构建 → 专用 Runner 下载本次产物 → 原子切换静态目录 → 本地 Caddy 或 Nginx → Cloudflare Tunnel。正式域名、Runner 注册与主机初始化由服务器所有者执行。日常发布无需 SSH 入站端口或管理员密码。

## 1. 初始化主机

示例以 Ubuntu / Debian 和 systemd 为基础，使用 GNU coreutils 与 util-linux 的 flock。Web 服务和 cloudflared 与 Runner 部署在同一台主机。若已有 Tunnel，可沿用现有连接器并增加公开主机名路由。

管理员在已审阅的官网仓库目录执行一次：

```sh
sudo useradd --system --create-home --home-dir /var/lib/anova-runner --shell /bin/bash anova-runner
sudo install -d -o anova-runner -g anova-runner -m 0755 /srv/anovaos /srv/anovaos/releases /srv/anovaos/assets
sudo install -d -m 0755 /usr/local/libexec
sudo install -o root -g root -m 0755 deploy/release.sh /usr/local/libexec/anova-site-release
```

如果账号已经存在，直接检查目录权限。该账号仅负责专用站点与自己的 Runner 工作目录，不授予 sudo、Docker 组或其他项目权限。服务账号对静态目录仅需读权限。服务器无需 Node.js，构建在 GitHub 托管机器完成。

## 2. 准备首个构建

在可信工作机或构建机中，从官网 main 检出目标提交。替换下文的示例域名。

```sh
pnpm install --frozen-lockfile
pnpm typecheck && pnpm lint
SITE_URL=https://os.example.org pnpm build
pnpm verify
git rev-parse HEAD
```

把 `dist/` 经现有内网传输方式复制到服务器的暂存目录，例如 `/var/tmp/anova-dist/`。管理员可以首次手动发布，或者按第 4 节触发工作流。将 `BUILD_SHA` 设置为刚才输出的 40 位官网提交 ID。

```sh
sudo -u anova-runner /usr/local/libexec/anova-site-release publish "$BUILD_SHA" /var/tmp/anova-dist
readlink /srv/anovaos/current
```

发布脚本检查目录结构、文件类型和内容清单；完整版本进入 `releases/<ID>/` 后再通过同一文件系统内的 rename 切换 `current`。并发调用使用同一把锁。重复发布相同 ID 和相同内容可以安全重试。不同内容复用同一个 ID 会被拒绝。内容哈希资源位于共享 `assets/`，切换后，旧标签页仍能加载之前引用的资源。

## 3. 在回环地址提供静态页面

选择一种 Web 服务。以下是独立站点的示例；已有服务使用独立配置片段或分别指定已分配端口。不要覆盖已有主站配置。服务均绑定 `127.0.0.1:8080`，外部 HTTPS 交给 Tunnel。

**Caddy**。将 `deploy/Caddyfile` 安装为主配置中的一个导入片段。以下命令假设主配置已经在顶层包含 `import /etc/caddy/conf.d/*.caddy`，首次使用时由管理员添加一次。

```sh
sudo apt-get install caddy
sudo install -d /etc/caddy/conf.d
sudo install -m 0644 deploy/Caddyfile /etc/caddy/conf.d/anovaos.caddy
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

**Nginx**。Debian / Ubuntu 的主配置通常已加载 `/etc/nginx/conf.d/*.conf`。本片段使用专门的机内监听端口。

```sh
sudo apt-get install nginx
sudo install -m 0644 deploy/nginx.conf /etc/nginx/conf.d/anovaos.conf
sudo nginx -t
sudo systemctl reload nginx
```

确认两种语言和深层路径能直达，并验证缺失路径返回 404：

```sh
curl -fsS -o /dev/null http://127.0.0.1:8080/
curl -fsS -o /dev/null http://127.0.0.1:8080/en/docs/sdk/
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8080/a-missing-page/
```

## 4. 注册专用 Runner

1. 在 **AnovaOS-Website → Settings → Actions → Runners → New self-hosted runner** 选择 Linux 及服务器架构。按 GitHub 页面显示的当前版本下载 Runner 并核对 SHA-256。
2. 在 `/var/lib/anova-runner/actions-runner` 以 `anova-runner` 用户解包。以该用户执行 GitHub 提供的 `./config.sh`，URL 指向**官网仓库**，使用页面提供的短期注册令牌，添加标签 `anova-site-prod`。保留默认 Linux 标签。注册令牌不进入仓库或工作流。
3. 管理员在已注册的 Runner 目录执行下列服务安装命令。GitHub 显示 Online 后继续。

```sh
sudo ./svc.sh install anova-runner
sudo ./svc.sh start
sudo ./svc.sh status
```

4. 准备 `production` 环境，仅允许 `main` 部署，按团队需要设置审阅。保护 main 及工作流更改。PR 构建始终运行于 GitHub 托管机器；生产 Runner 仅下载本次 main 工作流成功构建的静态产物，调用已在服务器审阅安装的发布程序。
5. 在 **Settings → Secrets and variables → Actions → Variables** 中按顺序设置 **仓库级变量**：

| 变量 | 值 | 用途 |
| --- | --- | --- |
| SITE_URL | 正式 HTTPS origin | 编译生产 SEO 元数据 |
| RUNNER_READY | true | Runner、目录与本地发布程序已就绪 |
| AUTO_DEPLOY | 首次留空，验收后设为 true | main 推送后自动发布 |

6. 在 Actions 选择 **Build and deliver website → Run workflow → main**。首次手动运行，查看 Build 与 Deploy 两个 job，核对 `current` 和站点页面。随后设置 `AUTO_DEPLOY=true`。初始未设置变量时，PR 和 main 均可构建，生产 job 会被跳过。以后恢复手动发布可清空 AUTO_DEPLOY，暂停全部生产 job 可清空 RUNNER_READY。

Runner 通过出站连接接收任务。保持 Runner 和系统受支持、允许 GitHub Actions 与产物下载服务的出站访问。官网源码以 GitHub main 为准；Sites 的版本和部署单独管理。

## 5. Cloudflare Tunnel 与公网验收

使用已接入 Cloudflare 的正式域名。在 Cloudflare 控制台的 Tunnels 中选择现有 Tunnel，或创建由 cloudflared 运行的新 Tunnel。使用面板为目标 Linux 架构生成的官方安装与服务注册步骤。Tunnel 令牌仅保存在该连接器的受保护配置中，由管理员设置。

为公开主机名（例如 `os.example.org`）添加 **Published application / Public hostname**，服务类型选 HTTP，源站填写 `http://127.0.0.1:8080`。确认域名的 DNS 路由已指向该 Tunnel，连接器状态正常。服务器无需公网 IP。仅允许必要的出站连通性；现有内网穿透只开放一个端口也能承载整站。若分开部署连接器与 Web 服务，相应调整私网监听地址并限制来源。

```sh
curl -fsSI https://os.example.org/
curl -fsSI https://os.example.org/en/docs/sdk/
curl -fsS https://os.example.org/robots.txt
curl -fsS https://os.example.org/sitemap.xml
```

在两种语言间切换、打开图片和文档代码块，检查 canonical 和 sitemap 使用正式域名。HTML 使用重新验证策略；不要为 HTML 配置长期边缘强缓存。静态哈希资源可以长期缓存。

## 6. 更新、回滚与故障处理

- 更新网站：修改官网仓库，在 PR 验证后合入 main。CI 生成完整静态站点，再将当前工作流的产物交给生产 Runner。Actions 版本 ID 为 `<commit>-<run_id>-<attempt>`，允许同一提交以不同域名重新构建。
- 手动回滚：先暂停 AUTO_DEPLOY，确保没有仍在运行的发布任务。在服务器检查已保留的版本，指定一个已知正常的完整目录名。回滚前会核对其内容清单。

```sh
readlink /srv/anovaos/current
ls -1 /srv/anovaos/releases
sudo -u anova-runner /usr/local/libexec/anova-site-release rollback "$PREVIOUS_ID"
curl -fsS -o /dev/null http://127.0.0.1:8080/en/docs/sdk/
```

- 构建失败或资源冲突：检查 Actions 日志和可用磁盘空间，修复源代码或依赖输入后重新运行。切换前失败将保留原站点。
- Runner 等待：检查仓库范围、Linux 和 `anova-site-prod` 标签、服务运行账号、出站访问及环境审批。
- 内网正常而公网失败：先检查 Tunnel 目标、连接器日志、DNS 和 HTTPS，避免重复部署网站。
- 检查 `releases/` 与 `assets/` 的空间。上线后根据保留策略清理已经过期的旧版本。保留当前和已知可回滚版本；共享资源需要确认所有保留清单均未引用后再清理。
- 上线后修改 `release.sh` 需管理员审阅并重新安装到 /usr/local/libexec。仓库中的脚本更改不会自动提高 Runner 权限。

参考 [GitHub Runner 注册](https://docs.github.com/en/actions/how-tos/manage-runners/self-hosted-runners/add-runners)、[Actions 安全说明](https://docs.github.com/en/actions/reference/security/secure-use)、[Cloudflare Tunnel 配置](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/) 和 [Caddy bind](https://caddyserver.com/docs/caddyfile/directives/bind)。

