import { defineConfig } from 'vite';
// import typescript from '@rollup/plugin-typescript';
import vitePluginString, { defaultCompress } from 'vite-plugin-string';
import glslminify from 'glslminify';

const libOutDir = 'dist';
// https://vitejs.dev/config/
enum BUILD_MODE {
    LIB = 'lib',
    DEMO = 'demo',
}
const compress = (code: string) => {
    const shader = ['', code];
    // 注入预定义参数
    const defines = {};

    try {
        glslminify.minifyGlsl(shader, defines);
        return shader[1];
    }
    catch (e) {
        // console.error(e);
        return defaultCompress(code);
    }
};
export default ({ mode, command }) => {
    const commonConfig = defineConfig({
        root: './',
        optimizeDeps: {
            exclude: [
            ],
        },
        plugins: [
            vitePluginString({ compress: false }), // 着色器默认移除换行符注释等，如需保留加入参数  { compress: false }
        ],
    });

    if (command === 'build') {
        return {
            [BUILD_MODE.LIB]: defineConfig({
                ...commonConfig,
                root: './src',
                build: {
                    outDir: libOutDir,
                    lib: {
                        name: 'image-creator',
                        entry: './',
                    },
                    rollupOptions: {
                        output: {
                            dir: libOutDir,
                        },
                    },
                },
            }),
            [BUILD_MODE.DEMO]: defineConfig({
                ...commonConfig,
                base: './',
                build: {
                    // assetsDir: 's-context/resources',
                    target: 'es2020',
                },
            }),
        }[mode];
    }
    return commonConfig;
};
