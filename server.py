from http.server import BaseHTTPRequestHandler
from http.server import HTTPServer
#from http.server import CGIHTTPRequestHandler
import t

class ServerWorking(BaseHTTPRequestHandler):
	def do_GET(self):
		self.send_response(200)
		#объявляем заголовки
		self.send_header('Content-type', 'text/html')
		self.end_headers()#закрываем заголовки
		self.wfile.write(bytes(t.use_path(self.path),"utf-8"))
		#print(dir(self))
		'''
		self.wfile.write(bytes("<html><head><title>Title goes here.</title></head>","utf-8"))
		#self.wfile.write(bytes("<body><h1>Python работает</h1>","utf-8"))
		self.wfile.write(bytes("<body><h1>Python работает</h1>","cp1251"))
		self.wfile.write(bytes("<p> %s</p>" % self.path,"utf-8"))
		self.wfile.write(bytes("</body></html>","utf-8"))
		'''
	
serv_address=('',80)

#serv=HTTPServer(serv_address, ServerWorking)
serv=HTTPServer(serv_address, ServerWorking)
#serv=HTTPServer(serv_address, CGIHTTPRequestHandler)

#CGI
#serv=HTTPServer(serv_address, CGIHTTPRequestHandler)

serv.serve_forever()