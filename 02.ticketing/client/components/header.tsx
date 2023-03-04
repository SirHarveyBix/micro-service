import { link } from 'fs/promises';
import Link from 'next/link';

interface CurrentUser {
  email: string;
}

export default ({ currentUser }: { currentUser: CurrentUser }) => {
  const links = [
    {
      show: !currentUser,
      label: 'Sign Up',
      href: '/auth/signup',
    },
    {
      show: !currentUser,
      label: 'Sign In',
      href: '/auth/signin',
    },
    {
      show: currentUser,
      label: 'Sign Out',
      href: '/auth/signout',
    },
  ]
    .filter((linkConfig) => linkConfig.show)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <p className="nav-link">{label}</p>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <p className="navbar-brand">GitTix</p>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};
