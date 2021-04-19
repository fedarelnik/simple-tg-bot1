var canvas = document.getElementById("myCanvas"); //take canvas from html
var ctx = canvas.getContext("2d"); //2d canvas
var server_path='';
var path_info='info+from+client+';
//----------------
var dt=100;
//----------------
var stepId = 0;
//turret
var turretRadius = 15;
var xstart = canvas.width/2;
var ystart = canvas.height/2;
var x = xstart;
var y = ystart;
var colorTurret = "#4b3131";
var id_t=0;
var x_t=[], y_t=[], vx_t=[], vy_t=[];

function take_t(){
	send_to_server(server_path,'new_t');
}

function init(){
	server_path=document.getElementById("server_address").value;
	//alert('into init');
	take_t();
	//alert('after take_t()');
}

function use_info_list(){
	//alert('into use_info_list');
	//try{
	for(var i=0;i<5;i++){
		if(info_from_server[i]!=''){
			//alert(info_from_server[i]);
			var takingString = info_from_server[i];
			if(~takingString.indexOf('id_t')){
				id_t=+takingString.substring(4);
			}
			if(~takingString.indexOf('masv')){
				alert('before take_masv_from_server');
				try{
				take_masv_from_server(takingString.substring(4));
				}catch(e){alert(e);}
			}
			info_from_server[i]='';
		}
	}//}catch(e){alert(e)}
}

function send_info_t(){
	//alert('into send_info_t');
	//alert('eto t - '+send_to_server(server_path,'info_t'));
	var info_t='none';
	if(x_t[id_t!=undefined]){
		info_t = 't'+id_t+','+x_t[id_t]+','+y_t[id_t]+','+vx_t[id_t]+','+vy_t[id_t];
	}
	send_to_server(server_path, info_t);
}

function str_to_masv(str_p){
	var masv_p=[];
	while(str_p!=''){
		var iter=str_p.indexOf(',');
		masv_p+=[Number(str_p.substring(0,iter))];
		str_p=str_p.substring(iter+1);
	}
	return masv_p;
}

function take_masv_from_server(str_masv){
	alert(str_masv);
	var del = str_masv.indexOf('[');
	var str_x_t = str_masv.substr(0,del);
	var str_y_t = str_masv.substr(del+1,del);
	var str_vx_t = str_masv.substr(2*(del+1),del);
	var str_vy_t = str_masv.substr(3*(del+1),del);
	//alert('x_t = '+str_x_t+'\n'+'y_t = '+str_y_t+'\n'+'vx_t = '+str_vx_t+'\n'+'vy_t = '+str_vy_t+'\n');
	try{
	x_t = str_to_masv(str_x_t);
	y_t = str_to_masv(str_y_t);
	vx_t = str_to_masv(str_vx_t);
	vy_t = str_to_masv(str_vy_t);
	}catch(e){alert("error - "+e);}
	alert(x_t+'\n'+y_t+'\n'+vx_t+'\n'+vy_t);
}

function draw_t(id){
	ctx.beginPath();
    ctx.arc(x_t[id], y_t[id], turretRadius, 0, Math.PI*2);
    ctx.fillStyle = colorTurret;
    ctx.fill();
    ctx.closePath();
}

function move_t(id){
	//alert(' before move');
	x_t[id] = x_t[id]+vx_t[id];
	y_t[id] = y_t[id]+vy_t[id];
	draw_t(id);
}
//try{
function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	alert('before for(into draw)');
	//try{
	for(var i=0; i < x_t.length;i++){
		alert('before draw_t');
		draw_t(i);
		alert('after draw_t');
	}//}catch(e){alert(e)}
}//}catch(e){alert(e);}

function step(){
	//alert('into step');
	use_info_list();
	send_info_t();
	draw();
}

function start(){
	//alert('before init');
	init();
	if(!stepId){
		//alert('before step');
		stepId = setInterval(step, dt);
	}
}

function stop(){
	clearInterval(stepId);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	stepId = 0;
}

function test(){
	//alert(Number("34"));
	init();
	alert(id_t);
}