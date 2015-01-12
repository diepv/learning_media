var dbhttp = "http://localhost:3300/";
function setUpPerson(){
    var username = localStorage.getItem("user_name");
    if(username==null){
        //there's no person.
        var newUserName = prompt("Please Sign In With User Name: ");
        localStorage.setItem("user_name", newUserName);
        addPersonToDB(newUserName);
    }

}

function testbed(){
    var date = new Date();
    var isodate  = new Date().toISOString();
    console.log("date: "+date);
    console.log("ISOdate: "+isodate);
}
function getMediaObjectsForUser(){
    var uid = localStorage.getItem("user_id");
    $.ajax({
        url:dbhttp+"getObjects/"+uid,
        type:"GET",
        success:function(err,msg){
            if(!err){
                console.log(JSON.stringify(msg));
                localStorage.setItem("media_objects_list",JSON.stringify(msg));
            }else{
                console.log('err:');
                console.log(msg);
            }
        }
    })
}
function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}/**
 * Created by viviandiep on 12/12/14.
 */

function addPersonToDB(username){
    $.ajax({
        url:dbhttp+"addNewuser/"+username,
        type:'POST',
        success:function(err,msg){
            if(err){
                console.log("ERROR WITH GETTING NEW USER: ");
                console.log(msg);
                prompt("Please Try Another Name");
            }else{
                console.log("welcome, "+username);
                console.log(msg);
                localStorage.setItem("user_id",msg);
            }
        }
    })
}

function addMediaObjects(mediaObj){
    var id=  localStorage.getItem("user_id");
    if(id){
        $.ajax({
            url:dbhttp+"addMediaObjects/"+id,
            type:'POST',
            success:function(err, errmsg){
                if(!err){
                    alert("saved!");
                }else{
                    alert("Failed to save!");
                }
            }
        })
    }
}

function populateMediaObjectsList(){
    var id = localStorage.getItem('user_id');
    $.ajax({
        url:dbhttp+"getObjects/"+id,
        type:"GET",
        success:function(err,msg){
            if(!err){
                //populate media list with msg's list of media objects
                createObjectReps(msg);

            }
        }
    })
}

function createObjectReps(array){

}

