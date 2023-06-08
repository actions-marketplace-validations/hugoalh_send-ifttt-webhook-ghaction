🌐 | [English](./README.md) / [漢語](./README-ZH.md)

---

# Send IFTTT Webhook (GitHub Action)

![License](https://img.shields.io/static/v1?label=License&message=MIT&style=flat-square "License")
[![GitHub Repository](https://img.shields.io/badge/Repository-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub Repository")](https://github.com/hugoalh/send-ifttt-webhook-ghaction)
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh/send-ifttt-webhook-ghaction?label=Stars&logo=github&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh/send-ifttt-webhook-ghaction/stargazers)
[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh/send-ifttt-webhook-ghaction?label=Contributors&logo=github&logoColor=ffffff&style=flat-square "GitHub Contributors")](https://github.com/hugoalh/send-ifttt-webhook-ghaction/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh/send-ifttt-webhook-ghaction?label=Issues&logo=github&logoColor=ffffff&style=flat-square "GitHub Issues")](https://github.com/hugoalh/send-ifttt-webhook-ghaction/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh/send-ifttt-webhook-ghaction?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square "GitHub Pull Requests")](https://github.com/hugoalh/send-ifttt-webhook-ghaction/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh/send-ifttt-webhook-ghaction?label=Discussions&logo=github&logoColor=ffffff&style=flat-square "GitHub Discussions")](https://github.com/hugoalh/send-ifttt-webhook-ghaction/discussions)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh/send-ifttt-webhook-ghaction?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh/send-ifttt-webhook-ghaction)

| **Releases** | **Latest** (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh/send-ifttt-webhook-ghaction?label=&style=flat-square "GitHub Latest Release Date")) | **Pre** (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh/send-ifttt-webhook-ghaction?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh/send-ifttt-webhook-ghaction/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh/send-ifttt-webhook-ghaction/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh/send-ifttt-webhook-ghaction?sort=semver&label=&style=flat-square "GitHub Latest Release Version") | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh/send-ifttt-webhook-ghaction?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") |

## 📝 Description

A GitHub Action to send IFTTT webhook.

> **🔗 Other Edition:**
>
> - [Deno](https://github.com/hugoalh-studio/send-ifttt-webhook-deno)
> - [NodeJS](https://github.com/hugoalh-studio/send-ifttt-webhook-nodejs)

## 📚 Documentation

> **⚠ Important:** This documentation is v5.0.0 based; To view other version's documentation, please visit the [versions list](https://github.com/hugoalh/send-ifttt-webhook-ghaction/tags) and select the correct version.

### Getting Started

- GitHub Actions Runner >= v2.297.0
  - NodeJS ^ v16.13.0

```yml
jobs:
  job_id:
    runs-on: "________" # Any
    steps:
      - uses: "hugoalh/send-ifttt-webhook-ghaction@<Version>"
```

### 📥 Input

> | **Legend** | **Description** |
> |:-:|:--|
> | 🔐 | Should be an encrypted secret. |

#### `key`

**🔐** `<string>` Key; Both long and short forms are acceptable.

```
https://maker.ifttt.com/use/ifttt-webhook-key  ⬅Long
                            ^^^^^^^^^^^^^^^^^  ⬅Short
```

#### `eventname`

`<string>` Event name.

#### `arbitrary`

**\[Optional\]** `<boolean = false>` Whether to send with an arbitrary payload.

#### `payload`

**\[Optional\]** `<object = {}>` JSON/YAML/YML payload.

- **Arbitrary (Input [`arbitrary`](#arbitrary) is `true`):**
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
- **Standard (Input [`arbitrary`](#arbitrary) is `false`):**
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

### 📤 Output

#### `response`

`<string>` Response content.

#### `status_code`

`<number>` Request status code.

#### `status_ok`

`<boolean>` Whether the request was successful.

#### `status_text`

`<string>` Request status text.

### Example

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

### Guide

#### GitHub Actions

- [Enabling debug logging](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/enabling-debug-logging)
- [Encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

#### IFTTT

- [Webhooks service FAQ](https://help.ifttt.com/hc/en-us/articles/115010230347-Webhooks-service-FAQ)
