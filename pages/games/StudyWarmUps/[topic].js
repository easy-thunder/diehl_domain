// pages/games/StudyWarmUps/Kubernetes/index.tsx
import { useState, useEffect } from "react";
import styles from "./kubernetes.module.css";
import TextInput from "@/components/utility/Forms/textInput/TextInput"; 

  
export default function Quizzes({title, questions}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);



  const current = questions[currentIndex];
  const isCorrect = userInput.trim().toLowerCase() === current.answer.toLowerCase();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === "Return") {
        e.preventDefault();
        if (isCorrect) {
          setCurrentIndex((i) => Math.min(i + 1, questions.length - 1));
          setUserInput("");
          setShowHint(false);
          setShowAnswer(false);
        } else {
          setShowHint(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCorrect, questions.length]);


  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{title}</h1>

      <div className={styles.card}>
        <p className={styles.prompt}>{current.prompt}</p>
        <div className={isCorrect ? styles.inputWrapperCorrect : styles.inputWrapper}>

            <TextInput
            label="Your Answer"
            placeholder="Type your answer here"
            name="userInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            customLabelStyle={{ color: "#A77B3A" }}
            />
        </div>

        {showHint && (
          <div className={styles.hint}>
            <strong>Hint:</strong> {current.hint.join(" | ")}
          </div>
        )}

        <div className={styles.buttonRow}>
          <button className={styles.button} onClick={() => setShowHint(true)}>
            Show Hint
          </button>
          <button
            className={styles.button}
            onClick={() => setShowAnswer(true)}
          >
            Show Answer
          </button>
        </div>

        {showAnswer && (
          <div className={styles.answer}>
            <strong>Answer:</strong> {current.answer}
          </div>
        )}

        <div className={styles.buttonRow}>
          <button
            className={styles.navButton}
            onClick={() => {
              setCurrentIndex((i) => Math.max(i - 1, 0));
              setUserInput("");
              setShowHint(false);
              setShowAnswer(false);
            }}
            disabled={currentIndex === 0}
          >
            Back
          </button>

          <button
            className={styles.navButton}
            onClick={() => {
              setCurrentIndex((i) => Math.min(i + 1, questions.length - 1));
              setUserInput("");
              setShowHint(false);
              setShowAnswer(false);
            }}
            disabled={currentIndex === questions.length - 1}
          >
            Next
          </button>
        </div>
      </div>

      <div className={styles.directory}>
        {questions.map((q, i) => (
          <button
            key={q.id}
            className={`${styles.dirButton} ${i === currentIndex ? styles.active : ""}`}
            onClick={() => {
              setCurrentIndex(i);
              setUserInput("");
              setShowHint(false);
              setShowAnswer(false);
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}


import allQuestionSets from "@/lib/studyGuides/studyGuides";

export async function getStaticProps(context) {
  const { topic } = context.params;
  const questions = allQuestionSets[topic]?.questions || [];
  const title = allQuestionSets[topic]?.title || "Study Guide";

  return {
    props: {
      questions,
      title,
    },
  };
}

export async function getStaticPaths() {
  const paths = Object.keys(allQuestionSets).map((topic) => ({
    params: { topic },
  }));

  return {
    paths,
    fallback: false,
  };
}