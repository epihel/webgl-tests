class Stage extends ResponsiveComponent {
	constructor(width, height) {
		super();
		var widthSegments = 8;
		var heightSegments = 8;
		super.init(
			new THREE.PlaneBufferGeometry(width, height, widthSegments, heightSegments),
			new THREE.MeshLambertMaterial({ color: 0xffffff, wireframe: false })
		);
		//this.mesh.rotation.x = -Math.PI / 2;
		this.mesh.rotation.x = 4.85;
		this.mesh.position.set(0, 0, 0);

		this.mesh.castShadow = false;
		this.mesh.receiveShadow = true;
	};
};
