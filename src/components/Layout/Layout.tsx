import Link from 'next/link';
import styles from './Layout.module.scss';

const {
  layout,
  layout__header,
  layout__nav,
  layout__logo,
  layout__main,
  layout__footer,
  layout__footer_content,
} = styles;

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={layout}>
      <header className={layout__header}>
        <nav className={layout__nav}>
          <Link href="/users" className={layout__logo}>
            GitHub Users
          </Link>
        </nav>
      </header>

      <main className={layout__main}>{children}</main>

      <footer className={layout__footer}>
        <div className={layout__footer_content}>
          <p>
            &copy; {new Date().getFullYear()} GitHub Users
            Explorer
          </p>
        </div>
      </footer>
    </div>
  );
}
