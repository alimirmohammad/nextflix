import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./navbar.module.css";

export default function Navbar({ username }) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  function goHome(e) {
    e.preventDefault();
    router.push("/");
  }

  function goToMyList(e) {
    e.preventDefault();
    router.push("/browse/my-list");
  }

  function toggleDropdown(e) {
    e.preventDefault();
    setShowDropdown((prev) => !prev);
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="Netflix logo"
                width={128}
                height={34}
              />
            </div>
          </a>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={goHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={goToMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={toggleDropdown}>
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/expand_more.svg"
                alt="Expand more"
                width={24}
                height={24}
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <Link href="/login">
                  <a className={styles.linkName}>Sign out </a>
                </Link>
                <div className={styles.lineWrapper} />
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
