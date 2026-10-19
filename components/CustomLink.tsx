import Link from 'next/link';

export default function CustomLink({
  as,
  href,
  children,
  ...otherProps
}: {
  as: string;
  href: string;
  children: React.ReactNode;
  [key: string]: unknown;
}) {
  return (
    <Link as={as} href={href}>
      <a {...otherProps}>{children}</a>
    </Link>
  );
}
