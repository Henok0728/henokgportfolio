import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function htmlIncludePlugin() {
  return {
    name: 'html-include-plugin',
    handleHotUpdate({ file, server }) {
      if (file.includes('sections') || file.endsWith('.html')) {
        server.ws.send({
          type: 'full-reload',
          path: '*'
        });
      }
    },
    transformIndexHtml(html, ctx) {
      return html.replace(/<include\s+src="([^"]+)"\s*\/?>/g, (_, srcPath) => {
        const filePath = path.resolve(ctx.filename ? path.dirname(ctx.filename) : 'src', srcPath);
        if (ctx.server) {
          ctx.server.watcher.add(filePath);
        }
        if (fs.existsSync(filePath)) {
          return fs.readFileSync(filePath, 'utf-8');
        }
        return `<!-- Missing include: ${srcPath} -->`;
      });
    }
  };
}

export default defineConfig({
  root: 'src',
  plugins: [htmlIncludePlugin()],
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    watch: {
      usePolling: true
    }
  }
});
