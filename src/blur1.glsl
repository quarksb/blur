#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D img;
uniform float ratio;
// 图片大小
uniform vec2 canvasSize;

void main() {
    vec4 rgba = vec4(0);
    rgba += texture2D(img, (gl_FragCoord.xy + ratio * vec2(1, 0)) / canvasSize);
    rgba += texture2D(img, (gl_FragCoord.xy + ratio * vec2(-1, 0)) / canvasSize);
    rgba += texture2D(img, (gl_FragCoord.xy + ratio * vec2(0, 1)) / canvasSize);
    rgba += texture2D(img, (gl_FragCoord.xy + ratio * vec2(0, -1)) / canvasSize);
    gl_FragColor = rgba / 4.;
}