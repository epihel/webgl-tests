/**
 * Spins an object horizontally, vertically, or both.
 */
class Spin {
	/**
	 * @param spinX  optional Boolean; default true
	 * @param spinY  optional Boolean; default true
	 */
	constructor(spinX, spinY) {
		this.spinX = typeof(spinX) === 'undefined' ? true : spinX;
		this.spinY = typeof(spinY) === 'undefined' ? true : spinY;
	};

	/**
	 * Updates rotation property.
	 * @param obj3D  THREE.Object3D
	 */
	update(obj3D) {
		if (this.spinX) {
			obj3D.rotation.x += 0.01;	
		}

		if (this.spinY) {
			obj3D.rotation.y += 0.01;	
		}
	};
};
