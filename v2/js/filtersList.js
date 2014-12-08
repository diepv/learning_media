
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

"userInput" means there needs to be space that"s clickable/writable by user. 
if "var", "operatorExpression", "videoPlayerButton" then userInput space is clickable with dropdown menu of options fitting "var" and "expression"
if "customVideoPlayerButton" then userInput space is cickable with dropdown menu of options only showing custoamizable buttons of the video player

videoObject = either individual video object or playlist 
*/
var filtersOld = 
[	
	{"title":"create_conditionals",
	"color": "black",
	"components":[
		{
			"title":"if(  )else",
			"components":["if",{"userInput":[{"constraints":["var","access_operators_and_variables"]},{"helpText":"insert expression or variable"}]},"{  }","else","{ }"]
		},
		{
			"title":"while",
			"components":["else","{ }"]
		}
	]},
	{"title":"access_video_player_events",
		"color": "red",
	"components":[
		{
			"title":"on play",
			"components":["when play button is pressed","{ }"]
		},
		{
			"title":"on pause",
			"components":["when pause button is pressed","{ }"]
		},
		{
			"title":"on (custom button)",
			"components":["when",["userInput",["customVideoPlayerButton"],["helpText","insert custom video player button (previously defined)"]]," button is pressed","{ }"]
		},
		{
			"title":"on end of playlist",
			"components":["when playlist is finished","{ }"]
		},
		{
			"title":"on start of playlist",
			"components":["when playlist is started","{ }"]
		},
		{
			"title":"on start of video",
			"components":["when video is started","{ }"]
		},
		{
			"title":"on end of video",
			"components":["when video is finished","{ }"]
		},
		{
			"title":"on timestamp of video",
			"components":["when video is at ",["userInput",["date_objects"],["helpText","insert a time"]],"{ }"]
		},
		{
			"title":"on date",
			"components":["when date is: ",["userInput",["date_objects"],["helpText",["insert a date"]]],"{ }"]
		}
	]},
	{"title":"access_operators_and_variables",
		"color": "green",
	"components":[
		{
			"title":"+",
			"components":[["userInput",["var","string","number"],["helpText","insert addend"]],"+",["userInput",["var","string","number"],["helpText","insert addend"]]]
		},
		{
			"title":"-",
			"components":[["userInput",["var","string","number"],["helpText","insert minuend"]],"-",["userInput",["var","string","number"],["helpText","insert subtrahend"]]]
		},
		{
			"title":"==",
			"components":[["userInput",["var","string","number"],["helpText","insert something to compare"]],"==",["userInput",["var","string","number"],["helpText","insert something to compare"]]]
		},
		{
			"title":">",
			"components":[["userInput",["var","string","number"],["helpText","insert something to compare"]],">",["userInput",["var","string","number"],["helpText","insert something to compare"]]]
		},
		{
			"title":"<",
			"components":[["userInput",["var","string","number"],["helpText","insert something to compare"]],"<",["userInput",["var","string","number"],["helpText","insert something to compare"]]]
		},
		{
			"title":">=",
			"components":[["userInput",["var","string","number"],["helpText","insert something to compare"]],">=",["userInput",["var","string","number"],["helpText","insert something to compare"]]]
		},
		{
			"title":"<=",
			"components":[["userInput",["var","string","number"],["helpText","insert something to compare"]],"<=",["userInput",["var","string","number"],["helpText","insert something to compare"]]]
		}
	]},
	{
		"title":"create_and_access_variables",
		"color":"navy",
		"components":[
			{
				"title":"new variable",
				"components":["new variable: ",["userInput",["string"],["helpText","insert variable name"]],"=",["userInput",["var","string","number","access_operators_and_variables","create_object"],["helpText","insert variable's value"]]]
			}
		]},
	{"title":"actions_on_video_player",
		"color": "orange",
	"components":[
		{
			"title":"play",
			"components":["play: ",["userInput",["var","create_object"],["helpText","insert a media object to play"]]]
		},
		{
			"title":"pause",
			"components":["pause: ",["userInput",["var","create_object"],["helpText","insert a media object to pause"]]]
		},
		{
			"title":"custom action",
			"components":["new action: ",["userInput",["string"],["helpText","insert action name"]],"=",["userInput",["actions_on_video_player"],["helpText","insert an action to associate with this custom button"]]]
		}
	]},
	{
		"title":"functions_for_custom_button",
		"color":"aquamarine",
		"components":[
			{
				"title":"show twitter feed",
				"components":["show twitter feed for user: ",["userInput",["var","string"],["helpText","insert twitter username"]]]
			}
		]
	},
	{"title":"access_object_properties",
		"color": "lightblue",
	"components":[
		{
			"title":"get length of variable",
			"components":["get length of ",["userInput",["var"],["helpText","insert variable to get length (can be count or minutes depending on variable data)"]]]
		},
		{
			"title":"set keyword property",
			"components":["set variable ",["userInput",["var"],["helpText","insert variable"]]," keyword property ",["userInput",["string"],["helpText","insert keyword (string)"]]]
		},
		{
			"title":"set minute length property",
			"components":["set variable ",["userInput",["var"],["helpText","insert variable"]]," max minute length ",["userInput",["number"],["helpText","insert number"]]]
		},
		{
			"title":"set category property",
			"components":["set variable ",["userInput",["var"],["helpText","insert variable"]]," category property ",["userInput",["string"],["helpText","insert category (string)"]]]
		},
		{
			"title":"set max count property",
			"components":["set variable ",["userInput",["var"],["helpText","insert variable"]]," max count ",["userInput",["number"],["helpText","insert number"]]]
		}
	]},
	{"title":"initialize_object_with_properties",
	"color":"lightpink",
	"components":[
		{
			"title": "property: keyword",
			"components":["keyword ( ",["userInput",["array",["string"]],["helpText","insert keyword(s) (string)"]]," )"]
		},
		{
			"title": "property: category",
			"components":["category ( ",["userInput",["string"],["helpText","insert category (string)"]]," )"]
		},
		{
			"title": "property: max count",
			"components":["max count ( ",["userInput",["number"],["helpText","insert number"]]," )"]
		},
		{
			"title": "property: release date",
			"components":["release date ( ",["userInput",["date"],["helpText","insert date object"]]," )"]
		},
		{
			"title": "property: title",
			"components":["title ( ",["userInput",["string"],["helpText","insert title (string)"]]," )"]
		}
	]},
	{"title":"create_object",
		"color": "blue",
	"components":[
			{
				"title":"create new custom media object",
				"components":["new single video object with optional properties( ",["userInput",["array",["initialize_object_with_properties"]],["helpText","insert property/properties (objects)"]]," )"]
			},
			{
				"title":"create new media list object",
				"components":["new video list object with optional properties( ",["userInput",["array",["initialize_object_with_properties"]],["helpText","insert property/properties (objects)"]]," )"]
			}
		]	
	},
	{"title":"date_objects",
		"color": "gold",
	"components":[
			{
				"title":"today",
				"components":["today"]
			},
			{
				"title":"time(HH:MM:SS)",
				"components":["time(",["userInput",["string"],["helpText","insert time in format: HH:MM:SS (string)"]],")"]
			},
			{
				"title":"date(month/day/year)",
				"components":["date(",["userInput",["string"],["helpText","insert keyword(s) (string)"]],")"]
			}
		]	
	}
];

