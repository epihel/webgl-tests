class ResponsiveComponent {
	init(geometry, material) {
		this.behaviors = [];
		// set the geometry to dynamic so that it allow updates
		//geometry.dynamic = true;
		// changes to the vertices
		//geometry.verticesNeedUpdate = true;
		// changes to the normals
		//geometry.normalsNeedUpdate = true;

		// create a mesh: takes a geometry and applies a material to it,
		// which we can insert into our scene and move around
		this.mesh = new THREE.Mesh(geometry, material);
		//this.mesh.overdraw = true;
		this.mesh.castShadow = true;
	};

	// overwrite to be called in the animation loop
	renderComp(timer) {};

	/**
	 * @param behaviors  single behavior, multiple (comma-separated) behaviors,
	 * or an array of behaviors
	 */
	addBehaviors(behaviors) {
		if (!Array.isArray(behaviors)) {
			behaviors = Array.prototype.slice.call(arguments);
		}
		behaviors.forEach(function(behavior) {
			this.behaviors.push(behavior);
		}.bind(this));
		return this;
	};

	clearBehaviors() {
		this.behaviors = [];
		return this;
	};

	render() {
		if (this.mesh) {
			var mesh = this.mesh;
			this.behaviors.forEach(function(behavior) {
				behavior.update(mesh);
			});
		}
		var timer = Date.now() * 0.0005;
		this.renderComp(timer);
	};
};
