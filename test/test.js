
$( document ).ready(function() {
	
	var a = $("#json");
	a.goodJSON({
		"Array Test Field Name": [ 1, 2, 3 ],
		"Boolean Test Field Name": true,
		"Null Test Field Name": null,
		"Number Test Field Name": 123,
		"Object Test Field Name": {"a": "b", "c": "d"},
		"String Test Field Name": "Hello World",
		"multi line String Test Field Name": "This\nis\na\nmulti\nlined\nstring",
		'This': {'Is': {'A': {'Highly': {'Nested': {'Object': {'To': {'Show': {'Colour': {'Switching': {}}}}}}}}}}
	});
	
	$('#undo').click(function (_) {
		a.goodJSON('undo');
	});
	$('#redo').click(function (_) {
		a.goodJSON('redo');
		
	});
	
	$('#parseObject').click(function (_) {
		a.goodJSON('parse', {
			"Array Test Field Name": [1, 2, 3],
			"Boolean Test Field Name": true,
			"Null Test Field Name": null,
			"Number Test Field Name": 123,
			"Object Test Field Name": {"a": "b", "c": "d"},
			"String Test Field Name": "Hello World",
			"multi line String Test Field Name": "This\nis\na\nmulti\nlined\nstring",
			'This': {'Is': {'A': {'Highly': {'Nested': {'Object': {'To': {'Show': {'Colour': {'Switching': {}}}}}}}}}}
		});
	});
	$('#parseJSON').click(function (_) {
		a.goodJSON('parse', JSON.stringify({
			"Array Test Field Name": [1, 2, 3],
			"Null Test Field Name": null,
			"Number Test Field Name": 123,
			"Object Test Field Name": {"a": "b", "c": "d"},
			"Boolean Test Field Name": true,
			"String Test Field Name": "Hello World",
			"multi line String Test Field Name": "This\nis\na\nmulti\nlined\nstring",
			'This': {'Is': {'A': {'Highly': {'Nested': {'Object': {'To': {'Show': {'Colour': {'Switching': {}}}}}}}}}}
		}));
	});
	
	$('#objectify').click(function (_) {
		console.log(a.goodJSON('objectify'));
	});
	
	$('#stringify').click(function (_) {
		console.log(a.goodJSON());
		
	});
	$('#stringify2').click(function (_) {
		console.log(a.goodJSON('stringify'));
		
	});
	$('#stringify3').click(function (_) {
		console.log(a.goodJSON('stringify', {
			space: '\t',// both of these are optional
			replace: function (key, value) {// both of these are optional
				return value;
			}
		}));
		
	});
	$('#stringify4').click(function (_) {
		console.log(a.goodJSON({// you can only call with no method string provided, if you've already created with your JSON
			space: '\t',// both of these are optional
			replace: function (key, value) {// both of these are optional
				return value;
			}
		}));
		
	});
});