import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import classNames from "classnames";
import styles from "./card.module.css";

const fallbackImage = "/static/movie-fallback.jpeg";

export default function Card({ imgUrl = fallbackImage, size = "medium", id }) {
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const classMap = {
    small: styles.smItem,
    medium: styles.mdItem,
    large: styles.lgItem,
  };
  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  function handleError() {
    setImgSrc(fallbackImage);
  }

  return (
    <div className={styles.container}>
      <motion.div
        whileHover={scale}
        className={classNames(styles.imgMotionWrapper, classMap[size])}
      >
        <Image
          src={imgSrc}
          alt="thumbnail"
          className={styles.cardImg}
          layout="fill"
          onError={handleError}
        />
      </motion.div>
    </div>
  );
}
