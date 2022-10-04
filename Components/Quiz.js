import React, { useState } from "react"

export default function Quiz(props) {
    const [countCorrectAnswer, setCountCorrectAnswer] = useState(0)
    const [selectedId, setSelectedId] = useState([])

    function htmlDecode(input) {
        const doc = new DOMParser().parseFromString(input, "text/html")
        return doc.documentElement.textContent;
    }

    function handleClick(id) {
        setSelectedId(prevSelectedId => [...prevSelectedId, id])
        const option = props.quizElements.map(item => item.correctAnswerId)
        if (option.includes(id)) {
            setCountCorrectAnswer(prevCountCorrectAnswer => prevCountCorrectAnswer + 1)
        }
    }
 
    return (
        <div>
            <div className="quiz-section">
                {props.quizElements.map(quiz => (
                    <div key={quiz.id}>
                        <h3 className="question" key={quiz.question}>
                            {htmlDecode(quiz.question)}
                        </h3>
                        {
                            quiz.answers.map(answer => {
                                return (
                                    <button className="options" onClick={() => handleClick(answer.id)} key={answer.id}
                                        id={answer.id} >{htmlDecode(answer.value)}
                                    </button>
                                )
                            })
                        }
                        <hr />
                    </div>
                ))}

                <div className="check-answer-btn">
                    {props.quizEnded ? <h2>Your score is {countCorrectAnswer}/5.</h2> : ""}
                    <button className="blue-btn" onClick={props.checkAnswers} >{!props.quizEnded ? "Check Answers" : "Play Again"} </button>
                </div>
            </div>
        </div>
    )

}
