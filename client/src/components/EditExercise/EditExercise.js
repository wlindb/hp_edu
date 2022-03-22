import React, { useState, useEffect } from 'react';
import NumberFormat from "react-number-format"
import Button from 'react-bootstrap/Button';
import { Container, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const EditExercise = ({ currentExercise }) => {

    const [id, setId] = useState('YYYY-MM-DD_PP_NN');
    const [session, setSession ] = useState('');
    const [exerciseIndex, setExerciseIndex ] = useState('');
    const [question, setQuestion ] = useState({
        question: [],
        answer_options: [],
        solution: [],
        correct_answer: 1
      });

    //exercise.exercises_meta.quant
    const { exercises_meta, section, category: current_category } = useSelector(state => state.exercise)
    const [ all_sub_categories, setAllSubCategories] = useState([]);

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

    const quantOrVerb = (section) => {
      if(section === "XYZ" || section === "KVA" || section === "NOG" || section === "DTK") {
        return "quant";
      } else {
        return "verb";
      }
    }

    useEffect(() => {
      // const currEx = JSON.stringify(JSON.parse(currentExercise));
      console.table(currentExercise);
      setExercise(currentExercise);
      const type = section === "kvant" ? "quant" : "verb";
      const { sub_category:s } = exercises_meta[type].find(e => e._id === current_category);
      let s_cats = s.map(e => e.name);
      setAllSubCategories(s_cats);
    }, []);

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
        <Container className="bg-light rounded m-1">
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor="date">Exercise ID: </Form.Label>
                <NumberFormat
                  className='form-control'
                  format={"####-##-##_#_##"}
                  onChange={e => onIdChange(e)}
                  placeholder="YYYY-MM-DD_P_NN"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="sub_category">Sub Category:</Form.Label>
                <Form.Control
                  className="form-control"
                  id="sub_category"
                  name="sub_category"
                  type="text"
                  value={exercise.sub_category}
                  onChange={onArrayChange}
                />
                {all_sub_categories.map(e =>{
                  return <Form.Check 
                            type="checkbox"
                            id={e}
                            label={e}
                            defaultChecked={true}
                          />
                })}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="description_header">Description Header:</Form.Label>
                <Form.Control
                  className="form-control"
                  id="description_header"
                  type="text"
                  name="description_header"
                  value={exercise.description.description_header}
                  onChange={handleDescriptionChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="img_src">Image Source:</Form.Label>
                <Form.Control
                  className="form-control"
                  id="img_src"
                  type="text"
                  name="img_src"
                  value={exercise.img_src.toString()}
                  onChange={onArrayChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="img_description">Image description :</Form.Label>
                <Form.Control
                  className="form-control"
                  id="img_description"
                  type="text"
                  name="img_description"
                  value={exercise.img_description}
                  onChange={onArrayChange}
                />
              </Form.Group>
              <h3>Add Question</h3>
              <Form.Group>
                <Form.Label htmlFor="question">Question :</Form.Label>
                <Form.Control as="textarea" 
                  rows={3}
                  id="question"
                  type="text"
                  name="question"
                  value={question.question.toString().replace(',', '\n')}
                  onChange={onQuestionChanged}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="answer_options">Answer Options :</Form.Label>
                <Form.Control
                  className="form-control"
                  id="answer_options"
                  type="text"
                  name="answer_options"
                  value={question.answer_options}
                  onChange={onQuestionChanged}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="solution">Solution :</Form.Label>
                <Form.Control as="textarea"
                  rows={4}
                  className="form-control"
                  id="solution"
                  type="text"
                  name="solution"
                  value={question.solution}
                  onChange={onQuestionChanged}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="correct_answer">Correct answer index :</Form.Label>
                <Form.Control
                  className="form-control"
                  id="correct_answer"
                  type="text"
                  name="correct_answer"
                  value={question.correct_answer}
                  onChange={onQuestionChanged}
                />
                <button className="btn-secondary" onClick={onClickAddQuestion}>Add question</button>
                <button className="btn-secondary" onClick={clearQuestion}>Clear question</button>
              </Form.Group>
              <Form.Group className="form-group">
                <button
                //   onClick={}
                  type="submit"
                  className="btn-primary"
                >
                  Submit
                </button>
              </Form.Group>
            </Form>

            <div>
                {JSON.stringify(exercise).split(',').map((o, idx) => <p key={idx}>{o}</p>)}
                {/* {Object.keys(exercise).map(k => <p>{k}: {exercise[k].toString()}</p>)} */}
            </div>
        </Container>
    )
}

export default EditExercise;