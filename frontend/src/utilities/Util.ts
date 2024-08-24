export const convertTimeUnitToMinutes = (timeUnit: string | undefined) => {
    if(!timeUnit) return 0;
    const [hours, minutes] = timeUnit.split(":").map(Number);
    return hours * 60 + minutes;
};
