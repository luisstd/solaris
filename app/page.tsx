"use client";
import { Card, Section, Strong, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const EarthGlobe = dynamic(() => import("@/app/components/globe"), {
	ssr: false,
});

export default function Main() {
	const { data: satelliteTleData } = useQuery({
		queryKey: ["satellites"],
		queryFn: async () => {
			const res = await fetch("/api/satellites");
			const data = await res.json();
			return data;
		},
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	return (
		<>
			<Section size={"1"}>
				<Card>
					<Text size={"3"}>
						<Strong>solaris</Strong>
					</Text>
				</Card>
			</Section>

			<EarthGlobe data={satelliteTleData} />
		</>
	);
}
