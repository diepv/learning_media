$(document).ready(function(){
	
	var editor = $("#editor");
	var editorFilterList = document.createElement("select");
	function createEditorFilters(){
		filters.forEach(function(filter){
			var newOpt = document.createElement("option");
			newOpt.html(filter.title);
			
		})
	}

	editor.on('click', function(e){
		console.log("clicked:");
		var params = [];
		if($(e.target).data("constraints").length>0){
			console.log("$(e.target).data()");
			console.log($(e.target).data());
			params = $(e.target).data("constraints").split(',');
		}else{
			//all those in create object, create conditoinals, access video player events, create and access variables, actions on videp player
			filters.forEach(function(filter){
				switch(filter.title){
				case "create_conditionals":
					filter.components.forEach(function(){
						//create an option
					}
					break;
				case "create_object":
					break;
				case "access_video_player_events":
					break;
				case "create_and_access_variables":
					break;
				case "actions_on_video_player":
					break;
				}
			})
		}
		var newDropDown = document.createElement("select");
		// showPossibilities(paramArray);
	});


});//end document.ready

function showPossibilities(params){
	//for each parameter specification in params array, create an <option>
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