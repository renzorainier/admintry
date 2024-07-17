import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = ({ userData }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalCheckIns, setTotalCheckIns] = useState(0);
  const [totalCheckOuts, setTotalCheckOuts] = useState(0);
  const [totalAbsents, setTotalAbsents] = useState(0);

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
      organizedData[grade] = data.filter(
        (student) => student.level.toLowerCase() === grade
      );
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
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
        <div className="mb-6">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="p-2 bg-gray-700 text-white rounded-lg w-full"
          />
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Total Check-Ins: {totalCheckIns}
          </h2>
          <h2 className="text-xl font-semibold">
            Total Check-Outs: {totalCheckOuts}
          </h2>
          <h2 className="text-xl font-semibold">
            Total Absents: {totalAbsents}
          </h2>
        </div>
        <div>
          {Object.keys(organizedData).map((grade) => {
            const { checkInCount, checkOutCount, absentCount } =
              calculateCounters(organizedData[grade]);
            return (
              <div key={grade} className="mb-8">
                <div className="flex items-center justify-between space-x-4 mb-4 w-full">
                  <h2 className="text-2xl font-semibold capitalize">{grade}</h2>
                  <div className="flex space-x-4">
                    <div className="bg-green-500 text-white px-5 py-1 rounded-lg flex-grow text-center">
                      {checkInCount}
                    </div>
                    <div className="bg-gray-500 text-white px-5 py-1 rounded-lg flex-grow text-center">
                      {absentCount}
                    </div>
                    <div className="bg-yellow-500 text-white px-5 py-1 rounded-lg flex-grow text-center">
                      {checkOutCount}
                    </div>
                  </div>
                </div>

                {organizedData[grade].length > 0 ? (
                  organizedData[grade].map((student) => (
                    <div
                      key={student.name}
                      className="mb-4 p-4 bg-gray-800 rounded-lg transition duration-300 hover:shadow-lg">
                      <div className="grid grid-cols-[1fr_2fr] gap-4 items-center">
                        <h3 className="text-lg font-semibold truncate">
                          {student.name}
                        </h3>
                        <ul className="flex space-x-4 justify-end">
                          {student.attendance[formatDate(selectedDate)] ? (
                            <>
                              <span className="bg-green-500 text-white p-1 rounded-lg w-20 text-center">
                                {student.attendance[formatDate(selectedDate)]
                                  .checkIn
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
                              <span className="bg-yellow-500 text-white p-1 rounded-lg w-20 text-center">
                                {student.attendance[formatDate(selectedDate)]
                                  .checkOut
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
                            <span className="text-white px-3 py-1">Absent</span>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No data available for {grade}</p>
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
