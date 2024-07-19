import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const generateRandomColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    colors.push(color);
  }
  return colors;
};

const InstructorChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState("students");

  const chartDataStudents = courses.map((course) => ({
    name: course.courseName,
    value: course.totalStudentsEnrolled,
  }));

  const chartIncomeData = courses.map((course) => ({
    name: course.courseName,
    value: course.totalAmountGenerated,
  }));

  const colors = generateRandomColors(courses.length);

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-full w-full">
        <PieChart width={400} height={400}>
          <Pie
            data={currChart === "students" ? chartDataStudents : chartIncomeData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {(currChart === "students" ? chartDataStudents : chartIncomeData).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default InstructorChart;
