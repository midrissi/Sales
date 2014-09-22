var result = {};


/************************************************************************************
 |                                                                                  |
 |                               Attribute Events                                	|
 | Examples:                                                                        |
 |          result.attributeName.events.onInit = function on_init() 				|
 |          result.attributeName.events.onLoad = function on_load() 				|
 |          result.attributeName.events.onSet = function on_set() 					|
 |          result.attributeName.events.onValidate = function on_validate() 		|
 |          result.attributeName.events.onSave = function on_save() 				|
 |          result.attributeName.events.onRemove = function on_remove()             |
 |                                                                                  |
 ************************************************************************************/



/************************************************************************************
 |                                                                                  |
 |                            Datastore Class Event                             	|
 | Examples:                                                                        |
 |          result.events.onInit = function on_init() 								|
 |          result.events.onLoad = function on_load() 								|
 |          result.events.onValidate = function on_validate() 						|
 |          result.events.onSave = function on_save() 								|
 |          result.events.onRemove = function on_remove()							|
 |          result.events.onRestrictingQuery = function on_restricting_query()		|
 |                                                                                  |
 ************************************************************************************/

// Initialize the events object:
result.events = {};

/************************************************************************************
 |                                                                                  |
 |                         Calculated Attributes Events                          	|
 | Examples:                                                                        |
 |          result.attributeName.onGet = function on_get() 							|
 |          result.attributeName.onSet = function on_set() 							|
 |          result.attributeName.onQuery = function on_query() 						|
 |          result.attributeName.onSort = function on_sort()						|
 |                                                                                  |
 ************************************************************************************/

// Export the result object:
module.exports = result;