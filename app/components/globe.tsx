"use client";
import Globe from "react-globe.gl";

type EarthGlobeProps = {
	data: [];
};

export default function EarthGlobe({ data }: EarthGlobeProps) {
	return <Globe />;
}
