class SkyboxScene extends THREE.Scene {
	constructor(directory, ext) {
		super();

		var shader = THREE.ShaderLib['cube'];
		// THREE.CubeTexture
		//THREE.CubeTextureLoader
		var textureLoader = new THREE.CubeTextureLoader();
		shader.uniforms['tCube'].value = textureLoader.load([
			directory + 'px' + ext, directory + 'nx' + ext,
			directory + 'py' + ext, directory + 'ny' + ext,
			directory + 'pz' + ext, directory + 'nz' + ext
		]);

		var geometry = new THREE.BoxGeometry(100, 100, 100);
		var material = new THREE.ShaderMaterial({
			fragmentShader: shader.fragmentShader,
			vertexShader: shader.vertexShader,
			uniforms: shader.uniforms,
			depthWrite: false,
			side: THREE.BackSide
		});

		this.add(new THREE.Mesh(geometry, material));
	};
};
