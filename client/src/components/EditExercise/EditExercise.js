import React, { useState, useRef } from 'react';
import NumberFormat from "react-number-format"

const EditExercise = () => {

    const [id, setId] = useState('YYYY-MM-DD_PP_NN');
    const [session, setSession ] = useState('');
    const [exerciseIndex, setExerciseIndex ] = useState('');
    const [question, setQuestion ] = useState({
        question: [],
        answer_options: [],
        solution: [],
        correct_answer: 1
      });

    const [ exercise, setExercise ] = useState({
        description: {
          description_body: [],
          description_header: ''
        }, //
        difficulty: 3, //
        sub_category: ['Procent', 'Bråk'], //
        img_src: [], //
        img_description: [], // 
        exercise_id: '', //
        category: '', //
        questions: [
          {
            question: [],
            answer_options: [],
            solution: [],
            correct_answer: 1
          }
        ],
        rateCount: 1,
        rateValue: 3,
        done_exercises: [],
        user_has_done_exercise: false
    });

    const handleSubmit = e => {
        console.log('form submit');
    };

    const onChange = e => {
        setExercise({
            ...exercise,
            [e.target.name]: e.target.value
        });
    }

    const handleDescriptionChange = e => {
        setExercise({
            ...exercise,
            description: {
                ...exercise.description,
                [e.target.name]: e.target.name === 'description_header' ? e.target.value : e.target.value.split('\n')
            }
        });
    };

    const onArrayChange = e => {
        setExercise({
            ...exercise,
            [e.target.name]: e.target.value.split(',')
        });
        console.log(exercise)
    }

    const onClickAddQuestion = e => {
        e.preventDefault();
        setExercise({
            ...exercise,
            questions: [
                ...exercise.questions,
                question
            ]
        });
    }

    const clearQuestion = (e) => {
        e.preventDefault();
        setQuestion({
            question: [],
            answer_options: [],
            solution: [],
            correct_answer: 1
        });
    }

    const onQuestionChanged = e => {
        // question: [],
        // answer_options: [],
        // solution: [],
        // correct_answer: 1
        const { name, value } = e.target;
        if(name === 'correct_answer') {
            console.log('if', name, value)
            setQuestion({
                ...question,
                correct_answer: value 
            })
        } else {
            console.log('else', name, value)
            setQuestion({
                ...question,
                [name]: value.split('\n') 
            })
        }
    }
    
    // "2020-10-25_3_1"
    const onIdChange = e => {
      let value = e.target.value
      if (value.length === 14) setId(value);
      setExercise({
        ...exercise,
        exercise_id: value 
      });
    };

    return (
        <div className="form-container exercise-card">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="date">Exercise ID: </label>
                <NumberFormat
                  format={"####-##-##_#_##"}
                  onChange={e => onIdChange(e)}
                  placeholder="YYYY-MM-DD_P_NN"
                />
              </div>
              <div>
                <label htmlFor="category">category:</label>
                <input
                  className="form-control"
                  id="category"
                  type="text"
                  name="category"
                  value={exercise.category}
                  onChange={onChange}
                />
              </div>
              <div>
                <label htmlFor="sub_category">Sub Category:</label>
                <input
                  className="form-control"
                  id="sub_category"
                  name="sub_category"
                  type="text"
                  value={exercise.sub_category.toString()}
                  onChange={onArrayChange}
                />
              </div>
              <div>
                <label htmlFor="description_header">Description Header:</label>
                <input
                  className="form-control"
                  id="description_header"
                  type="text"
                  name="description_header"
                  value={exercise.description.description_header}
                  onChange={handleDescriptionChange}
                />
              </div>
              <div>
                <label htmlFor="img_src">Image Source:</label>
                <input
                  className="form-control"
                  id="img_src"
                  type="text"
                  name="img_src"
                  value={exercise.img_src.toString()}
                  onChange={onArrayChange}
                />
              </div>
              <div>
                <label htmlFor="img_description">Image description :</label>
                <input
                  className="form-control"
                  id="img_description"
                  type="text"
                  name="img_description"
                  value={exercise.img_description.toString()}
                  onChange={onArrayChange}
                />
              </div>
              <h3>Add Question</h3>
              <div>
                <label htmlFor="question">Question :</label>
                <textarea
                  className="form-control"
                  id="question"
                  type="text"
                  name="question"
                  value={question.question.toString().replace(',', '\n')}
                  onChange={onQuestionChanged}
                />
              </div>
              <div>
                <label htmlFor="answer_options">Answer Options :</label>
                <input
                  className="form-control"
                  id="answer_options"
                  type="text"
                  name="answer_options"
                  value={question.answer_options}
                  onChange={onQuestionChanged}
                />
              </div>
              <div>
                <label htmlFor="solution">Solution :</label>
                <textarea
                  className="form-control"
                  id="solution"
                  type="text"
                  name="solution"
                  value={question.solution}
                  onChange={onQuestionChanged}
                />
              </div>
              <div>
                <label htmlFor="correct_answer">Correct answer index :</label>
                <input
                  className="form-control"
                  id="correct_answer"
                  type="text"
                  name="correct_answer"
                  value={question.correct_answer}
                  onChange={onQuestionChanged}
                />
                <button className="btn-secondary" onClick={onClickAddQuestion}>Add question</button>
                <button className="btn-secondary" onClick={clearQuestion}>Clear question</button>
              </div>
              <div className="form-group">
                <button
                //   onClick={}
                  type="submit"
                  className="btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>

            <div>
                {JSON.stringify(exercise).split(',').map((o, idx) => <p key={idx}>{o}</p>)}
                {/* {Object.keys(exercise).map(k => <p>{k}: {exercise[k].toString()}</p>)} */}
            </div>
        </div>
    )
}

export default EditExercise;