import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  server: {
    port: 5173,
    host: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  },
  preview: {
    port: 5173,
    host: true,
  },
  plugins: [
    {
      name: 'cors-stream-proxy',
      configureServer(server) {
        server.middlewares.use('/api/proxy', async (req, res) => {
          const urlObj = new URL(req.url, 'http://localhost');
          const targetUrl = urlObj.searchParams.get('url');
          if (!targetUrl) {
            res.statusCode = 400;
            res.end('Missing url parameter');
            return;
          }

          try {
            const fetchHeaders = {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': '*/*',
            };
            try {
              fetchHeaders['Referer'] = new URL(targetUrl).origin;
            } catch (e) {}

            const response = await fetch(targetUrl, { headers: fetchHeaders });
            res.statusCode = response.status;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', '*');

            const contentType = response.headers.get('content-type') || '';
            if (contentType) res.setHeader('Content-Type', contentType);

            // If it is an M3U8 manifest, rewrite relative segment URLs so they route through the proxy
            if (contentType.includes('mpegurl') || targetUrl.includes('.m3u8') || targetUrl.includes('.m3u')) {
              const text = await response.text();
              const lines = text.split(/\r?\n/);
              const rewritten = lines.map(line => {
                const trimmed = line.trim();
                if (!trimmed) return line;
                if (trimmed.startsWith('#')) {
                  // Handle URI="..." in tags like #EXT-X-KEY or #EXT-X-MAP
                  return trimmed.replace(/URI="([^"]+)"/g, (match, uri) => {
                    try {
                      const full = new URL(uri, targetUrl).href;
                      return `URI="/api/proxy?url=${encodeURIComponent(full)}"`;
                    } catch (e) {
                      return match;
                    }
                  });
                }
                // It's a segment or sub-playlist URL!
                try {
                  const full = new URL(trimmed, targetUrl).href;
                  return `/api/proxy?url=${encodeURIComponent(full)}`;
                } catch (e) {
                  return line;
                }
              });
              res.end(rewritten.join('\n'));
            } else {
              const buffer = await response.arrayBuffer();
              res.end(Buffer.from(buffer));
            }
          } catch (err) {
            res.statusCode = 502;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(`Proxy error: ${err.message}`);
          }
        });
      },
    },
    {
      name: 'copy-playlists-to-dist',
      closeBundle() {
        const files = ['ALL.M3U8', 'alltv.m3u8', 'TV.m3u8', 'github.m3u', 'playlists.json', '_headers'];
        const distDir = path.resolve(__dirname, 'dist');
        if (fs.existsSync(distDir)) {
          for (const f of files) {
            const src = path.resolve(__dirname, f);
            const dest = path.resolve(distDir, f);
            if (fs.existsSync(src)) {
              fs.copyFileSync(src, dest);
            }
          }
        }
      },
    },
  ],
});
