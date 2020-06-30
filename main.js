function $(e){return document.querySelector(e);}
function $All(e){return document.querySelectorAll(e);}

/*handle each and every event of editing*/

window.onload = function(){
	$(".input").innerText = localStorage.code;
	
	run();
	
	$(".cpy").addEventListener("click", cpy);
	$(".delb").addEventListener("click", clr);
	$(".live").addEventListener("click", nlive);
	$(".save").addEventListener("click", save);
	$(".nw").addEventListener("click", function(){
		window.open('code.html');
		});
	$(".fs").addEventListener("click", fs);
	$(".run").addEventListener("click", run);
	$(".input").addEventListener("input", typing);
	$(".input").addEventListener("change", typing);
}

var code, m = 0, lS;

function cpy(){
	var inp = $(".input");
	
	window.getSelection().selectAllChildren(inp);
	
	document.execCommand("copy");
 }

function clr(){
	$(".input").innerHTML = "";
	run();
}

function nlive(){
	if($(".livei.on")){
		$(".livei").classList = "material-icons livei";
		$(".livei").innerHTML = "radio_button_unchecked";
	}
	else{
		$(".livei").classList = "material-icons livei on";
		$(".livei").innerHTML = "radio_button_checked";
		
		typing();
	}
}

function run(){
	var inpute = $(".input");
	code = inpute.innerText;
	
	$("#output").srcdoc = code;
	localStorage.code = code;
}

function typing(){
	var live_status = $(".livei").innerHTML.slice(13);
	
	var code = $(".input").innerText;
	
	if(live_status == "checked")
		run();
	
	localStorage.setItem("code", code);
}
function car(pos){
	var inp = $(".input");
              
    // Creates range object 
    var setpos = document.createRange(); 
              
    // Creates object for selection 
    var set = window.getSelection();
              
    // Set start position of range 
    setpos.setStart(inp.childNodes[0], pos);
              
    // Collapse range within its boundary points 
    // Returns boolean
    setpos.collapse(true); 
              
    // Remove all ranges set 
    set.removeAllRanges(); 
              
    // Add range with respect to range object. 
    set.addRange(setpos);
              
    // Set cursor on focus 
    inp.focus();
}

function save(){
  var text = $(".input").innerText;
  
  var filename = "code.html";
  
  var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
  
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