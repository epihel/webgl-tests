class Pisa extends ResponsiveComponent {
	constructor() {
		super();
		this.backgroundScene = new SkyboxScene('/models/pisa/', '.png');
		this.backgroundCamera = DEMO.renderer.addCamera();

		var near = 1;
		var far = 100000;
		DEMO.renderer.camera.near = near;
		DEMO.renderer.camera.far = far;
		this.backgroundCamera.near = near;
		this.backgroundCamera.far = far;

		this.mouseX = 0;
		this.mouseY = 0;

		// add reflective spheres
		var geometry = new THREE.SphereGeometry(100, 32, 16);
		var material = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: this.backgroundScene.getTextureCube() });
		for (var i = 0; i < 500; ++i) {
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = (Math.random() * 10000) - 5000;
			mesh.position.y = (Math.random() * 10000) - 5000;
			mesh.position.z = (Math.random() * 10000) - 5000;

			mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
			this.backgroundScene.add(mesh);
		}

		this.sceneHalfWidth = window.innerWidth / 2;
		this.sceneHalfHeight = window.innerHeight / 2;
		$(document).off('mousemove');
		$(document).on('mousemove', this._mouseMoveHandler.bind(this));
	};

	renderComp(timer) {
		var c = DEMO.renderer.camera;
		c.position.x += (this.mouseX - c.position.x) * .05;
		c.position.y += (-this.mouseY - c.position.y) * .05;
		c.lookAt(DEMO.renderer.scene.position);

		this.backgroundCamera.rotation.copy(c.rotation);
		DEMO.renderer.webglRenderer.render(this.backgroundScene, this.backgroundCamera);
	};

	_mouseMoveHandler(evt) {
		this.mouseX = (evt.clientX - this.sceneHalfWidth) * 10;
		this.mouseY = (evt.clientY - this.sceneHalfHeight) * 10;
	};
};
