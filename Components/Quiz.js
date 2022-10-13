import React, { useState } from "react"

export default function Quiz(props) {
    const [quizEnded, setQuizEnded] = useState(false)
    const [countCorrectAnswer, setCountCorrectAnswer] = useState(0)
    
    function handleClick(id, quizId) {
        const option = props.quizElements.map(item => item.correctAnswerId)
        if (option.includes(id)) {
            setCountCorrectAnswer(prevCountCorrectAnswer => prevCountCorrectAnswer + 1)
        }
        props.quizSetter(prevData => {
           return prevData.map(item => item.id===quizId ? {...item, selectedAnswerId: id} : item)
        })
    }
    
    function getMyClass(selectedId, correctId, answerId) {
       if(answerId === selectedId) {
           return {backgroundColor: "#4D5B9E"}
       }
       if(correctId === answerId && quizEnded){
           return {backgroundColor: "green"}
       }
    }
    
    function checkAnswers() {
        setQuizEnded(true)
        if (quizEnded) {
            props.onClicked()
            setQuizEnded(false)
            props.restartQuiz()
        }
    }

    return (
        <div>
            <div className="quiz-section">
                {props.quizElements.map(quiz => (
                   <div key={quiz.id}>
  <h3 className="question" key={quiz.question}>
    {quiz.question}
  </h3>
  {quiz.answers.map(answer => {
    return (
      <button disabled={quizEnded} style={getMyClass(quiz.selectedAnswerId, quiz.correctAnswerId, answer.id)}
        className="options"
        onClick={() => handleClick(answer.id, quiz.id)} key={answer.id}
        id={answer.id}
       >{answer.value}
        <br/> 
        </button>
      )
    })}
  <hr />
</div>
                ))}
<div className="check-answer-btn">
                    <h2> {quizEnded ? `Your score is ${countCorrectAnswer}/5.` : "Select Options To Check Answers"}</h2>
                    <button className="blue-btn" onClick={checkAnswers} >{!quizEnded? "Check Answers" : "Play Again"} </button>
                </div>
            </div>
        </div>
    )

}
