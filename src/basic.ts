import vertexShader from './vertexShader.glsl';
import REGL, { TextureMagFilterType, TextureMinFilterType } from 'regl';

export const ATTRIBUTES = {
    position: [-2, -2, 2, -2, 0, 4], // 构建一个覆盖 -1~1 绘制区域的三角形
};

export const BaseDrawConfig = {
    vert: vertexShader,
    attributes: ATTRIBUTES,
    depth: {
        enable: false,
    },
    count: 3,
};

// canvas 大小改变时需更新
export function getViewport(regl: REGL.Regl) {
    return {
        x: 0,
        y: 0,
        width: regl.prop<any, 'width'>('width') as unknown as number,
        height: regl.prop<any, 'height'>('height') as unknown as number,
    };
}

export function getTextureConfig(image: HTMLImageElement | HTMLCanvasElement) {
    let { width, height } = image;

    return {
        width,
        height,
        mag: 'linear' as TextureMagFilterType,
        min: 'linear' as TextureMinFilterType,
        data: image,
        flipY: true,
        premultiplyAlpha: true,
    };
}
