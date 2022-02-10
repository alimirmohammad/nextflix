import Link from "next/link";
import styles from "./section-cards.module.css";
import Card from "./card";

export default function SectionCards({ title, videos = [], size }) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => (
          <Link key={index} href={`/video/${video.id}`}>
            <a>
              <Card id={index} imgUrl={video.imgUrl} size={size} />
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
}
