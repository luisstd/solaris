"use client";
import { GlobeIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { Button, Card, Flex, Section, Strong, Text } from "@radix-ui/themes";
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
					<Flex justify={"between"} align={"center"}>
						<Flex align={"center"} gap={"2"}>
							<GlobeIcon style={{ width: "24px", height: "24px" }} />
							<Text size={"3"}>
								<Strong>Solaris</Strong>
							</Text>
						</Flex>
						<Button variant="ghost" radius="medium">
							<InfoCircledIcon />
							Info
						</Button>
					</Flex>
				</Card>
			</Section>

			<EarthGlobe data={satelliteTleData} />
		</>
	);
}
