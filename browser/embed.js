// <iframe src="/embed/eesn/flamingofront?autoplay=true&noheader=true" width="800" height="450" frameborder="0" allowfullscreen></iframe>
(function(){

	var getId = function() {
		var t = (new Date()).getTime()
		while ((new Date()).getTime() === t) {}
		return t
	}
	var _id = '_v_' + getId()

	var toJSON = function(evt) {
		return JSON.stringify(evt, function(k, v) {
			if (v instanceof Node)
				return 'Node'
			if (v instanceof Window)
				return 'Window'
			return v
		}, ' ')
	}

	var requestFullscreen = function(element) {
	  if (element.requestFullscreen) {
		return element.requestFullscreen()
	  } else if (element.mozRequestFullScreen) {
		return element.mozRequestFullScreen()
	  } else if (element.webkitRequestFullscreen) {
		return element.webkitRequestFullscreen()
	  }
	}

	var proxySend = function(message,data) {
		console.log(message, data)
	}

	var localDeviceMotion = function(e) {
		proxySend('parent:devicemotion', {
			event: toJSON(e)
		})
		return true
	}
	var localOrientationChange = function(e) {
		proxySend('parent:orientationchange', {
			event: toJSON(e)
		})
		return true
	}

	var getParentRef = function() {
		var spanId = _id + 's'
		document.write('<span id="' + spanId + '"></span>')
		var ts = document.getElementById(spanId)
		var n = ts.parentNode
		n.removeChild(ts)
		return n
	}

	var n = getParentRef(), r = n.getBoundingClientRect()
	var aspect = 16 / 9

	var url = '//vizor.io/embed/eesn/flamingofront'
	var iframeWidth = r.width || 800
	var iframeHeight = iframeWidth / aspect
	var iframeId = _id + 'i'

	document.write('<iframe id="'+iframeId+'" src="'+url+'?autoplay=true&noheader=true" width="' + iframeWidth + '" height="' + iframeHeight +  '" frameborder="0" allowfullscreen></iframe>')
	document.write('<a href="#" id="fs">fs</a>')

	var fs = document.getElementById('fs')
	fs.addEventListener('click', function(){
		var i = document.getElementById(iframeId)
		requestFullscreen(i)
	})

	document.addEventListener('devicemotion', localDeviceMotion)
	document.addEventListener('orientationchange', localOrientationChange)

})()