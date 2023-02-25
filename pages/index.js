import Head from "next/head";
import { useState } from "react";
import { Fragment } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [tone, setTone] = useState("");
  const [groom, setGroom] = useState("");
  const [bride, setBride] = useState("");
  const [duration, setDuration] = useState("");
  const [metstory, setMetstory] = useState("");
  const [feeling, setFeeling] = useState("");
  const [times123, setTimes123] = useState("");
  const [adventures, setAdventures] = useState("");
  const [future, setFuture] = useState("");
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
          tone: tone,
          groom: groom,
          bride: bride,
          duration: duration,
          metstory: metstory,
          feeling: feeling,
          times123: times123,
          adventures: adventures,
          future: future
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setTone("");
      setGroom("");
      setBride("");
      setDuration("");
      setMetstory("");
      setFeeling("");
      setTimes123("");
      setAdventures("");
      setFuture("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Wedding Speech Generator - Groom</title>
        <link rel="icon" href="\AI_SPEECHES.png" />
      </Head>

      <main className={styles.main}>
        <img src="\AI_SPEECHES.png" className={styles.icon} />
        <h3>Generate a Speech!</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="tone"
            placeholder="What is the Tone of this Speech?"
            value={tone}
            onChange={(e) => setTone(e.target.value)}/>
          <input
            type="text"
            name="groom"
            placeholder="What is the Groom's Name?"
            value={groom}
            onChange={(e) => setGroom(e.target.value)}/>
          <input
            type="text"
            name="bride"
            placeholder="What is the Bride's Name?"
            value={bride}
            onChange={(e) => setBride(e.target.value)}/>
          <input
            type="text"
            name="duration"
            placeholder="How long were you engaged?"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}/>
            <input
            type="text"
            name="metstory"
            placeholder="How did you meet your Bride?"
            value={metstory}
            onChange={(e) => setMetstory(e.target.value)}/>
          <input
            type="text"
            name="feeling"
            placeholder="How did you feel about asking her Father for his blessing?"
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}/>
          <input
            type="text"
            name="times123"
            placeholder="List all the times the Bride has been there for you?"
            value={times123}
            onChange={(e) => setTimes123(e.target.value)}/>
          <input
            type="text"
            name="adventures"
            placeholder="What are some adventures you've been on together?"
            value={adventures}
            onChange={(e) => setAdventures(e.target.value)}/>
             <input
            type="text"
            name="future"
            placeholder="What are your plans for the future?"
            value={future}
            onChange={(e) => setFuture(e.target.value)}/>
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
