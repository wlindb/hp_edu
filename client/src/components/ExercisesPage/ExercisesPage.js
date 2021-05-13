import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import ProgressCard from '../ProgressCard/ProgressCard';
import ExerciseNavbar from '../ExerciseNavbar/ExerciseNavbar';


export const ExercisesPage = (props) => {

    const useRadioButtons = (name) => {
        const [value, setState] = useState(null);
      
        const handleChange = e => {
          setState(e.target.value);
        };
      
        const inputProps = {
          name,
          type: "radio",
          onChange: handleChange
        };
      
        return [value, inputProps];
    }

    const [answerValue, answerProps] = useRadioButtons("answers");
    const [isShowAnswerClicked, setShowAnswer] = useState(false);

    const [exercises, setExercises] = useState([
        {
            "sub_category":["Sannolikhet"],
            "exercise_id":"2020-10-25_3_14",
            "category":"KVA",
            "questions":[{
                "answer_options":["A","B","C","D"],
                "difficulty":{"$numberDouble":"0.5"},
                "question":"Tre vanliga sexsidiga tärningar kastas slumpmässigt en gång. \\n Kvantitet I: Sannolikheten att få tre femmor \\n Kvantitet II: Sannolikheten att summan av det tärningarna visar är 15",
                "correct_answer":{"$numberInt":"1"},
                "solution":"Sannolikheten betecknas (Gynnsamma utfall)/(Möjliga utfall) \\n Antalet möjliga utfall är lika för Kvantitet I och Kvantitet II. \\n Men det finns enbart ett gynnsamt utfall för Kvantitet I: 1 (samtliga tärningar visar 5) \\n medan det för Kvantitet II finns fler (15=5+5+5=6+6+3).\n Kvantitet II måste därför vara större."}]
        },
        {
        "sub_category":["Ekvationer","Prioriteringsregler"],
        "exercise_id":"2020-10-25_3_1",
        "category":"XYZ",
        "questions":[{
            "answer_options":["6","33","66","132/7"],
            "difficulty":0.5,
            "question":"Vilket värde har x om 5x + 66 = y/2 och y = 12x?",
            "correct_answer":2,
            "solution": "3/7 > 3/8 \n 3/7 + 5/8 > 3/8 + 5/8 = 1"
        }]
    }]);
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];

    return (
        <div className="exercisepage-container">
            <ExerciseNavbar/>
            <div className="exercise-container">
                <div className="exercise-content">
                    <div className="exercise-card">
                        <section className="exercise-header">
                            <h1>{exercises[0].category}</h1>
                            {exercises[0].sub_category.map(sub_cat => <p>{sub_cat}</p>)}
                            <p>{exercises[0].exercise_id}</p>
                        </section>
                        <section className="exercise-body">
                            {exercises[0].questions[0].question.split('\\n').map(line => <p>{line}</p>)}
                        </section>
                        <div className="exercise-answer">
                            <div className="exercise-answer-options">
                                {exercises[0].questions[0].answer_options.map((ans, idx) => 
                                    <>
                                        <input
                                            id={idx}
                                            value={ans}
                                            checked={answerValue === ans}
                                            {...answerProps}
                                            />
                                        <label for={idx}>{alphabet[idx]}: {ans}</label>

                                    </>
                                )}
                            </div>
                            <button className="btn-primary" onClick={() => setShowAnswer(!isShowAnswerClicked)} >{isShowAnswerClicked ? 'Dölj svar' :  'Visa svar'}</button>
                        </div>
                    </div>
                    <div className={`exercise-solution ${isShowAnswerClicked ? 'is-visible' : 'is-not-visible'}`}>{exercises[0].questions[0].solution.split('\\n').map(line => <p>{line}</p>)}</div>
                </div>
            </div>
        </div>
    )
}

ExercisesPage.propTypes = {};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {} // TODO: Actions for ExercisesPage
)(ExercisesPage)