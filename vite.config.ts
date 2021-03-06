import path from 'path';
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import eslintPlugin from "@nabla/vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '~': path.resolve(__dirname),
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        eslintPlugin(),
        reactRefresh()
    ]
});
