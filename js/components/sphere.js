class Sphere extends ResponsiveComponent {
	constructor(radius, widthSegments, heightSegments, color) {
		super();
		super.init(
			new THREE.SphereGeometry(radius, widthSegments, heightSegments),
			new THREE.MeshPhongMaterial( { color: color, specular: 0xFFFFFF, shininess: 50, opacity: 1, wireframe: false } )
		);
		this.mesh.position.y = radius;
		this.cameraTarget = new THREE.Vector3(0, -0.25, 0);	
	};
};
