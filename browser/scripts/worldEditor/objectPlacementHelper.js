function AbstractObjectPlacementHelper(screenPosition) {
	this.screenPosition = screenPosition
}

AbstractObjectPlacementHelper.prototype = {
	execute: function(plugin) {
		// place in front of current camera
		var cam = E2.app.worldEditor.getCamera()
		var worldPos = new THREE.Vector3(0, 0, -2)
		worldPos.applyMatrix4(cam.matrixWorld)

		var oldPos = new THREE.Vector3(plugin.state.position.x, plugin.state.position.y, plugin.state.position.z)
		var oldQuat = new THREE.Quaternion(plugin.state.quaternion.x, plugin.state.quaternion.y, plugin.state.quaternion.z, plugin.state.quaternion.w)

		var quat = new THREE.Quaternion().setFromRotationMatrix(cam.matrixWorld)

		plugin.undoableSetState('position', worldPos, oldPos)
		plugin.undoableSetState('quaternion', quat, oldQuat)
	}
}

// Objects
function ObjectPlacementHelper(screenPosition) {
	AbstractObjectPlacementHelper.apply(this, arguments)
}

ObjectPlacementHelper.prototype = Object.create(AbstractObjectPlacementHelper.prototype)

ObjectPlacementHelper.prototype.execute = function(plugin) {
	// scale to unit size
	plugin.scaleToUnitSize()

	AbstractObjectPlacementHelper.prototype.execute.apply(this, arguments)
}

// Textures
function TexturePlacementHelper(screenPosition) {
	this.screenPosition = screenPosition
}

TexturePlacementHelper.prototype = Object.create(AbstractObjectPlacementHelper.prototype)

TexturePlacementHelper.prototype.execute = function(plugin) {
	AbstractObjectPlacementHelper.prototype.execute.apply(this, arguments)
}