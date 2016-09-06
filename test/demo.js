/**
 * Created by chris on 9/6/2016.
 */

$( document ).ready(function() {
	
	var a = $("#json"), val = $("#jsonStr");
	
	a.goodJSON(val.val());
	
	$('#undo').click(function (_) {
		a.goodJSON('undo');
	});
	$('#redo').click(function (_) {
		a.goodJSON('redo');
	});
		
	$('#parseJSON').click(function (_) {
		a.goodJSON('parse',val.val());
	});
	
	$('#stringify').click(function (_) {
		val.val(a.goodJSON({ space: '\t'}));
	});
});