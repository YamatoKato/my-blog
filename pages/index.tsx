import Link from "next/link";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import styles from "../styles/Home.module.css";
import {getPostsData, MdFileData} from "../lib/post";
import Head from "next/head";

// SSGの場合(特有)
export async function getStaticProps() {
  const allPostsData: MdFileData[] = getPostsData();
  console.log(allPostsData);
  
  return {
    props: {
      allPostsData,
    }
  }
}

export default function Home({allPostsData}) {
  return (
  <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyles.headingMd}>
      <p>
        情報系在学の学生です。【趣味】プレミアリーグ観戦　【興味】Web技術,ブロックチェーン
      </p>
    </section>

    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2>ブログ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({id,title,date,thumbnail}) => (
          <article key={id}>
            <Link href={`/posts/${id}`}>
              <img src={`${thumbnail}`} className={styles.thumbnailImage}/>
            </Link>
            <Link href={`/posts/${id}`} className={utilStyles.boldText}>
              {title}
            </Link>
            <br />
            <small className={utilStyles.lightText}>{date}</small>
          </article>
        ))}
      </div>
    </section>
  </Layout>
  );
}
