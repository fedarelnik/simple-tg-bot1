x_t=[]
y_t=[]
vx_t=[]
vy_t=[]
info_from_server='info_from_server'

def send_info():
	return info_from_server

def get_info(path_info):
	global info_from_server, x_t,y_t,vx_t,vy_t
	if(path_info=='new_t'):
		info_from_server='id_t'+str(len(x_t))
		x_t+=[0]
		y_t+=[0]
		vx_t+=[0]
		vy_t+=[0]
	elif(path_info[0]=='t'):
		print('i get info about t')
		info_from_server=str(x_t)+str(y_t)+str(vx_t)+str(vy_t);
		info_from_server=info_from_server[1:]
		info_from_server='masv'+info_from_server.replace(']','')
		print(path_info.split(','))
	elif(path_info[0]=='n'):
		info_from_server=str(x_t)+str(y_t)+str(vx_t)+str(vy_t);
		info_from_server=info_from_server[1:]
		info_from_server='masv'+info_from_server.replace(']','')
	else:
		info_from_server='error response'

def use_path(s_path):
	#print(s_path[1:])
	if len(s_path)<2:
		return "error"
	else:
		if s_path[1] == '?':
			get_info(s_path[2:])
			return send_info()
		else:
			try:
				somef = open(s_path[1:], 'r')
				send_text = somef.read()
				somef.close()
				return send_text
			except:
				return 'error'
			