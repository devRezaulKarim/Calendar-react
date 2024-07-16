import { useEffect, useState } from "react";
const Calendar = ({
  value,
  setValue,
  selectedDateBgColor = "#007bff",
  selectedDateColor = "#fff",
}) => {
  const [date, setDate] = useState(new Date());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  useEffect(() => {
    if (setValue) {
      setValue(date);
    }
  }, [date, setValue]);
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    setDate(new Date(date.getFullYear(), newMonth, 1));
  };

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setDate(new Date(newYear, date.getMonth(), 1));
  };

  const handleDateClick = (day) => {
    setDate(new Date(date.getFullYear(), date.getMonth(), day));
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
    const firstDayOfMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getDay();
    const daysArray = [];

    // Fill initial empty days
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>
      );
    }

    // Fill days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(
        <div
          key={day}
          className={`calendar-day${day === date.getDate() ? " selected" : ""}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return daysArray;
  };

  const renderYearOptions = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 90; i <= currentYear + 10; i++) {
      years.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return years.reverse();
  };

  return (
    <>
      <style>
        {`
            select{
            padding-block:8px;
            padding-inline:6px;
            border-radius: 6px;
            -ms-overflow-style: none;  
            scrollbar-width: none;  
            }
            
            select::-webkit-scrollbar {
            display: none;        
            }

            .calendar {
            width: 300px;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 10px;
            font-family: Arial, sans-serif;
            }

            .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            }

            .calendar-header button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 18px;
            }

            .calendar-body {
            display: flex;
            flex-direction: column;
            }

            .calendar-weekdays,
            .calendar-days {
            display: flex;
            flex-wrap: wrap;
            }

            .calendar-weekday,
            .calendar-day {
            width: 14.28%; 
            text-align: center;
            padding: 5px 0;
            box-sizing: border-box;
            }

            .calendar-day {
            cursor: pointer;
            width:42.5px;
            height:42.5px;
            display: grid;
            place-items:center;
            }

            .calendar-day.selected {
            background-color: ${selectedDateBgColor};
            color: ${selectedDateColor};
            font-weight:600;
            border-radius: 50%;
            }

            .calendar-day.empty {
            visibility: hidden;
            }
        `}
      </style>

      <div className="calendar">
        <div className="calendar-header">
          <select value={date.getMonth()} onChange={handleMonthChange}>
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select value={date.getFullYear()} onChange={handleYearChange}>
            {renderYearOptions()}
          </select>
        </div>
        <div className="calendar-body">
          <div className="calendar-weekdays">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="calendar-weekday">
                {day}
              </div>
            ))}
          </div>
          <div className="calendar-days">{renderDays()}</div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
