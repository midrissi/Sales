
WAF.onAfterInit = function onAfterInit() {// @lock
	var ns = _ns || {};
	
// @region namespaceDeclaration// @startlock
	var login1 = {};	// @login
	var documentEvent = {};	// @document
// @endregion// @endlock
	function center(container){
		$$(container).center({center : 'h'});
		$(window).resize(function(){
			$$(container).center({center : 'h'});
		});
	}
	
	(function(ns){
		var baseFolder = '/components/administration/';
		
		ns.components = {
			folders: {
				base: baseFolder,
				admin: {
					base: 'administration/',
					tabs: 'tabs/',
					dialogs: 'dialogs/'
				},
				home: {
					base: 'home/'
				},
				report: {
					base: 'report/'
				}
			},
			getPath: function(alias){
				var arr 	= alias.split('.'),
					curObj 	= this.folders,
					res 	= '',
					i 		= 0,
					attr;
				
				function setRealValue(){
					var result = true;
					
					switch(typeof curObj){
						case 'string':
							res += curObj;
							break;
						case 'object':
							res += curObj.base;
							break;
						default:
							res = undefined;
							break;
					}
				}
				
				for(; attr = arr[i++];){
					setRealValue();
					curObj = curObj[attr];
				}
				
				setRealValue();
				return res;
			}
		}
		
		ns.Forms = {
			openDialog: function(path){
				var res = ns.components.getPath('admin.dialogs');
				switch(path){
					case 'addCustomer':
						res += 'customerDetails';
						break;
					case 'addProduct':
						res += 'productDetails';
						break;
					default:
						return false;
				}
				
				$$('dialogCompo').loadComponent({
					path: res + '.waComponent',
					onSuccess: function(){
						$$('mainDialog').displayDialog();
					}
				});
			}
		};
		
		ns.mapViewObj = {
			'home' : {
				path 	: ns.components.getPath('home') + 'home.waComponent',
				view 	: 'home',
				menuID	: 'homeMenu'
			},
			'report' : {
				path 	: ns.components.getPath('report') + 'report.waComponent',
				view 	: 'report',
				groups	: ['seller'],
				menuID	: 'reportMenu'
			},
			'administration' : {
				path 	: ns.components.getPath('admin') + 'main.waComponent',
				view 	: 'administration',
				groups	: ['seller'],
				menuID	: 'adminMenu'
			}
		}
		
		function refreshMenues(){
			var
			mapView	= ns.mapViewObj;
			
			for(attr in mapView){
				if(mapView.hasOwnProperty(attr)){
					var obj = mapView[attr],
						setClick = false;
					if(obj.groups){
						$('#' + obj.menuID)
						.unbind('click')
						.addClass('disabled');
						
						for(var i = 0 , g ; g = obj.groups[i] ; i++){
							if(waf.directory.currentUserBelongsTo(g)){
								setClick = true;
							}
						}
					}
					else{
						setClick = true;
					}
					
					if(setClick){
						$('#' + obj.menuID)
						.data('view' , obj.view)
						.click(function(){
							setView($(this).data('view'));
						})
						.removeClass('disabled');
					}
				}
			}
		}
		
		function setView(view){
			var
			mapObj			= ns.mapViewObj,
			groups			= mapObj[view].groups,
			mainCompo		= $$('mainCompo'),
			tabContainer 	= $$('tabContainer').$domNode;
			
			if(!mapObj[view]){
				return false;
			}
			
			if(groups instanceof Array){
				for(var i = 0 , g ; g = groups[i] ; i++){
					if(!waf.directory.currentUserBelongsTo(g)){
						setView('home');
						return false;
					}
				}
			}
			
			tabContainer.find('.containerMI').removeClass('selected');
			tabContainer.find('#' + mapObj[view].menuID).addClass('selected');
			
			mainCompo.loadComponent(mapObj[view].path);
			
			if(history){
				history.pushState({}, '', '?view=' + view);
			}
		}
		
		ns.setView 			= setView;
		ns.refreshMenues 	= refreshMenues;
	})(ns);
// eventHandlers// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		location.href = "/?view=administration";
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		location.reload();
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		_ns.refreshMenues();
		
		var
		options = $.extend(true , {
			view 		: 'home',
			adminTab	: "report"
		} , _ns.parseUri(location.href).queryKey);
		
		_ns.setView(options.view);
		
		center('content');
		center('mainDialog');
		
		var
		$cont = $$('component1').$domNode;
		
		$cont.css({
			top: $(document).height() - $cont.height()
		});
		$(window).resize(function(){
			$cont.css({
				top: $(document).height() - $cont.height()
			});
		});
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
