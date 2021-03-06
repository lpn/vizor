function SceneLightingHelper(light) {
	AbstractWorldEditorHelperObject.call(this)

	var that = this

	light.traverse(function(n) {
		if (!that.directionalLight && n instanceof THREE.DirectionalLight) {
			that.directionalLight = n
		}
	})

	var that = this

	this.assetLoader.loadAsset('texture', "/data/editor-icons/directional-light/IconTextureMap.png")
	.then(function(texture) {
		that.assetLoader.loadAsset('model', '/data/editor-icons/directional-light/directional.obj')
		.then(function(geomsmats) {
			that.geometryLoaded(geomsmats.geometries[0], texture, 0.05)
			that.children[0].material.color = that.directionalLight.color
		})
	})

	this.name = 'scene lighting helper object'
}

SceneLightingHelper.prototype = Object.create( AbstractWorldEditorHelperObject.prototype )

SceneLightingHelper.prototype.attach = function(referenceObj) {
	this.referenceObj = referenceObj

	this.matrix = this.referenceObj.children[0].matrixWorld

	this.backReference = this.referenceObj.backReference
	this.helperObjectBackReference = this.referenceObj
}
