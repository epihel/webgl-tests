DEMO.City = {
	run: function(cb) {
		DEMO.renderer.camera.position.z = 3200;
		// don't clear skybox background scene
		DEMO.renderer.webglRenderer.autoClear = false;
		cb([new Pisa()]);
	}
};
