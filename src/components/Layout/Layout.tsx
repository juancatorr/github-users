import Link from 'next/link';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>
        <nav className={styles.layout__nav}>
          <Link
            href="/users"
            className={styles.layout__logo}
          >
            GitHub Users
          </Link>
        </nav>
      </header>

      <main className={styles.layout__main}>
        {children}
      </main>

      <footer className={styles.layout__footer}>
        <div className={styles.layout__footer_content}>
          <p>
            &copy; {new Date().getFullYear()} GitHub Users
            Explorer
          </p>
        </div>
      </footer>
    </div>
  );
}
