import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { magic } from "../../lib/magic-link";

export default function Navbar() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    (async function getUserEmail() {
      try {
        const { email } = await magic.user.getMetadata();
        setUsername(email);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  function goHome(e) {
    e.preventDefault();
    void router.push("/");
  }

  function goToMyList(e) {
    e.preventDefault();
    void router.push("/browse/my-list");
  }

  function toggleDropdown(e) {
    e.preventDefault();
    setShowDropdown((prev) => !prev);
  }

  async function logout() {
    try {
      await magic.user.logout();
      router.push("/login");
    } catch (e) {
      console.error(e);
    }
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
                <p className={styles.linkName} onClick={logout}>
                  Sign out
                </p>
                <div className={styles.lineWrapper} />
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
