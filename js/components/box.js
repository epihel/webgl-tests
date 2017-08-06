class Box extends ResponsiveComponent {
	constructor(width, height, depth, color) {
		super();
		super.init(
			new THREE.BoxGeometry(width, height, depth),
			new THREE.MeshLambertMaterial({ color: color })
		);
		this.mesh.position.y = height / 2;
	};
};
