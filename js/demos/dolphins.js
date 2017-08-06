DEMO.Dolphins = {
	run: function(cb) {
		var fogColor = 0x72645b;
		var lightColor = 0x777777;
		var shadowColor = 0xffaa00;

		DEMO.renderer.camera.position.set(3, 0.15, 3);
		DEMO.renderer.scene.fog = new THREE.Fog(fogColor, 2, 15);
		var r = DEMO.renderer.webglRenderer;
		r.setClearColor(fogColor);
		r.gammaInput = true;
		r.gammaOutput = true;
		r.shadowMap.renderReverseSided = false;

		// ground
		var plane = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(40, 40),
			new THREE.MeshPhongMaterial({ color: 0x999999, specular: 0x101010 })
		);
		plane.rotation.x = -Math.PI / 2;
		plane.position.y = -0.5;
		plane.receiveShadow = true;

		var dolphin = new Dolphin();

		var comps = [
			plane,
			new THREE.AmbientLight(lightColor),
			WebglUtils.createShadowedLight(1, 1, 1, 0xffffff, 1.35),
			WebglUtils.createShadowedLight(0.5, 1, -1, shadowColor, 1),
			dolphin
		];

		dolphin.load(function() {
			cb(comps);
		});
	}
};
