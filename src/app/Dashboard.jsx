import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

const Dashboard = ({ userData }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    console.log("Received userData in Dashboard:", userData);
  }, [userData]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const filterDataForDate = (data, date) => {
    const formattedDate = formatDate(date);
    return data
      .map((student) => {
        const attendanceForDate = Object.keys(student.attendance)
          .filter((date) => date === formattedDate)
          .reduce((obj, key) => {
            obj[key] = student.attendance[key];
            return obj;
          }, {});
        return { ...student, attendance: attendanceForDate };
      })
      .filter((student) => Object.keys(student.attendance).length > 0);
  };

  const organizeDataByGrade = (data) => {
    const grades = ["k4", "k5", "g1", "g2", "g3", "g4", "g5", "g6"];
    const organizedData = {};

    grades.forEach((grade) => {
      organizedData[grade] = data.filter(
        (student) => student.level.toLowerCase() === grade
      );
    });

    return organizedData;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredData = filterDataForDate(userData, selectedDate);
  const organizedData = organizeDataByGrade(filteredData);

  return (
    <main className="flex min-h-screen bg-[#031525] justify-center items-center">
      <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="mb-4">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="p-2 bg-gray-700 text-white rounded-lg custom-datepicker"
          />
        </div>
        <div>
          {Object.keys(organizedData).map((grade) => (
            <div key={grade} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 capitalize">
                {grade}
              </h2>
              {organizedData[grade].length > 0 ? (
                organizedData[grade].map((student) => (
                  <div
                    key={student.name}
                    className="mb-4 p-4 bg-gray-800 rounded-lg transition duration-300 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{student.name}</h3>
                      <ul className="flex space-x-4">
                        {Object.keys(student.attendance).map((date) => (
                          <li key={date} className="flex items-center">
                            <span className="bg-green-500 text-white px-3 py-1 rounded-lg">
                              {new Date(
                                student.attendance[date].checkIn
                              ).toLocaleTimeString()}
                            </span>
                            <span className="bg-red-500 text-white px-3 py-1 rounded-lg ml-2">
                              {new Date(
                                student.attendance[date].checkOut
                              ).toLocaleTimeString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <p>No data available for {grade}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );



};

export default Dashboard;
