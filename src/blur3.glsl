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
    float weightSum = 1.;
    float maxX = 3. * ratio;
    float k = 1. / (ratio * ratio);
    for(float i = 0.; i < 1000.; i++) {
        if(i >= maxX)
            break;
        for(float j = 0.; j < 1000.; j++) {
            if(j >= maxX)
                break;
            vec2 vec = vec2(i, j);
            float weight = exp(-(i * i + j * j) * k);
            weightSum += 4. * weight;
            rgba += weight * texture2D(img, (gl_FragCoord.xy + vec * vec2(1, 1)) / canvasSize);
            rgba += weight * texture2D(img, (gl_FragCoord.xy + vec * vec2(1, -1)) / canvasSize);
            rgba += weight * texture2D(img, (gl_FragCoord.xy + vec * vec2(-1, 1)) / canvasSize);
            rgba += weight * texture2D(img, (gl_FragCoord.xy + vec * vec2(-1, -1)) / canvasSize);
        }
    }

    gl_FragColor = rgba / weightSum;
}