import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/three/')) return 'instrument-vendor';
          if (id.includes('/node_modules/gsap/')) return 'motion-vendor';
        },
      },
    },
  },
});
