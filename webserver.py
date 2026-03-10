#!/usr/bin/env python3
"""
简单的HTTP服务器，用于预览AI脑波英语官网
使用方法：python webserver.py
访问地址：http://localhost:8000
"""

import http.server
import socketserver
import os
import sys

# 设置端口
PORT = 8000

# 切换到网站目录
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """自定义请求处理器"""

    def end_headers(self):
        """添加CORS头，允许跨域访问"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def do_GET(self):
        """处理GET请求"""
        # 如果请求根路径，返回index.html
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

def run_server():
    """启动服务器"""
    # 允许端口复用
    socketserver.TCPServer.allow_reuse_address = True

    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
            print(f"✅ AI脑波英语官网服务器已启动")
            print(f"🌐 访问地址：http://localhost:{PORT}")
            print(f"📁 服务目录：{os.getcwd()}")
            print(f"\n📄 可用页面：")
            print(f"   - 首页：http://localhost:{PORT}/index.html")
            print(f"   - 产品介绍：http://localhost:{PORT}/product.html")
            print(f"   - 成功案例：http://localhost:{PORT}/cases.html")
            print(f"   - 联系我们：http://localhost:{PORT}/contact.html")
            print(f"\n💡 按 Ctrl+C 停止服务器\n")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print(f"\n\n🛑 服务器已停止")
        sys.exit(0)
    except OSError as e:
        print(f"\n❌ 错误：无法启动服务器")
        print(f"   端口 {PORT} 可能已被占用")
        print(f"   错误信息：{e}")
        sys.exit(1)

if __name__ == "__main__":
    run_server()
