import React, { useState, useEffect } from "react"
import Start from "./Components/Start"
import Quiz from "./Components/Quiz"
import { nanoid } from "nanoid"

function htmlDecode(input) {
    const doc = new DOMParser().parseFromString(input, "text/html")
    return doc.documentElement.textContent;
}

export default function App() {
    const [quizData, setQuizData] = useState([])
    const [startQuiz, setStartQuiz] = useState(false)
    const [refreshData, setRefreshData] = useState(true)

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
                    htmlDecode(options.sort(() => Math.random() - 0.5))

                    const questions = {
                        id: nanoid(),
                        question: htmlDecode(question.question),
                        answers: options,
                        correctAnswerId: correctAnswer.id,
                        selectedAnswerId: null,
                    }
                    return questions
                })
                setQuizData(Data)
            }
            )
    }, [refreshData])

    function goToStartPage() {
        setStartQuiz(true)
    }

    function restartQuiz() {
        setRefreshData(prevRef => !prevRef)
    }

    return (
        <div>
            {startQuiz ? <Quiz quizElements={quizData}
                quizSetter={setQuizData}
                restartQuiz={restartQuiz}
                onClicked={() => setStartQuiz(false)} />
                : <Start startQuiz={goToStartPage} />}
        </div>
    )
}
