/**
 * Created by viviandiep on 12/10/14.
 */

function createVideoObject(selectedOption){

    //'create video object' has been selected - return video object icon and the list of properties it has available for manipulation
    //when video object has been given a name, add it to the video object list available for use everywhere
    var imageDiv = document.createElement('div');
    imageDiv.setAttribute('class','video-object-div');

    var imageHolder = document.createElement("img");
    imageHolder.setAttribute("class","video-object-icon");
    imageHolder.setAttribute('src','http://localhost/learning_media/v2/data/image_holder.jpg');

    imageDiv.appendChild(imageHolder);
    return imageDiv;
}
$(document).ready(function(){
    createPropertyDropDown();
    testbed();
    $("#object-dropdown").on('change', function(e){
        //console.log("option selected: ");
        var selected = $(this).find($("option:selected"));
        //create the html element to append to the video object
        var form = document.createElement("form");
        form.setAttribute('class','object-property-form');
        form.innerHTML = selected.data('htmlstring');
        $(".active").append($(form));
        $("#object-dropdown-div").hide();
    });



})
function videoObjClickHandler(e){
    e.preventDefault();
    console.log("videoObject clicked!!");
    //append a drop down of the video properties available
    if($(e.target).parent().attr('class').indexOf('active')<0){
        var divParent = $(e.target).parent('div');
        divParent.append($("#object-dropdown-div"));
        //$("#object-dropdown").css('position','absolute');
        $(e.target).parent("div").addClass("active");
        $("#object-dropdown-div").show();
    }else{
        if($(e.target).parent().attr('class').indexOf('video-object-div')>-1){
            console.log($(e.target).parent().find('.sampleSet-placeholder').length);
            if($(e.target).parent().find('.sampleSet-placeholder').length>0){
                $(e.target).parent().find('.sampleSet-placeholder').remove();
            }else{
                if($(e.target).parent().attr('class').indexOf('active')>-1 && $(e.target).siblings(".sampleSet-placeholder").length==0){
                    evaluateObject($(e.target).parents("div.video-object-div"));
                }
            }

        }
    }

}

function createPropertyDropDown(){
    var elementDiv = document.createElement('div');
    elementDiv.setAttribute('id','object-dropdown-div');
    var selectMenu = document.createElement('select');
    selectMenu.setAttribute('id','object-dropdown');
    //add the properties
    mediaObjectProperties.components.forEach(function(item,index){
        var title = item.title;
        var data = item.components;

        var element = document.createElement("option");
        element.innerHTML = title;
        $(element).css('background-color',mediaObjectProperties.color);
        element.style.color = 'white';
        var htmlObject = [];
        element.setAttribute('class','media-object-property-option');
        data.forEach(function(component,index1){
            if(typeof component==String || typeof component == 'string'){
                    var elem = document.createElement("label");
                    elem.innerHTML = component;
                    elem.setAttribute('class','property-label');
                    if(component.replace(/\s+/g,"")=="{}"){
                        $(elem).addClass("property-brackets-label");
                    }
                    htmlObject.push(elem.outerHTML);
            }else{
             if(component.hasOwnProperty('userInput')){
                 var inputArr = component.userInput;
                 //following array is going to be the constraints + helptext/
                 var inputField = document.createElement('input');
                 inputField.setAttribute('class','property-input');
                 var constraints = inputArr[0].constraints;
                 var helpText = inputArr[0].helpText;
                 var titleText = title;
                 inputField.dataset.constraints = constraints;
                 inputField.dataset.helptext = helpText;
                 inputField.dataset.titletext = titleText;
                 htmlObject.push(inputField.outerHTML);
             }
            }
        })
        element.dataset.htmlstring = htmlObject.join(" ").toString();
        selectMenu.appendChild(element);
        elementDiv.appendChild(selectMenu);

    })
    $(elementDiv).hide();
    $('body').append($(elementDiv));
}
//function MediaObject(){
//    //get stored variables from database based on user_id
//    this.newVariable = function(variableObj){
//        //return current dataset sample & save rules to DB
//    }
//    this.getObjFromDB = function(objectId){
//
//    }
//    this.removeObjectFromDB = function(variableId){
//
//    }
//    this.title = '';
//    this.properties=[];
//}

function getVariablesForUser(uid){
    //reach into db and grab variables stored by this user (uid)
}


function evaluateObject(videoObjectDiv){

    //for each form#object-property-form, grab the input's titleText and the input's value, form into a json object and send to the backend!!
    var allForms = $(videoObjectDiv).find(".object-property-form");
    var propertyObjects = [];
    allForms.each(function(index,form){
        var inputs = $(form).find('input');
        inputs.each(function(i,input){
            //get data from each input
            var propertyTitle = $(input).data('titletext').replace(/(property:)\s+/g,"");
            var propertyValue = $(input).val();
            var propertyObj = {};
            propertyObj.titleText = propertyTitle;
            propertyObj.value = propertyValue;
            propertyObjects.push(propertyObj);
        });

    });
    //property objs
    var data = JSON.stringify(propertyObjects);
    console.log(data);
    dbCall("getSampleSet","POST",data, function(items,err){
        console.log("ITEMS: ");
        console.log(items);
        //iterate and create data show replacing video icon
        //    var itemObj = JSON.parse(items);
            console.log('items loop');
            items.forEach(function(video,index){
                console.log(video);
                var thumbnail = video.thumbnail;
                var url = video.url;
                var author = video.author;
                var title = video.title;
                //you don't get length and such for free :D
                var description = video.description;
                //NEED TO GET CUSTOM VIDEO PLAYER WORKING!
                var placeholder = document.createElement('div');
                placeholder.setAttribute('class','sampleSet-placeholder');
                var image = document.createElement('img');
                image.setAttribute('class','sampleSet-img');
                image.setAttribute('src',thumbnail);
                image.setAttribute('alt',description);
                image.dataset.videoUrl = url;
                image.dataset.description = description;
                var titleSpan = document.createElement('span');
                titleSpan.setAttribute('class','sampleSet-titleSpan');
                var titleLine = document.createElement('p');
                titleLine.setAttribute('class','sampleSet-title');
                titleLine.innerHTML = title;
                titleSpan.appendChild(titleLine);
                placeholder.appendChild(image);
                placeholder.appendChild(titleSpan);
                console.log(placeholder);
                $(placeholder).on('click', function(e){
                    $(e.target).remove();
                    var videoElem = document.createElement('iframe');
                    videoElem.setAttribute('height','315');
                    videoElem.setAttribute('width','560');
                    videoElem.setAttribute('src',video.url);
                    $(placeholder).append($(videoElem));
                    //<video width="320" height="240" controls>
                    //<source src="movie.mp4" type="video/mp4">
                })
                $(".active").append($(placeholder));
            })
    });
    //dbCall('addMediaObjects',"POST",data);
}

function dbCall(call,callType, objects,callback){
    var id = localStorage.getItem('user_id');
    $.ajax({
        url:dbhttp+call+"/"+id,
        type:callType,
        data:{"data":objects},
        dataType:'json',
        success:function(msg,err){
            console.log("DBCALL");
            console.log(err);
            if(err!=='success'){
                new Error(msg);
                callback(false);
            }else{
                console.log("DONE");
                console.log(msg);
                callback(msg);
            }
        }
    })
}