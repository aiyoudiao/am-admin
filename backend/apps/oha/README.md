## 压力测试

https://github.com/hatoo/oha

### 容器

```bash
docker build . -t example.com/hatoo/oha:latest
docker run -it example.com/hatoo/oha:latest https://example.com:3000
```

https://rustwiki.org/zh-CN/cargo/getting-started/first-steps.html

### 直接安装和使用 oha

```
pacman -S oha
brew install oha
winget install hatoo.oha

# 使用
oha https://example.com
oha -n 10 --burst-delay 2s --burst-rate 4 https://example.com
```
