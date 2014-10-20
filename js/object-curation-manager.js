//DROPPABLES AND DRAGGABLES

$("#object-temp-list").droppable({drop:function(e){
	console.log('dropped');
}});
$("#object-curation-container").droppable({drop:function(e){
	console.log('dropped in object container');
}});
