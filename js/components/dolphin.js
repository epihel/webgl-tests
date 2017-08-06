class Dolphin extends ResponsiveComponent {
	constructor() {
		super();
		this.cameraTarget = new THREE.Vector3(0, -0.25, 0);	
	};
	
	load(cb) {
		let init = super.init.bind(this);
		new THREE.PLYLoader().load('/models/dolphins.ply', function(geometry) {
			init(
				geometry,
				new THREE.MeshPhongMaterial({ color: 0x0055ff, specular: 0x111111, shininess: 200 })
			);

			this.mesh.position.set(0, -0.25, 0);
			this.mesh.rotation.set(0, -Math.PI / 2, 0);
			this.mesh.scale.set(0.001, 0.001, 0.001);

			this.mesh.castShadow = true;
			this.mesh.receiveShadow = true;

			cb();
		}.bind(this), WebglUtils.logLoadProgress, WebglUtils.logLoadError);
	};

	renderComp(timer) {
		let camera = DEMO.renderer.camera;
		camera.position.x = Math.sin(timer) * 3;
		camera.position.z = Math.cos(timer) * 3;
		camera.lookAt(this.cameraTarget);
	};
};
