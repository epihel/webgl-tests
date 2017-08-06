/**
 * Renders a THREE.Scene with a THREE.PerspectiveCamera.
 */
class Renderer {
	constructor(containerSelector, addStats) {
		this.containerSelector = containerSelector;
		this.addStats = addStats;
		this.webglRenderer = new THREE.WebGLRenderer({ antialias: true });
		this._reset();
		this.bgColor = 0x333F47;
		window.addEventListener('resize', this._viewportResized.bind(this));
	};

	/**
	 * Adds an object to the scene.
	 * @param renderable instance of THREE.Object3D
	 * or renderable.mesh instance of THREE.Object3D
	 */
	add(renderable) {
		if (renderable instanceof THREE.Object3D) {
			this.scene.add(renderable);
		}

		else {
			if (typeof(renderable.render) === 'function') {
				this.renderables.push(renderable);
			}

			if (renderable.mesh instanceof THREE.Object3D) {
				this.scene.add(renderable.mesh);
			}
		}
	};

	addCamera() {
		return this._setCamera(new THREE.PerspectiveCamera());
	};

	/**
	 * Starts the rendering loop.
	 */
	start() {
		if (this.addStats) {
			this.stats = WebglUtils.addStats({ left: '40px', top: '0px' });
		}
		this.requestId = -1;
		this._start();
	};

	/**
	 * Stops the rendering loop.
	 */
	stop() {
		cancelAnimationFrame(this.requestId);
		this.requestId = null;
		this._reset();
	};
	
	_start() {
		if (this.requestId != null) {
			if (this.stats) {
				this.stats.update();	
			}
			this.renderables.forEach(function(renderable) {
				var fn = renderable.render.bind(renderable);
				fn();
			});
			this.webglRenderer.render(this.scene, this.camera);
			this.requestId = requestAnimationFrame(this._start.bind(this));
		}
	};

	_reset() {
		this.renderables = [];
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera();
		//this.camera = this._createOrthographicCamera();
		this._resetRenderer();
		this._resetCamera();
		this._addLight();
	};
	
	_resetRenderer() {
		// clears container
		this._getContainer().empty();
		var r = this.webglRenderer;
		// adds renderer to the canvas element in the DOM
		this._getContainer().append(r.domElement);

		r.autoClear = true;
		r.setPixelRatio(window.devicePixelRatio);
		r.shadowMap.enabled = true;
		r.shadowMap.type = THREE.PCFShadowMap;
		r.setSize(window.innerWidth, window.innerHeight);
		r.setClearColor(this.bgColor);
	};

	_setCamera(camera) {
		// field-of-view angle in degrees
		camera.fov = 45;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		return camera;
	};

	_resetCamera() {
		// additional cameras
		this.cameras = {};

		// set to default
		this.camera.near = 0.1;
		this.camera.far = 2000;

		this._setCamera(this.camera);

		// zero is center: positive numbers move camera to the left,
		// negative numbers move camera to the right
		this.camera.position.x = 0;
		// zero is center: negative numbers move camera up,
		// positive numbers move camera down
		this.camera.position.y = 0;
		// by default, 3d objects are added at the coordinates (0, 0, 0),
		// which is where the camera is: no perspective to see the object:
		// to avoid this, move the camera out a bit;
		// the smaller the number, the closer the camera and the bigger the object
		this.camera.position.z = 500;
	};

	_addLight() {
		var lightColor = 0xFFFFFF;
		var lightHeight = 250;

		//var light = this._createPointLight(lightColor);
		var light = this._createDirectionalLight(lightColor);
		light.position.set(0, 300, lightHeight);

		// create anti-aliased shadows
		this.webglRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
		WebglUtils.setLightHeight(light, lightHeight);

		this.scene.add(light);
	};

	_getContainer() {
		return $(this.containerSelector);
	};

	/*
	_createOrthographicCamera() {
		var right = window.innerWidth / 2;
		var top = window.innerHeight / 2;
		var left = -1 * right;
		var bottom = -1 * top;
		var camera = new THREE.OrthographicCamera(left, right, top, bottom);
		camera.zoom = 2;
		camera.updateProjectionMatrix();
		return camera;
	};
	*/

	_createDirectionalLight(color) {
		var light = new THREE.DirectionalLight(color);
	    light.castShadow = true;
	    // debug
	    //light.shadow.camera.visible = true;
	    return light;
	};

	_viewportResized() {
		this._setCamera(this.camera);
		//this.camera.aspect = window.innerWidth / window.innerHeight;
		//this.camera.updateProjectionMatrix();
		this.webglRenderer.setSize(window.innerWidth, window.innerHeight);
	};
};
