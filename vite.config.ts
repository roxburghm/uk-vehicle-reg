import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'UkVehicleReg',
            fileName: 'uk-vehicle-reg',
            formats: ['es', 'umd', 'iife']
        },
        outDir: 'dist',
        sourcemap: true
    }
});
