import "./Timetable.css"
import { useEffect, useState, createRef } from "react";
import { getProcessedTimeAnswers, getTimeUnitList } from "../service/apiService";
import { ProcessedTimeAnswer, TimeUnit } from "../service/models";
import TimeTableContent from "./TimeTableContent";
import { convertTimeUnitToMinutes } from "../utilities/Util"
//import { useScreenshot, createFileName } from "use-react-screenshot";

export default function Timetable() {
    const [timeUnitList, setTimeUnitList] = useState<Array<TimeUnit>>([])
    const [processedTimeAnswerList, setProcessedTimeAnswerList] = useState<Array<ProcessedTimeAnswer>>([])
    const [errorMessage, setErrorMessage] = useState("")

/*     const ref = createRef();
      const [image, takeScreenShot] = useScreenshot({
        type: "image/jpeg",
        quality: 1.0
      });

      const download = (image: string, { name = "img", extension = "jpg" } = {}) => {
        const a = document.createElement("a");
        a.href = image;
        a.download = createFileName(extension, name);
        a.click();
      };

      const downloadScreenshot = () => takeScreenShot(ref.current).then(download); */

    useEffect(() => {
        getTimeUnitList()
            .then(data => setTimeUnitList(data))
            .catch(() => setErrorMessage("Error in loading TimeUnit list :\nCheck if the backend is running and reload page !"));

        getProcessedTimeAnswers()
            .then(data => setProcessedTimeAnswerList(data))
            .catch(() => setErrorMessage("Error while processing Answers:\nCheck if one is missing or falsely set !"));
    }, []);



const [maxStart, maxEnd] = calculateTimeRange(processedTimeAnswerList);
const timeTableContent = generateTimeTableContent(timeUnitList, processedTimeAnswerList, maxStart, maxEnd);

//onClick={downloadScreenshot}
    return (
        <>
            <h1 className="headline">Timetable</h1>
            <div>
              <button >Download screenshot</button>
              <div className="flex-container">
                  <table className="table">
                      <thead>
                      <tr className="flex-item">
                          <th className="timeUnits">Time</th>
                          <th>Monday</th>
                          <th>Tuesday</th>
                          <th>Wednesday</th>
                          <th>Thursday</th>
                          <th>Friday</th>
                          <th>Saturday</th>
                          <th>Sunday</th>
                      </tr>
                      </thead>

                      <tbody>
                      {timeTableContent}
                      {errorMessage && (
                        <tr>
                            <th colSpan={8}>{errorMessage}</th>
                        </tr>
                        )}
                      </tbody>
                  </table>
              </div>
            </div>

        </>
    );
}

function calculateTimeRange(processedTimeAnswerList: ProcessedTimeAnswer[]) {
        let maxStart = 0;
        let maxEnd = 24 * 60;

        processedTimeAnswerList.forEach(({ task, timeList }) => {
            if (task.includes("morningSleep")) {
                maxStart = convertTimeUnitToMinutes(timeList[0])
            }
            if (task.includes("nightSleep")) {
                maxEnd = convertTimeUnitToMinutes(timeList[timeList.length - 1])
            }
        })
        return [maxStart, maxEnd];
    }

function generateTimeTableContent(
    timeUnitList: TimeUnit[],
    processedTimeAnswerList: ProcessedTimeAnswer[],
    maxStart: number,
    maxEnd: number
    ) {
    return timeUnitList
            .filter(timeUnit => timeUnit.timeInMinutes! >= maxStart && timeUnit.timeInMinutes! <= maxEnd)
            .map(timeUnit => {
                const matchingAnswer = findMatchingAnswer(timeUnit.time, processedTimeAnswerList);

                return <TimeTableContent
                            key={timeUnit.id}
                            timeUnit={timeUnit}
                            task={matchingAnswer?.task || ""}
                            monday={matchingAnswer?.monday || false}
                            tuesday={matchingAnswer?.tuesday || false}
                            wednesday={matchingAnswer?.wednesday || false}
                            thursday={matchingAnswer?.thursday || false}
                            friday={matchingAnswer?.friday || false}
                            saturday = {matchingAnswer?.saturday || false}
                            sunday = {matchingAnswer?.sunday || false}
                       />
            });
    }


// Find the processed answer that matches the current time unit
function findMatchingAnswer(time: string, processedTimeAnswerList: ProcessedTimeAnswer[]) {
    for (const processedTimeAnswer of processedTimeAnswerList) {
        if (processedTimeAnswer.timeList.includes(time)){
            return processedTimeAnswer;
           }
    }
    return null;

}