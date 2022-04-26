---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: "text-center"
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
---

# 超越模糊的极限

<div class="absolute right-50">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    夸克（一个不专业的前端工程师）
  </span>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---

# 什么是模糊?


--模糊是图像后处理的一个基础操作

--减少图像噪声以及降低细节层次

<div v-click="1">
  <span>景深/失焦</span>
  <img
    class="absolute bottom-9 left-7 w-100"
    src="https://pic2.zhimg.com/80/v2-ce51eb5f36c9ce6b23a5fc515f519259_720w.jpg"
  />
</div>

<div v-click="2">
  <span>降低细节</span>
  <img
    class="absolute bottom-19 left-37 w-100"
    src="https://pic2.zhimg.com/80/v2-5dd53ad7ce078484eb4790cacdb8e8c5_720w.jpg"
  />
</div>

<div v-click="3">
  <span>移轴摄影</span>
  <img
    class="absolute bottom-29 left-67 w-100"
    src="https://pic2.zhimg.com/80/v2-3e690fded89d8477edaf1ba6a3cfbe9d_720w.jpg"
  />
</div>

<div v-click="4">
  <a href="https://git.gaoding.com/pages/kuake/shadow/">拟真阴影</a>
</div>

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# 怎样模糊一张图片

```ts{all}
color = (colorLeft + colorRight + colorTop + colorBottom)/4;
```

<Blur style="width:100%" :count="1" />

---

<img src="https://gd-filems.dancf.com/mcm79j/mcm79j/08978/66167db7-8570-41bf-b6fc-85a4d3cae28f26692629.png">

---

# 更均匀的模糊

<Blur style="width:100%" :count="2"/>


---

# 高斯分布（正态分布）

<img  src="https://gd-filems.dancf.com/mcm79j/mcm79j/08978/618d9ed7-e401-4a96-b5e0-f0edfc56f4b6229298.jpg"/>

---

# 高斯分布（正态分布）

<img  src="https://gd-filems.dancf.com/mcm79j/mcm79j/08978/90fd1425-c4cd-4ad9-b9d0-a2020fe7c0b826691109.png">

---

# 高斯模糊缺点及分解高斯模糊的拆解

### 性能开销巨大

$$
(6n+1) \cdot (6n+1)\sim  36n^2\sim O(n^2)
$$

### 二维问题拆解成 2 个 1 维问题

$$
\begin{align}
 f_2(r)&={\frac {1}{2\pi\sigma^2 }}\;e^{-{\frac {r^{2}}{2\sigma ^{2}}}}
 \\ &= {\frac {1}{2\pi\sigma^2 }}\;e^{-{\frac {x^{2}+y^2}{2\sigma ^{2}}}}
 \\ &=
 { {\frac {1}{ {\sqrt {2\pi } \sigma}}}\;e^{-{\frac {x^2}{2\sigma ^{2}}}}\!} \cdot { {\frac {1}{ {\sqrt {2\pi } \sigma}}}\;e^{-{\frac {y^2}{2\sigma ^{2}}}}\!}
 \\ &=
 f_1(x) \cdot f_1(y)
 \end{align} 
$$

$$
(6n+1)+(6n+1)\sim 12n \sim O(n)
$$

---

# 线性插值采样（TextureFilterType：linear ）

### 数学原理
$$
 
\begin{align}
    weight_L(t_1, t_2) &= weight_D(t_1) + weight_D(t_2) \\
    offset_L(t_1, t_2) &= {\frac { offset_D(t_1) \cdot weight(t_1) +  offset_D(t_2) \cdot weight_D(t_1)} {weight_L(t1, t2)} }
\end{align} 
 
$$
### 复杂度
$$
(3n+1)+(3n+1)\sim 6n \sim O(n)
$$

---

## 分解高斯模糊

$$
先进行 \sigma_1 后进行 \sigma_2 的模糊
$$

$$
\small
\begin{align}
\int_{-\infty}^{+\infty} f_1(\sigma_1,x)f_1(\sigma_2, x-y)d_x 
&= \int_{-\infty}^{+\infty}{\frac {1}{ {\sqrt {2\pi } \sigma_1}}}\;e^{-{\frac {x^2}{2\sigma_1^2}}}{\frac {1}{ {\sqrt {2\pi } \sigma_2}}}\;e^{-{\frac {(x-y)^2}{2\sigma_2^2}}}d_x
\\ &=
 \left.\frac {1}{2\pi\sigma_1\sigma_2}\frac {\sqrt\pi\sigma_1\sigma_2e^{-\frac {y^2}{(2\sigma_1^2+2\sigma_2^2)}}
 erf(\frac{(\sqrt2\sigma_2^2+\sqrt2\sigma_1^2)x-\sqrt2r\sigma_1^2}{2\sigma_1\sigma_2\sqrt{\sigma_2^2+\sigma_1^2}})}{\sqrt2\sqrt{\sigma_2^2+\sigma_1^2}}
 \right|_{-\infty}^{+\infty}
 \\
 &=\left.\frac {e^{-\frac {y^2}{(2\sigma_1^2+2\sigma_2^2)}}
 }{2\sqrt{2\pi}\sqrt{\sigma_2^2+\sigma_1^2}}
 erf(\frac{(\sqrt2\sigma_2^2+\sqrt2\sigma_1^2)x-\sqrt2r\sigma_1^2}{2\sigma_1\sigma_2\sqrt{\sigma_2^2+\sigma_1^2}})\right|_{-\infty}^{+\infty}
 \\ &=\frac {e^{-\frac {y^2}{(2\sigma_1^2+2\sigma_2^2)}}
 }{2\sqrt{2\pi}\sqrt{\sigma_2^2+\sigma_1^2}} \cdot 2
 =\frac {1}{\sqrt{2\pi}\sqrt{\sigma_2^2+\sigma_1^2}}{e^{-\frac {y^2}{(2\sqrt{\sigma_1^2+\sigma_2^2}^2)}}
 
 }
\end{align}
\small

$$