var filters = 
[	
	{"title":"create_conditionals",
	"color": "black",
	"components":[
		{
			"title":"if(  )else",
			"components":["if",{"userInput":[{"constraints":["var","access_operators_and_variables"]},{"helpText":"insert expression or variable"}]},"{  }","else","{ }"]
		},
		{
			"title":"while",
			"components":["while","{ }"]
		}
	]},
	{"title":"access_video_player_events",
		"color": "red",
	"components":[
		{
			"title":"on play",
			"components":["when play button is pressed","{ }"]
		},
		{
			"title":"on pause",
			"components":["when pause button is pressed","{ }"]
		},
		{
			"title":"on (custom button)",
			"components":["when",{"userInput":[{"constrains":["customVideoPlayerButton"]},{"helpText":"insert custom video player button (previously defined)"}]}," button is pressed","{ }"]
		},
		{
			"title":"on end of playlist",
			"components":["when playlist is finished","{ }"]
		},
		{
			"title":"on start of playlist",
			"components":["when playlist is started","{ }"]
		},
		{
			"title":"on start of video",
			"components":["when video is started","{ }"]
		},
		{
			"title":"on end of video",
			"components":["when video is finished","{ }"]
		},
		{
			"title":"on timestamp of video",
			"components":["when video is at ",{"userInput":[{"constraints":["date_objects"]},{"helpText":"insert a time"}]},"{ }"]
		},
		{
			"title":"on date",
			"components":["when date is: ",{"userInput":[{"constraints":["date_objects"]},{"helpText":"insert a date"}]},"{ }"]
		}
	]},
	{"title":"access_operators_and_variables",
		"color": "green",
	"components":[
		{
			"title":"+",
			"components":[{"userInput":[{"constraints":["var","string","number"]},{"helpText":"insert addend"}]},"+",{"userInput":[{"constraints":["var","string","number"]},{"helpText":"insert addend"}]}]
		},
		{
			"title":"-",
			"components":[{"userInput":[{"constraints":["var","string","number"]},{"helpText":"insert minuend"}]},"-",{"userInput":[{"constraints":["var","string","number"]},{"helpText":"insert subtrahend"}]}]
		},
		{
			"title":"==",
			"components":[{"userInput":[{"constraints":["var","string","number"]},{"helpText":"insert something to compare"}]},"==",{"userInput":[{"constraints":["var","string","number"]},{"helpText":"insert something to compare"}]}]
		},
		{
			"title":">",
			"components":[{"userInput":[{"constraints":["var","string","number"]},{"helpText":"insert something to compare"}]},">",{"userInput":[{"constraints":["var","string","number"]},{"helpText":"insert something to compare"}]}]
		},
		{
			"title":"<",
			"components":[{"userInput":[{"constraints":["var","string","number"]},{"helpText":"insert something to compare"}]},"<",{"userInput":[{"constraints":["var","string","number"]},{"helpText":"insert something to compare"}]}]
		},
		{
			"title":">=",
			"components":[{"userInput":[{"constraints":["var","string","number"]},{"helpText":"insert something to compare"}]},">=",{"userInput":[{"constraints":["var","string","number"]},{"helpText":"insert something to compare"}]}]
		},
		{
			"title":"<=",
			"components":[{"userInput":[{"constraints":["var","string","number"]},{"helpText":"insert something to compare"}]},"<=",{"userInput":[{"constraints":["var","string","number"]},{"helpText":"insert something to compare"}]}]
		}
	]},
	{
		"title":"create_and_access_variables",
		"color":"navy",
		"components":[
			{
				"title":"new variable",
				"components":["new variable: ",{"userInput":[{"constraints":["string"]},{"helpText":"insert variable name"}]},"=",{"userInput":[{"constraints":["var","string","number","access_operators_and_variables","create_object"]},{"helpText":"insert variable's value"}]}]
			}
		]},
	{"title":"actions_on_video_player",
		"color": "orange",
	"components":[
		{
			"title":"play",
			"components":["play: ",{"userInput":[{"constraints":["var","create_object"]},{"helpText":"insert a media object to play"}]}]
		},
		{
			"title":"pause",
			"components":["pause: ",{"userInput":[{"constraints":["var","create_object"]},{"helpText":"insert a media object to pause"}]}]
		},
		{
			"title":"custom action",
			"components":["new action: ",{"userInput":[{"constraints":["string"]},{"helpText":"insert action name"}]},"=",{"userInput":[{"constraints":["actions_on_video_player"]},{"helpText":"insert an action to associate with this custom button"}]}]
		}
	]},
	{
		"title":"functions_for_custom_button",
		"color":"aquamarine",
		"components":[
			{
				"title":"show twitter feed",
				"components":["show twitter feed for user: ",{"userInput":[{"constraints":["var","string"]},{"helpText":"insert twitter username"}]}]
			}
		]
	},
	{"title":"access_object_properties",
		"color": "lightblue",
	"components":[
		{
			"title":"get length of variable",
			"components":["get length of ",{"userInput":[{"constraints":["var"]},{"helpText":"insert variable to get length (can be count or minutes depending on variable data)"}]}]
		},
		{
			"title":"set keyword property",
			"components":["set variable ",{"userInput":[{"constraints":["var"]},{"helpText":"insert variable"}]}," keyword property ",{"userInput":[{"constraints":["string"]},{"helpText":"insert keyword (string)"}]}]
		},
		{
			"title":"set minute length property",
			"components":["set variable ",{"userInput":[{"constraints":["var"]},{"helpText":"insert variable"}]}," max minute length ",{"userInput":[{"constraints":["number"]},{"helpText":"insert minutes (number)"}]}]
		},
		{
			"title":"set category property",
			"components":["set variable ",{"userInput":[{"constraints":["var"]},{"helpText":"insert variable"}]}," category property ",{"userInput":[{"constraints":["string"]},{"helpText":"insert category (string)"}]}]
		},
		{
			"title":"set max count property",
			"components":["set variable ",{"userInput":[{"constraints":["var"]},{"helpText":"insert variable"}]}," max count ",{"userInput":[{"constraints":["number"]},{"helpText":"insert count (number)"}]}]
		}
	]},
	{"title":"initialize_object_with_properties",
	"color":"lightpink",
	"components":[
		{
			"title": "property: keyword",
			"components":["keyword ( ",{"userInput":[{"constraints":["array",["string"]]},{"helpText":"insert keyword(s) (string)"}]}," )"]
		},
		{
			"title": "property: category",
			"components":["category ( ",{"userInput":[{"constraints":["string"]},{"helpText":"insert category (string)"}]}," )"]
		},
		{
			"title": "property: max count",
			"components":["max count ( ",{"userInput":[{"constraints":["number"]},{"helpText":"insert count (number)"}]}," )"]
		},
		{
			"title": "property: release date",
			"components":["release date ( ",{"userInput":[{"constraints":["date"]},{"helpText":"insert date (date object)"}]}," )"]
		},
		{
			"title": "property: title",
			"components":["title ( ",{"userInput":[{"constraints":["string"]},{"helpText":"insert title (string)"}]}," )"]
		}
	]},
	{"title":"create_object",
		"color": "blue",
	"components":[
			{
				"title":"create new custom media object",
				"components":["new single video object with optional properties( ",{"userInput":[{"constraints":["array",["initialize_object_with_properties"]]},{"helpText":"insert property/properties (objects)"}]}," )"]
			},
			{
				"title":"create new media list object",
				"components":["new video list object with optional properties( ",{"userInput":[{"constraints":["array",["initialize_object_with_properties"]]},{"helpText":"insert property/properties (objects)"}]}," )"]
			}
		]	
	},
	{"title":"date_objects",
		"color": "gold",
	"components":[
			{
				"title":"today",
				"components":["today"]
			},
			{
				"title":"time(HH:MM:SS)",
				"components":["time(",{"userInput":[{"constraints":["string"]},{"helpText":"insert time in format: HH:MM:SS (string)"}]},")"]
			},
			{
				"title":"date(month/day/year)",
				"components":["date(",{"userInput":[{"constraints":["string"]},{"helpText":"insert keyword(s) (string)"}]},")"]
			}
		]	
	}
];