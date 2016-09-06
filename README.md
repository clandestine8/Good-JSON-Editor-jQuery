# Good-JSON-Editor-jQuery

[![Join the chat at https://gitter.im/clandestine8/Good-JSON-Editor-jQuery](https://badges.gitter.im/clandestine8/Good-JSON-Editor-jQuery.svg)](https://gitter.im/clandestine8/Good-JSON-Editor-jQuery?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

I couldn't find one worth my while.... So I started building my own jQuery JSON Tree Editor for Web Apps &amp; DB Managers

<b>View Demo Here: http://clandestine8.github.io/Good-JSON-Editor-jQuery/test/demo.html </b>


This is a jquery plugin, include jquery before you include this js library.

	<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
	<script src="//clandestine8.github.io/Good-JSON-Editor-jQuery/good-json-jquery.min.js"></script>
    

To start pass a json object, or json string to goodJSON on an object you wish to use as your editor. You can pass a JSON object or a JSON Array in a stringified version or object version.

    var json = $("#json").goodJSON({
        "Array Test Field Name": [ 1, 2, 3 ],
        "Boolean Test Field Name": true,
        "Null Test Field Name": null,
        "Number Test Field Name": 123,
        "Object Test Field Name": {"a": "b", "c": "d"},
        "String Test Field Name": "Hello World",
        "multi line String Test Field Name": "This\nis\na\nmulti\nlined\nstring",
        'This': {'Is': {'A': {'Highly': {'Nested': {'Object': {'To': {'Show': {'Colour': {'Switching': {}}}}}}}}}}
    });
    <div id="json"></div>

at this point you should save the json var.

Good json includes a history, you can use it with calling undo and redo onto the json object obtained when creating.

    json.goodJSON('undo');
    json.goodJSON('redo');
		
You can change the size of the history. The default value is 10 entries. This will change it to 15 entries. When initializing goodJSON, you can provide the setting object as a second parameter

    var json = $("#json").goodJSON({ ... }, { historySize : 15 });
    json.goodJSON('settings', { historySize : 15 });

After you've initialized goodJSON, you can reparse a new json string, or json object into the same goodJSON. This will change the object you're editing. 

    json.goodJSON('parse', "[ 1, 2, 5, 7, { a: "hi" } ]");
    
After you're done editing everything you wish, you can output a JSON Object or Array, or stringify. After you've initialized, you do not need to provide a method name for stringify, you can also provide overrides

    var overrides = { space: '\t', replace: function (key, value) { return value; } };
    var JSONStringWithOverrides2 = json.goodJSON('stringify', overrides); // prety json with tabs
    var JSONStringWithOverrides = json.goodJSON(overrides);
    var JSONString2 = json.goodJSON('stringify'); // just a streight ugly json string
    var JSONString = json.goodJSON();
    var JSONObject = json.goodJSON('objectify');