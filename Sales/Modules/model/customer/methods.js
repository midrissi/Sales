var result = {};

/************************************************************************************
 |                                                                                  |
 |                                  Entity Methods                                  |
 | Examples:                                                                        |
 |          result.entityMethods.method = function ();                              |
 |                                                                                  |
 ************************************************************************************/

// Initialize the entityMethods object:
result.entityMethods = {};

result.entityMethods.passwordIsValid = function password_is_valid(password, isAKey){
	return isAKey === true? this.ha1key === password:
								this.ha1key === directory.computeHA1(this.getKey(), password);
}

/************************************************************************************
 |                                                                                  |
 |                            EntityCollection Methods                              |
 | Examples:                                                                        |
 |          result.collectionMethods.method = function ();                          |
 |                                                                                  |
 ************************************************************************************/

// Initialize the collectionMethods object:
result.collectionMethods = {};

/************************************************************************************
 |                                                                                  |
 |                                   Class Methods                                  |
 | Examples:                                                                        |
 |          result.methods.method = function ();                                    |
 |                                                                                  |
 ************************************************************************************/

// Initialize the methods object:
result.methods = {};

result.methods.login = function login () {
	loginByPassword.apply(application, arguments);
}

// Export the result object:
module.exports = result;