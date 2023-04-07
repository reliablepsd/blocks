jQuery(function () {
	if ($("#g-map-single").length) {
		initMap("g-map-single");
	}
	if ($("#g-map-multiple").length) {
		initMap("g-map-multiple");
	}
});

function initMap(elementId) {
	const mapElement = document.getElementById(elementId);

	const styles = JSON.parse(mapElement.getAttribute("data-map-styles"));

	const pinIcon = mapElement.getAttribute("data-map-pinIcon");

	let locations = JSON.parse(mapElement.getAttribute("data-map-locations"));

	if (!locations) {
		console.error(
			`Add valid JSON with locations as an attribute 'data-map-locations' in #${elementId} element.`
		);
		return;
	}

	// If is there is no 'data-map-center' attribute map will center by the first location coordinates in locations collection
	const { lat, lng } = mapElement.getAttribute("data-map-center")
		? JSON.parse(mapElement.getAttribute("data-map-center"))[0]
		: locations[0].coords;
	let map = new google.maps.Map(document.getElementById(elementId), {
		zoom: 10,
		center: new google.maps.LatLng(Number(lat), Number(lng)),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: styles,
	});

	const infoWindow = new google.maps.InfoWindow();
	let marker, i;

	// Place multiple locations markers on  a map
	locations.forEach((location) => {
		let { lat, lng } = location.coords;

		marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			animation: google.maps.Animation.DROP,
			icon: pinIcon,
			map: map,
		});

		if (location.infoWindow) {
			let {
				title = "",
				city = "",
				address = "",
				tel = "",
			} = location.infoWindow;

			// Custom infoWindow (popup on location pin click)
			google.maps.event.addListener(
				marker,
				"click",
				((marker, i) => {
					let html = `
				${title !== "" ? `<h3>${title}</h3>` : ""}
				${city !== "" ? `<h4>${city}</h4>` : ""}
				${address !== "" ? `<p>${address}</p>` : ""}
				${tel !== "" ? `<a href="tel:${tel.replace(/[^+0-9]/g, "")}">${tel}</a>` : ""}
			`;

					return function () {
						infoWindow.setOptions({
							content: html,
						});

						infoWindow.open(map, marker);
					};
				})(marker, i)
			);
		}
	});
}
