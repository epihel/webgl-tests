class SkyboxScene extends THREE.Scene {
	constructor(directory, ext) {
		super();

		var shader = THREE.ShaderLib['cube'];
		this.textureCube = shader.uniforms['tCube'].value = new THREE.CubeTextureLoader().load([
			directory + 'px' + ext, directory + 'nx' + ext,
			directory + 'py' + ext, directory + 'ny' + ext,
			directory + 'pz' + ext, directory + 'nz' + ext
		]);

		var geometry = new THREE.BoxGeometry(100, 100, 100);
		var material = new THREE.ShaderMaterial({
			depthWrite: false,
			fragmentShader: shader.fragmentShader,
			side: THREE.BackSide,
			uniforms: shader.uniforms,
			vertexShader: shader.vertexShader
		});

		this.add(new THREE.Mesh(geometry, material));
	};

	getTextureCube() {
		return this.textureCube;
	};
};
