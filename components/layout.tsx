'use client';

import Link from 'next/link';
import {
	CircleUser,
	Home,
	Menu,
	Package2,
	Search,
	Users,
	Globe,
	SquareCode,
	Notebook,
	CircleDollarSign,
	BellDot,
	ArrowLeftRight,
	HandCoins,
	User,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useGlobalContext } from '@/context/globalContext';
import { Accordion, AccordionItem } from './ui/accordion';

export const description =
	'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.';

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { tab, setTab } = useGlobalContext();
	const [isSideBar, setIsSideBar] = useState<boolean>(false);

	const handleTabClick = (tab: string) => {
		setTab(tab);
		setIsSideBar(false);
	};

	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
						<Link href="/" className="flex items-center gap-2 font-semibold">
							<Package2 className="h-6 w-6" />
							<span className="">Giftback</span>
						</Link>
					</div>
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							{/* <Link
								href="/"
								className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
									tab === 'Dashboard'
										? 'bg-muted text-primary'
										: 'text-muted-foreground'
								} transition-all hover:text-primary`}
								onClick={() => handleTabClick('Dashboard')}
							>
								<Home className="h-4 w-4" />
								Dashboard
							</Link> */}
							<Link
								href="/network"
								className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
									tab === 'Affiliate Network'
										? 'bg-muted text-primary'
										: 'text-muted-foreground'
								} transition-all hover:text-primary`}
								onClick={() => handleTabClick('Affiliate Network')}
							>
								<Globe className="h-4 w-4" />
								Affiliate Network
							</Link>
							<Link
								href="/program"
								className={`flex items-center gap-3 rounded-lg ${
									tab === 'Affiliate Program'
										? 'bg-muted text-primary'
										: 'text-muted-foreground'
								} px-3 py-2 transition-all hover:text-primary`}
								onClick={() => handleTabClick('Affiliate Program')}
							>
								<SquareCode className="h-4 w-4" />
								Affiliate Program
							</Link>
							<Link
								href="/brand"
								className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
									tab === 'Brand'
										? 'bg-muted text-primary'
										: 'text-muted-foreground'
								} transition-all hover:text-primary`}
								onClick={() => handleTabClick('Brand')}
							>
								<Notebook className="h-4 w-4" />
								Brand
							</Link>
							<Link
								href="/cashback"
								className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
									tab === 'Cashback'
										? 'bg-muted text-primary'
										: 'text-muted-foreground'
								} transition-all hover:text-primary`}
								onClick={() => handleTabClick('Cashback')}
							>
								<CircleDollarSign className="h-4 w-4" />
								Cashback
							</Link>
							<Link
								href="/notification"
								className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
									tab === 'Notification'
										? 'bg-muted text-primary'
										: 'text-muted-foreground'
								} transition-all hover:text-primary`}
								onClick={() => handleTabClick('Notification')}
							>
								<BellDot className="h-4 w-4" />
								Notification
							</Link>
							<Link
								href="/payout"
								className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
									tab === 'Payout'
										? 'bg-muted text-primary'
										: 'text-muted-foreground'
								} transition-all hover:text-primary`}
								onClick={() => handleTabClick('Payout')}
							>
								<HandCoins className="h-4 w-4" />
								Payout Request
							</Link>
							<Link
								href="/transaction"
								className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
									tab === 'Transaction'
										? 'bg-muted text-primary'
										: 'text-muted-foreground'
								} transition-all hover:text-primary`}
								onClick={() => handleTabClick('Transaction')}
							>
								<ArrowLeftRight className="h-4 w-4" />
								Transaction
							</Link>
							<Link
								href="/user"
								className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
									tab === 'Users'
										? 'bg-muted text-primary'
										: 'text-muted-foreground'
								} transition-all hover:text-primary`}
								onClick={() => handleTabClick('Users')}
							>
								<User className="h-4 w-4" />
								User
							</Link>
							<Link
								href="/group"
								className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
									tab === 'Group'
										? 'bg-muted text-primary'
										: 'text-muted-foreground'
								} transition-all hover:text-primary`}
								onClick={() => handleTabClick('Group')}
							>
								<Users className="h-4 w-4" />
								Group
							</Link>
						</nav>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:hidden">
					<Sheet open={isSideBar} onOpenChange={setIsSideBar}>
						<SheetTrigger asChild>
							<Button variant="outline" size="icon" className="shrink-0 md:hidden">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="flex flex-col">
							<nav className="grid gap-2 text-lg font-medium">
								<Link
									href="#"
									className="flex items-center gap-2 text-lg font-semibold"
								>
									<span className="text-2xl">Giftback</span>
								</Link>
								{/* <Link
									href="/"
									className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
										tab === 'Dashboard'
											? 'bg-muted text-foreground'
											: 'text-muted-foreground'
									} hover:text-foreground`}
									onClick={() => handleTabClick('Dashboard')}
								>
									<Home className="h-5 w-5" />
									Dashboard
								</Link> */}
								<Link
									href="/network"
									className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl ${
										tab === 'Affiliate Network'
											? 'bg-muted text-foreground'
											: 'text-muted-foreground'
									} px-3 py-2 hover:text-foreground`}
									onClick={() => handleTabClick('Affiliate Network')}
								>
									<Globe className="h-5 w-5" />
									Affiliate Network
								</Link>
								<Link
									href="/program"
									className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
										tab === 'Affiliate Program'
											? 'bg-muted text-foreground'
											: 'text-muted-foreground'
									} hover:text-foreground`}
									onClick={() => handleTabClick('Affiliate Program')}
								>
									<SquareCode className="h-5 w-5" />
									Affiliate Program
								</Link>
								<Link
									href="/brand"
									className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
										tab === 'Brand'
											? 'bg-muted text-foreground'
											: 'text-muted-foreground'
									} hover:text-foreground`}
									onClick={() => handleTabClick('Brand')}
								>
									<Notebook className="h-5 w-5" />
									Brand
								</Link>
								<Link
									href="/cashback"
									className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
										tab === 'Cashback'
											? 'bg-muted text-foreground'
											: 'text-muted-foreground'
									} hover:text-foreground`}
									onClick={() => handleTabClick('Cashback')}
								>
									<CircleDollarSign className="h-5 w-5" />
									Cashback
								</Link>
								<Link
									href="/notification"
									className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
										tab === 'Notification'
											? 'bg-muted text-foreground'
											: 'text-muted-foreground'
									} hover:text-foreground`}
									onClick={() => handleTabClick('Notification')}
								>
									<BellDot className="h-5 w-5" />
									Notification
								</Link>
								<Link
									href="/payout"
									className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
										tab === 'Payout'
											? 'bg-muted text-foreground'
											: 'text-muted-foreground'
									} hover:text-foreground`}
									onClick={() => handleTabClick('Payout')}
								>
									<HandCoins className="h-5 w-5" />
									Payout Request
								</Link>
								<Link
									href="/transaction"
									className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
										tab === 'Transaction'
											? 'bg-muted text-foreground'
											: 'text-muted-foreground'
									} hover:text-foreground`}
									onClick={() => handleTabClick('Transaction')}
								>
									<ArrowLeftRight className="h-5 w-5" />
									Transaction
								</Link>
								<Link
									href="/user"
									className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
										tab === 'Users'
											? 'bg-muted text-foreground'
											: 'text-muted-foreground'
									} hover:text-foreground`}
									onClick={() => handleTabClick('Users')}
								>
									<User className="h-5 w-5" />
									User
								</Link>
								<Link
									href="/group"
									className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
										tab === 'Group'
											? 'bg-muted text-foreground'
											: 'text-muted-foreground'
									} hover:text-foreground`}
									onClick={() => handleTabClick('Group')}
								>
									<Users className="h-5 w-5" />
									Group
								</Link>
							</nav>
						</SheetContent>
					</Sheet>
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
			</div>
		</div>
	);
}
