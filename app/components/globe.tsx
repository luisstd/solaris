"use client";

import Globe from "react-globe.gl";
import {
	type PositionAndVelocity,
	degreesLat,
	degreesLong,
	eciToGeodetic,
	gstime,
	propagate,
	twoline2satrec,
} from "satellite.js";

type EarthGlobeProps = {
	data: string;
};

const EARTH_RADIUS_KM = 6371; // km
const SAT_SIZE = 80; // km
const TIME_STEP = 3 * 1000; // per frame

export default function EarthGlobe({ data }: EarthGlobeProps) {
	const tleData = data
		.replace(/\r/g, "")
		.split(/\n(?=[^12])/)
		.filter((d) => d)
		.map((tle) => tle.split("\n"));

	const satData = tleData
		.map(([name, ...tle]) => ({
			satrec: twoline2satrec(...(tle as [string, string])),
			name: name.trim().replace(/^0 /, ""),
		}))
		.map((sat) => {
			const positionAndVelocity: PositionAndVelocity = propagate(
				sat.satrec,
				new Date(),
			);
			const positionEci = positionAndVelocity.position;
			const gmst = gstime(new Date());
			const positionGd = eciToGeodetic(positionEci, gmst);

			return {
				name: sat.name,
				lat: degreesLat(positionGd.latitude),
				lng: degreesLong(positionGd.longitude),
				alt: positionGd.height / EARTH_RADIUS_KM,
			};
		})
		.filter((d) => !!d.lat && !!d.lng && !!d.alt)
		.slice(0, 1500);

	console.log(satData);

	return (
		<Globe
			width={window.innerWidth - 20}
			height={window.innerHeight - 250}
			globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
			backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
			objectsData={satData}
			objectLabel="name"
			objectLat="lat"
			objectLng="lng"
			objectAltitude="alt"
			objectFacesSurfaces={false}
		/>
	);
}
