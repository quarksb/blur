<template>
  <div class="container">
    <canvas ref="canvas"></canvas>
    <div>
      <span>模糊大小</span>
      <input type="range" min="0" max="20" :value="value" @input="render" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { blur as blur1 } from "../src/blur1";
import { blur as blur2 } from "../src/blur2";
import { blur as blur3 } from "../src/blur3";

export default defineComponent({
  name: "blur",
  props: {
    count: {
      default: 1,
    },
    sigma: {
      default: 10,
    }
  },
  setup(prop) {
    let blur;
    switch (prop.count) {
      case 1:
        blur = blur1;
        break;
      case 2:
        blur = blur2;
        break;
      case 3:
        blur = blur3;
        break;
      default:
        blur = blur1;
    }
    return {
      canvas: null,
      ctx: null,
      value: ref(prop.sigma),
      width: 100,
      height: 100,
      image: null,
      blur,
    };
  },
  mounted() {
    this.canvas = <HTMLCanvasElement>this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.image = new Image();
    this.image.crossOrigin = "";
    this.image.src =
      "https://gd-filems.dancf.com/mcm79j/mcm79j/08978/a20d4f84-e016-46f2-aa8c-e707b8a502f0695952.png";
    this.image.onload = () => {
      const { width, height } = this.image;
      this.width = width;
      this.height = height;
      this.canvas.width = width;
      this.canvas.height = height;
      this.render();
    };
  },
  methods: {
    render(event?: Event) {
      const value = event?.target?.value || this.value;
      const result = this.blur(this.image, { value: Number(value) });
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(result, 0, 0);
    },
  },
});
</script>
<style scoped>
.container {
  display: grid;
  height: 100%;
  grid-template-columns: auto 200px;
}
canvas {
  max-width: 100%;
  max-height: 100%;
  grid-column: 1/2;
  margin-top: -50px;
}
</style>
