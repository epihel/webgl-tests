var WebglUtils = {
	createShadowedLight: function(x, y, z, color, intensity) {
		var light = new THREE.DirectionalLight(color, intensity);
		light.position.set(x, y, z);
		light.castShadow = true;
		light.shadow.camera.near = 1;
		light.shadow.camera.far = 4;

		// debug
		// light.shadow.camera.visible = true;

		this.setLightHeight(light, 1);

		light.shadow.bias = -0.005;
		//light.shadow.darkness = 0.15;
		return light;
	},

	setLightHeight: function(light, height) {
		var c = light.shadow.camera;
		c.left = -1 * height;
		c.right = height;
		c.top = height;
		c.bottom = -1 * height;
	},

	/**
	 * Adds frame-per-second statistics to debug during development.
	 * @param styles  the stats' css styles, which must include position attributes
	 * (e.g., 'bottom,' 'left,' 'right,' and/or 'top')
	 */
	addStats: function(styles) {
		var stats = new Stats();
		var elem = stats.domElement;
		var s = elem.style;
		s.position = 'absolute';
		for (var cssProp in styles) {
			s[cssProp] = styles[cssProp];
		}
		var statsContainer = document.createElement('div');
		statsContainer.appendChild(elem);
		document.body.appendChild(statsContainer);
		return stats;
	},

	fitViewport: function(htmlId) {
		var elem = document.getElementById(htmlId);
		elem.width = window.innerWidth;
		elem.height = window.innerHeight;
		return elem;
	},

	/**
	 * Sets the x, y, and z properties of any object.
	 */
	set: function(obj, x, y, z) {
		obj.x = x;
		obj.y = y;
		obj.z = z;
	},

	/**
	 * Shallow copies the properties from the given object.
	 * In Three.js, `obj.position = otherPosition` doesn't work.
	 * @param srcMap  the source properties
	 * @param optionalTargetMap  the target object where we should copy the properties
	 * @return optionalTargetMap if provided; otherwise, a new object
	 */
	copyKvps: function(srcMap, optionalTargetMap) {
        if (typeof(optionalTargetMap) !== 'object') {
            optionalTargetMap = {};
        }
        for (let x in srcMap) {
            optionalTargetMap[x] = srcMap[x];
        }
        return optionalTargetMap;
    },

    logLoadProgress: function(xhr) {
		if (xhr.lengthComputable) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log(Math.round(percentComplete, 2) + '% downloaded');
		}
	},

	logLoadError: function(xhr) {
		console.error(xhr);
	}
};
