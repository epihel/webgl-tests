class Grass {
	constructor() {
		//THREE.ImageUtils.crossOrigin = 'http://threejs.org';
		//var groundTexture = THREE.ImageUtils.loadTexture("http://threejs.org/examples/textures/terrain/grasslight-big.jpg");
		//THREE.ImageUtils.crossOrigin = '';
		var groundTexture = THREE.ImageUtils.loadTexture('/models/grasslight-big.jpg');
		groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
		groundTexture.repeat.set(25, 25);
		groundTexture.anisotropy = 16;

		var geometry = new THREE.PlaneBufferGeometry(20000, 20000);
		var material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x111111, map: groundTexture });

		// create a mesh: takes a geometry and applies a material to it,
		// which we can insert into our scene and move around
		this.mesh = new THREE.Mesh(geometry, material);
	};

	render() {
		this.mesh.position.y = -250;
		this.mesh.rotation.x = - Math.PI / 2;
		tthis.mesh.receiveShadow = true;
	};
};
