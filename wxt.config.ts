import {defineConfig} from 'wxt';
import react from '@vitejs/plugin-react';

// See https://wxt.dev/api/config.html
export default defineConfig({
    manifest: {
        permissions: ["activeTab","tabs"],
        action: {},
        name: 'Chatgpt_writerExt',
        description: 'Chatgpt_writerExtDescription__',
        version: '1.0.0',
    },
    vite: () => ({
        plugins: [react()],
    }),
});