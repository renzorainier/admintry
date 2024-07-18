import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheck, FaSignOutAlt, FaTimes, FaChevronDown } from "react-icons/fa";

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
    <main className="flex min-h-screen bg-[#031525] justify-center items-center">
      <div className="bg-gray-900 text-white p-8 rounded-xl shadow-xl w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <div className="mb-8">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="p-3 bg-gray-700 text-white rounded-lg w-full"
          />
        </div>
        <div className="mb-8">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-lg shadow-xl">
            <div className="flex items-center mb-6">
              <div className="bg-green-500 text-white p-4 rounded-full shadow-lg">
                <FaCheck size={28} />
              </div>
              <h2 className="text-2xl font-bold ml-6 text-white">
                Logged In: <span className="text-3xl">{totalCheckIns}</span>
              </h2>
            </div>
            <div className="flex items-center mb-6">
              <div className="bg-yellow-500 text-white p-4 rounded-full shadow-lg">
                <FaSignOutAlt size={28} />
              </div>
              <h2 className="text-2xl font-bold ml-6 text-white">
                Logged Out: <span className="text-3xl">{totalCheckOuts}</span>
              </h2>
            </div>
            <div className="flex items-center">
              <div className="bg-red-500 text-white p-4 rounded-full shadow-lg">
                <FaTimes size={28} />
              </div>
              <h2 className="text-2xl font-bold ml-6 text-white">
                Absents: <span className="text-3xl">{totalAbsents}</span>
              </h2>
            </div>
          </div>
        </div>

        <div>
          {Object.keys(organizedData).map((grade) => {
            const { checkInCount, checkOutCount, absentCount } =
              calculateCounters(organizedData[grade]);
            return (
              <div key={grade} className="mb-6">
                <div
                  className="flex items-center w-full bg-gray-800 p-4 rounded-lg cursor-pointer"
                  onClick={() => toggleGrade(grade)}>
                  <h2 className="text-2xl font-semibold capitalize w-24">
                    {grade}
                  </h2>
                  <div className="flex justify-end w-full">
                    <div className="flex space-x-4">
                      <div
                        className="bg-green-500 text-white px-4 py-2 rounded-md text-center shadow-md"
                        style={{ width: "60px" }}>
                        {checkInCount}
                      </div>
                      <div
                        className="bg-red-500 text-white px-4 py-2 rounded-md text-center shadow-md"
                        style={{ width: "60px" }}>
                        {absentCount}
                      </div>
                      <div
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md text-center shadow-md"
                        style={{ width: "60px" }}>
                        {checkOutCount}
                      </div>
                    </div>
                  </div>
                  <FaChevronDown
                    className={`transition-transform ml-4 ${
                      expandedGrades[grade] ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {expandedGrades[grade] && (
                  <div className="mt-2">
                    {organizedData[grade].length > 0 ? (
                      organizedData[grade].map((student) => (
                        <div
                          key={student.name}
                          className="mb-2 p-4 bg-gray-700 rounded-lg transition duration-300 hover:shadow-lg">
                          <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                            <h3 className="text-lg font-semibold truncate text-white">
                              {student.name}
                            </h3>
                            <ul className="flex  justify-end">
                              {student.attendance[formatDate(selectedDate)] ? (
                                <>
                                  <span className="bg-green-500 text-white px-3 py-2 rounded-l-md w-24 text-center shadow-sm">
                                    {student.attendance[
                                      formatDate(selectedDate)
                                    ].checkIn
                                      ? new Date(
                                          student.attendance[
                                            formatDate(selectedDate)
                                          ].checkIn
                                        ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })
                                      : "NA"}
                                  </span>
                                  <span className="bg-yellow-500 text-white px-3 py-2 rounded-r-md w-24 text-center shadow-sm">
                                    {student.attendance[
                                      formatDate(selectedDate)
                                    ].checkOut
                                      ? new Date(
                                          student.attendance[
                                            formatDate(selectedDate)
                                          ].checkOut
                                        ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })
                                      : "NA"}
                                  </span>
                                </>
                              ) : (
                                <span className="text-white px-3 py-2 bg-red-500 rounded-md">
                                  Absent
                                </span>
                              )}
                            </ul>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">
                        No data available for {grade}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
