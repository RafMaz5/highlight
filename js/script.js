listRecipe= undefined;
$.getJSON("/highlight/element/recipe/list.json", function(data){
    listRecipe = data;
	var c = 1;
    $(listRecipe).each(function(arg){
		$.getJSON("/highlight/element/recipe/" + listRecipe[arg], function(ric){
			var $view = $('#replace-box');
		  	ric_obj = ric;
		  	$view.find('#application').html(ric_obj.title);
		  	$view.find('#preparazione').html(ric_obj.prep);
		    $(ric_obj.ingr).each(function(arg_i){
		    	var view_li = '';
		    	if(ric_obj.ingr[arg_i]!=undefined && ric_obj.ingr[arg_i].cosa!=undefined){
		    	view_li = '<li>';	  	
		    	view_li+=ric_obj.ingr[arg_i].cosa;
		    	view_li+=' <span>'+ric_obj.ingr[arg_i].quanto+' '+ric_obj.ingr[arg_i].che+'</span></li>';
			  	$view.find('.content-box-description span ul').append(view_li);
		    	}
			  });
	  		c = c+1;
	  		$view.find('.content-box-img img').attr('title',ric_obj.title);
	  		if (urlExists('img/' + ric_obj.title + '.jpg')) {
		  		$view.find('.content-box-img img').attr('src','img/' + ric_obj.title + '.jpg');
	  		} else if(urlExists('img/' + ric_obj.title + '.jpeg')) {
		  		$view.find('.content-box-img img').attr('src','img/' + ric_obj.title + '.jpeg');
	  		} else if (urlExists('img/' + ric_obj.title + '.png')) {
		  		$view.find('.content-box-img img').attr('src','img/' + ric_obj.title + '.png');
	  		} else {
		  		$view.find('.content-box-img img').attr('src','noimage.png');
		  		$view.find('.content-box-img img').attr('title','Nessuna immagine');
	  		}
		  	divv = $view.html().replace(/ac1/g,'ac'+c);
		  	divv = divv.replace(/ab1/g,'ab'+c);
			$('#page-content-wrapper').append(divv);
			$view.find('.content-box-description span ul').html('');
		  });
    });
  });
function urlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function changeClass(id, clazz){
	$('#'+id).toggleClass(clazz);
	$('#'+id).toggleClass('inline');
}
function handleFiles(fileList){
    if (fileList.length > 0) {
        var reader = new FileReader();
        reader.onloadend = function() { 
            var text = this.result;
 			$( "#select-text" ).html(text);
         };
        reader.readAsText(fileList[0], 'UTF-8');
    };
}
function addIngrRow(){
	if ($("#input-recipe").find("#ingr div").find("input.old-cosa").val() == "" || 
			($("#input-recipe").find("#ingr div").find("input.old-quanto").val() == "" && 
				$("#input-recipe").find("#ingr div").find("select.old-che option:selected").val() != "qb") ) {
		constructMessage('Dati Mancanti', 'Nessun dato inserito', 'warning');
		throw "400 Bad Request: Missing data input";
	};
	adjustIngr();
	loadElement("ingr", "ingrRow");
}

function addPrepRow(){
	if ($("#input-recipe").find("textarea").val() == "") {
		constructMessage('Dati Mancanti', 'Nessun dato inserito', 'warning');
		throw "400 Bad Request: Missing data input";
	};

	loadElement("prep", "prepRow");
}

function loadElement(parent, fileName) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      $("#" + parent).append(xhttp.responseText);
    }
  }
  xhttp.open("GET", "element/" + fileName + ".txt", true);
  xhttp.send();
}
function saveRecipe() {
	var recipe = {};
	var isError = "";
	$("#input-recipe").find(".error").removeClass('error');
	recipe.title = $("#input-recipe").find("#title").val();
	if (recipe.title == "") {
		$("#input-recipe").find("#title").addClass('error');
		isError += "- Nessun titolo inserito<br>";
	}
	recipe.ingr = [];
	for (var i = $("#input-recipe").find("#ingr > div").length - 1; i >= 0; i--) {
		var $ing = $($("#input-recipe").find("#ingr > div")[i]);
		recipe.ingr[i] = {};
		recipe.ingr[i].che = $ing.find('.che').val()
		recipe.ingr[i].quanto = $ing.find('.quanto').val();
		recipe.ingr[i].cosa = $ing.find('.cosa').val();
	}
	if (recipe.ingr.length == 0) {
		$("#input-recipe").find("#ingr").addClass('error');
		isError += "- Nessun ingrediente inserito<br>";
	};
	recipe.prep = [];
	var prep = $("#input-recipe").find(".prep");
	if (prep.size() > 0) {
		for (var i = prep.length - 1; i >= 0; i--) {
			var temp = {};
			if (i === 0) {
				temp.titolo = "Preparazione";
			} else {
				temp.titolo = $($("#input-recipe").find("#prep input[type='txt']")[i-1]).val();
			}
			temp.testo = $(prep[i]).val();
			recipe.prep[i] = temp;
		}
	}
	if (isError != "") {
		constructMessage('Dati Mancanti', isError, 'error');
		throw "400 Bad Request: Missing data input.";
		return false;
	};
	alert(JSON.stringify(recipe));
	download(recipe);
}

function resetForm(){
	$("#input-recipe").find("#title").val("");
	$("#input-recipe").find(".error").removeClass("error");
	$("#input-recipe").find("#ingr").html("");
	$($("#input-recipe").find(".prep")[0]).val("");
	var btn = $("#input-recipe").find("#prep .add-btn");
	var txt = $("#input-recipe").find(".prep")[0];
	$("#input-recipe").find("#prep")
		.html($("#input-recipe").find("#prep label"))
		.append(btn)
		.append(txt);
}

function download(storageObj) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storageObj));
	var dlAnchorElem = document.getElementById('downloadAnchorElem');
	dlAnchorElem.setAttribute("href",dataStr);
	dlAnchorElem.setAttribute("download", storageObj.title + ".json");
	dlAnchorElem.click();
}
function toggleDialog(id, arg) {
	if($('.open').length > 0) {
		$('.open').toggleClass('open');
	} else {
		$(arg).parent().toggleClass("open");
	}
	$('#' + id).toggle('slow');$('.overlay').toggle('slow');
}

function hideQuanto(element) {
	$(element).parent().parent().find('.old-quanto').hide('slow');
}
function showQuanto(element) {
	$(element).parent().parent().find('.old-quanto').show('slow');
}
function adjustIngr() {
	var cheVal = $("#input-recipe").find("#ingr div").find("select.old-che option:selected").val();
	var quantoVal = $("#input-recipe").find("#ingr div").find("input.old-quanto").val();
	var cosaVal = $("#input-recipe").find("#ingr div").find("input.old-cosa").val();
	$("<div/>").addClass('quanto disable')
		.html(quantoVal)
		.val(quantoVal)
		.appendTo('#ingr > div:last-child');
	$("<div/>").addClass('che disable')
		.html(cheVal)
		.val(cheVal)
		.appendTo('#ingr > div:last-child');
	$("<div/>").addClass('cosa disable')
		.html(cosaVal)
		.val(cosaVal)
		.appendTo('#ingr > div:last-child');
	$("<br/>").appendTo('#ingr > div:last-child');
	$('select.old-che').remove();
	$('input.old-quanto').remove();
	$('input.old-cosa').remove();
}