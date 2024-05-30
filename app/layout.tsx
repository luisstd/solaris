import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/app/providers";

const font = Roboto_Mono({
	display: "swap",
	subsets: ["latin"],
	variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
	title: "Solaris",
	description: "Satellite tracker",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={font.className}>
				<Providers>
					<Theme appearance="dark">{children}</Theme>
				</Providers>
			</body>
		</html>
	);
}
