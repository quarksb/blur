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
    vec4 rgba = texture2D(img, gl_FragCoord.xy / canvasSize);
    for(float i = 0.; i < 100.; i++) {
        if(i >= ratio)
            break;
        for(float j = 0.; j < 100.; j++) {
            if(j >= ratio)
                break;
            vec2 vec = vec2(i, j);
            rgba += texture2D(img, (gl_FragCoord.xy + vec * vec2(1, 1)) / canvasSize);
            rgba += texture2D(img, (gl_FragCoord.xy + vec * vec2(1, -1)) / canvasSize);
            rgba += texture2D(img, (gl_FragCoord.xy + vec * vec2(-1, 1)) / canvasSize);
            rgba += texture2D(img, (gl_FragCoord.xy + vec * vec2(-1, -1)) / canvasSize);
        }
    }

    gl_FragColor = rgba / (ratio * ratio * 4. + 1.);
}