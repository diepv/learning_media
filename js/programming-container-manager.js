$(document).ready(function(){
createBlocks();
$("#mutationArea").hide();
$(".mutationList").css('display','none');
var db = "http://vivian.media.mit.edu:4000/";
// var db = "http://localhost:4000/";
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
	$("#properties-block ul").attr("id","properties-block-list"); 
	$("#properties-block ul").attr("class","blocklist"); 
	
	for(var i = 0; i<objects.length; i++){
		createFilterBlocks(objects,i,"objectBlock","object-block-list");
		console.log('fetchObjects width adjustment:')
		console.log(parseInt($("#grab-title-bar").css('width')));
		$("#fetchObjects").css('width',screen.width*.145);
	}
	
	for(var i = 0; i<parameters.length; i++){
		createFilterBlocks(parameters,i,"parameterBlock","parameter-block-list");
		$("#fetchParameters").css('width',screen.width*.145);
		
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
	
	for(var i = 0; i<propertiesOfObjects.length; i++){
		createFilterBlocks(propertiesOfObjects,i,"propertiesBlock","properties-block-list");
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
	if(e.hasOwnProperty("children")){
		if(e.children!=="none"){

			controlName = e.name.toUpperCase();
			children = true;
			controlChildren = e.children;
			
		}else{
			controlName = e.name.toUpperCase();
		}	
	}else{
		controlName = e.toUpperCase();
	}
		//JUST FOR SELENA, ROBIN WILLIAMS, BLAKE LIVELY

	// console.log(controlChildren);
	var thisTableCell = document.createElement("li");
	thisTableCell.setAttribute("class",classname);
	thisTableCell.setAttribute("id",""+classname+"-"+i);
	thisTableCell.innerHTML = controlName;
	if(controlName == 'BLAKE LIVELY' || controlName=="ROBIN WILLIAMS" || controlName=="SELENA GOMEZ"){
		$(thisTableCell).html("<span class='trending'>TRENDING:</span><span class='trendingName'> "+controlName+"</span>");
	}
	
	if(children==false){
		thisTableCell.setAttribute("class",classname);
	}else{
		thisTableCell.setAttribute("class",classname+" hasChildren");
		thisTableCell.dataset.childrenIndex = i;
	}
	$("#"+tableId).append($(thisTableCell));
	


}

function clickBlockHandler(block, titles,tableId,classname,prependDivId,hideTableId){
	var oldColor;
	if($("#secondaryList").length>0){
		console.log("found secondarylist:");
		console.log($('#secondaryList').length);
		$("#secondaryList").remove();
	}
	if($(block).attr('class').indexOf("hasChildren")>-1){
		oldColor = $(block).css('background-color');
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
	$(".originalCell").on('click', function(e){
		$('#secondaryList').remove();
		$(block).parent().fadeIn(1000);
		$(block).css("background-color",oldColor);
		// $(".originalCell").removeClass("originalCell");
	})
}


//EVENT LISTENERS



$(".hasChildren").on('click', function(e){
	if($(this).attr("class").indexOf("parameterBlock")>-1){
		clickBlockHandler(this, parameters,"parameter-block-list","parameterBlock","parameter-block","parameter-block-list");
	}
});

$("#trash").droppable({drop:function(e,ui){
			$(ui.helper).remove();
	$(ui.helper).fadeOut(300,function(){

	})
}})
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
	case "fetchProperties":
		toggleVisibility("properties-block",targetID);
		break;
		break;
	}

});

function toggleVisibility(elemId,clickedElemId){
	if($("#"+clickedElemId).css('opacity')<1.0){
		console.log('opacity is less than 1');
					$("#secondaryList").remove();//MUST REMOVE IF WE"RE HIDING EVERYHINg"
		$("#mutationArea").hide();
		$("#mutationArea").children().hide();
		$("#mutationArea").show()
		$("#"+elemId).show();
		$("#"+elemId).children().show();	
		$("#"+clickedElemId).css("opacity",1);
		$("#"+clickedElemId).siblings().animate({opacity:.3},500);
	}else{
		if($("#mutationArea").css('display')!=="none"){
			console.log("mutationarea dispaly is visible");
			// $("#mutationArea").show();
			// $("#"+elemId).show();
			// $("#"+elemId).children().show();
			$("#secondaryList").remove();//MUST REMOVE IF WE"RE HIDING EVERYHINg"
			$("#mutationArea").hide();
			$(".mutationList").children().hide();
			$("#"+elemId).hide();
			$("#"+elemId).children().hide();	
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
	console.log('dropped in object-temp-list');
	var itemDropped = ui.helper;
	console.log($(itemDropped));
	//ONLY ACCEPT .objectBlock and .parameterBlock divs 
	if($(itemDropped).attr('class').indexOf("dropped")>-1){

	}else{
		if($(itemDropped).attr('class').indexOf("objectBlock")>-1 || $(itemDropped).attr('class').indexOf("parameterBlock")>-1){
			//create the list item to append toe ht object-temp-list, then make it draggable but only droppable with in the list itself. do not clone.
			$(".fa").show();
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
	console.log("the programming script container has been clicked, dear one.");
	console.log(e.target);
	//check if target is equal to programmign script container.
	if($(e.target).attr('id')!==undefined || $(e.target).attr('id')==true){
		if($(e.target).attr('id').indexOf("programming-script-container")>-1){
			console.log("you have been clicking the programming script container for sure, little one.");
			//if yes, we want to create a new li for add future dropped items
			$("#dropBlocksHere").css('border','none');
			$("#dropBlocksHere").removeAttr("id");
			var divForDropping = document.createElement('DIV');
			divForDropping.setAttribute("id","dropBlocksHere");
			divForDropping.setAttribute("class","programming-final-list-li");
			$(divForDropping).css('border','2px gainsboro solid');
			$("#programming-final-list").append($(divForDropping));
			$(divForDropping).sortable({cursorAt:{left:10, top:30}});
		}else{
			if($(e.target).attr('id').indexOf('dropBlocksHere')>-1){
				console.log("hun, you're clicking the same container. try another one...");
						$(e.target).css('border','2px gainsboro solid');
			}else{

			}
		}
	}else{
		console.log($(e.target).attr('class'));
		if($(e.target).attr('class').indexOf('objectInput')<0 || $(e.target).attr('class').indexOf('objectScriptTitle')<0){	
			if($(e.target).attr('class').indexOf("programming-final-list-li")>-1){
				console.log('another div for you to play with, this current one is boring<3');
				$(e.target).css("border","2px gainsboro solid");
				$("#dropBlocksHere").css('border','none');
				$("#dropBlocksHere").removeAttr("id");
				$(e.target).attr('id','dropBlocksHere');	
			}
		}
	}
	
});

$("#programming-script-container").droppable({drop:function(e,ui){
	//--------TESTING NEW SYSTEM OF ADDING LINES
	$("#dropBlocksHere").css('border','2px gainsboro solid');
	console.log("HERE'S WHAT I DROPPED ON PROGRAMMING SCRIPT CONTAINER:");
	console.log(ui.helper);
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
		addObjectToProgramming(e,ui, "#dropBlocksHere");
	}//end if this is a grabbing container being dropped
	else{
		if($(ui.helper).attr('class').indexOf('ul-div-wrapper')>-1){
		// if($(ui.helper).attr('class').indexOf('nonobject-script-ul')>-1 || $(ui.helper).attr('class').indexOf('object-script-ul')>-1){
			//just moving shit around
		}else{
			//this is a conditional, etc. 
			addNonObjectToProgramming(e,ui,"#dropBlocksHere");
		}
	}
}})//end droppable programming script container

$("#programming-title-bar").on('click', function(){
	console.log("CLICKKKEDDD");
	if($("#resultsContainer").css('display')=='block'){
		console.log('results container is block visibility');
		$("#resultsContainer").hide();
	}else{
		var div = document.createElement('DIV');
		div.setAttribute('id','resultsContainer');
			$(div).prependTo($("#object-curation-container"));
		// $(div).show();
		$("#resultsContainer").empty();
		$("#resultsContainer").show();
		$("#resultsContainer").css('display','block');
		var keywords = "Robin Williams";
		var keyArr=[];
		$.each($(".object-script-li"),function(index,listItem){
			console.log("LIST ITEM: ");
			console.log(listItem);
			if($(listItem).attr('class').indexOf("objectScriptTitle")==-1){
				var listitemHTML = $(listItem).html();
				console.log("LIST ITEM BEING TESTED:"+listitemHTML);
				var intersects = intersectionWithParams($(listItem).html());
				var intersects1 = false;
				if($(listItem).html().indexOf("trendingName")>-1){
					var intersects1 = intersectionWithParams($(listItem).find(".trendingName").html());	
				}
				if(intersects || intersects1){
					if(intersects){
						keyArr.push($(listItem).html());	
					}else{
						keyArr.push($(listItem).find('.trendingName').html());
					}
					
				}	
			}
		})
		console.log("key array");
		console.log(keyArr);
		returnResults(keyArr);	
	}

});
function intersectionWithParams(matchName){
	console.log(matchName);
	var list = parameters;
	var returnMe = false;
	list.forEach(function(item,index){
		var tryMe =item.name+"";
		var trimmed = tryMe.replace(/ /g, '');
		var trimMatch =matchName.replace(/ /g, '');
		if(trimmed.toUpperCase()==trimMatch.toUpperCase()){
			returnMe= true;
		}else{
			if(item.children!=="none"){
				item.children.forEach(function(val,i){
					var valMe = val.name+"";
					var vtrimmed = valMe.replace(/ /g, '');
					var vtrimMatch =matchName.replace(/ /g, '');
					// console.log("vtrimmed, vtrimMatch");
					// console.log(vtrimmed.toUpperCase() +" ||| "+  vtrimMatch.toUpperCase());
					if(vtrimmed.toUpperCase() == vtrimMatch.toUpperCase()){
						returnMe = true;
					}
				})
			}
		}
	})
	return returnMe;
}
$(".programming-final-list-li").sortable();

function addNonObjectToProgramming(e,ui,addToMe){
	//TESTING
	var divvy = document.createElement('DIV');
	divvy.setAttribute('class',"ul-div-wrapper");
	//END TESTING
	var ul = document.createElement('UL');
	ul.setAttribute("class","nonobject-script-ul");
	var li = document.createElement('LI');
	li.setAttribute('class','nonobject-script-li');
	if($(ui.helper).html().indexOf("TOP TV RELEASED AFTER YEAR")>-1 || $(ui.helper).html().indexOf("LENGTH IN MINUTES:")>-1){
		console.log("THIS IS COUNT!");
		var input = document.createElement("input");
		$(input).attr('name','countInput');
		$(input).attr('class','countInput');
		$(input).attr('type','text');
		$(input).attr('value','type here');
	}
	$(li).html(" "+$(ui.helper).html()+" ");
	$(li).append($(input));
	$(li).css('background-color',$(ui.helper).css('background-color'));
	var programmingFinalListHeightItem = maxHeight("#dropBlocksHere");// $(addToMe).children().css('height');
	var programmingFinalListHeight = parseInt(programmingFinalListHeightItem.css('height').replace('px',''));
	// var programmingFinalListHeight = parseInt(programmingFinalListHeightItem.css('height').replace('px',''))+(2*$(".object-script-li").length);
	console.log("new height:"+programmingFinalListHeight);
	$(li).css('font-size',programmingFinalListHeight-25);
	if($(ui.helper).html().indexOf("TOP TV RELEASED AFTER YEAR")>-1 || $(ui.helper).html().indexOf("LENGTH IN MINUTES:")>-1){
			$(li).css('font-size',20);
	}
	$(ul).css("height",programmingFinalListHeight);
	$(divvy).css('height',programmingFinalListHeight);
	$(li).css('height',programmingFinalListHeight);
	$(ul).append($(li));
	// $(addToMe).append($(ul)); //TESTING- commented out
	//TESTING
	$(divvy).append($(ul));
	$(addToMe).append($(divvy));
	//END  TESTING
}
function addObjectToProgramming(e,ui, addToMe){
	//TESTING
	var divvy = document.createElement('DIV');
	divvy.setAttribute('class','ul-div-wrapper');
	//END TESTING
	//1. grab info from the object-temp-list and put into the programm script container in the new "ObjectForScript" ul
	var newlist = createObjectForScript();
	$(ui.helper).fadeOut(500,function(){
		$(ui.helper).remove();
	})
	var maxheight = maxHeight("#dropBlocksHere");
	var newlistHeight = parseInt($(newlist).css('height').replace('px',''));
	// var li = document.createElement('LI');
	// li.setAttribute('class','programming-final-list-LI');
	// li.setAttribute('height',newlistHeight);
	// li.appendChild(newlist);
	// $(addToMe).append($(li));
	//TESTING
	$(divvy).append(newlist);
	$(addToMe).append($(divvy));
	//END TESTING
	// $(addToMe).append(newlist); //TESTINg-commented out 
	var pflHeight = newlistHeight+(newlistHeight/10);
	$(addToMe).css('height',maxHeight);//pflHeight);
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
	var newListHeight = (parseInt(tempList.children('li').length+1) * 20)+(2*tempList.children('li').length);
	$(newList).css('height',newListHeight);
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
	// $(".objectScriptTitle").css('width','30%');
	return newList;
}

function getVideos(keyword,callback){
	var keyword = keyword.toLowerCase();
	var key ="AIzaSyC1uRCbBAgaEDmRUL5_B6xW1X-GkIDv8tc";
	var year = $(".countInput").val();
$.ajax({
	url:"https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCaption=closedCaption&maxResults=10&q="+keyword+"&key="+key,
	type:"GET",
	dataType:'json',
	success:function(data){
		console.log("request succeeded");
		var results = data.items;
		callback(results);
	}
	});
}

function playVideos(list){
	for(var i = 0; i<list.length; i++){
		var currentVideo = list[i];
		if(i==0){
			console.log("loadVideo: "+currentVideo);
			loadVideo(currentVideo);
		}else{
			mediaPlayer.addEventListener('ended', function(){
				//load new video. 
				loadVideo(currentVideo);
			})
		}
	}
}
function returnResults(keywords){
	
	keywords.forEach(function(word,index){
		getVideos(word, function(results){
			videoURLS = [];
			for(var i = 0; i<results.length; i++){
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
				videoURLS.push(url);
			}
			var playAll = document.createElement('button');
			playAll.setAttribute('class','play-all');
			$(playAll).html("Play All Videos");
			$(playAll).on('click', function(){
				playVideos(videoURLS);
			})
			$("#resultsContainer").append($(playAll));
		})
	})
	if($(".countInput").length>0){
		getVideosAfter($(".countInput").val());
	}
}
function replaceGrabBar(){
	// <div id='grab-title-bar' class='grabbing-container'>OBJECTS:</div>
	var obj = document.createElement('DIV');
	$(obj).attr('id', 'grab-title-bar');
	$(obj).attr('class','grabbing-container');
	$(obj).html("<i class='fa fa-arrows''></i> CONTENT <span class='ampersand'>&</span> PARAMETERS:");
	$('.fa').hide();
	$(obj).prependTo(	$("#object-curation-container"));
	$(obj).draggable();
}
function emptyObjectCurationList(){
	$("#object-temp-list").children().fadeOut(300, function(){$("#object-temp-list").children().remove();});
}
var maxHeight = function(elementSelector){
	var highest = null;
	var hi = 0;
	$(elementSelector).find("ul").each(function(){
	  var h = $(this).height();
	  if(h > hi){
	     hi = h;
	     highest = $(this);  
	  }    
	});
	return highest;
}

function getVideosAfter(year){
	$.ajax({
		url:db+"getTV/"+year,
		type: 'GET',
		success: function(message){
			var videoURLS = [];
			for(var i=0;i<message.length;i++){
				var item = message[i];
				var image = item.image_url;
				var title = item.title;
				var url = item.video_url;
				
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
				videoURLS.push(url);

				$("#resultsContainer").append($(videoElement));
			}
			// var playAll = document.createElement('button');
			// playAll.setAttribute('class','play-all');
			// $(playAll).html("Play All Videos");
			// $(playAll).on('click', function(){
			// 	playVideos(videoURLS);
			// })
			// $("#resultsContainer").append($(playAll));
		}
	})
}


})//end documen.tready 