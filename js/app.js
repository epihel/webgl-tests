var ADD_STATS = true;
var CONTAINER_SELECTOR = '#canvas-container';
DEMO.renderer = new Renderer(CONTAINER_SELECTOR, ADD_STATS);

var SELECTED_CLASS = 'selected';
var DEBUG = false;
if (DEBUG) {
	var canvas = $(CONTAINER_SELECTOR).find('canvas')[0];
	var cxt = canvas.getContext('webgl');
	WebGLDebugUtils.makeDebugContext(cxt, function(err, funcName, args) {
		throw new Error(WebGLDebugUtils.glEnumToString(err) + ' was caused by call to: ' + funcName);
	});
}

function runDemo(demoId) {
	DEMO[demoId].run(function(comps) {
		comps.forEach(function(c) {
			DEMO.renderer.add(c);
		});
		DEMO.renderer.start();
	});
}

runDemo('BouncingObjects');

var allLinks = $('#nav a');
allLinks.each(function() {
	$(this).on('click', function() {
		DEMO.renderer.stop();
		allLinks.removeClass(SELECTED_CLASS);
		var clickedLink = $(this);
		clickedLink.addClass(SELECTED_CLASS);
		runDemo(clickedLink.attr('id'));
	});
});
