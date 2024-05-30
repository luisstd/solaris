"use client";
import EarthGlobe from "@/app/components/globe";
import { Card, Section, Strong, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";

export default function Main() {
	const { data } = useQuery({
		queryKey: ["satellites"],
		queryFn: async () => {
			const res = await fetch("/api/satellites");
			const data = await res.json();
			return data;
		},
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

			<EarthGlobe data={data} />
		</>
	);
}
