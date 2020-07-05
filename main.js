$ = (e) => document.querySelector(e);
$All = (e) => document.querySelectorAll(e);
$aEL = (e, eve, f) => e.addEventListener(eve, f);
$cE = (e) => document.createElement(e);

/*handle each and every event of editing*/

var code = "", m = 0, lS;

window.onload = function(){
	if(localStorage.code){
		code = localStorage.code;
	}
	
	$("textarea").value = code;
	$(".finput").innerText = code;
	run();

	$aEL($(".hb"), "click", input);
	$aEL($(".ob"), "click", output);
	
	$aEL($(".cpy"), "click", cpy);
	$aEL($(".delb"), "click", clr);
	$aEL($(".live"), "click", nlive);
	$aEL($(".save"), "click", save);
	$aEL($(".nw"), "click", () => window.open('code.html'));
	$aEL($(".fs"), "click", fs);
	$aEL($(".run"), "click", run);

	$aEL($("textarea"), "input", typing);
	$aEL($("textarea"), "change", typing);
}

function cpy(){
	window.getSelection().selectAllChildren($(".finput"));
	document.execCommand("copy");
 }

function clr(){
	$("textarea").value = "";
	typing();
	run();
}

function nlive(){
	if($(".livei.on")){
		$(".livei").classList.remove("on");
		$(".livei").innerHTML = "radio_button_unchecked";
	}
	else{
		$(".livei").classList.add("on");
		$(".livei").innerHTML = "radio_button_checked";
		
		typing();
	}
}

function run(){
	$("#output").srcdoc = code;
}

function typing(){
	var live_status = $(".livei").innerHTML.slice(13);
	
	code = $("textarea").value;
	$(".finput").innerText = code;
	
	if(live_status == "checked"){
		run();
	}
	
	localStorage.code = code;
}

function save(){
  var filename = prompt("Save file as:");
  
  var blob = new Blob([code], {type: "text/plain;charset=utf-8"});
  
  saveAs(blob, filename);
}

function fs(){
	var ele = $(".input");
	var b = window.getComputedStyle(ele).fontSize;
	var v;
	
	var size = prompt('Enter a css font-size value.\ne.g.: 12px, 2em, 100%, etc.', b);
	
	var fk = ["medium","xx-small","x-small","small","large","x-large","xx-large","smaller","larger","length","initial","inherit"];
	
	var fu = ["cm", "mm", "in", "px", "pt", "pc", "%", "em", "ex", "ch", "rem", "vw", "vh", "vmin", "vmax"];
	
	for(e of fu){
		if(size.endsWith(e)){
			for(i=0;i<=9;i++){
				if(size.startsWith(i)){
					v = true;
					break;
				}
			}
			break;
		}
	}
	
	if(fk.includes(size)) v = true;
	
	if(v) ele.style.fontSize = size;
	else alert("invalid");
}

function output(){
	$(".input").style.display = "none";
	$(".toolbar").style.display = "none";
	$("#output").style.display = "block";
	
	$(".hb").id = "";
	$(".ob").id = "visited";
}

function input(){
	$(".input").style.display = "block";
	$(".toolbar").style.display = "block";
	$("#output").style.display = "none";
	
	$(".hb").id = "visited";
	$(".ob").id = "";
}