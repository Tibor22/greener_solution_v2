import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import { IconType } from 'react-icons/lib/esm/iconBase';

interface Props {
	navItems: { label: string; icon: IconType; href: string }[];
}

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
	const [visible, setVisible] = useState<boolean | null>(null);
	useEffect(() => {
		const storedNavOpen = localStorage.getItem('navOpen');
		setVisible((storedNavOpen === 'false' ? false : true) || false);
	}, []);

	return (
		<>
			{visible !== null && (
				<nav>
					<div>
						<Link href='/admin'>{visible && <span>Admin</span>}</Link>
						<div>
							{navItems.map((item) => {
								return (
									<Link key={item.href} href={item.href}>
										<item.icon size={24} />
										{visible && <span>{item.label}</span>}
									</Link>
								);
							})}
						</div>
					</div>
					<button>
						{visible ? (
							<RiMenuFoldFill
								onClick={() => {
									setVisible(false),
										localStorage.setItem('navOpen', JSON.stringify(false));
								}}
								size={25}
							/>
						) : (
							<RiMenuUnfoldFill
								onClick={() => {
									setVisible(true),
										localStorage.setItem('navOpen', JSON.stringify(true));
								}}
								size={25}
							/>
						)}
					</button>
				</nav>
			)}
		</>
	);
};

export default AdminNav;
