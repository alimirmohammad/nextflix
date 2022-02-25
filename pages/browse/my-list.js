import Head from "next/head";
import NavBar from "../../components/nav/navbar";

import SectionCards from "../../components/card/section-cards";
import { getMyListVideos } from "../../lib/videos";
import styles from "../../styles/MyList.module.css";
import { getUserIdFromToken } from "../../lib/utils";

export default function MyList({ myListVideos }) {
  return (
    <div>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="My List"
            videos={myListVideos}
            size="small"
            shouldWrap
            dontScale
          />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const token = req.cookies.token;
    const userId = getUserIdFromToken(token);
    const videos = await getMyListVideos(userId, token);
    return { props: { myListVideos: videos } };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
