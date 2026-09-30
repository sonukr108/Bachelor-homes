import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Weekly = ({
  data = [],
  dataKey = "value",
  className = "w-full h-[250px] flex justify-center items-center",
}) => {
  return (
    <div className={className}>
      <div className="w-full max-w-[500px] h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/* ✅ Use 'name' because parseChartData converts keys to 'name' */}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={dataKey}
              fill="#6C3483"
              background={{ fill: "#eee" }}
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Weekly;
