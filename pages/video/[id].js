import { useRouter } from "next/router";
import Modal from "react-modal";
import clsx from "classnames";
import styles from "../../styles/Video.module.css";
import { getVideosById } from "../../lib/videos";
import Navbar from "../../components/nav/navbar";

Modal.setAppElement("#__next");

export default function VideoPage({ video }) {
  const router = useRouter();
  const { id } = router.query;
  const { title, channelTitle, description, publishTime, viewCount } = video;

  return (
    <div className={styles.container}>
      <Navbar />
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="player"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="360"
          src={`http://www.youtube.com/embed/${id}?controls=0&rel=1&origin=http://example.com`}
          frameBorder="0"
        />

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Channel: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const video = await getVideosById(id);
  return { props: { video }, revalidate: 10 };
}

export async function getStaticPaths() {
  const bannerVideoIds = ["zAJ6_lmr_HQ", "RbIxYm3mKzI", "wRatBqKO_Zc"];
  const paths = bannerVideoIds.map((id) => ({ params: { id } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}
