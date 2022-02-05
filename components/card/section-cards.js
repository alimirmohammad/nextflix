import styles from './section-cards.module.css'
import Card from "./card";

export default function SectionCards({title, videos, size}) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => <Card key={index} id={index} imgUrl={video.imgUrl} size={size}/>)}
      </div>
    </section>
  )
}