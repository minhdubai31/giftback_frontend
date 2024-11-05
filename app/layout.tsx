'use client';

import { GlobalContextProvider } from '@/context/globalContext';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/layout';
import { usePathname } from 'next/navigation';
import { BrandContextProvider } from '@/context/brandContext';
import { ProgramContextProvider } from '@/context/programContext';
import { NetworkContextProvider } from '@/context/networkContext';
import { UserContextProvider } from '@/context/userContext';
import { GroupContextProvider } from '@/context/groupContext';
import { NotificationContextProvider } from '@/context/notificationContext';
import { TransactionContextProvider } from '@/context/transactionContext';
import { PayoutContextProvider } from '@/context/payoutContext';
import { CashbackContextProvider } from '@/context/cashbackContext';

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
								<UserContextProvider>
									<GroupContextProvider>
										<NotificationContextProvider>
											<TransactionContextProvider>
												<PayoutContextProvider>
													<CashbackContextProvider>
														<Layout>{children}</Layout>
													</CashbackContextProvider>
												</PayoutContextProvider>
											</TransactionContextProvider>
										</NotificationContextProvider>
									</GroupContextProvider>
								</UserContextProvider>
							</NetworkContextProvider>
						</ProgramContextProvider>
					</BrandContextProvider>
				</GlobalContextProvider>
			</body>
		</html>
	);
}
