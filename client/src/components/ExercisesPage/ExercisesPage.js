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

    const [exercises, setExercises] = useState([{
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
                            {exercises[0].questions[0].question}
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
                            <button className="btn-primary">Visa svar</button>
                        </div>
                    </div>
                    <div className="exercise-solution">{exercises[0].questions[0].solution}</div>
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