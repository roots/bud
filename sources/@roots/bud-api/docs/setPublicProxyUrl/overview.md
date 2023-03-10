---
title: bud.setPublicProxyUrl
---

**bud.setPublicProxyUrl** is used to specify the site-accessible URL for the proxy server (if it differs from the internal URL).

For example: a dockerized app that has a service which needs to be accessible from the host at `http://example.test` but serves over `http://0.0.0.0`.
