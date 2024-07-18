import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronDown } from "react-icons/fa";

const Dashboard = ({ userData }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalCheckIns, setTotalCheckIns] = useState(0);
  const [totalCheckOuts, setTotalCheckOuts] = useState(0);
  const [totalAbsents, setTotalAbsents] = useState(0);
  const [expandedGrades, setExpandedGrades] = useState({});

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
    return data.map((student) => {
      const attendanceForDate = student.attendance[formattedDate] || null;
      return { ...student, attendance: { [formattedDate]: attendanceForDate } };
    });
  };

  const organizeDataByGrade = (data) => {
    const grades = ["k4", "k5", "g1", "g2", "g3", "g4", "g5", "g6"];
    const organizedData = {};

    grades.forEach((grade) => {
      organizedData[grade] = data
        .filter((student) => student.level.toLowerCase() === grade)
        .sort((a, b) => a.name.localeCompare(b.name));
    });

    return organizedData;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const calculateCounters = (data) => {
    let checkInCount = 0;
    let checkOutCount = 0;
    let absentCount = 0;

    data.forEach((student) => {
      const attendance = student.attendance[formatDate(selectedDate)];
      if (attendance) {
        if (attendance.checkIn) {
          checkInCount += 1;
        }
        if (attendance.checkOut) {
          checkOutCount += 1;
        }
      } else {
        absentCount += 1;
      }
    });

    return { checkInCount, checkOutCount, absentCount };
  };

  const toggleGrade = (grade) => {
    setExpandedGrades((prevExpandedGrades) => ({
      ...prevExpandedGrades,
      [grade]: !prevExpandedGrades[grade],
    }));
  };

  const filteredData = filterDataForDate(userData, selectedDate);
  const organizedData = organizeDataByGrade(filteredData);

  useEffect(() => {
    const { checkInCount, checkOutCount, absentCount } =
      calculateCounters(filteredData);
    setTotalCheckIns(checkInCount);
    setTotalCheckOuts(checkOutCount);
    setTotalAbsents(absentCount);
  }, [filteredData]);

  return (
    <main className="flex min-h-screen bg-[#031525] flex-col items-center justify-center pt-12">
      <div className="w-full max-w-4xl text-gray-800 shadow-lg rounded-lg pt-2 overflow-hidden">
        <div className="bg-gradient-to-r from-[#035172] to-[#0587be] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative text-white font-bold text-3xl text-center">Dashboard</div>
        </div>
        <div className="px-6 py-4 bg-[#031525]">
          <div className="mb-8">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="p-3 bg-gray-700 text-white rounded-lg w-full"
            />
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-white">Total Check-Ins: {totalCheckIns}</h2>
            <h2 className="text-xl font-semibold mb-2 text-white">Total Check-Outs: {totalCheckOuts}</h2>
            <h2 className="text-xl font-semibold text-white">Total Absents: {totalAbsents}</h2>
          </div>
          <div>
            {Object.keys(organizedData).map((grade) => {
              const { checkInCount, checkOutCount, absentCount } = calculateCounters(organizedData[grade]);
              return (
                <div key={grade} className="mb-6">
                  <div
                    className="flex items-center justify-between w-full bg-gray-800 p-4 rounded-lg cursor-pointer"
                    onClick={() => toggleGrade(grade)}
                  >
                    <h2 className="text-2xl font-semibold capitalize w-24 text-white">{grade}</h2>
                    <div className="flex space-x-4">
                      <div className="bg-green-500 text-white px-4 py-2 rounded-md flex-grow text-center shadow-md w-24">
                        {checkInCount}
                      </div>
                      <div className="bg-gray-700 text-white px-4 py-2 rounded-md flex-grow text-center shadow-md w-24">
                        {absentCount}
                      </div>
                      <div className="bg-yellow-500 text-white px-4 py-2 rounded-md flex-grow text-center shadow-md w-24">
                        {checkOutCount}
                      </div>
                    </div>
                    <FaChevronDown
                      className={`transition-transform ${expandedGrades[grade] ? "rotate-180" : ""} text-white`}
                    />
                  </div>

                  {expandedGrades[grade] && (
                    <div className="mt-2">
                      {organizedData[grade].length > 0 ? (
                        organizedData[grade].map((student) => (
                          <div
                            key={student.name}
                            className="mb-2 p-4 bg-gray-700 rounded-lg transition duration-300 hover:shadow-lg"
                          >
                            <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                              <h3 className="text-lg font-semibold truncate text-white">{student.name}</h3>
                              <ul className="flex space-x-4 justify-end">
                                {student.attendance[formatDate(selectedDate)] ? (
                                  <>
                                    <span className="bg-green-500 text-white px-3 py-2 rounded-md w-24 text-center shadow-sm">
                                      {student.attendance[formatDate(selectedDate)].checkIn
                                        ? new Date(student.attendance[formatDate(selectedDate)].checkIn).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          })
                                        : "NA"}
                                    </span>
                                    <span className="bg-yellow-500 text-white px-3 py-2 rounded-md w-24 text-center shadow-sm">
                                      {student.attendance[formatDate(selectedDate)].checkOut
                                        ? new Date(student.attendance[formatDate(selectedDate)].checkOut).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          })
                                        : "NA"}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-white px-3 py-2 bg-gray-700 rounded-md">Absent</span>
                                )}
                              </ul>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">No data available for {grade}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );

};

export default Dashboard;
