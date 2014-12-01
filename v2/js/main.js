$(document).ready(function(){
	$("#calendar").hide();
	function setUpFilters(){
		filters.forEach(function(filterItem,filterIndex){
			//for each filter item, create a category block
			//for each filter item's child, create a code block
		
			var catBlock = document.createElement("li");
			catBlock.setAttribute("class","category-list-item");
			catBlock.setAttribute('id','category-list-item-'+filterIndex);
			var span = document.createElement('span');
			span.setAttribute("class",'category-list-item-span');
			var spanP = document.createElement('p');
			var titleUnedited = filterItem.title;
			var titleEdited = titleUnedited.replace(/\_/g," ");
			spanP.innerHTML = titleEdited;
			span.appendChild(spanP);
			catBlock.appendChild(span);
			catBlock.style.backgroundColor = filterItem.color;
			var innerBlock = document.createElement('ul');
			innerBlock.setAttribute('class','code-list-container');
		
			filterItem.components.forEach(function(catItem){
				var codeBlock = document.createElement('li');
				codeBlock.setAttribute('class','code-list-item');
				var codeBlockSpan = document.createElement('span');
				codeBlockSpan.innerHTML = catItem.title;
				codeBlock.appendChild(codeBlockSpan);
				var htmlObject=[];
				function final(){
					// codeBlock.data("components",htmlObject);
				}
				function compDepo(arrItem){
					if(arrItem){
						if(typeof arrItem !== "string"){
								arrItem.forEach(function(item,ind){
								if(typeof item == "string"){
									if(item == "userInput"){
										var elem = document.createElement('input');
										elem.setAttribute('class','user-input');
										var constrings = arrItem[ind+1];
										arrItem.splice(ind+1,1);
										elem.dataset.constraints = constrings;
										htmlObject.push(elem.outerHTML);
									}else{
										var elem = document.createElement("p");
										elem.innerHTML = item;
										elem.setAttribute('class','code-block-label');
										if(item=="{}"){
											$(elem).addClass("brackets-label");
										}
										htmlObject.push(elem.outerHTML);
									}
								}else{

									return compDepo(item);
								}
							}); //end arrItem foreach
						}else{
							var elem = document.createElement("p");
							elem.innerHTML = arrItem;
							elem.setAttribute('class','code-block-label');
							if(item=="{}"){
								$(elem).addClass("brackets-label");
							}
							htmlObject.push(elem.outerHTML);
						}
				}else{
					return final();
				}
				}
			
				compDepo(catItem.components)
				codeBlock.dataset.htmlString = htmlObject.toString();
				innerBlock.appendChild(codeBlock);
				//for each html item in the htmlObject array, create it ON DROP. 
			})
			catBlock.appendChild(innerBlock);
			$("#options-list").append($(catBlock));
		})	
		
	}
	setUpFilters();
	$("li.code-list-item").draggable({helper:'clone',zIndex:100,appendTo:"#editor"}); 
	$("li.code-list-item").on('drag', function(){
		console.log("DRAG");
	})
	$("#editor").droppable({drop:function(event,ui){
		console.log(ui.draggable);
	    $(this).append(ui.draggable);
			//change appended item to have the right HTML 
			var htmls = ui.draggable.data("html-string");
			ui.draggable.html(htmls);
      ui.draggable.css('min-width', '150px');
      ui.draggable.css('width', '150px');
      ui.draggable.css('color', 'white');
      ui.draggable.css('position', 'absolute');
			ui.draggable.addClass('dropped');
      ui.draggable.draggable('destroy').draggable(); /* need to reset the draggability */
		console.log('dropped in editor');
	}});
	
	// $("body").on("drop",function(e,ui){
	// 	//on drop, change block to show 'components' instead of 'title'
	// 	console.log('data of item dropped:');
	// 	// console.log(e.data("components"));
	// 	console.log(e);
	// 	console.log(ui);
	// 	console.log($(ui.helper));
	// 	console.log($(ui.helper).data());
	// })

	$( "#run-drop-down-menu" ).on('change', function(){
		var selectedId = $(this).find("option:selected").attr('id');
		if(selectedId == "run-at-date-input"){
			$("#calendar").css("display",'inline');
			$("#calendar").datepicker();
		}
	});
	$("#top-bar").on('click', function(){
		console.log('body clicked');
		if($("#calendar").css('display')!=='none'){
			console.log('calendar dispaly is not none');
			$("#calendar").hide();
		}
	})
	$("#calendar").on('change', function(){
		var currentDate = $( "#calendar" ).datepicker( "getDate" );
		console.log(currentDate);
		if(currentDate!==null){
			var shortDate = currentDate.toString().substring(0,15);
			$("#run-at-date-input").html("BEGINNING ON: "+shortDate);
			$("#calendar").hide();
		}
	})
	$(".category-list-item").on('click', function(event){
		console.log('clicked box');
		var e = event;
		
		if($(event.target).attr('class')!=="category-list-item"){
			e = $(event.target).parents(".category-list-item");
			console.log(e);
		}
		var span = $(e).children("span");
		span.children('p').hide();
		span.slideUp(500, function(){
			e.hide();
			e.css('height',screen.height);
			
			setTimeout(function(){
				//show the clicked category's innards in place
				var childList =$(e).children(".code-list-container");
				var categoryColor =$(e).css('background-color');
				var childListItems = childList.children('li');
				e.show();
				childList.css("background-color",categoryColor);
				childListItems.css('background-color',categoryColor);
				
				childList.slideDown(500,function(){
					childList.css('display','table');
					childListItems.css('outline','thin solid white');
					childListItems.css('visibility','visible');
					
				});
			},500);
			console.log("SLIDE UP");
			//move e till it reaches the top of the page
			console.log($(e).prev().offset().top);
			console.log($(e).prev().css('height').replace("px",""));
			var offsetOfPrevNode = $(e).prev().offset().top + $(e).prev().css('height').replace('px','');
			console.log(offsetOfPrevNode);
	    $('div#side-bar-options').scrollTop(offsetOfPrevNode);
		});
		
	
	
	})

});


// function sideBarOption(){
// 	title:"",
// 	colorRGB:"",
// 	components:"",
// 	typeOfBlock:"",
// 	id:"",
// 	createBlock: function(){
// 		var newBlock = document.createElement("li");
// 		if(this.parent!==""){
//
// 		}else{
// 			newBlock.setAttribute("class","side-bar-li");
// 			newBlock.setAttribute("id",this.parent);
// 			newBlock.style.backgroundColor = this.colorRGB;
// 			$(this.parent).append(newBlock);
// 		}
// 	}
// }

function initalize(){
	// var test = $.sideBarOption({'title':});//********
}

function updateComponents(item){
	
}
//WHEN A SIDEBAROPTION GETS ADDED TO THE PROGRAMMING AREA, WE WANT TO ADD IT TO THE RIGHT ENCAPSULATING CODE BLOCK OR ADD IT TO THE LIST OF STANDING CODE BLOCKS STORES

function saveCode(){
	var oldCode = sessionStorage.getItem('scriptJSON');
	sessionStorage.setItem('oldCode',oldCode);
	var newCode = getNewJSON();
}

function getNewJSON(){
	//search through HTML to construct new code
	var allDivs = $("#main-programming-area").find('div.block');
	allDivs.forEach(function(){
		//for each div of class 'block', grab the relevant information
		
	})
}

function dropInterpreter(array, parentElem){
	var htmlArray = array.split(',');
	//using htmlarray, append to the parentElem
		htmlArray.forEach(function(element){
			parentElem.append(element);
		})
}



