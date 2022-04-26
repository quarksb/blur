import REGL from 'regl';
import frag from './blur3.glsl';
import { BaseDrawConfig, getViewport, getTextureConfig } from './basic';

interface Props {
    value: number,
    width: number,
    height: number,
}
let glCanvas: HTMLCanvasElement;
let regl: REGL.Regl, draw: (prop: Props) => void, imgTexture: REGL.Texture2D;

function initWarp() {
    glCanvas = document.createElement('canvas');
    regl = REGL({ canvas: glCanvas });
    imgTexture = regl.texture({
        mag: 'linear',
        min: 'linear',
        flipY: true,
        premultiplyAlpha: true,
    });

    const data = {
        frag,
        uniforms: {
            ratio: regl.prop<Props, 'value'>('value'),
            img: imgTexture,
            canvasSize: [regl.prop<Props, 'width'>('width'), regl.prop<Props, 'height'>('height')],
        },
        viewport: getViewport(regl),
    };

    draw = regl(data);
    const baseDraw = regl(Object.assign(data, BaseDrawConfig));
    draw = (props: Props) => {
        regl.clear({
            color: [0, 0, 0, 0],
            depth: 1,
        });
        baseDraw(props);
    };
}

export function blur(image: HTMLCanvasElement | HTMLImageElement, { value }: { value: number }): HTMLCanvasElement | HTMLImageElement {
    if (isNaN(value)) return image;
    if (!regl) initWarp();
    const { width, height } = image;
    glCanvas.width = width;
    glCanvas.height = height;
    imgTexture(getTextureConfig(image));
    draw({ value, width, height });
    return glCanvas;
}

