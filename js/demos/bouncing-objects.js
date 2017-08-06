DEMO.BouncingObjects = {
	run: function(cb) {
		var yPos = -75;

		//DEMO.renderer.camera.position.set(0, 0, 500);

		var sphereRadius = 50;
		var cubeDimension = 100;
		var bounceCeiling = (sphereRadius * 4) + yPos;
		var sphereBounce = new Bounce({ low: sphereRadius + yPos, high: bounceCeiling });
		var cubeBounce = new Bounce({ low: (cubeDimension / 1.25) + yPos, high: bounceCeiling });
		var spin = new Spin();

		var cube = new Box(cubeDimension, cubeDimension, cubeDimension, 0x00FF00).addBehaviors(cubeBounce, spin);
		// move cube away from the sphere
		cube.mesh.position.x -= cubeDimension * 1.25;

		var comps = [
			new Stage(350, 200),
			new Sphere(sphereRadius, 100, 100, 0xFF0000).addBehaviors(sphereBounce),
			cube
		];

		comps.forEach(function(comp) {
			if (comp.mesh) {
				comp.mesh.position.y = yPos;
			}
		});

		cb(comps);
	}
};
