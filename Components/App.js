import React, { useState, useEffect } from "react"
import Start from "./Components/Start"
import Quiz from "./Components/Quiz"
import { nanoid } from "nanoid"

export default function App() {
    const [quizData, setQuizData] = useState([])
    const [startQuiz, setStartQuiz] = useState(false)
    const [quizEnded, setQuizEnded] = useState(false)

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=medium")
            .then(response => response.json())
            .then(respData => {
                const Data = respData.results.map(question => {
                    const correctAnswer = {
                        id: nanoid(),
                        value: question.correct_answer,
                    }

                    const options = question.incorrect_answers.map(item => ({
                        id: nanoid(),
                        value: item,
                    }))

                    options.push(correctAnswer)
                    options.sort(() => Math.random() - 0.5)
                    const questions = {
                        id: nanoid(),
                        question: question.question,
                        answers: options,
                        correctAnswerId: correctAnswer.id,
                        selectedAnswerId: null,
                        isDone: false
                    }
                    return questions
                })
                setQuizData(Data)
            }
            )
    }, [])

    function goToStartPage() {
        setStartQuiz(true)
    }

    function checkAnswers() {
        setQuizEnded(true)
        if (quizEnded) {
            setStartQuiz(false)
            setQuizEnded(false)
        }
    }

    return (
        <div>
            {startQuiz ? <Quiz quizElements={quizData}
                quizEnded={quizEnded}
                checkAnswers={checkAnswers} />
                : <Start startQuiz={goToStartPage} />}
        </div>
    )
}
