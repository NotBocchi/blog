---
title: 对 Vue.js 的浅度研究
description: 初探 Vue.js 的碎碎念，聊聊它的核心概念和用起来的感受。
pubDate: 2026-04-09
categories:
  - 编程
tags:
  - Vue.js
  - 前端
  - JavaScript
---

# 对 Vue.js 的浅度研究

说实话，我接触 Vue 纯属偶然。

当时在找一个做页面的框架，React 看了一眼觉得 JSX 有点怪，Angular 感觉太重了，然后就有人推荐我试试 Vue。结果一用，还真的挺顺手。

---

## Vue 是什么

Vue.js 是一个用于构建用户界面的渐进式 JavaScript 框架。"渐进式"这个词我一开始不太理解，后来大概明白了——你可以只用它的一小部分，也可以把整个项目都建在它上面，随你。

官网写得很好，文档是我见过的前端框架里中文支持最好的，这对我这种英文不太好的人来说真的很友好。

---

## 最让我觉得有意思的几个概念

### 响应式数据

这是 Vue 最核心的东西之一。简单说就是：你改了数据，页面自动更新，不用手动操作 DOM。

```js
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
```

`count.value` 一变，绑定了它的那个地方就跟着变。写起来很直觉，不需要想太多。

### 组件化

Vue 鼓励你把页面拆成一个个组件，每个组件有自己的模板、逻辑和样式。`.vue` 文件长这样：

```vue
<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>

<script setup>
defineProps(['title', 'content'])
</script>

<style scoped>
.card {
  border: 1px solid #eee;
  padding: 1rem;
}
</style>
```

三个部分放在一个文件里，感觉挺整洁的，改起来也方便找。

### 双向绑定 `v-model`

这个用起来很爽。表单输入和数据自动同步，不用自己写事件监听：

```vue
<input v-model="username" placeholder="输入用户名" />
<p>你好，{{ username }}</p>
```

就这几行，输入框打什么，下面就显示什么。

---

## 用起来的感受

说几个比较主观的感受。

**上手比较快。** 如果你有 HTML/CSS/JS 基础，大概花一个下午能跑起来一个简单的页面，文档也写得很清楚，照着做基本不会迷。

**`script setup` 语法很舒服。** Vue 3 引入的组合式 API 配合 `<script setup>`，写起来比之前的选项式 API 感觉更现代一点，逻辑可以按功能聚合，不用到处找 `data`、`methods`、`computed`。

**生态还不错。** Vue Router 做路由，Pinia 做状态管理，Vite 做构建，这套组合用下来挺顺滑的，没踩什么大坑。

当然也有不太顺的地方——比如第一次搞清楚 `ref` 和 `reactive` 的区别花了我一些时间，还有响应式有时候会"失去追踪"，需要注意一些写法上的细节。

---

## 还没研究透的部分

这篇只能算"浅度研究"，很多东西我还没怎么碰：

- 服务端渲染（Nuxt.js）
- 自定义指令
- `Teleport`、`Suspense` 这些高级组件
- 性能优化相关的细节

以后有机会慢慢探索吧，现在能用来写点小项目就够了。

---

## 总结

Vue.js 对我这种前端新手来说是个挺不错的起点。它不会一开始就把你淹死在概念里，可以慢慢来，边用边学。

如果你也在纠结用哪个框架入门，我觉得 Vue 是个值得考虑的选项——特别是文档这块，真的没得说。

当然最后还是那句话，框架只是工具，JavaScript 基础才是根。这点我自己也还在努力。
