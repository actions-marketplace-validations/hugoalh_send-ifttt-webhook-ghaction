🌐 | [English](./README.md) / [漢語](./README-ZH.md)

---

# 發送 IFTTT 網絡鉤手（GitHub Action）

![授權條款](https://img.shields.io/static/v1?label=授權條款&message=MIT&style=flat-square "授權條款")
[![GitHub 儲存庫](https://img.shields.io/badge/儲存庫-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub Repository")](https://github.com/hugoalh/send-ifttt-webhook-ghaction)
[![GitHub 星](https://img.shields.io/github/stars/hugoalh/send-ifttt-webhook-ghaction?label=星&logo=github&logoColor=ffffff&style=flat-square "GitHub 星")](https://github.com/hugoalh/send-ifttt-webhook-ghaction/stargazers)
[![GitHub 貢獻者](https://img.shields.io/github/contributors/hugoalh/send-ifttt-webhook-ghaction?label=貢獻者&logo=github&logoColor=ffffff&style=flat-square "GitHub 貢獻者")](https://github.com/hugoalh/send-ifttt-webhook-ghaction/graphs/contributors)
[![GitHub 議題](https://img.shields.io/github/issues-raw/hugoalh/send-ifttt-webhook-ghaction?label=議題&logo=github&logoColor=ffffff&style=flat-square "GitHub 議題")](https://github.com/hugoalh/send-ifttt-webhook-ghaction/issues)
[![GitHub 拉取請求](https://img.shields.io/github/issues-pr-raw/hugoalh/send-ifttt-webhook-ghaction?label=拉取請求&logo=github&logoColor=ffffff&style=flat-square "GitHub 拉取請求")](https://github.com/hugoalh/send-ifttt-webhook-ghaction/pulls)
[![GitHub 討論](https://img.shields.io/github/discussions/hugoalh/send-ifttt-webhook-ghaction?label=討論&logo=github&logoColor=ffffff&style=flat-square "GitHub 討論")](https://github.com/hugoalh/send-ifttt-webhook-ghaction/discussions)
[![CodeFactor 評等](https://img.shields.io/codefactor/grade/github/hugoalh/send-ifttt-webhook-ghaction?label=評等&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor 評等")](https://www.codefactor.io/repository/github/hugoalh/send-ifttt-webhook-ghaction)

| **發佈** | **最新**（![GitHub 最新發佈日期](https://img.shields.io/github/release-date/hugoalh/send-ifttt-webhook-ghaction?label=%20&style=flat-square "GitHub 最新發佈日期")） | **預覽**（![GitHub 最新預覽發佈日期](https://img.shields.io/github/release-date-pre/hugoalh/send-ifttt-webhook-ghaction?label=%20&style=flat-square "GitHub 最新預覽發佈日期")） |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh/send-ifttt-webhook-ghaction/releases) ![GitHub 總下載](https://img.shields.io/github/downloads/hugoalh/send-ifttt-webhook-ghaction/total?label=%20&style=flat-square "GitHub 總下載") | ![GitHub 最新發佈版本](https://img.shields.io/github/release/hugoalh/send-ifttt-webhook-ghaction?sort=semver&label=%20&style=flat-square "GitHub 最新發佈版本") | ![GitHub 最新預覽發佈版本](https://img.shields.io/github/release/hugoalh/send-ifttt-webhook-ghaction?include_prereleases&sort=semver&label=%20&style=flat-square "GitHub 最新預覽發佈版本") |

## 📝 說明

用於發送 IFTTT 網絡鉤手的 GitHub Action。

## 📚 文檔

> <b>⚠ 重要：</b>此文檔基於 v5.0.0；如果要查看其他版本的文檔，請瀏覽[版本列表](https://github.com/hugoalh/send-ifttt-webhook-ghaction/tags)並選擇正確的版本。

### 開始

- GitHub Actions Runner >= v2.297.0
  - NodeJS ^ v16.13.0

```yml
jobs:
  job_id:
    runs-on: "________" # 任何
    steps:
      - uses: "hugoalh/send-ifttt-webhook-ghaction@<Version>"
```

### 📥 輸入

> | **圖解** | **說明** |
> |:-:|:--|
> | 🔐 | 應該是已加密的秘密。 |

#### `key`

**🔐** `<字串>` 密鑰；長格式和短格式都可以接受。

```
https://maker.ifttt.com/use/ifttt-webhook-key  ⬅長
                            ^^^^^^^^^^^^^^^^^  ⬅短
```

#### `eventname`

`<字串>` 事件名稱。

#### `arbitrary`

<b>［選擇性］</b>`<布爾值 = false>` 是否使用任意負載發送。

#### `payload`

<b>［選擇性］</b>`<物件 = {}>` JSON／YAML／YML 負載。

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
    name: "Send IFTTT Webhook"
    runs-on: "ubuntu-latest"
    steps:
      - uses: "hugoalh/send-ifttt-webhook-ghaction@v5.0.0"
        with:
          key: "${{secrets.IFTTT_WEBHOOK_KEY}}"
          eventname: "greeting"
          payload: |
            value1: "Hello, world!"
```

### 指南

#### GitHub Actions

- [啟用調試日誌記錄（英文）](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/enabling-debug-logging)
- [已加密的秘密（英文）](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

#### IFTTT

- [網絡鉤子服務常見問題（英文）](https://help.ifttt.com/hc/en-us/articles/115010230347-Webhooks-service-FAQ)
