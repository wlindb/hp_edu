import React, { useState } from 'react';
import PropTypes from "prop-types";

const ExerciseQuestion = ({ question }) => {

    const [activeButton, setActiveButton] = useState(-1);
    const [isShowAnswerClicked, setShowAnswer] = useState(false);
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    const handleAnswerOptionClicked = (e, i) => {
        setActiveButton(i)
    };

    return (
        <>
            <section className="exercise-body">
                {question.question.map(line => <p>{line}</p>)}
            </section>
            <div className="exercise-answer">
                <div className="exercise-answer-options">
                    {question.answer_options.map((ans, idx) => 
                        <button className={`btn-secondary ${activeButton === idx ? "active" : ""} ${idx === question.correct_answer ? "success" : ""}`}
                                onClick={e => handleAnswerOptionClicked(e, idx)}>
                                    {alphabet[idx]}: {ans}
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
        </>
    )
}

ExerciseQuestion.propTypes = {
    question: PropTypes.object.isRequired
};

export default ExerciseQuestion;