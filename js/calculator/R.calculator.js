		/*
		    *** picp v1.0
		*/
(function($){
	"use strict";
	function IsPC() {
	    var userAgentInfo = navigator.userAgent;
	    var Agents = ["Android", "iPhone",
	                "SymbianOS", "Windows Phone",
	                "iPad", "iPod"];
	    var flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	    return flag;
	}
	$.fn.extend({
			calculator:function(opts){
				var defaults={
					
				};
				var option=$.extend({},defaults,opts);
				this.each(function(){
					var _this=$(this),$input=_this.find(".rcalculator_displayer_input"),store="0",clearAllBool=false,upstore="",upsign="+",isoperation=false,
					inputSign=function(sign){
						store=clearAllBool?"0":$input.val();
						clearAllBool=false;
						isoperation=false;
						 _this.find(".rdel").text("←");
						if(store=="0"){sign=="."?store="0.":store=sign;}
						else if(store=="-"){sign=="."?store="-0.":store+=sign;}
						else if(sign=="."&&store.indexOf(sign)>0){return;}
						else{store+=sign;}
						$input.val(store);
					},
					operation=function(sign,w,y){
					  var res ="",a=0,b=0;
					  if(w==""){
					  	w=sign=="*"||sign=="/"?1:0;
					  }
					  a=parseFloat(w);
					  b=parseFloat(y); 
					  switch(sign){ 
						case '+': 
					        var c,d,m;
					        try{c = a.toString().split('.')[1].length;}catch(e){c = 0;}
					        try{d=b.toString().split(".")[1].length;}catch(e){d=0;}
					        m=Math.pow(10,Math.max(c,d));
					        res=Math.round(a*m+b*m)/m;
							break;
						case '-': 
							var c,d,m,n;
						    try{c = a.toString().split('.')[1].length;}catch(e){c = 0;}
						    try{d=b.toString().split(".")[1].length;}catch(e){d=0;}
						    m=Math.pow(10,Math.max(c,d));
						    n=(c>=d)?c:d;
						   	res=(Math.round(a*m-b*m)/m).toFixed(n);
							break;
						case '*': 
							var m=0,o=a.toString(),p=b.toString(); 
						    try{m+=o.split(".")[1].length;}catch(e){};
						    try{m+=p.split(".")[1].length;}catch(e){};
						    res=Number(o.replace(".",""))*Number(p.replace(".",""))/Math.pow(10,m);
							break;
						case '/': 
							var t1,t2,c,d;
						    try{t1 = a.toString().split('.')[1].length;}catch(e){t1 = 0;}
						    try{t2=b.toString().split(".")[1].length;}catch(e){ t2=0;}
						    c=Number(a.toString().replace(".",""));
						    d=Number(b.toString().replace(".",""));
						    res=(c/d)*Math.pow(10,t2-t1);
							if(res=="Infinity"){res="Error";}
							break;
						case '+/-': 
							res=-b;
							break;
						case 'C':
							var candel=false;
							candel=y.toString().length>0?true:false;
							if(isoperation){
							  res="0";
							  isoperation=false;
							  _this.find(".rdel").text("←");
							}
							else{
								if(candel){
									res=y.toString().length==1?"0":y.toString().substring(0,(y.toString().length-1));
								}
							}
							break;
						case 'CE':
							res="0";
							upstore="0";
							store="0";
							upsign="+";
							break;
						default:   
							res=b; 
							break; 
					  };
					  return res;
					};
					IsPC()?$("html").css("font-size","60px"):$("html").css("font-size","100px");
				   _this.find(".rnum").click(function(){
				   	 var val=$(this).attr("data-option");
				   	 inputSign(val);
				   });
				   _this.find(".roperation").click(function(){
				   	    isoperation=true;
				   	    _this.find(".rdel").text("C");
					   	if(!clearAllBool){
					   		store=operation(upsign,upstore,store);
					        $input.val(store);
					        clearAllBool=true;
					        if(store=="Error"){store="0";}
					        upsign=$(this).attr("data-option");
					        upstore=store;
					   	}
					   	else{
					   		upsign=$(this).attr("data-option");
					   	}
				   });
				   _this.find(".rsignchange").click(function(){
				   	 store=operation($(this).attr("data-option"),upstore,store);
				   	 $input.val(store);
				   	 if(isoperation){upstore=store;}
				   });
				   _this.find(".rdel").click(function(){
				   	 store=operation($(this).attr("data-option"),upstore,store);
				   	 $input.val(store);
				   });
				   _this.find(".rdelall").click(function(){
				   	 store=operation($(this).attr("data-option"),upstore,store);
				   	 $input.val(store);
				   });
					
				});
			}
	  });
})(jQuery);
