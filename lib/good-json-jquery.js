

(function( $ ) {
	
	$.fn.childrenWithData = function (field) {
		return this.children().filter (
			function () { return typeof $(this).data(field) !== 'undefined'; }
		);
	};
	$.fn.siblingWithData = function (field) {
		return this.siblings().filter (
			function () { return typeof $(this).data(field) !== 'undefined'; }
		);
	};
	$.fn.equals = function (obj) {
		return $(this)[0] === $(obj)[0];
	};
	$.fn.enterKey = function (fnc) {
		return this.each(function () {
			$(this).keypress(function (ev) {
				var keycode = (ev.keyCode ? ev.keyCode : ev.which);
				if (!ev.shiftKey && (keycode == '13' || keycode == '10')) {
					fnc.call(this, ev);
				}
			})
		})
	};
	$.strReplaceAll = function (subject, find, replace) {
		return subject.replace(new RegExp(find, 'g'), replace);
	};
	
	var
		_populateOpts = function (res, settings, index ) {
			if (index === '')
				return res;
			
			if (settings.indent._count > settings.indent.count)
				res.addClass (settings.elements[settings.indent['class']]);
			
			res.attr('data-field', index);
			res.attr('draggable', true);
			
			var fieldId = $('<span />');
			fieldId.html(index + "");
			fieldId.addClass (settings.elements.field);
			fieldId.addClass (settings.elements.edit);
			fieldId.attr('draggable', true);
			res.prepend(fieldId);
			
			var fieldType = $('<span>'+settings.icons[res.attr('data-type')]+'</span>');
			fieldType.addClass (settings.iconClass);
			fieldType.addClass (settings.elements.type);
			fieldType.attr('draggable', true);
			res.prepend(fieldType);
			
			var deleteIcon = $('<span>'+settings.icons.delete+'</span>');
			deleteIcon.addClass (settings.iconClass);
			deleteIcon.css('float','right');
			deleteIcon.attr('draggable', true);
			res.prepend(deleteIcon);
			
			var moveIcon = $('<span>'+settings.icons.move+'</span>');
			moveIcon.addClass (settings.iconClass);
			moveIcon.addClass (settings.icons.move);
			res.prepend(moveIcon);
			
			
			return res;
		}
		, _parseType = function( settings, content ) {
			
			var str = Object.prototype.toString.call(content);
			
			var obj = $('<div />');
			if (!(str in _acceptedType)) str = "[object Null]";
			
			obj.attr('data-type', str);
			return _acceptedType[str].parse.apply( obj, [settings, content] );
		}
		, _loop = {
			objectify : function (parent, res, settings) {
				$.each(parent.childrenWithData('type'), function(i, value) {
					
					res[$(value).attr('data-field')] = methods.objectify.apply( value, [settings] );
					
				});
				
				return res;
			},
			_addValToParent: function (parent, settings, index, value) {
				
				var res = _parseType.apply( this, [settings, value] );
				
				res.attr('data-indent-count', settings.indent._count);
				
				res.addClass (settings.elements.indent);
				res = _populateOpts(res, settings, index);
				
				
				res.children('.' + settings.elements.field).attr('tabindex', 0);
				
				res.children('.' + settings.elements.value).attr('tabindex', 0);
				
				
				parent.append(res);
				return res;
			},
			parse : function (parent, settings, jsonObj, theClass) {
				
				settings.indent._count ++;
				$.each(jsonObj, function(index, value) {
					_loop._addValToParent.apply( this, [parent, settings, index, value] );
				});
				settings.indent._count --;
				
				parent.addClass (theClass);
				
				parent.attr('data-more', true);
				var fieldMore = $('<span>'+settings.icons.less+'</span>');
				fieldMore.addClass (settings.iconClass);
				fieldMore.css('float','right');
				parent.prepend(fieldMore);
				
				var add_circle = $('<span>'+settings.icons.add+'</span>');
				add_circle.addClass (settings.iconClass);
				add_circle.css('float','right');
				parent.prepend(add_circle);
				
				return parent;
			}
		}
		, _object = {
			objectify : function (parent, settings) {
				return parent.children('.' + settings.elements.value).html();
			},
			parse : function (parent, settings, jsonObj, theClass) {
				var value = $('<span />');
				value.html(jsonObj);
				
				value.addClass (settings.elements.value);
				value.addClass (settings.elements.edit);
				value.attr('draggable', true);
				
				parent.append(value);
				parent.addClass (theClass);
				return parent;
			}
		}
		, _acceptedType = {
			"[object Array]" : {
				objectify: function(settings) {
					return _loop.objectify($(this), [], settings);
				},
				parse: function (settings, jsonObj) {
					var res = _loop.parse($(this), settings, jsonObj, settings.elements.array);
					res.attr('data-length', jsonObj.length);
					return res;
				},
				change: function (settings, value, oldType) {
					if (oldType === "[object Object]"){
						var r = [];
						$.each(value, function(rowName, rowData) {
							r.push(rowData);
						});
						return r;
					}
					return [];
				}
			},
			"[object Object]" : {
				objectify: function(settings) {
					return _loop.objectify($(this), {}, settings);
				},
				parse: function (settings, jsonObj) {
					return _loop.parse($(this), settings, jsonObj, settings.elements.object);
				},
				change: function (settings, value, oldType) {
					if (oldType === "[object Array]"){
						var r = {};
						$.each(value, function(rowName, rowData) {
							r[rowName] = rowData;
						});
						return r;
					}
					return {};
				}
			},
			"[object String]" : {
				objectify: function(settings) {
					return $(this).children('.' + settings.elements.value).html().replace(/<br>/g, "\n");
				},
				parse: function (settings, jsonObj) {
					return _object.parse($(this), settings, jsonObj.replace(/\r\n/g, '\n').replace(/\n/g,'<br>'), settings.elements.string);
				},
				change: function (settings, value, oldType) {
					var r = value + "";
					if (r === '')
						r = 'new string';
					return r;
				}
			},
			"[object Number]" : {
				objectify: function(settings) {
					return parseInt(_object.objectify($(this), settings));
				},
				parse: function (settings, jsonObj) {
					return _object.parse($(this), settings, jsonObj, settings.elements.number);
				},
				change: function (settings, value, oldType) {
					if (Object.prototype.toString.call(value) === '[object String]' && value.includes('<span'))
						value = $(value).text();
					if (oldType === '[object Boolean]')
						return value ? 1 : 0;
					var inT = parseInt(value, settings);
					return isNaN(inT) ? 0.0 : inT;
				}
			},
			"[object Boolean]" : {
				objectify: function(settings) {
					return _acceptedType['[object Boolean]'].change(settings, _object.objectify($(this), settings)+"");
				},
				parse: function (settings, jsonObj) {
					return _object.parse($(this), settings, _acceptedType['[object Boolean]'].change(settings, jsonObj) ? 'true' : 'false' , settings.elements.bool);
				},
				change: function (settings, value, oldType) {
					
					if (Object.prototype.toString.call(value) === '[object String]' && value.includes('<span'))
						value = $(value).text();
					
					return (value === true || value === 'true' || value === '1' || value === 1);
				}
			},
			"[object Null]" : {
				objectify: function(settings) {
					return null;
				},
				parse: function (settings, jsonObj) {
					return _object.parse($(this), settings, 'null', settings.elements.null);
				},
				change: function (settings, value) {
					return null;
				}
			}
		}
		, _history = {
			_add: function (settings) {
				
				settings._history.cur++;
				
				if (settings._history.list.length > settings._history.cur) {
					
					for (var x = settings._history.cur; x < settings.historySize; x++)
						delete settings._history.list[x];
					
					var t = [];
					settings._history.list.forEach(function (element) {
						t.push(element);
					});
					settings._history.list = t;
				}
				
				settings._history.list.push(settings._base.html());
				
				if (settings._history.cur >= settings.historySize) {
					settings._history.cur --;
					settings._history.list.shift();
				}
			},
			_back: function (settings) {
				
				if (settings._history.cur > 0) {
					settings._history.cur --;
					settings._base.html(settings._history.list[settings._history.cur]);
				}
			},
			_next: function (settings) {
				
				if (settings._history.cur < settings.historySize) {
					settings._history.cur ++;
					settings._base.html(settings._history.list[settings._history.cur]);
				}
			}
		}
		, _UpdateCssValues = function (settings) {
			var elementsNew = {}, classesNew = {}, eventsNew = {};
			
			$.each(settings.elements, function (f, v) {
				elementsNew[f] = v + '' + $.fn.goodJSON._cssCount;
				
			});
			
			$.each(settings.classes, function (cssDef, cssVal) {
				
				$.each(settings.elements, function (f, v) {
					cssDef = $.strReplaceAll(cssDef, v, elementsNew[f]);
					
				});
				classesNew[cssDef] = cssVal;
			});
		
			// update the event listeners now
			$.each(settings.on, function (eventType, eventContainer) {
				eventsNew[eventType]={};
				$.each(eventContainer, function (eventName, handler) {
					if (eventName !== 'buttons')
						eventName = eventName + '' + $.fn.goodJSON._cssCount;
					
					eventsNew[eventType][eventName] = handler;
				});
			});
			
		
			settings.elements = elementsNew;
			settings.classes = classesNew;
			settings.on = eventsNew;
			$.fn.goodJSON._cssCount++;
			return settings;
		}
		, _genCss = function (settings) {
			
			var createIcon = function () {
				
				var canvas = document.createElement("canvas");
				canvas.width = settings.iconSize;
				canvas.height = settings.iconSize;
				var ctx = canvas.getContext("2d");
				
				ctx.fillStyle = "#000000";
				ctx.font = "24px '"+settings.iconFont+"'";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillText("mode_edit", settings.iconSize * 0.5, settings.iconSize * 0.5);
				
				
				ctx.fillStyle = "#FFFFFF";
				ctx.font = "22px '"+settings.iconFont+"'";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillText(settings.icons.edit, (settings.iconSize-1) * 0.5, (settings.iconSize-1) * 0.5);
				
				return canvas.toDataURL('image/png');
			};
			
			var _head = $("head");
			_head.append(settings.iconCss);
			
			var testSpan = $('<span />');
			testSpan.css('visibility', 'hidden');
			testSpan.addClass(settings.iconClass);
			testSpan.text(settings.icons.edit);
			$("body").append(testSpan);
		
			var
				
				loaded = function () {
					
				settings.classes['.'+settings.elements.edit] = settings.classes['.'+settings.elements.edit].replace('[rp]', createIcon());
					
				
				var style = $('<style />');
				$.each(settings.classes, function(index, value) {
					style.append('' + index + ' { ' + value + ' } ');
				});
				_head.append(style);
				testSpan.remove();
			};
			var loop = function(){
				if (testSpan.width() == settings.iconSize) loaded();
				else setTimeout(loop, 300);
			};
			
			settings = _UpdateCssValues(settings);
		
			setTimeout(loop, 300);
			
		}
		, _init = function( settings, jsonObj ) {
			
			settings._base = this;
			
			this.data('settings', settings);
			
			_genCss(settings);
			
			methods.parse.apply( settings._base, [settings, jsonObj] );
			
			function  on(type) {
				settings._base.off(type);
				settings._base.on(type, function(eventObject) {
					
					if (type === 'click' && settings._typePicker !== undefined)
						settings._typePicker.Remove();
					
					var t = $(eventObject.target);
					
					if (t.is( "span" )) {
						if (t.hasClass(settings.iconClass)) {
							var icon = t.text();
							if (settings.on[type].buttons !== undefined && icon in settings.on[type].buttons) {
								_history._add(settings);
								return settings.on[type].buttons[icon].apply(t, [settings, eventObject]);
							}
							else {
								if(eventObject.preventBubble)
									eventObject.preventBubble();
								if(eventObject.stopPropagation)
									eventObject.stopPropagation();
								return false;
							}
						}
					}
					var classes = t.attr('class');
					if (classes  !== undefined)
						$.each(classes.split(/\s+/), function(index, clss) {
							
							if ((clss === settings.elements.field && t.text() === 'root') || (t.hasClass(settings.elements.value) && t.parent().hasClass(settings.elements.null)))
								return;
							
							if (t.parent().parent().hasClass(settings.elements.array) && t.hasClass(settings.elements.field))
								return;
							
							if ( clss in settings.on[type] ) {
								_history._add(settings);
								settings.on[type][clss].apply(t, [settings, eventObject]);
							}
							
						});
				});
			}
			$.each(settings.on, function(index, e) {
				on(index);
			});
			
			return settings._base;
		}
		, methods = {
			parse : function( settings, jsonObj ) {
				
				if (
					"[object Array]" !== Object.prototype.toString.call(jsonObj)
					&&
					"[object Object]" !== Object.prototype.toString.call(jsonObj)
				) jsonObj = jQuery.parseJSON(jsonObj);
				
				var r = _parseType.apply( this, [settings, jsonObj] );
				
				this.html(r.html());
				
				var fieldType = $('<span>'+settings.icons[r.attr('data-type')]+'</span>');
				fieldType.addClass (settings.elements.type);
				fieldType.addClass (settings.iconClass);
				this.prepend(fieldType);
				
				this.attr('data-more', true);
				this.attr('data-type', r.attr('data-type'));
				this.attr('class', r.attr('class'));
				this.addClass(settings.elements.base);
				
				_history._add(settings);
				
				return settings._base;
			},
			stringify : function( settings ) {
				return JSON.stringify(methods.objectify.apply( this, [settings] ), settings.replace, settings.space);
			},
			objectify : function( settings ) {
				
				var str = $(this).attr('data-type');
				if (!(str in _acceptedType)) str = "[object Null]";
				
				return _acceptedType[str].objectify.apply( this, [settings] );
			},
			undo : function( settings ) {
				
				_history._back(settings);
				
				return settings._base;
			},
			redo : function( settings ) {
				
				_history._next(settings);
				
				return settings._base;
			},
			settings: function (settings) {
				this.data('settings', settings);
				return this;
			}
		};
		
	$.fn.goodJSON = function( toParseOrMethod, passedSettings, settingsForParseStringCall ) {
		
		var that = $(this), isInit = false, settings;
		
		if (that.data('settings') !== undefined) {
			settings = $.extend({}, that.data('settings'));
			isInit = true;
		}
		
		if (!isInit) {
			
			// If is NOT init, and nothing passed, init with default settings and empty object
			if (passedSettings === undefined && toParseOrMethod === undefined)
				return _init.apply( that, [ $.fn.goodJSON.defaultSettings, {} ] );
			
			// If is NOT init, and 1 param passed, parse 1 param with default settings
			if (passedSettings === undefined)
				return _init.apply( that, [ $.fn.goodJSON.defaultSettings, toParseOrMethod ] );
			
			// If is NOT init, pass 2nd param as settings, and 1st as parse
			return _init.apply(that, [$.extend({}, $.fn.goodJSON.defaultSettings, passedSettings), toParseOrMethod]);
			
		}
		
		// if is init, and method is parse
		if (toParseOrMethod === 'parse') {
			
			// merge settings if passed
			if (settingsForParseStringCall !== undefined)
				settings = $.extend(settings, settingsForParseStringCall);
			
			return methods.parse.apply( that, [ settings, passedSettings ] );
		}
		
		// if settings object is passed, merge with saved settings
		if (passedSettings !== undefined)
			settings = $.extend(settings, passedSettings);
		
		// If is init, and nothing passed, stringify
		if (toParseOrMethod === undefined)
			return methods.stringify.apply( that, [ settings ] );
		
		// if is init, call method, and pass settings
		if ( toParseOrMethod in methods )
			return methods[toParseOrMethod].apply( that, [ settings, passedSettings ] );
		
		// if settings object is passed, merge with saved settings
		if (toParseOrMethod !== undefined && ("[object Object]" === Object.prototype.toString.call(toParseOrMethod)))
			settings = $.extend(settings, toParseOrMethod);
		
		// If is init, and method isn't found in object, stringify
		return methods.stringify.apply( that, [ settings ] );
	};
	$.fn.goodJSON._cssCount = 0;
	$.fn.goodJSON.defaultSettings = {
		_base:null,
		_tabIndex: 0,
		_typePicker: undefined,
		historySize: 10,
		_isDragging: false,
		_history: {
			cur: -1,
			list: []
		},
		space: null,
		replace: null,
		indent:{
			_count: 0,
			count:8,
			'class': 'invert'
		},
		tabSize : 5,
		iconCss : '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">',
		iconSize : 24,
		iconClass : 'material-icons',
		iconFont : 'Material Icons',
		acceptedType : {
			"[object String]" : {
				edit: function (settings, originalData) {
					var r =  $('<textarea draggable="true" rows="' + (originalData.split(/<br>/).length) + '">'+originalData.replace(/<br>/g, "\n")+'</textarea>');
					r.keypress(function (_) {
						r.attr('rows', r.val().split(/\n/).length);
					});
					return r;
				},
				value: function (settings) {
					return settings.inputActive.val().replace(/\r\n/g, '\n').replace(/\n/g,'<br>');
				}, defaultValue : " "
			},
			"[object Number]" : {
				edit: function (settings, originalData) {
					return $('<input draggable="true" type="number" step="any" value="'+originalData+'" />');
				},
				validate: function (settings) {
					return !isNaN(parseInt(settings.inputActive.val()));
				},
				value: function (settings) {
					return settings.inputActive.val();
				}, defaultValue : 0
			},
			"[object Boolean]" : {
				edit: function (settings, originalData) {
					return $('<span draggable="true">'+(originalData === 'true' ? 'false' : 'true')+'</span>').click(function (_) {
						$(this).parent().click();
					});
				},
				value: function (settings) {
					return settings.inputActive.text();
				}
			}
		},
		icons : {
			'edit' : 'mode_edit',
			'delete' : 'delete_forever',
			'add' : 'note_add',
			'less' : 'expand_less',
			'more' : 'expand_more',
			'move' : 'reorder',
			'[object Object]' : '{}',
			'[object Array]' : '[]',
			'[object String]' : '""',
			'[object Number]' : '0.0',
			'[object Boolean]' : '*',
			'[object Null]' : '--'
		},
		elements : {
			field : 'json-field',
			object : 'json-object',
			array : 'json-array',
			indent : 'json-indent',
			'null' : 'json-null',
			bool : 'json-bool',
			number : 'json-number',
			string : 'json-string',
			value : 'json-value',
			type : 'json-type',
			edit : 'json-edit',
			base : 'good-json',
			pick : 'json-pick',
			choose : 'json-choose',
			target : 'drag-over',
			invert : 'json-brightText'
		},
		classes : {
			'.material-icons' : 'cursor:pointer; height:15px;width:15px;font-size: 15px;',
			'.json-type' : "margin-right:5px; margin-left:5px; font-family: 'Custom Icons';text-align: center;font-size: 12px;font-style: italic;",
			'.json-indent' : 'margin: 2px 0 0 10px;-moz-user-select: none;-khtml-user-select: none;-webkit-user-select: none;user-select: none;/* Required to make elements draggable in old WebKit */-khtml-user-drag: element;-webkit-user-drag: element;',
			'.json-brightText': "color:white;",
			'.good-json div.json-brightText' : 'box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.16);',
			'.json-field': "display: inline-block; margin-right: 5px;margin-bottom: 5px;font-size:0.75rem;font-family:'Lucida Console', Monaco, monospace;width:calc(100% - 60px);",
			'.json-array > .json-field, .json-object > .json-field, .json-field input': 'width:calc(100% - 90px);',
			'.json-object': "",
			'.json-array': "",
			'.drag-over' : "border: 2px dashed #000;",
			'.json-null span.json-value' : "",
			'.json-array > .json-indent > .json-field': 'display:none;',
			'.json-edit' : "cursor: url([rp]), auto",
			'.json-null > .json-value, .json-value.json-edit div, article' : "cursor: default;",
			'.good-json, .good-json div' : 'padding: 5px 5px 5px 5px; box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.16); background-color: rgba(0, 0, 0, 0.1);',
			'.good-json > span' : 'transition: visibility 0s, opacity 0.5s linear;',
			'.json-value textarea, .json-value input' : "font-family: 'Roboto', sans-serif;font-size: 16px;width:98%",
			'.json-field input' : "font-size:0.75rem;font-family:'Lucida Console';",
			'.reorder' : 'cursor: move;',
			'.json-pick' : 'cursor:pointer; ',
			'.json-pick:hover' : 'color:#f0f0f0;',
			'.json-choose' : 'position: absolute; background: #bcbcbc;'
		},
		save_current_edit : function (settings) {
			
			if (settings.inputActive !== undefined)
			{
				var parent = settings.inputActive.parent();
				if (settings.inputActive.attr('data-is-field') === 'true') {
					
					parent.parent().attr('data-field', settings.inputActive.val());
					parent.html(settings.inputActive.val());
				}
				else {
					
					var type = parent.parent().attr('data-type');
					
					if (type in settings.acceptedType) {
						
						if (settings.acceptedType [type].validate !== undefined) {
							
							if (settings.acceptedType [type].validate(settings))
								settings.inputActive.parent().html(settings.acceptedType[type].value(settings));
							
							else {
								var orig = settings.inputActive.attr('data-original');
								
								if ((orig === '' || orig === undefined) && settings.acceptedType [type].defaultValue !== undefined)
									orig = (settings.acceptedType [type].defaultValue);
								
								settings.inputActive.parent().html(orig);
							}
						}
						else
							settings.inputActive.parent().html(settings.acceptedType[type].value(settings));
					}
					
					settings.inputActive = undefined;
				}
			}
		},
		open_new_edit: function (settings) {
			
			settings.save_current_edit(settings);
			
			var type = this.parent().attr('data-type');
			
			if (this.hasClass(settings.elements.field))
				settings.inputActive = $('<input draggable="false" type="text" value="' + this.text() + '" />');
			
			else if (type in settings.acceptedType) {
				
				settings.inputActive = settings.acceptedType [this.parent().attr('data-type')].edit(settings, this.html());
			}
			
			settings.inputActive.attr('data-is-field', this.hasClass(settings.elements.field) ? "true" : "false");
			settings.inputActive.attr('data-original', this.html());
			
			settings.inputActive.enterKey(function () {
				settings.save_current_edit(settings);
			});
			settings.inputActive.focusout(function (_) {
				settings.save_current_edit(settings);
			});
			settings.inputActive.blur(function (_) {
				settings.save_current_edit(settings);
			});
			settings.inputActive.enterKey(function () {
				settings.save_current_edit(settings);
			});
			
			this.html('');
			this.append(settings.inputActive);
			settings.inputActive.width(this.parent().width() - 100);
			settings.inputActive.focus();
		},
		move_value: function (settings, from, to) {
			
			var
				fromParent = from.parent(),
				toParent = to.parent(),
				sourceParentType = fromParent.attr('data-type'),
				destinationParentType = toParent.attr('data-type'),
				destinationField = from.attr('data-field'),
				siblingAfterField =  to.attr('data-field'),
				dataToMove = methods.objectify.apply(from, [ settings ]),
				newDestinationObject;
			
			from.remove();
			
			var destinationObject = methods.objectify.apply(toParent, [ settings ]);
			
			if (destinationParentType === '[object Array]') {
				destinationField = parseInt(to.attr('data-field'));
				newDestinationObject = [];
			}
			else {
				if (sourceParentType === '[object Array]')
					destinationField = 'New Field ' + Math.random();
				newDestinationObject = {};
			}
			
			if (toParent.equals(fromParent)) {
				
				if (destinationParentType === '[object Array]') {
					
					var preDestinationField = parseInt(from.attr('data-field'));
					$.each(destinationObject, function (index, value) {
						
						if (destinationField === index)
							newDestinationObject.push(dataToMove);
						
						if (index !== preDestinationField)
							newDestinationObject.push(value);
					});
				}
				else {
					
					$.each(destinationObject, function (index, value) {
						if (destinationField !== index) {
							
							if (siblingAfterField === index)
								newDestinationObject[destinationField] = dataToMove;
							
							newDestinationObject[index] = value;
						}
					});
				}
			}
			else {
				
				if (destinationParentType === '[object Array]') {
					
					$.each(destinationObject, function (index, value) {
						
						if (destinationField === index)
							newDestinationObject.push(dataToMove);
						
						newDestinationObject.push(value);
					});
				}
				else {
					$.each(destinationObject, function (index, value) {
						
						if (siblingAfterField === index)
							newDestinationObject[destinationField] = dataToMove;
						newDestinationObject[index] = value;
					});
				}
			}
			
			toParent.children('div').remove();
			
			var res = _parseType.apply(toParent, [ settings, newDestinationObject ]).children('div');
			$.each(res, function(index, value) {
				toParent.append($(value));
			});
			
			if (sourceParentType === '[object Array]') {
				var fromCnt = 0;
				$.each(fromParent.children('div'), function(index, value) {
					$(value).attr('data-field', fromCnt++);
					$(value).children('.' + settings.elements.field).first().text(fromCnt + "");
				});
			}
			
		},
		open_change_field : function (settings, target) {
			
			target.fadeTo( 200, 0.4 );
			
			settings._typePicker = $('<div />');
			settings._typePicker.Remove = function () {
				
				target.fadeTo( 200, 1 );
				
				settings._typePicker.remove();
				settings._typePicker = undefined;
			};
			
			settings._typePicker.addClass(settings.elements.base);
			settings._typePicker.addClass(settings.elements.choose);
			settings._typePicker.css({top: this.position().top + 20, left: this.position().left, position:'absolute'});
			
			$.each(_acceptedType, function(typeName) {
								
				if (target.equals(settings._base) && "[object Object]" !== typeName && "[object Array]" !== typeName)
					return;
				
				var type = $('<div>'+ settings.icons[typeName] +' - Change to ' + typeName + '</div>');
				type.attr('data-type', typeName);
				type.addClass(settings.elements.pick);
				type.addClass(settings.elements.indent);
				
				settings._typePicker.append(type);
			});
			
			settings._typePicker.click(function (event) {
				var newType = $(event.target).attr('data-type'), oldType = target.attr('data-type');
				if (newType !== undefined) {
					
					if(oldType !==  newType)
						settings.change_type(settings, target, newType, oldType);
					
					target.fadeTo(400, 1);
					settings._typePicker.Remove();
					
				}
			});
			
			$('body').append(settings._typePicker);
		},
		change_type: function (settings, target, newType, oldType) {
			
			var newValue, oldValue = methods.objectify.apply(target, [settings]);
			
			if (target.equals(settings._base)) {
				
				if (newType === '[object Array]') {
					
					newValue = [];
					$.each(oldValue, function (index, value) {
						newValue.push(value);
					});
				}
				else {
					
					newValue = {};
					$.each(oldValue, function (index, value) {
						newValue[index] = value;
					});
				}
				
				return target.goodJSON('parse', newValue, settings);
			}
			
			newValue = _acceptedType[newType].change(settings, oldValue, oldType);
			var newObject = _populateOpts(_parseType(settings, newValue), settings, target.attr('data-field'));
			
			target.hasClass(settings.elements.indent);
			newObject.addClass(settings.elements.indent);
			
			newObject.insertBefore(target);
			target.remove();
			
		},
		on: {
			keypress: {
				'json-edit' : function (settings, ev) {
					
					var keycode = (ev.keyCode ? ev.keyCode : ev.which);
					if (keycode == '13' || keycode == '10') {
						settings.open_new_edit.apply(this, [settings]);
					}
					else {
						this.text('');
						settings.open_new_edit.apply(this, [settings]);
					}
				}
			},
			mousedown: {
				buttons:{
					'reorder': function (settings, evnt) {
						settings._isDragging = true;
					}
				}
			},
			mouseup: {
				buttons:{
					'reorder': function (settings, evnt) {
						settings._isDragging = false;
					}
				}
			},
			dragstart: {
				'json-indent' : function (settings, evnt) {
					if (!settings._isDragging){
						
						if(evnt.preventBubble)
							evnt.preventBubble();
						if(evnt.stopPropagation)
							evnt.stopPropagation();
						return false;//???
					}
					this.fadeTo( 0, 0.4 );
					settings._currentDraggedSource = this;
				}
			},
			dragenter: {
				'json-edit' : function (settings, evnt) {
					return settings.on.dragenter[settings.elements.indent].apply(this.parent(), [settings, evnt]);
				},
				'json-indent' : function (settings, evnt) {
					
					if (!settings._isDragging || jQuery.inArray( settings._currentDraggedSource[0], evnt.originalEvent.path ) >= 0 || settings._currentDraggedSource.equals(this))
						return false;
					
					
					if (settings._currentDraggedTarget !== undefined)
						settings._currentDraggedTarget.removeClass(settings.elements.target);
					
					this.addClass(settings.elements.target);
					settings._currentDraggedTarget = this;
				}
			},
			dragleave: {
				'json-indent' : function (settings, evnt) {
					
					if (!settings._isDragging || settings._currentDraggedTarget !== undefined || jQuery.inArray( settings._currentDraggedSource[0], evnt.originalEvent.path ) >= 0)
						return false;
					
					settings._currentDraggedTarget.removeClass(settings.elements.target);
					settings._currentDraggedTarget = undefined;
				}
			},
			dragend: {
				'json-indent' : function (settings, evnt) {
					
					if (settings._currentDraggedSource !== undefined)
						settings._currentDraggedSource.fadeTo( 0, 1 );
					
					if (settings._currentDraggedTarget !== undefined)
						settings._currentDraggedTarget.removeClass(settings.elements.target);
					
					if (!settings._isDragging || jQuery.inArray( settings._currentDraggedSource[0], evnt.originalEvent.path ) > 0 || settings._currentDraggedTarget === undefined )
						return false;
					
					settings.move_value(settings, settings._currentDraggedSource, settings._currentDraggedTarget);
					
					settings._isDragging = false;
					settings._currentDraggedTarget = undefined;
					settings._currentDraggedSource = undefined;
				}
			},
			click : {
				buttons : {
					'{}' : function (settings) {settings.open_change_field.apply(this, [settings, this.parent()])},
					'[]' : function (settings) {settings.open_change_field.apply(this, [settings, this.parent()])},
					'""' : function (settings) {settings.open_change_field.apply(this, [settings, this.parent()])},
					'0.0' : function (settings) {settings.open_change_field.apply(this, [settings, this.parent()])},
					'*' : function (settings) {settings.open_change_field.apply(this, [settings, this.parent()])},
					'--' : function (settings) {settings.open_change_field.apply(this, [settings, this.parent()])},
					'expand_more': function (settings, dont) {
						if (!dont)
							this.text(settings.icons.less);
						this.parent().attr('data-more', true);
						this.siblings('div').slideToggle("fast");
					},
					'expand_less': function (settings) {
						this.text(settings.icons.more);
						this.parent().attr('data-more', false);
						this.siblings('div').slideToggle("fast");
					},
					'delete_forever': function (settings) {
						this.parent().remove();
					},
					'note_add' : function (settings) {
						
						var parent = this.parent();
						var str = parent.attr('data-type');
						
						settings.indent._count = parseInt(parent.attr('data-indent-count')) + 1;
						var isVisible = parent.attr('data-more') === 'true';
						var res;
						if (str === '[object Object]')
							res = _loop._addValToParent.apply( parent, [parent, settings, 'New Field ' + Math.random(), null] );
						if (str === '[object Array]') {
							var l;
							parent.attr('data-length', (l = parseInt(parent.attr('data-length')))+1);
							res = _loop._addValToParent.apply(parent, [parent, settings, l, null]);
						}
						if(!isVisible && res !== undefined)
							res.slideToggle(0);
					}
				},
				'json-edit': function (settings) {
					settings.open_new_edit.apply(this, [settings]);
					
				}
			}
		}
	};
	
}( jQuery ));