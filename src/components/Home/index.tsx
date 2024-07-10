import Head from 'next/head';
import Link from 'next/link';
import styles from './Home.module.css';

export default function Homie() {
    return (
        <div className={styles.container}>
            <Head>
                <title>GuestPostSale</title>
                <meta name="description" content="Buy and sell guest posts easily" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="hea_der">
                <nav className="nav_bar">
                    <div className="lo_go">
                        <h1>GuestPostSale</h1>
                    </div>
                    <div className="nav_Links">
                        <Link href="/signin" className="nav_Button">Sign In</Link>
                        <Link href="/signup" className="nav_Button">Sign Up</Link>
                    </div>
                </nav>
            </header>

            <main className={styles.main}>
                <h1>Welcome to GuestPostSale</h1>
                <p>The best place to buy and sell guest posts.</p>
            </main>

            <footer className="foo_ter">
                <p>&copy; 2024 GuestPostSale. All rights reserved.</p>
            </footer>
        </div>
    );
}
