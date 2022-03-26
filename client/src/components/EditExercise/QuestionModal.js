import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Form from 'react-bootstrap/Form';
import { ButtonGroup } from 'react-bootstrap';
const QuestionModal = ({question, setQuestion, onHide, onSubmit, index, type, ...props}) => {

    const handleSubmit = e => {
        onSubmit(question, index);
        onHide();
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
                // correct_answer: value 
                correct_answer: Number(value)
            })
        } else {
            console.log('else', name, value)
            setQuestion({
                ...question,
                [name]: value.split('\n') 
            })
        }
        // console.table(question);
        // console.log(question.correct_answer)
    }

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton onHide={onHide}>
            <Modal.Title id="contained-modal-title-vcenter">
              {type} Question
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='p-2'>
                    <Form.Label htmlFor="question"><h5>Question</h5></Form.Label>
                    <Form.Control as="textarea" 
                        rows={3}
                        id="question"
                        type="text"
                        name="question"
                        value={question.question.join('\n')}
                        onChange={onQuestionChanged}
                    />
                </Form.Group>
                <Form.Group className='p-2'>
                    <Form.Label htmlFor="answer_options"><h5>Answer Options</h5></Form.Label>
                    <Form.Control as="textarea"
                        rows={4}
                        className="form-control"
                        id="answer_options"
                        type="number"
                        name="answer_options"
                        value={question.answer_options.join('\n')}
                        onChange={onQuestionChanged}
                    />
                </Form.Group>
                <Form.Group className='p-2'>
                <h5>Correct Answer</h5>
                    <ButtonGroup size='lg'>
                        {question.answer_options.map((option, idx) => {
                            return (
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant={'outline-success'}
                                    name="correct_answer"
                                    value={idx}
                                    checked={idx === question.correct_answer}
                                    onChange={onQuestionChanged}>
                                    {option}
                                </ToggleButton>
                            )
                        })}
                    </ButtonGroup>
                </Form.Group>
                <Form.Group className='p-2'>
                    <Form.Label htmlFor="solution"><h5>Solution</h5></Form.Label>
                    <Form.Control as="textarea"
                    rows={8}
                    className="form-control"
                    id="solution"
                    type="text"
                    name="solution"
                    value={question.solution.join('\n')}
                    onChange={onQuestionChanged}
                    />
                </Form.Group>
              </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSubmit}>Submit</Button>
          </Modal.Footer>
        </Modal>
      );
};

export default QuestionModal;