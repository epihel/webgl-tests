/**
 * Bounces an object up and down with variable velocity based on the given range.
 */
class Bounce {
	/**
	 * @param distanceRange { low: x, high: y }
	 */
	constructor(distanceRange) {
		this.distanceRange = distanceRange;
		this.dir = 1;
		var numDistanceGradients = this.distanceRange.high - this.distanceRange.low;
		this.velocityRange = { low: .1, high: numDistanceGradients / 50 };
	    var numVelocityGradients = this.velocityRange.high - this.velocityRange.low;
	    this.velocityPerGradient = numVelocityGradients / numDistanceGradients;
	};

	/**
	 * Updates y position.
	 * @param obj3D  THREE.Object3D
	 */
	update(obj3D) {
		var yPos = obj3D.position.y;
		obj3D.position.y = yPos + (this._getDir(yPos) * this._getVelocity(yPos));
	};

	_getDir(yPos) {
		// we've hit the peak: start descending
		if (yPos > this.distanceRange.high) {
			this.dir = -1;
		}

		// we've hit the ground: start ascending
		else if (yPos < this.distanceRange.low) {
			this.dir = 1;
		}

		return this.dir;
	};
	
	_getVelocity(yPos) {
		return this.velocityRange.high - ((yPos - this.distanceRange.low) * this.velocityPerGradient);
	};
};
