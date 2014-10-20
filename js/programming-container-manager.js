$(document).ready(function(){
createBlocks();
$("#mutationArea").hide();
$(".mutationList").css('display','none');

function createBlocks(){
	$("div.mutationList").append("<ul></ul>");
	$(".mutationList").hide();
	$("#object-block ul").attr('id',"object-block-list");
	$("#object-block ul").attr('class',"blocklist");
	$("#parameter-block ul").attr('id',"parameter-block-list");
	$("#parameter-block ul").attr('class',"blocklist");
	$("#event-block ul").attr('id',"event-block-list");
	$("#event-block ul").attr('class',"blocklist");
	$("#conditional-loop-block ul").attr('id','conditional-loop-block-list')
	$("#conditional-loop-block ul").attr('class','blocklist')
	$("#operator-block ul").attr("id","operator-block-list"); 
	$("#operator-block ul").attr("class","blocklist"); 
	
	for(var i = 0; i<objects.length; i++){
		createFilterBlocks(objects,i,"objectBlock","object-block-list");
	}
	
	for(var i = 0; i<parameters.length; i++){
		createFilterBlocks(parameters,i,"parameterBlock","parameter-block-list");
	}
	
	for(var i = 0; i<events.length; i++){
		createFilterBlocks(events,i,"eventBlock","event-block-list");
	}
	
	for(var i = 0; i<conditionals.length; i++){
		createFilterBlocks(conditionals,i,"conditionalBlock","conditional-loop-block-list");
	}
	
	for(var i = 0; i<operators.length; i++){
		createFilterBlocks(operators,i,"operatorBlock","operator-block-list");
	}
$(".blocklist").children().draggable({helper:'clone',cursorAt: {left:30, top:70},drag:function(e,ui){

}});
}

// on parameter snapped: if element it was snapped to = below...
// if(thishtmlelement.attr('class').indexOf("mediaObject")>-1){
// 	then we want to apply a filter to the mediaobject
// }
//
// database search:
// get all youtube videso where for each filter, grab the name of the filter to put into query string, then execute
// for all results, store ID with mediaobject property "component_ids" name and show on teh screen.


//when an object is dragged down to the object div or the programming div, create media object and assign the search results. then update final results

function createFilterBlocks(category,i,classname,tableId){
	var e = category[i];
	var controlName;
	var controlChildren;
	var children =false;
	if(e.hasOwnProperty("name")){
		controlName = e.name.toUpperCase();
		children = true;
		controlChildren = e.children;
	}else{
		controlName = e.toUpperCase();
	}

	// console.log(controlChildren);
	var thisTableCell = document.createElement("li");
	thisTableCell.setAttribute("class",classname);
	thisTableCell.setAttribute("id",""+classname+"-"+i);
	thisTableCell.innerHTML = controlName;
	
	if(children==false){
		thisTableCell.setAttribute("class",classname);
	}else{
		thisTableCell.setAttribute("class",classname+" hasChildren");
		thisTableCell.dataset.childrenIndex = i;
	}
	$("#"+tableId).append($(thisTableCell));
}

function clickBlockHandler(block, titles,tableId,classname,prependDivId,hideTableId){
	if($("#secondaryList").length>0){
		$("#secondaryList").remove();
	}
	if($(block).attr('class').indexOf("hasChildren")>-1){
		$(block).css('background-color', 'rgb(50, 110, 250)');
		var index = document.getElementById($(block).attr('id')).dataset.childrenIndex;
		var newFilterTitles = titles[index].children;
		//1. create table with the children & prepend to the filterTable
		var secondaryList = document.createElement('UL');
		secondaryList.setAttribute('id','secondaryList');
		secondaryList.setAttribute('class','blocklist');
		// secondaryList.setAttribute('id',tableId);
		var secondaryListItem = document.createElement("LI");
		secondaryListItem.setAttribute("class",classname+" originalCell");
		secondaryListItem.innerHTML = $(block).html();
		secondaryListItem.style.backgroundColor = "rgb(50,110,250)";
		secondaryList.appendChild(secondaryListItem);
		//for each title in secondary filters, add TD to the table row
		for(var findex in newFilterTitles){
			var thisTitle = newFilterTitles[findex].name;
			var elementTag = newFilterTitles[findex].element;
			var elementTag2 = newFilterTitles[findex].interaction_category;
			var secondaryListItem2 = document.createElement("LI");
			secondaryListItem2.setAttribute('class',classname+ " "+elementTag+"-"+elementTag2);
			secondaryListItem2.innerHTML = thisTitle;

			secondaryList.appendChild(secondaryListItem2);
		}
		//append table row to the new table, then prepend new table to the filterCell container
		// $(block).append($(secondaryList));
		//2. slide down filterTable while sliding down filter baby tables. 
		secondaryList.style.display ='none';
		$(secondaryList).prependTo($("#"+prependDivId));
		$(block).parent().hide();
		$(secondaryList).fadeIn(1000);
		// $("#"+tableId+" ."+classname).draggable({helper:'clone',appendTo:$("#dropMe")});
		$(secondaryList).children().draggable({helper:'clone'});
	}
}


//EVENT LISTENERS



$(".hasChildren").on('click', function(e){
	if($(this).attr("class").indexOf("parameterBlock")>-1){
		clickBlockHandler(this, parameters,"parameter-block-list","parameterBlock","parameter-block","parameter-block-list");
	}
});

$("#mainNav li").on('click', function(e){
	var targetID = $(e.target).attr('id');
	var opacity = $("#"+targetID).css('opacity');
	switch($(e.target).attr('id')){
	case "fetchObjects":
		toggleVisibility("object-block",targetID);
		break;
	case "fetchParameters":
		toggleVisibility("parameter-block",targetID);
		break;
	case "fetchConditionals":
		toggleVisibility("conditional-loop-block",targetID);
		break;
	case "fetchEvents":
		toggleVisibility("event-block",targetID);
		break;
	case "fetchOperators":
		toggleVisibility("operator-block",targetID);
		break;
	case "hide":
		$("#mutationArea").hide();
		$("#mutationArea").children().hide();
		$("#mainNav li").css('opacity',1.0);
		break;
	}

});

function toggleVisibility(elemId,clickedElemId){
	if($("#"+clickedElemId).css('opacity')<1.0){
		console.log('opacity is less than 1');
		$("#mutationArea").show();
		$("#mutationArea").children().hide();
		$("#"+elemId).show();
		$("#"+elemId).children().show();	
		$("#"+clickedElemId).css("opacity",1);
		$("#"+clickedElemId).siblings().animate({opacity:.3},500);
	}else{
		if($("#mutationArea").css('display')!=="none"){
			console.log("mutationarea dispaly is not none");
			// $("#mutationArea").show();
			// $("#"+elemId).show();
			// $("#"+elemId).children().show();
			$("#mutationArea").hide();
			$(".mutationList").children().hide();
			console.log("supposedly mtuation area...");
			$("#"+clickedElemId).siblings().animate({opacity:1.0},500);
			// $("#"+clickedElemId).siblings().animate({opacity:.3},500);
		}else{
			console.log('mtuationarea display is none');
			$("#mutationArea").show();
			$("#"+elemId).show();
			$("#"+elemId).children().show();	
			$("#"+clickedElemId).css('opacity',1);
			$("#"+clickedElemId).siblings().animate({opacity:.3},500);
		}

		// $("#"+clickedElemId).siblings().animate({opacity:.3},500);
	}	
}


//DROPPABLES AND DRAGGABLES
$("#object-temp-list").sortable();
$("#object-temp-list").droppable({drop:function(e,ui){
	console.log('dropped in object-temp-list')
	var itemDropped = ui.helper;
	console.log($(itemDropped));
	//ONLY ACCEPT .objectBlock and .parameterBlock divs 
	if($(itemDropped).attr('class').indexOf("dropped")>-1){
		$(ui.helper).disable();
	}else{
		if($(itemDropped).attr('class').indexOf("objectBlock")>-1 || $(itemDropped).attr('class').indexOf("parameterBlock")>-1){
			//create the list item to append toe ht object-temp-list, then make it draggable but only droppable with in the list itself. do not clone.
			console.log($(itemDropped).attr('class').indexOf("objectBlock")); 
			var newLI = createNewLI(itemDropped);
			$(ui.helper).remove();
			// $(newLI).draggable({snap: '#object-temp-list', snapMode:'inner'});
		}		  
	}
	// $("#object-temp-list").append(ui.helper);
}});
function createNewLI(itemDropped){
	var newLI = document.createElement("LI");
	if($(itemDropped).attr('class').indexOf('objectBlock')>-1){ newLI.setAttribute('class','objectBlock');}
	else{ newLI.setAttribute('class','parameterBlock');}
	newLI.setAttribute("class", "dropped");
	$(newLI).css('height',50);
	$(newLI).html($(itemDropped).html());
	$(newLI).css('background-color',$(itemDropped).css('background-color'));
	$("#object-temp-list").append($(newLI));
	return newLI;
}
$("#grab-title-bar").draggable({start:function(e,ui){
	$(ui.helper).css('width','50%');
},drag:function(e,ui){
	
}});
$("#programming-script-container").on('click',function(e){
	//check if target is equal to programmign script container.
	if($(e.target).attr('id').indexOf("programming-script-container")>-1){
		//if yes, we want to create a new li for add future dropped items 
		var listItemForDropping = document.createElement('LI');
		listItemForDropping.setAttribute("id","dropBlocksHere");
		$("#programming-final-list").append($listItemForDropping);
	}
})
$("#programming-script-container").droppable({drop:function(e,ui){
	//--------TESTING NEW SYSTEM OF ADDING LINES
	
	
	//--------OLD: 
	if($(e.target).attr('id').indexOf("programming-final-list-default")>-1){
		$(e.target).attr('class','programming-final-list-LI');
		$(e.target).attr('id','');
		var newdefaultlist = document.createElement('LI');
		newdefaultlist.setAttribute("id",'programming-final-list-default');
		$("#programming-final-list").append($(newdefaultlist));
		$(newdefaultlist).droppable();
	}else{
		
	}
	if($(ui.helper).attr('class').indexOf('grabbing-container')>-1){
		addObjectToProgramming(e,ui);
	}//end if this is a grabbing container being dropped
	else{
		if($(ui.helper).attr('class').indexOf('programming-final-list-LI')>-1){
			//just moving shit around
		}else{
			//this is a conditional, etc. 
			addNonObjectToProgramming(e,ui);
		}
	}
}})//end droppable programming script container
$("#programming-title-bar").on('click', function(){
	var keywords = "Robin Williams";
	var div = document.createElement('DIV');
	div.setAttribute('id','resultsContainer');
	
	$(div).prependTo($("#object-curation-container"));
	returnResults(keywords);
})
	$("#programming-final-list").sortable();

// function createGenericBlockForScript(block){
// 	var text = $(block).html();
// 	var newBlockList = document.createElement("UL");
// 	newBlockList.setAttribute('class',"nonobject-script-ul");
// 	$(newBlockList).css('height',$("#programming-final-list").css('height'));
// 	var blockList = document.createElement("LI");
// 	blockList.setAttribute("class","nonobject-script-li");
// 	$(blockList).css('height',$("#programming-final-list").css('height'));
// 	$(blockList).html(text);
// 	$(blockList).css('background-color',$(block).css('background-color'));
// 	$(newBlockList).css('background-color',$(block).css('background-color'));
// 	newBlockList.appendChild(blockList);
// 	return newBlockList;
// }
// 
function addNonObjectToProgramming(e,ui){
	var li = document.createElement('LI');
	li.setAttribute('class','programming-final-list-LI nonobject-script-li');
	if($(ui.helper).html()=="HAS A COUNT OF"){
		console.log("THIS IS COUNT!");
		var input = document.createElement("input");
		$(input).attr('name','countInput');
		$(input).attr('class','countInput');
		$(input).attr('type','text');
		$(input).attr('value','type here');

	}
	$(li).html($(ui.helper).html());
	$(li).append($(input));
	$(li).css('background-color',$(ui.helper).css('background-color'));
	var programmingFinalListHeight = $("#programming-final-list").css('height');
	$(li).css('height',programmingFinalListHeight);
	$("#programming-final-list").append($(li));
}
function addObjectToProgramming(e,ui){
	//1. grab info from the object-temp-list and put into the programm script container in the new "ObjectForScript" ul
	var newlist = createObjectForScript();
	$(ui.helper).fadeOut(500,function(){
		$(ui.helper).remove();
	})
	var newlistHeight = parseInt($(newlist).css('height').replace('px',''));
	var li = document.createElement('LI');
	li.setAttribute('class','programming-final-list-LI');
	li.setAttribute('height',newlistHeight);
	li.appendChild(newlist);
	$("#programming-final-list").append($(li));
	var pflHeight = newlistHeight+(newlistHeight/10);
	$("#programming-final-list").css('height',pflHeight);
	// $("#programming-final-list").droppable();
	// $("#programming-final-list").sortable();
	//2. create a new grab title bar and slide in object-curation-container
	replaceGrabBar();
	emptyObjectCurationList();
	
	if($(ui.helper).attr('class').indexOf("object-temp-list-ul")>-1){
		//perform backend search & return results into object-curation-container
		console.log($(ui.helper));
		// returnResults(ui.helper);
		// reformObjectCurationContainer();
		// var objectBlock = document.createElement("LI");
		// objectBlock.setAttribute('class','programObject');
	
	}
}
function createObjectForScript(){
	var tempList = $("#object-temp-list");
	
	var newList = document.createElement('UL');
	$(newList).attr('class','object-script-ul');
	$(newList).css('height',parseInt(tempList.children('li').length+1) * 20);
	// $(newList).css('width',"30%");
	$(newList).append("<li class='object-script-li objectScriptTitle'><input class='objectInput' value='NAME THIS OBJECT'></input></li>")

	for(var i =0; i<tempList.children().length; i++){
		//for each list item in object temp list, clone it into objectScriptUL
		var objname = $($("#object-temp-list").children()[i]).html();
		var listItem = document.createElement('LI');
		$(listItem).attr('class','object-script-li');
		$(listItem).css('height','20px');
		// $(listItem).css('width','30%');
		$(listItem).css('font-size','14px');
		$(listItem).css('display','inline');
		$(listItem).css('background-color',$($("#object-temp-list").children()[i]).css('background-color'));
		$(listItem).html(objname);
		$(newList).append($(listItem));
	}
	$(".objectScriptTitle").css('width','30%');
	return newList;
}


function returnResults(keywords){
		var key ="AIzaSyC1uRCbBAgaEDmRUL5_B6xW1X-GkIDv8tc";
	$.ajax({
		url:"https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCaption=closedCaption&maxResults=20&q="+keywords+"&key="+key,
		type:"GET",
		dataType:'json',
		success:function(data){
			console.log("request succeeded");
			var results = data.items;
			for(var i = 0; i<20; i++){
				var thisVideo = results[i];
				var videoId = thisVideo.id.videoId;
				var image = thisVideo.snippet.thumbnails.default.url;
				var title = thisVideo.snippet.title;
				var url = "www.youtube.com/watch?v="+videoId;

				var videoElement = document.createElement('div');
				videoElement.setAttribute('class','videoDiv');
				var thumbnail = document.createElement('img');
				thumbnail.setAttribute('src',image);
				thumbnail.setAttribute('class','videoThumbnail');
				var textDiv = document.createElement('div');
				textDiv.setAttribute('class','videoTitleDiv');
				var text = document.createElement('p');
				$(text).html(title);
				var link =document.createElement('a');
				link.setAttribute('class','videoLink');
				link.setAttribute('src',url);

				textDiv.appendChild(text);
				link.appendChild(thumbnail);
				videoElement.appendChild(link);
				videoElement.appendChild(textDiv);

				$("#resultsContainer").append($(videoElement));
			}
		}
	});//end ajax call
}
function replaceGrabBar(){
	// <div id='grab-title-bar' class='grabbing-container'>OBJECTS:</div>
	var obj = document.createElement('DIV');
	$(obj).attr('id', 'grab-title-bar');
	$(obj).attr('class','grabbing-container');
	$(obj).html("OBJECTS:");
	$(obj).prependTo(	$("#object-curation-container"));
	$(obj).draggable();
}
function emptyObjectCurationList(){
	$("#object-temp-list").children().fadeOut(300, function(){$("#object-temp-list").children().remove();});
}
})//end documen.tready