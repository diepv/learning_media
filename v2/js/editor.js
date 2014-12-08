$(document).ready(function(){
	var slideUpSpeed = 400;
	var slideDownSpeed = 300;
	$("ul#script-list").sortable();
	function setUpEditor(){
		var editor = $("#editor");
		var editorFilterListContainer = document.createElement('div');
		editorFilterListContainer.setAttribute('class','editor-options-list-div');
		var editorFilterList = document.createElement("select");
		editorFilterList.setAttribute('class','editor-options-list');
		editorFilterList.setAttribute('name','editor-options-list');
		editorFilterList.style.position = 'absolute;'
		editorFilterListContainer.appendChild(editorFilterList);
		var topOpt = document.createElement('option');
		topOpt.setAttribute('name','top-option');
		topOpt.setAttribute('id','top-option');
		topOpt.innerHTML = "select code block:";
		editorFilterList.appendChild(topOpt);
		createEditorFilters();
		function createEditorFilters(){
			// filters = JSON.parse(filters,true);
			filters.forEach(function(bigFilter){
				var bigComp = bigFilter.components;
				bigComp.forEach(function(filter){
					var newOpt = document.createElement("option");
					newOpt.setAttribute('class','editor-options-list-item');
					newOpt.innerHTML = filter.title;
					//access 'components' to create data htmlstring
					$(newOpt).css("background-color", bigFilter.color);

					var htmlObject = [];
					function compDepo(arrItem){
						if(arrItem){
							if(typeof arrItem !== "string"){
								if(arrItem.hasOwnProperty("userInput")){
									var elem = document.createElement('input');
									elem.setAttribute('class','user-input');
									elem.setAttribute('type','text');
									var constrings = arrItem.userInput[0].constraints;
									elem.dataset.constraints = constrings;
									var helptext = arrItem.userInput[1].helpText;
									elem.dataset.helptext = helptext;
									htmlObject.push(elem.outerHTML);
								}else{

									arrItem.forEach(function(item,ind){
										if(typeof item == "string"  || typeof item == String){
											var elem = document.createElement("p");
											elem.setAttribute('class','code-block-label');
											if(item.replace(/\s+/g,"")=="{}"){
												$(elem).addClass("brackets-label");
												item = "{&nbsp &nbsp &nbsp &nbsp}";
										}
										elem.innerHTML = item;
										htmlObject.push(elem.outerHTML);
										}else{
											return compDepo(item);
										}
								}); //end arrItem foreach
							}
							}
							else{
								console.log(arrItem);
								var elem = document.createElement("p");
								elem.innerHTML = arrItem;
								elem.setAttribute('class','code-block-label');
								if(item.replace(/\s+/g,"")=="{}"){
									$(elem).addClass("brackets-label");
								}
								htmlObject.push(elem.outerHTML);
							}
						}else{
							return true;
						}
					}
					compDepo(filter.components);
					newOpt.dataset.htmlString = htmlObject.toString();
					newOpt.dataset.compType = bigFilter.title;
					editorFilterList.appendChild(newOpt);
				})
			
			})
		}
	
		$("#editor").append($(editorFilterListContainer));
		$(editorFilterListContainer).hide();
}
		setUpEditor();
		//droppable INPUT FIELDS

//script-list click event handles pretty much all within the script list using click handlers depending on what was clicked .
	$("#script-list").on('click', function(e){
		$(".user-input").tooltip({'content':"hellO"});      
		var targetClass = $(e.target).attr('class');
		var targetId = $(e.target).attr('id');
		$(".user-input").on('keypress',function(e){
			if($(".editor-options-list-div").css('display')=="none"){
				
			}else{
				closeDropDown();	
			}
		});
		$(".user-input").on('keyup', function(e){
			e.target.dataset.inputValue=  $(e.target).val();
		});
		// $(".user-input").on('')
		if($(e.target).attr('class')=="editor-options-list-div" ||
				$(e.target).attr('class')=="editor-options-list" || 
		$(e.target).attr('class')=="editor-options-list-item"){
		}else{
			if(targetClass){
				if(targetClass.indexOf('user-input')>-1){
					//show the helpText
					$(e.target).tooltip({'content':$(e.target).data("helptext")});//********************
					// console.log("target class include 'user-input");
					// console.log($(e.target).data("helptext"));
					// $(e.target).tooltip('open');
					userInputClickHandler(e);
				}else{
					if(targetClass.indexOf('brackets-label')>-1){
						console.log('target class includes brackets-label');
						bracketClickHandler(e);
					}else{
						console.log('target class is enither user input nor brackets label');
						emptyScriptClickHandler(e);
					}
				}
			}else{
				emptyScriptClickHandler(e);
			}
		}

	});
	// function disableDraggable(elements){
	//   for (var i = 0; i < elements.length; i++) {
	//     console.log(elements[i])
	//     $("#" + elements[i]).addClass("disable-sort");
	//     $("#" + elements[i]).fadeTo("fast", 0.5);
	//   }
	// }
	//DROP DOWN MENU SELECTION LISTENER
	$(".editor-options-list").on('change', function(e){

		console.log("option selected: ");
		console.log(e);
		
		var selectedItem = $(this).find("option:selected");
		//same bit of code as in droppable, changing around the ui.helper stuff  
		var htmls = selectedItem.data('htmlString').replace(/(>,<)/g,"><");
		
		//if the drop down list has been opened due to input click, the position is absolute.
		if($(".editor-options-list-div").css('position')=='absolute'){
			var newLi = document.createElement('div');
			newLi.setAttribute('class','parameter-block');
		}else{
			var newLi = document.createElement('li');
			newLi.setAttribute('class','dropped');	
		}		
		
		var form = document.createElement('form');
		form.setAttribute('class','script-form');
		form.innerHTML = htmls;
//NEW CODE HERE
		// $(form).children('input').tooltip();
		$(form).droppable({'drop':function(ev,ui){
			var originalTargetClass = $(ev.target).attr('class');
			var additionalItemA = false;
			var additionalItemB = false;
			var targetedItem = ev.target[0]? ev.target[0]:ev.toElement;
			if($(targetedItem).attr('class').indexOf("user-input")>-1){
				additionalItemA = true;
			}
			if(originalTargetClass.indexOf('script-form')>-1){
				//we're in good shape. we can add! :D 
				additionalItemB = true;
			}
			if( additionalItemA || additionalItemB){
				//store any filled input fields of target
				var li = document.createElement('li');
				li.setAttribute('class','input-dropped');
				// var liText = [];
				// $(ui.draggable).find('input').each(function(ind, inputField){
				// 	console.log($(inputField).data('inputValue'));
				// 	liText.push($(inputField).data('inputValue'));
				// });
				li.innerHTML = $($(ui.draggable)[0])[0].innerHTML;
				$(ui.draggable).remove();
				$(li).find('input').each(function(ind,field){
					field.value = $(field).data('inputValue');
				})
				if(additionalItemA){
					$(targetedItem).after($(li));				
					$(targetedItem).remove();
				}else{
					console.log("original target class: ");
					console.log($(ev.target));
					$(ev.target).children('.input-dropped').after($(li));
				}
			}
		}});
		//END NEW CODE
		var newColor =$(selectedItem).attr('style').replace("rgb","rgba").replace(")",",0.5)").replace('background-color: ',"");
		
    //set the styling for element
		$(form).css('color',newColor);
		$(form).css('background-color','transparent');
		newLi.appendChild(form);
    // $(newLi).css('position', 'relative');
    $(newLi).css('color', 'white');
		
		//once again, if the drop down was triggered because of some input click event,
			//then, determine if click was on  brackets or on input field to append item to the correct place with the right 'trimmings' 
		//else, append the new list item to the script list
		
		if($(".editor-options-list-div").css('position')=='absolute'){
			if($("#input-target-bracketed").length>0){
				insertCodeIntoBracketArea($(newLi));
			}else{
				insertCodeIntoInputField($("#input-target"),$(newLi));
			}
		}else{
			    $("#script-list").append($(newLi));
		}
		
		closeDropDown();
		// $(".editor-options-list-div").css('position','relative');
		//disappear the editor-options-list-div

		$(".editor-options-list> option").prop('selected',false);
				$(".editor-options-list-div").css('position','relative');
	});
	function closeDropDown(){
		$(".editor-options-list-div").slideUp(slideUpSpeed, function(){
			$(".editor-options-list-div").css('display','none');
			$("body").append($(".editor-options-list-div"));
			$('.editor-options-list-div').css('left', "20px");
			$('.editor-options-list-div').css('top', "0px");
			$(".options-list-temp-container").remove();
		});
	}
	function insertCodeIntoInputField(appendtothis, newli){
		appendtothis.after(newli);
		appendtothis.remove();
		
	}
	function insertCodeIntoBracketArea(newli){
		$("#input-target-bracketed").after(newli);
		newli.after("<p class='code-block-label'>\n}</p>\n");
		newli.before("\n<p class='code-block-label'>{\n</p>");
		$("#input-target-bracketed").remove();
	}
	
	function mediaOjectSelected(params){
		var keywordList = params.keywords;//keywordList is an array
		var minuteLength = params.minutes;
		var releaseDate = params.releaseDate; //  formate: ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ)
		var parameterString = "q="+keywordList.join(',')+"&publishedAt="+releaseDate;
	}
	
	function emptyScriptClickHandler(e){
		// $(".editor-options-list-div").css('position','relative');
		if($(".editor-options-list-div").css('display')=='none'){
				var newLi = document.createElement('li');
				newLi.setAttribute('class','options-list-temp-container');
				$(newLi).append($(".editor-options-list-div"));
				$("#script-list").append($(newLi));
				$(".options-list-temp-container").each(function(container){
					if($(container).children().length==0){
						$(container).remove();
					}
				});
				setBodyHeight();
				setDropDownSize();
		 
			$(".editor-options-list-div").slideDown(slideDownSpeed, function(){
				$(".editor-options-list-div").css('display','inline');
			});
		}else{
			setBodyHeight();
			closeDropDown();
			// $(".editor-options-list-div").slideUp(slideUpSpeed, function(){
			// 	$(".editor-options-list-dv").css('display','none');
			// });
		}
	}
	function setBodyHeight(){
	  var body = $('body');
	    body.css('height', 'auto');
	    body.css('height', body.height());
	}
	function setDropDownSize(){
		//** SIZE SHOULD BE BASED ON WHAT CONSTRAINTS EXIST FOR WHICH VARIABLES ARE GOOD FOR USE
		var editorOptionsLength = $(".editor-options-list> option").length;
		editorOptionsLength =10;
		$(".editor-options-list").attr('size',editorOptionsLength);
	}
	function userInputClickHandler(e){
		console.log("USER INPUT CLICKED");
		if($("#input-target").length>0){
			$("#input-target").attr('id','');
		}
		// $(e.target).append($(".editor-filter-list"));
		// $(e.target).parent().append($(".editor-options-list-div"));
		$("#editor").append($(".editor-options-list-div"));
		$(".editor-options-list-div").css('position','absolute');
		var pos = $("#editor").position();
		var sidebarWidth = $('#side-bar-options').css('width').replace('px','');
		var relx = e.clientX-pos.left;//-parseInt(sidebarWidth);
		var rely = e.clientY-pos.top;
		$('.editor-options-list-div').css('left', relx);
		$('.editor-options-list-div').css('top', rely);
		console.log("GONE THIS FAR--196");
		$(".editor-options-list-div").slideDown(slideDownSpeed, function(){
			$(".editor-options-list-div").css('display','inline');
		});
		$(e.target).attr('id','input-target');
		console.log("clicked:");
	}
	function bracketClickHandler(e){
		console.log("BRACKEt CLICKED");
		// $(e.target).append($(".editor-filter-list"));
		$("#editor").append($(".editor-options-list-div"));
		$(".editor-options-list-div").css('position','absolute');
		var pos = $("#editor").position();
		var sidebarWidth = $('#side-bar-options').css('width').replace('px','');
		var relx = e.clientX-parseInt(sidebarWidth);
		var rely = e.clientY-pos.top;
		$('.editor-options-list-div').css('left', relx);
		$('.editor-options-list-div').css('top', rely);
		$(".editor-options-list-div").slideDown(slideDownSpeed, function(){
			$(".editor-options-list-div").css('display','inline');
		});
		$(e.target).attr('id','input-target-bracketed');
	}


});//end document.ready

function showPossibilities(params){
	//for each parameter specification in params array, create an <option>
}

function getVideos(params,callback){
	var parameters = params.toLowerCase();
	var key ="AIzaSyC1uRCbBAgaEDmRUL5_B6xW1X-GkIDv8tc";
$.ajax({
	url:"https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCaption=closedCaption&maxResults=10&"+parameters+"&key="+key,
	type:"GET",
	dataType:'json',
	success:function(data){
		console.log("request succeeded");
		var results = data.items;
		callback(results);
	}
	});
}
