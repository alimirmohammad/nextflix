import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import { useState } from "react";

export default function Login() {
  const isLoading = false;
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");

  function handleOnChangeEmail(event) {
    setUserMsg("");
    setEmail(event.target.value);
  }

  function handleLoginWithEmail() {
    if (email) {
    } else {
      setUserMsg("Please enter your Email");
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix Login</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
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
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Login</h1>

          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />

          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
      </main>
    </div>
  );
}
