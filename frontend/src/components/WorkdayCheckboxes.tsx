import { Checkbox } from '@mui/material';

interface WorkdayCheckboxesProps {
    workdays: boolean[];
    setWorkdays: (workdays: boolean[]) => void;
}

const WorkdayCheckboxes: React.FC<WorkdayCheckboxesProps> = ({ workdays, setWorkdays }) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <>
            {days.map((day, index) => (
                <span key={index}>
                    <Checkbox
                        id={`check${index}`}
                        color= 'secondary'
                        checked={workdays[index]}
                        onChange={event => {
                            const newWorkdays = [...workdays];
                            newWorkdays[index] = event.target.checked;
                            setWorkdays(newWorkdays);
                        }}
                    />
                    <label htmlFor={`check${index}`}>{day}</label>
                </span>
            ))}
        </>
    );
};

export default WorkdayCheckboxes;