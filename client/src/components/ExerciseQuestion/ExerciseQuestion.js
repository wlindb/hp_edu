import React, { useState } from 'react';
import PropTypes from "prop-types";

const ExerciseQuestion = ({ question }) => {

    const [isShowAnswerClicked, setShowAnswer] = useState(false);
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];

    return (
        <>
            <section className="exercise-body">
                {question.question.split('\\n').map(line => <p>{line}</p>)}
            </section>
            <div className="exercise-answer">
                <div className="exercise-answer-options">
                    {question.answer_options.map((ans, idx) => 
                    <button className="btn-secondary">{alphabet[idx]}: {ans}</button>
                    )}
                </div>
                <a className="btn-primary" onClick={() => setShowAnswer(!isShowAnswerClicked)} >{isShowAnswerClicked ? 'Dölj lösningsförslag' :  'Visa lösningsförslag'}</a>
            </div>
            <div className={`exercise-solution ${isShowAnswerClicked ? 'is-visible' : 'is-not-visible'}`}>{question.solution.split('\\n').map(line => <p>{line}</p>)}</div>
        </>
    )
}

ExerciseQuestion.propTypes = {
    question: PropTypes.object.isRequired
};

export default ExerciseQuestion;