// JavaScript Document

//定义变量
var startbtn=document.getElementById('startbtn');
var game=document.getElementById('game');
var leishu=document.getElementById('leishu');
var alertDiv=document.getElementById('alertDiv');
var alertImg=document.getElementById('alertImg');
var cha=document.getElementById('cha');
var count=document.getElementById('count');
var xuanDiv=document.getElementById('xuanDiv');
var gameModel1=document.getElementById('gameModel1');
var gameModel2=document.getElementById('gameModel2');
var gameModel3=document.getElementById('gameModel3');
var leinum;
var leiover;
var block;
var leiMap=[];
var startgameBool=true;   //开始按键锁，防止同一局游戏多次按开始键，导致界面连续出现多个游戏盘

bindEvent();   //绑定事件
function bindEvent(){
	startbtn.onclick=function(){
		if(startgameBool){
			xuanDiv.style.display='block';
			gameModel1.style.display='block';
			gameModel2.style.display='block';
			gameModel3.style.display='block';
			gameModel1.onclick=function(){
				xuanDiv.style.display='none';
			    gameModel1.style.display='none';
			    gameModel2.style.display='none';
				gameModel3.style.display='none';
				game.style.display='block';
	            leishu.style.display='block';
		        init();
			}
			gameModel2.onclick=function(){
				xuanDiv.style.display='none';
			    gameModel1.style.display='none';
			    gameModel2.style.display='none';
				gameModel3.style.display='none';
				game.style.display='block';
	            leishu.style.display='block';
		        init2();
			}
			gameModel3.onclick=function(){
				xuanDiv.style.display='none';
			    gameModel1.style.display='none';
			    gameModel2.style.display='none';
				gameModel3.style.display='none';
				game.style.display='block';
	            leishu.style.display='block';
		        init3();
			}
		    startgameBool=false;
		}
	}
	   game.oncontextmenu=function(){   
		   return false;}
       game.onmousedown=function(e){   //判断鼠标左右按键  
		  var event=e.target;
		  if(e.which===1){      //  左键敲击值为1
			  leftClick(event);
			  }else if(e.which===3){   //  右键敲击值为3
				rightClick(event);  
				 }
		  }
		cha.onclick=function(){      //结束本局游戏按钮
			alertDiv.style.display='none';
			alertImg.style.display='none';
			game.style.display='none';
			leishu.style.display='none';
			game.innerHTML='';
			startgameBool=true;
			window.location.reload();
			}  
}
//  初始化简单
function init(){
	leinum=10;
	leiover=10;
	count.innerHTML=leiover;   //赋值雷个数
	for(var i=0;i<10;i++){
		for(var j=0;j<10;j++){
			var con=document.createElement('div');
			con.classList.add('block');
			con.setAttribute('id',i+ '-' + j);
			game.appendChild(con);
			leiMap.push({lei:0});
		}
	}
	block=document.getElementsByClassName('block');
	
	while(leinum){
	var leiIndex=Math.floor(Math.random()*100);  //产生10个地雷
	if(leiMap[leiIndex].lei===0){
		  leiMap[leiIndex].lei=1;	
		  block[leiIndex].classList.add('isLei');
		  leinum--;
		}
	}
	
}

function leftClick(dom){    //左击鼠标按键事件
	if(dom.classList.contains('flag')){
		return;
	}
	var isLei=document.getElementsByClassName('isLei');
	if(dom&&dom.classList.contains('isLei')){
		
		for(var i=0;i<isLei.length;i++){
			isLei[i].classList.add('show');
			}
			setTimeout(function(){
				alertDiv.style.display='block';
			    alertImg.style.backgroundImage='url(picture/gameover.jpg)';
				},800)
	}else{
	 var n=0;	
	 var posArr=dom&&dom.getAttribute('id').split('-');
	 var posX=posArr&& +posArr[0];   //判断存在，并且索引你第一个值
	 var posY=posArr&& +posArr[1]; //判断第二个，并且索引第二个值 
         if(isLei.length==10){
	          dom&&dom.classList.add('num');
	       }else if(isLei.length==40){	   
	          dom&&dom.classList.add('num2');
		    }else if(isLei.length==80){
				dom&&dom.classList.add('num3');
			  }
	// console.log(isLei.length);
	 for(var i=posX-1;i<=posX+1;i++){
		 for(var j=posY-1;j<=posY+1;j++){
			 var aroundBox=document.getElementById(i+'-'+j);
			 if(aroundBox&&aroundBox.classList.contains('isLei')){
				 n++;
			 }
		 }
	}
	dom&&(dom.innerHTML=n);
	  if(n==0){      //遍历附近8个，是否有地雷
		 for(var i=posX-1;i<=posX+1;i++){
		    for(var j=posY-1;j<=posY+1;j++){
				var nearBox=document.getElementById(i+'-'+j);
				if(nearBox&&nearBox.length!=0){
					if(!nearBox.classList.contains('check')){     //判断，如果已经遍历过，就不在遍历
						nearBox.classList.add('check');
						leftClick(nearBox);                       //产生递归遍历
					}
				} 
			}
		 }
	  }
	}
}
function rightClick(dom){       //右击鼠标按键
	if(dom.classList.contains('num')){
		return ;
	}
		dom.classList.toggle('flag');
		
		if(dom.classList.contains('isLei')&&dom.classList.contains('flag')){  //标记为雷，雷数减一
			leiover--;
		}
		if(dom.classList.contains('isLei')&&!dom.classList.contains('flag')){ //取消标记，雷数加一
			leiover++;
			}
			count.innerHTML=leiover;
			if(leiover==0){
				setTimeout(function(){
				alertDiv.style.display='block';
			    alertImg.style.backgroundImage='url(picture/shengli.jpg)';
			},800) }
}


//  初始化中级
function init2(){
	leinum=40;
	leiover=40;
	count.innerHTML=leiover;   //赋值雷个数
	for(var i=0;i<20;i++){
		for(var j=0;j<20;j++){
			var con=document.createElement('div');
			con.classList.add('block2');
			con.setAttribute('id',i+ '-' + j);
			game.appendChild(con);
			leiMap.push({lei:0});
		}
	}
	block=document.getElementsByClassName('block2');
	
	while(leinum){
	var leiIndex=Math.floor(Math.random()*400);  //产生随机40个地雷
	if(leiMap[leiIndex].lei===0){
		  leiMap[leiIndex].lei=1;	
		  block[leiIndex].classList.add('isLei');
		  leinum--;
        }
	}
	
}
//初始化困难级
function init3(){
	leinum=80;
	leiover=80;
	count.innerHTML=leiover;   //赋值雷个数
	for(var i=0;i<40;i++){
		for(var j=0;j<40;j++){
			var con=document.createElement('div');
			con.classList.add('block3');
			con.setAttribute('id',i+ '-' + j);
			game.appendChild(con);
			leiMap.push({lei:0});
		}
	}
		block=document.getElementsByClassName('block3');
	
	while(leinum){
	var leiIndex=Math.floor(Math.random()*1600);  //产生随机80个地雷
	if(leiMap[leiIndex].lei===0){
		  leiMap[leiIndex].lei=1;	
		  block[leiIndex].classList.add('isLei');
		  leinum--;
		}
	}
	
}