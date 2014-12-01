
/*DOCUMENTATION
var filters holds a json object that describes all the side bar options (programming blocks). 
These side bar options are categorized by:
1. create conditional
2. access video player events
3. access operators and variables 
4. actions on video player
5. access object properties
6. create object
7. access video player

"userInput" means there needs to be space that's clickable/writable by user. 
if "var", "operatorExpression", "videoPlayerButton" then userInput space is clickable with dropdown menu of options fitting "var" and "expression"
if "customVideoPlayerButton" then userInput space is cickable with dropdown menu of options only showing custoamizable buttons of the video player

videoObject = either individual video object or playlist 
*/
var filters = 
[	
	{"title":"create_conditionals",
	"color": "black",
	"components":[
		{
			"title":"if",
			"components":["if",["userInput",["var","operatorExpression"]],"{}"]
		},
		{
			"title":"else",
			"components":["else","{}"]
		}
	]},
	{"title":"access_video_player_events",
		"color": "red",
	"components":[
		{
			"title":"on play",
			"components":["when play button is pressed","{}"]
		},
		{
			"title":"on pause",
			"components":["when pause button is pressed","{}"]
		},
		{
			"title":"on (custom button)",
			"components":["when",["userInput",["customVideoPlayerButton"]]," button is pressed","{}"]
		},
		{
			"title":"on end of playlist",
			"components":["when playlist is finished","{}"]
		},
		{
			"title":"on start of playlist",
			"components":["when playlist is started","{}"]
		},
		{
			"title":"on start of video",
			"components":["when video is started","{}"]
		},
		{
			"title":"on end of video",
			"components":["when video is finished","{}"]
		},
		{
			"title":"on timestamp of video",
			"components":["when video is at ",["userInput",["var","number","string"]]," (minutes: seconds)","{}"]
		}
	]},
	{"title":"access_operators_and_variables",
		"color": "green",
	"components":[
		{
			"title":"+",
			"components":[["userInput",["var","string","int"]],"+",["userInput",["var","string","int"]]]
		},
		{
			"title":"-",
			"components":[["userInput",["var","string","int"]],"-",["userInput",["var","string","int"]]]
		},
		{
			"title":"==",
			"components":[["userInput",["var","string","int"]],"==",["userInput",["var","string","int"]]]
		},
		{
			"title":">",
			"components":[["userInput",["var","string","int"]],">",["userInput",["var","string","int"]]]
		},
		{
			"title":"<",
			"components":[["userInput",["var","string","int"]],"<",["userInput",["var","string","int"]]]
		},
		{
			"title":">=",
			"components":[["userInput",["var","string","int"]],">=",["userInput",["var","string","int"]]]
		},
		{
			"title":"<=",
			"components":[["userInput",["var","string","int"]],"<=",["userInput",["var","string","int"]]]
		}
	]},
	{
		"title":"create_and_access_variables",
		"color":"navy",
		"components":[
			{
				"title":"new variable",
				"components":[["userInput",["string"]],"=",["userInput",["var","string","int","operatorExpression"]]]
			}
		]
	},
	{"title":"actions_on_video_player",
		"color": "orange",
	"components":[
		{
			"title":"play",
			"components":["play",["userInput",["var","videoObject"]]]
		},
		{
			"title":"pause",
			"components":["pause",["userInput",["var","videoObject"]]]
		},
		{
			"title":"pause",
			"components":["pause",["userInput",["var","videoObject"]]]
		},
		{
			"title":"custom action",
			"components":[["userInput",["string"]],["userInput",["var","videoObject"]]]
		}
	]},
	{"title":"access_object_properties",
		"color": "lightblue",
	"components":[
		{
			"title":"get length",
			"components":["get length of ",["userInput",['var','videoObject']]]
		},
		{
			"title":"set video by keyword",
			"components":["set videos by keyword",["userInput",["string"]]]
		},
		{
			"title":"set video by length",
			"components":["set videos by length in minutes",["userInput",["number"]]]
		},
		{
			"title":"set video by category",
			"components":["set videos by category",["userInput",["string"]]]
		},
		{
			"title":"set length",
			"components":["set video list length",["userInput",["number"]]]
		}
	]},
	{"title":"create_object",
		"color": "blue",
	"components":[
			{
				"title":"create new custom video object",
				"components":["new video list ",["userInput",["string"]],"=","new Video",["userInput",["access_object_properties"]]]
			},
			{
				"title":"create new video list object",
				"components":["new video list ",["userInput",["string"]],"=","new Video"]
			},
			{
				"title":"add object property",
				"components":["add object property",["userInput",["access_object_properties"]]]			
			}
		]	
	}
];