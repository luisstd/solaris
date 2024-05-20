import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const font = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Solaris",
	description: "Satellite tracker",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={font.className}>
				<Theme>{children}</Theme>
			</body>
		</html>
	);
}
