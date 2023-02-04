import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "yama";
export const siteTitle = "blog";

function Layout({children,home}) {
  return (
  <div className={styles.container}>
    <Head>
      <link rel="icon" href="/favicon.ico"></link>
    </Head>
    <header className={styles.header}>
      {home ? (
        <>
          <img src="/images/profile.JPG"
           className={`${utilStyles.borderCircle}`}
           />
          <h1 className={utilStyles.heading2xl}>{name}</h1>
        </>
      ) : (
        <>
          <img src="/images/profile.JPG"
           className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
           />
          <h1 className={utilStyles.heading2xl}>{name}</h1>
        </>
      )}
    </header>
    <main>{children}</main>
    {home || (
      <div>
        <Link href="/">ホームへ戻る</Link>
      </div>
    )}
  </div>
  );
}

export default Layout;
