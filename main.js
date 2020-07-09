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

	formatCode();

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

	$aEL(window, "resize", formatCode);
}

function cpy(){
	window.getSelection().selectAllChildren($(".finput"));
	document.execCommand("copy");
 }

function clr(){
	$("textarea").value = "";
	$(".finput").innerHTML = '<pre class="line"></pre>';
	localStorage.code = "";
	lineNo();
}

function nlive(){
	if($(".live.active")){
		$(".live").classList.remove("active");
	}
	else{
		$(".live").classList.add("active");
		
		typing();
	}
}

function run(){
	$("#output").srcdoc = code;
}

function typing(){
	var live_status = $(".live.active");
	
	code = $("textarea").value;

	formatCode();
	
	if(live_status){
		run();
	}
	
	localStorage.code = code;
}

function lineNo(){
	const pa = $(".lnColumn");
	var lines = $All(".line");

	pa.innerHTML = "";

	for(let i of lines){
		var lnN = $cE("div");
		lnN.classList = "lnCounts";
		lnN.style.height = i.scrollHeight + "px";
		lnN.style.lineHeight = i.scrollHeight + "px";
		
		pa.appendChild(lnN);
	}
}

function formatCode(){
	var fcode;
	const finput = $(".finput");
	var code = $("textarea").value;

	fcode = code.split("\n");

	finput.innerHTML = "";

	for(let i of fcode){
		var line = $cE("pre");
		line.classList = "line";
		line.innerText = i;
		finput.appendChild(line);
	}

	lineNo();
}

function save(){
  var filename = prompt("Save file as:");
  
  if(filename){
  	var blob = new Blob([code], {type: "text/plain;charset=utf-8"});
  	saveAs(blob, filename);
  }
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
	
	if(v){
		ele.style.fontSize = size;
		lineNo();
	}
	else alert("invalid");
}

function output(){
	$(".lnColumn").style.display = "none";
	$(".input").style.display = "none";
	$(".toolbar").style.display = "none";
	$("#output").style.display = "block";
	
	$(".hb").id = "";
	$(".ob").id = "visited";
}

function input(){
	$(".lnColumn").style.display = "block";
	$(".input").style.display = "block";
	$(".toolbar").style.display = "block";
	$("#output").style.display = "none";
	
	$(".hb").id = "visited";
	$(".ob").id = "";
}