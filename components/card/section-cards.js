import Link from "next/link";
import styles from "./section-cards.module.css";
import Card from "./card";
import clsx from "classnames";

export default function SectionCards({
  title,
  videos = [],
  size,
  shouldWrap = false,
  dontScale = false,
}) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={clsx(styles.cardWrapper, { [styles.wrap]: shouldWrap })}>
        {videos.map((video, index) => (
          <Link key={index} href={`/video/${video.id}`}>
            <a>
              <Card
                id={index}
                imgUrl={video.imgUrl}
                size={size}
                dontScale={dontScale}
              />
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
}
