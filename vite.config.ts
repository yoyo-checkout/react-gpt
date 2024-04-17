import { join, resolve } from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const envDirPath = join(__dirname, './')
  process.env = { ...process.env, ...loadEnv(mode, envDirPath) }

  return defineConfig({
    base: mode === 'deploy' ? process.env.VITE_DEPLOY_URL : '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      include: ['lodash-es'],
    },
  })
}
