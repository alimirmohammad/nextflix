import { useRouter } from "next/router";
import Modal from "react-modal";
import clsx from "classnames";
import styles from "../../styles/Video.module.css";
import { getVideosById } from "../../lib/videos";
import Navbar from "../../components/nav/navbar";
import Like from "../../components/icons/like-icon";
import DisLike from "../../components/icons/dislike-icon";
import { useEffect, useState } from "react";

Modal.setAppElement("#__next");

export default function VideoPage({ video }) {
  const router = useRouter();
  const { id } = router.query;
  const { title, channelTitle, description, publishTime, viewCount } = video;
  const [likeStatus, setLikeStatus] = useState("none");

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/stats?videoId=${id}`);
      const data = await res.json();
      if (data.video?.favorited === 0) setLikeStatus("dislike");
      if (data.video?.favorited === 1) setLikeStatus("like");
    })();
  }, [id]);

  async function handleToggleLike() {
    await fetch(`/api/stats?videoId=${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        favorited: likeStatus === "like" ? null : 1,
      }),
    });
    setLikeStatus((prev) => (prev === "like" ? "none" : "like"));
  }

  async function handleToggleDislike() {
    await fetch(`/api/stats?videoId=${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        favorited: likeStatus === "dislike" ? null : 0,
      }),
    });
    setLikeStatus((prev) => (prev === "dislike" ? "none" : "dislike"));
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}>
        <iframe
          id="player"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="360"
          src={`http://www.youtube.com/embed/${id}?controls=0&rel=1&origin=http://example.com`}
          frameBorder="0"
        />

        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike}>
              <div className={styles.btnWrapper}>
                <Like selected={likeStatus === "like"} />
              </div>
            </button>
          </div>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <DisLike selected={likeStatus === "dislike"} />
            </div>
          </button>
        </div>

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
