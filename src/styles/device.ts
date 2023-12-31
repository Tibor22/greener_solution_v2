const size = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	mobileXL: '576px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '1800px',
	desktopL: '2560px',
};

export const device = {
	mobileS: `@media (min-width: ${size.mobileS})`,
	mobileM: `@media (min-width: ${size.mobileM})`,
	mobileL: `@media (min-width: ${size.mobileL})`,
	mobileXL: `@media (min-width: ${size.mobileXL})`,
	tablet: `@media (min-width: ${size.tablet})`,
	laptop: `@media (min-width: ${size.laptop})`,
	laptopL: `@media (min-width: ${size.laptopL})`,
	desktop: `@media (min-width: ${size.desktop})`,
	desktopL: `@media (min-width: ${size.desktop})`,
};

//use case

//  @media ${device.laptop} {
//   flex-direction: row;
//   }
