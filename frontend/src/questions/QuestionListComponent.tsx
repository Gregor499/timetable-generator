import {Question, TimeAnswer, TimeUnit, WorkdayAnswer} from "../service/models";
import {useEffect, useState} from "react";
import {getTimeUnitList, postTimeAnswer, postWorkdayAnswer} from "../service/apiService";
import TimeAnswerProperties from "./TimeAnswerProperties";
import "./QuestionListComponent.css"

interface QuestionProps {
    question: Question
    answers: Array<TimeAnswer>
    answerCallback: () => void
}

type DisplayQuestionsProps = {
children: React.ReactNode;}

export default function QuestionListComponent(props: QuestionProps) {
    const [timeUnitList, setTimeUnitList] = useState<Array<TimeUnit>>([])
    const [currentTimeAnswer, setCurrentTimeAnswer] = useState<string>()
    const [currentWorkdayAnswer, setCurrentWorkdayAnswer] = useState<string>()

    const [errorMessage, setErrorMessage] = useState("")

    const setTimeAnswer = (questionId: string, question: string, timeInMinutes: number) => {
        const timeAnswer: TimeAnswer = {
            questionId: questionId,
            question: question,
            timeInMinutes: timeInMinutes
        }
        postTimeAnswer(timeAnswer)
            .then(() => props.answerCallback())
            .catch(() => setErrorMessage("error posting answer"))
    }

        const setWorkdayAnswer = (questionId: string, question: string, workdays: Array<boolean>) => {
            const workdayAnswer: WorkdayAnswer = {
                questionId: questionId,
                question: question,
                monday: workdays[0],
                tuesday: workdays[1],
                wednesday: workdays[2],
                thursday: workdays[3],
                friday: workdays[4],
                saturday: workdays[5],
                sunday: workdays[6]

            }
            postWorkdayAnswer(workdayAnswer)
                .then(() => props.answerCallback())
                .catch(() => setErrorMessage("error posting answer"))
        }

    useEffect(() => {
        getTimeUnitList()
            .then(data => setTimeUnitList(data))
            .catch(() => setErrorMessage("timeUnitList does not load"));

        const currentAnswer = props.answers.find(answer => answer.questionId === props.question.id)
        if (currentAnswer) {
            setCurrentTimeAnswer(currentAnswer.time!)
        } else {
            setCurrentTimeAnswer("XX:XX")
        }
    }, [props.answers, props.question.id])

    const timeUnitsToChoose = timeUnitList
        .filter(timeUnit => {
            if (!props.question.previousQuestionId) {
                return true;
            } else {
                const previousQuestionAnswer = props.answers.find(answer => answer.questionId === props.question.previousQuestionId)
                if (previousQuestionAnswer) {
                    const currentTimeAnswerInMinutes = (Number(currentTimeAnswer![0].charAt(0)) * 600 + Number(currentTimeAnswer![0].charAt(1)) * 60 + Number(currentTimeAnswer![0].charAt(3)) * 10
                        + Number(currentTimeAnswer![0].charAt(5)));
                    return (timeUnit.timeInMinutes! >= previousQuestionAnswer.timeInMinutes) && timeUnit.timeInMinutes !== currentTimeAnswerInMinutes;
                } else {
                    return true;
                }
            }
        })
        .map(timeUnit => <TimeAnswerProperties key={timeUnit.id} timeUnit={timeUnit}/>)

    const QuestionType = () => {
        if (props.question.question === "On which days do you work ?"){
                    return (
                    <div>
                    	<span>
                            <input type="checkbox" name="workday" value="monday" id="check1"/>
                            <label htmlFor="check1">monday</label>
                        </span>
                    	<span>
                    	    <input type="checkbox" name="workday" value="tuesday" id="check2"/>
                    	    <label htmlFor="check2">tuesday</label>
                    	</span>
                    	<span>
                            <input type="checkbox" name="workday" value="wednesday" id="check3"/>
                            <label htmlFor="check3">wednesday</label>
                    	</span>
                    	<span>
                            <input type="checkbox" name="workday" value="thursday" id="check4"/>
                            <label htmlFor="check4">thursday</label>
                        </span>
                        <span>
                            <input type="checkbox" name="workday" value="wednesday" id="check5"/>
                            <label htmlFor="check5">friday</label>
                        </span>
                        <span>
                            <input type="checkbox" name="workday" value="wednesday" id="check5"/>
                            <label htmlFor="check5">saturday</label>
                        </span>
                        <span>
                            <input type="checkbox" name="workday" value="wednesday" id="check6"/>
                            <label htmlFor="check6">sunday</label>
                        </span>
                    </div>)
        }

       else{
       return(
       <div>
           <select className="questionAnswer" name={props.question.type} id={props.question.id}
                               onChange={event => setTimeAnswer(props.question.id, props.question.question, Number(event.target.value))}>

                                  value=<TimeAnswerProperties key={currentTimeAnswer} timeUnit={{
                                  time: currentTimeAnswer + "",
                                  length: 15,
                                  end: "24:00"
                              }}/>

                              {timeUnitsToChoose}
           </select>
       </div>)
       }
    }

    return (
        <div className="question">
            <p>{props.question.question}</p>
            {errorMessage && <div>{errorMessage}</div>}
            {QuestionType()}
        </div>
    )
}