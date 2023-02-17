🌐 | [English](./README.md) / [漢語](./README-ZH.md)

---

# 觸發IFTTT網絡鉤手小程式（GitHub Action）

[`TriggerIFTTTWebhookApplet.GitHubAction`](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction)

![授權條款](https://img.shields.io/static/v1?label=%E6%8E%88%E6%AC%8A%E6%A2%9D%E6%AC%BE&message=MIT&style=flat-square "授權條款")
[![GitHub星](https://img.shields.io/github/stars/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%E6%98%9F&logo=github&logoColor=ffffff&style=flat-square "GitHub星")](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/stargazers)
[![GitHub貢獻者](https://img.shields.io/github/contributors/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%E8%B2%A2%E7%8D%BB%E8%80%85&logo=github&logoColor=ffffff&style=flat-square "GitHub貢獻者")](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/graphs/contributors)
[![GitHub議題](https://img.shields.io/github/issues-raw/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%E8%AD%B0%E9%A1%8C&logo=github&logoColor=ffffff&style=flat-square "GitHub議題")](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/issues)
[![GitHub拉取請求](https://img.shields.io/github/issues-pr-raw/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%E6%8B%89%E5%8F%96%E8%AB%8B%E6%B1%82&logo=github&logoColor=ffffff&style=flat-square "GitHub拉取請求")](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/pulls)
[![GitHub討論](https://img.shields.io/github/discussions/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%E8%A8%8E%E8%AB%96&logo=github&logoColor=ffffff&style=flat-square "GitHub討論")](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/discussions)
[![CodeFactor評等](https://img.shields.io/codefactor/grade/github/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%E8%A9%95%E7%AD%89&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor評等")](https://www.codefactor.io/repository/github/hugoalh/trigger-ifttt-webhook-applet-ghaction)

| **發佈** | **最新**（![GitHub最新發佈日期](https://img.shields.io/github/release-date/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%20&style=flat-square "GitHub最新發佈日期")） | **預覽**（![GitHub最新預覽發佈日期](https://img.shields.io/github/release-date-pre/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%20&style=flat-square "GitHub最新預覽發佈日期")） |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/releases) ![GitHub總下載](https://img.shields.io/github/downloads/hugoalh/trigger-ifttt-webhook-applet-ghaction/total?label=%20&style=flat-square "GitHub總下載") | ![GitHub最新發佈版本](https://img.shields.io/github/release/hugoalh/trigger-ifttt-webhook-applet-ghaction?sort=semver&label=%20&style=flat-square "GitHub最新發佈版本") | ![GitHub最新預覽發佈版本](https://img.shields.io/github/release/hugoalh/trigger-ifttt-webhook-applet-ghaction?include_prereleases&sort=semver&label=%20&style=flat-square "GitHub最新預覽發佈版本") |

## 📝 說明

用於觸發IFTTT網絡鉤手小程式的GitHub Action。

## 📚 文檔

> <b>⚠ 重要：</b>此文檔基於v5.0.0；如果要查看其他版本的文檔，請瀏覽[版本列表](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/tags)並選擇正確的版本。

### 開始

#### 安裝（適用於自行架設）

- GitHub Actions Runner >= v2.297.0
  - NodeJS ^ v16.13.0

#### 使用

```yml
jobs:
  job_id:
    runs-on: "________" # 任何
    steps:
      - uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction@<Version>"
```

### 📥 輸入

> | **圖解** | **說明** |
> |:-:|:--|
> | 🔐 | 應該是已加密的秘密。 |

#### `eventname`

`<字串>` 事件名稱；建議保持小寫以防止出現任何問題。

#### `key`

**🔐** `<字串>` 密鑰；長格式和短格式都可以接受。

```
https://maker.ifttt.com/use/ifttt-webhook-key  ⬅長
                            ^^^^^^^^^^^^^^^^^  ⬅短
```

#### `arbitrary`

<b>［選擇性］</b>`<布爾值 = false>` 是否使用任意負載觸發。

#### `payload`

<b>［選擇性］</b>`<物件 = {}>` JSON／YAML／YML負載。

- **任意（輸入[`arbitrary`](#arbitrary)是`true`）：**
  ```yml
  jobs:
    job_id:
      steps:
        - with:
            payload: |
              {
                "this": [
                  {
                    "is": {
                      "some": [
                        "test",
                        "data"
                      ]
                    }
                  }
                ]
              }
  ```
- **標準（輸入[`arbitrary`](#arbitrary)是`false`）：**
  ```yml
  jobs:
    job_id:
      steps:
        - with:
            payload: |
              {
                "value1": "Hello",
                "value2": "World",
                "value3": "this is some test data"
              }
  ```

### 📤 輸出

#### `response`

`<字串>` 響應內容。

#### `status_code`

`<數字>` 請求狀態代碼。

#### `status_ok`

`<布爾值>` 請求是否成功。

#### `status_text`

`<字串>` 請求狀態文本。

### 例子

```yml
jobs:
  job_id:
    name: "Trigger IFTTT Webhook Applet"
    runs-on: "ubuntu-latest"
    steps:
      - uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction@v5.0.0"
        with:
          eventname: "greeting"
          key: "${{secrets.IFTTT_WEBHOOKS_KEY}}"
          payload: |
            value1: "Hello, world!"
```

### 指南

#### GitHub Actions

- [啟用調試日誌記錄（英文）](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/enabling-debug-logging)
- [已加密的秘密（英文）](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

#### IFTTT

- [網絡鉤子服務常見問題（英文）](https://help.ifttt.com/hc/en-us/articles/115010230347-Webhooks-service-FAQ)
