import React from "react"

export default function Start(props) {
    return (
        <div>
            <section className="start-section">
                <h2 className="start-heading">Quizzical</h2>
                <p className="start-info">Click on the button to start the quiz.</p>
                <button className="blue-btn" onClick={props.startQuiz}>Start Quiz</button>
            </section>
        </div>
    )
}
