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

export default function QuestionListComponent(props: QuestionProps) {
    const [timeUnitList, setTimeUnitList] = useState<Array<TimeUnit>>([])
    const [currentTimeAnswer, setCurrentTimeAnswer] = useState<string>()

    const [monday, setMonday] = useState<boolean>(false)
    const [tuesday, setTuesday] = useState<boolean>(false)
    const [wednesday, setWednesday] = useState<boolean>(false)
    const [thursday, setThursday] = useState<boolean>(false)
    const [friday, setFriday] = useState<boolean>(false)
    const [saturday, setSaturday] = useState<boolean>(false)
    const [sunday, setSunday] = useState<boolean>(false)


    const [errorMessage, setErrorMessage] = useState("")

    const setTimeAnswer = (timeInMinutes: number) => {
        const timeAnswer: TimeAnswer = {
            questionId: props.question.id,
            question: props.question.question,
            timeInMinutes: timeInMinutes
        }
        postTimeAnswer(timeAnswer)
            .then(() => props.answerCallback())
            .catch(() => setErrorMessage("error posting answer"))
    }

    const setWorkdayAnswer = () => {
        const workdayAnswer: WorkdayAnswer = {
            questionId: props.question.id,
            question: props.question.question,
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday

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
                            <input type="checkbox" name="workday" value="monday" id="check1" onChange={event => {setMonday(event.target.checked); setWorkdayAnswer()}}/>
                            <label htmlFor="check1">monday</label>
                        </span>
                    	<span>
                    	    <input type="checkbox" name="workday" value="tuesday" id="check2" onChange={event => {setTuesday(event.target.checked); setWorkdayAnswer()}}/>
                    	    <label htmlFor="check2">tuesday</label>
                    	</span>
                    	<span>
                            <input type="checkbox" name="workday" value="wednesday" id="check3" onChange={event => {setWednesday(event.target.checked); setWorkdayAnswer()}}/>
                            <label htmlFor="check3">wednesday</label>
                    	</span>
                    	<span>
                            <input type="checkbox" name="workday" value="thursday" id="check4" onChange={event => {setThursday(event.target.checked); setWorkdayAnswer()}}/>
                            <label htmlFor="check4">thursday</label>
                        </span>
                        <span>
                            <input type="checkbox" name="workday" value="friday" id="check5" onChange={event => {setFriday(event.target.checked); setWorkdayAnswer()}}/>
                            <label htmlFor="check5">friday</label>
                        </span>
                        <span>
                            <input type="checkbox" name="workday" value="saturday" id="check6" onChange={event => {setSaturday(event.target.checked); setWorkdayAnswer()}}/>
                            <label htmlFor="check6">saturday</label>
                        </span>
                        <span>
                            <input type="checkbox" name="workday" value="sunday" id="check7" onChange={event => {setSunday(event.target.checked); setWorkdayAnswer()}}/>
                            <label htmlFor="check7">sunday</label>
                        </span>
                    </div>)
//bug: last checked checkbox isnt being recognized

        }

       else{
       return(
       <div>
           <select className="questionAnswer" name={props.question.type} id={props.question.id}
                               onChange={event => setTimeAnswer(Number(event.target.value))}>

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