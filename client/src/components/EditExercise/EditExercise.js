import React, { useState, useEffect } from 'react';
import NumberFormat from "react-number-format"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CloseButton from 'react-bootstrap/CloseButton';
import { Container, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import QuestionModal from './QuestionModal';
import { connect } from "react-redux";
import { createNewExercise } from "../../actions/exerciseActions";

const EditExercise = ({ currentExercise, setPreview, createNewExercise, ...props }) => {

    const [id, setId] = useState('YYYY-MM-DD_PP_NN');
    const [session, setSession ] = useState('');
    const [exerciseIndex, setExerciseIndex ] = useState('');
    const [question, setQuestion ] = useState({
        question: [],
        answer_options: [],
        solution: [],
        correct_answer: 1,
      });
    const [showQuestionsModal, setShowQuestionModal] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);

    // const [currentQuestion, setCurrentQuestion] = useState({});

    //exercise.exercises_meta.quant
    const { exercises_meta, section, category: current_category } = useSelector(state => state.exercise)
    const [ all_sub_categories, setAllSubCategories] = useState([]);
    const categoriesOptions =  [{ value: 'XYZ', label: 'XYZ' }, { value: 'KVA', label: 'KVA' }, { value: 'NOG', label: 'NOG' }, { value: 'DTK', label: 'DTK' }, { value: 'ORD', label: 'ORD' }, { value: 'LÄS', label: 'LÄS' }, { value: 'MEK', label: 'MEK' }, { value: 'ELF', label: 'ELF' }] 

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
      console.table(currentExercise);
      setExercise(currentExercise);
      const type = section === "kvant" ? "quant" : "verb";
      const { sub_category:s } = exercises_meta[type].find(e => e._id === current_category);
      let s_cats = s.map(e =>  ({value: e.name, label: e.name}));
      setAllSubCategories(s_cats);
    }, [currentExercise]);

    const handleSubmit = e => {
        console.log('form submit');
        e.preventDefault();
        createNewExercise({exercise});
        console.log('efter');
        // TODO: Action to submit update 
        // setPreview(exercise);
    };

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

    const onModalSubmit = (question, index) => {
      let newQuestions = index < exercise.questions.length ? exercise.questions.map((q,i) => i === index ? question : q) : [...exercise.questions, question];
      console.table(question);
      console.log(index);
      setExercise({
        ...exercise,
        questions: newQuestions
      })
      console.table(newQuestions);
    };
    
    // "2020-10-25_3_1"
    const onIdChange = e => {
      let value = e.target.value
      if (value.length === 14) setId(value);
      setExercise({
        ...exercise,
        exercise_id: value 
      });
    };

    const handleSelect = (selectedValues) => {
      const selected_sub_categories = selectedValues.map(v => v.value);
      setExercise({
        ...exercise,
        sub_category: selected_sub_categories
      });
    }

    const onQuestionClick = (question, idx) => {
      setQuestionIndex(idx);
      setQuestion(question);
      setShowQuestionModal(true);
    };

    const onClickRemoveQuestion = index => {
      const newQuestions = exercise.questions.filter((q,i) => i !== index);
      setExercise({
        ...exercise,
        questions: newQuestions
      });
    };

    const handleExerciseChange = (key, value) => {
      setExercise({
        ...exercise,
        [key]: value
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
                  placeholder={exercise.exercise_id.length > 0 ? exercise.exercise_id : "YYYY-MM-DD_P_NN"}
                />
              </Form.Group>
              <Form.Group>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder='Category'
                  defaultValue={categoriesOptions.find(({value}) => value === exercise.category)}
                  isSearchable={true}
                  name="category"
                  options={categoriesOptions}
                  onChange={(option) => handleExerciseChange('category', option.value)}
                />
                <Select
                    isMulti
                    placeholder='Sub Category'
                    value={exercise.sub_category.map(c => ({value: c, label: c}))}
                    closeMenuOnSelect={false}
                    options={all_sub_categories}
                    onChange={handleSelect}
                    className='basic-multi-select'
                    classNamePrefix='select'
                    />
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
                <Form.Label htmlFor="description_header">Description Body:</Form.Label>
                <Form.Control as="textarea"
                  rows={4}
                  className="form-control"
                  id="description_body"
                  type="text"
                  name="description_body"
                  value={exercise.description.description_body.join('\n')}
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
                  as="textarea"
                  rows={1}
                  className="form-control"
                  id="img_description"
                  type="text"
                  name="img_description"
                  value={exercise.img_description}
                  onChange={onArrayChange}
                />
              </Form.Group>
              <Form.Group>
                <h3>Questions</h3>
                <div className='d-flex justify-content-between'>
                  <div className='mx-1'>
                    {exercise.questions.map((q, i) =>  {
                      return (
                        <ButtonGroup size="sm" className="mb-3" key={i}>
                          <Button onClick={() => onQuestionClick(q, i)}>
                            Question {i}
                          </Button>
                          <Button className='btn-close' onClick={() => onClickRemoveQuestion(i)}/>
                        </ButtonGroup>
                      )
                    })}
                  </div>
                <Button onClick={() => onQuestionClick({
                    question: [],
                    answer_options: [],
                    solution: [],
                    correct_answer: 1,
                  }, exercise.questions.length)}>
                  Add Question
                </Button>
                </div>
                <QuestionModal
                  question={question} 
                  show={showQuestionsModal}
                  setQuestion={setQuestion}
                  onHide={() => setShowQuestionModal(false)}
                  onSubmit={onModalSubmit}
                  index={questionIndex}
                  type={questionIndex === exercise.questions.length ? "Add" : "Edit"}
                  />
              </Form.Group>
              <Form.Group className="form-group mt-5 float-end">
                <ButtonGroup className=''>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    >
                    Submit
                  </Button>
                  <Button
                    variant="outline-success"
                    size='md'
                    // className="btn-secondary"
                    onClick={() => setPreview(exercise)}
                    >
                    Preview
                  </Button>
                  <Button
                    variant="outline-danger"
                    size='md'
                    onClick={() => setPreview(null)}
                    >
                    Discard changes
                  </Button>
                </ButtonGroup>
              </Form.Group>
              
            </Form>
            <div>
                <pre>{JSON.stringify(exercise, null, "\t")}</pre>
            </div>
        </Container>
    )
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  messages: state.messages,
  exercise: state.exercise,
  category: state.category,
  sub_category: state.sub_category
});

export default connect(
  mapStateToProps,
  { createNewExercise }
)(EditExercise);