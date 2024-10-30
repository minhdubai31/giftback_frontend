'use client';

import { GlobalContextProvider } from '@/context/globalContext';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/layout';
import { usePathname } from 'next/navigation';
import { BrandContextProvider } from '@/context/brandContext';
import { ProgramContextProvider } from '@/context/programContext';
import { NetworkContextProvider } from '@/context/networkContext';
import { CustomerContextProvider } from '@/context/customerContext';
import { GroupContextProvider } from '@/context/groupContext';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();

	// Do not render the layout for the login page
	const noLayoutPages = ['/auth'];

	if (noLayoutPages.includes(pathname)) {
		return (
			<html lang="en">
				<body className="antialiased">
					<Toaster richColors />
					{children}
				</body>
			</html>
		);
	}
	return (
		<html lang="en">
			<body className="antialiased">
				<Toaster richColors />
				<GlobalContextProvider>
					<BrandContextProvider>
						<ProgramContextProvider>
							<NetworkContextProvider>
								<CustomerContextProvider>
									<GroupContextProvider>
										<Layout>{children}</Layout>
									</GroupContextProvider>
								</CustomerContextProvider>
							</NetworkContextProvider>
						</ProgramContextProvider>
					</BrandContextProvider>
				</GlobalContextProvider>
			</body>
		</html>
	);
}
