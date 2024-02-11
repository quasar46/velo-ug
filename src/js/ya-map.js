if (document.querySelector('#map')) {
	ymaps.ready(function () {
		var map = new ymaps.Map("map", {
			center: [47.284458, 39.799823],
			zoom: 14,
			controls: [],
		}, { suppressMapOpenBlock: true, });
		map.behaviors.disable('scrollZoom')
	});
}