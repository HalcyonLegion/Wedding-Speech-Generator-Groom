import Head from "next/head";
import { useState } from "react";
import { Fragment } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [who, setWho] = useState("");
const [bridename, setBridename] = useState("");
const [groomname, setGroomname] = useState("");
const [duration, setDuration] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          who: who,
          bridename: bridename,
          groomname: groomname,
          duration: duration
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setWho("");
      setBridename("");
      setGroomname("");
      setDuration("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Wedding Speech Generator</title>
        <link rel="icon" href="\AI_SPEECHES.png" />
      </Head>

      <main className={styles.main}>
        <img src="\AI_SPEECHES.png" className={styles.icon} />
        <h3>Generate a Speech!</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="who"
            placeholder="Who is Giving This Speech?"
            value={who}
            onChange={(e) => setWho(e.target.value)}
          />
          <input
            type="text"
            name="bridename"
            placeholder="What is the Bride's Name?"
            value={bridename}
            onChange={(e) => setBridename(e.target.value)}
          />
          <input
            type="text"
            name="groomname"
            placeholder="What is the Groom's Name?"
            value={groomname}
            onChange={(e) => setGroomname(e.target.value)}
          />
          <input
            type="text"
            name="duration"
            placeholder="How long have they known the couple?"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <input type="submit" value="Generate Speech" />
        </form>
        <div className={styles.result}>
        {result ? result.split('.').map((sentence, index) => (
        <Fragment key={index}>
        {sentence}.
        {index !== result.split('.').length - 1 && <br />}
        </Fragment>
        )) : 'No result to display'}
        </div>
      </main>
    </div>
  );
}
