import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { addquiz } from "../../api/admin";
import { toast } from "react-toastify";

const CreateQuiz = () => {
    const [questions, setQuestions] = useState([]);

    const initialValues = {
        title: "",
        description: "",
        currentQuestion: {
            question: "",
            options: ["", "", "", ""],
            correct: ""
        }
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        currentQuestion: Yup.object({
            question: Yup.string().required("Question is required"),
            options: Yup.array().of(Yup.string().required("Option is required")).min(4),
            correct: Yup.string().required("Correct answer is required")
        })
    });

    const addQuestion = (values, { setFieldValue }) => {
        if (values.currentQuestion.question &&
            values.currentQuestion.options.every(opt => opt) &&
            values.currentQuestion.correct) {
            setQuestions([...questions, values.currentQuestion]);
            setFieldValue('currentQuestion', initialValues.currentQuestion);
        } else {
            toast.error('Please fill all fields for the question');
        }
    };

    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleSubmit = (values, { setSubmitting }) => {
        if (questions.length < 5) {
            toast.error('Need Minimum 5 questions');
            setSubmitting(false);
            return;
        }
        const data = {
            title: values.title,
            description: values.description,
            questions
        };
        addquiz(data)
            .then(() => {
                toast.success('Quiz created successfully');
            })
            .catch(error => {
                toast.error('Error creating quiz: ' + error.message);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, isSubmitting, setFieldValue }) => (
                <Form className="flex">
                    <div className="w-1/2 p-4 bg-gray-100">
                        <h2 className="text-xl font-bold mb-4">Add Question</h2>
                        <Field
                            name="currentQuestion.question"
                            type="text"
                            placeholder="Enter the question"
                            className="w-full p-2 mb-2 border rounded-md"
                        />
                        <ErrorMessage name="currentQuestion.question" component="div" className="text-red-500" />

                        <FieldArray name="currentQuestion.options">
                            {() => (
                                values.currentQuestion.options.map((_, index) => (
                                    <div key={index}>
                                        <Field
                                            name={`currentQuestion.options.${index}`}
                                            type="text"
                                            placeholder={`Option ${index + 1}`}
                                            className="w-full p-2 mb-2 border rounded-md"
                                        />
                                        <ErrorMessage name={`currentQuestion.options.${index}`} component="div" className="text-red-500" />
                                    </div>
                                ))
                            )}
                        </FieldArray>

                        <div className="mb-2">
                            <label className="block font-semibold mb-1">Correct Answer:</label>
                            <Field
                                as="select"
                                name="currentQuestion.correct"
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Select correct answer</option>
                                {values.currentQuestion.options.map((option, index) => (
                                    <option key={index} value={option}>{option || `Option ${index + 1}`}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="currentQuestion.correct" component="div" className="text-red-500" />
                        </div>
                        <button
                            type="button"
                            onClick={() => addQuestion(values, { setFieldValue })}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                            Add Question
                        </button>
                    </div>

                    <div className="max-w-10 border-2 ml-2"></div>

                    <div className="w-1/2 p-4 overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Quiz Details</h2>
                        <Field
                            name="title"
                            type="text"
                            placeholder="Quiz Title"
                            className="w-full p-2 mb-2 border rounded-md"
                        />
                        <ErrorMessage name="title" component="div" className="text-red-500" />

                        <Field
                            as="textarea"
                            name="description"
                            placeholder="Quiz Description"
                            className="w-full p-2 mb-2 border rounded-md"
                        />
                        <ErrorMessage name="description" component="div" className="text-red-500" />

                        <h3 className="text-lg font-semibold mb-2">Added Questions:</h3>
                        {questions.map((q, index) => (
                            <div key={index} className="mb-2 p-2 bg-gray-200 rounded">
                                <p><strong>Q{index + 1}:</strong> {q.question}</p>
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(index)}
                                    className="text-red-500 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4"
                        >
                            {isSubmitting ? 'Creating Quiz...' : 'Create Quiz'}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CreateQuiz;