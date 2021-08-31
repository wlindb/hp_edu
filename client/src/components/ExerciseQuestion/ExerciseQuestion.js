import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const ExerciseQuestion = ({ question }) => {

    const [activeButton, setActiveButton] = useState(-1);
    const [isShowAnswerClicked, setShowAnswer] = useState(false);
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];

    useEffect(() => {
        setActiveButton(-1);
        setShowAnswer(false);
    }, [question])
    
    const handleAnswerOptionClicked = (e, i) => {
        setActiveButton(i)
    };

    const config = {
        loader: { load: ["[tex]/html"] },
        tex: {
          packages: { "[+]": ["html"] },
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"]
          ],
          displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"]
          ]
        }
      };
    

    return (
        <>
        <MathJaxContext config={config} version={3}>
            <section className="exercise-body">
                {/* {question.question.map(line => <p>{line}</p>)} */}
                        {question.question.map(line => <MathJax inline dynamic>{ line } </MathJax>)}
                
            </section>
            <div className="exercise-answer">
                <div className="exercise-answer-options">
                    {question.answer_options.map((ans, idx) => 
                        <button className={`btn-secondary answer-option ${activeButton === idx ? "active" : ""} ${idx === question.correct_answer ? "success" : ""}`}
                                onClick={e => handleAnswerOptionClicked(e, idx)}>
                                    <MathJax>{alphabet[idx]}: {ans} </MathJax>
                        </button>
                    )}
                </div>

                <a className="btn-primary" onClick={() => setShowAnswer(!isShowAnswerClicked)} >
                    {isShowAnswerClicked ? 'Dölj lösningsförslag' :  'Visa lösningsförslag'}
                </a>
            </div>
            <div className={`exercise-solution ${isShowAnswerClicked ? 'is-visible' : 'is-not-visible'}`}>
                {question.solution.length > 0 ?
                    question.solution.map(line => <p>{line}</p>)
                    : <p>Tyvärr finns inget lösningsförslag för denna uppgift</p>}
            </div>
        </MathJaxContext>
        </>
    )
}

ExerciseQuestion.propTypes = {
    question: PropTypes.object.isRequired
};

export default ExerciseQuestion;