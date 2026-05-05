export const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/about/(.*)',
  '/guidelines',
  '/quiz',
  '/contact',
  '/dashboard',
  '/faq',
];

const PUBLIC_ROUTE_REGEXES = PUBLIC_ROUTES.map(
  (pattern) => new RegExp(`^${pattern}$`)
);

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTE_REGEXES.some((re) => re.test(pathname));
}
