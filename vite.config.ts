import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // 1. 여기에 본인의 깃허브 저장소 이름을 넣으세요 (슬래시 필수!)
  // 예: base: '/my-react-app/',
  base: '//', 

  plugins: [react()],
  
  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 보통 src 폴더를 @로 잡습니다.
    }
  }
});
