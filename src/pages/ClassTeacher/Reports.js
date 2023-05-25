import React, { useState, useEffect } from "react";

const Reports = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [studentData, setStudentData] = useState([]);

  const fetchStudentsInClass = async () => {
    try {
      const url = "http://localhost:5000";
      const response = await fetch(`${url}/generate_reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: user.classId,
          classArmId: user.classArmId,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setStudentData(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>#</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>OtherName</th>
          <th>AdmissionNo</th>
          <th>Class</th>
          <th>ClassArm</th>
          <th>Session</th>
          <th>Term</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
    );
  };

  const TableRow = ({
    cnt,
    firstName,
    lastName,
    otherName,
    admissionNumber,
    className,
    classArmName,
    sessionName,
    termName,
    status,
    dateTimeTaken,
  }) => {
    let stat, color;
    if (status === "1") {
      stat = "Present";
      color = "#00FF00";
    } else {
      stat = "Absent";
      color = "#FF0000";
    }
    return (
      <tr>
        <td>{cnt}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{otherName}</td>
        <td>{admissionNumber}</td>
        <td>{className}</td>
        <td>{classArmName}</td>
        <td>{sessionName}</td>
        <td>{termName}</td>
        <td style={{ backgroundColor: color }}>{stat}</td>
        <td>{dateTimeTaken}</td>
      </tr>
    );
  };

  const AttendanceTable = ({ studentData }) => {
    const filename = "Attendance list";
    const dateTaken = new Date().toISOString().slice(0, 10);

    //csv without table header line

    // const downloadReport = () => {
    //   const csvData =
    //     "data:text/csv;charset=utf-8," +
    //     encodeURIComponent(
    //       studentData.map((row) => Object.values(row).join(",")).join("\n")
    //     );
    //   const link = document.createElement("a");
    //   link.setAttribute("href", csvData);
    //   link.setAttribute("download", `${filename}-${dateTaken}.csv`);
    //   link.click();
    // };

    // excel without table header
    // const downloadReport = () => {
    //   const worksheet = XLSX.utils.json_to_sheet(studentData);
    //   const workbook = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(workbook, worksheet, "Student Data");
    //   const excelData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    //   const blob = new Blob([excelData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    //   const url = URL.createObjectURL(blob);
    //   const link = document.createElement("a");
    //   link.setAttribute("href", url);
    //   link.setAttribute("download", `${filename}-${dateTaken}.xlsx`);
    //   link.click();
    // };

    // csv with table header line

    const downloadReport = () => {
      const tableData = [];
      const headers = Object.keys(studentData[0]);
      tableData.push(headers);
      for (const row of studentData) {
        const rowData = [];
        for (const key of headers) {
          rowData.push(row[key]);
        }
        tableData.push(rowData);
      }
      
      const csvData =
        "data:text/csv;charset=utf-8," +
        encodeURIComponent(tableData.map((row) => row.join(",")).join("\n"));
      const link = document.createElement("a");
      link.setAttribute("href", csvData);
      link.setAttribute("download", `${filename}-${dateTaken}.csv`);
      link.click();
    };

    return (
      <>
        <button className="btn btn-primary p-2 m-2" onClick={downloadReport}>Download Report</button>
        <table className="table table-dark align-items-center table flush">
          <TableHeader />
          <tbody>
            {studentData.map((row, index) => (
              <TableRow key={row.Id} cnt={index + 1} {...row} />
            ))}
          </tbody>
        </table>
      </>
    );
  };

  useEffect(() => {
    fetchStudentsInClass();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AttendanceTable studentData={studentData} />;
};

export default Reports;
