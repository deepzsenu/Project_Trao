import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeatherChart = ({ temperature }) => {
  const data = [
    { time: "Now", temp: temperature },
    { time: "+1h", temp: temperature + 1 },
    { time: "+2h", temp: temperature - 1 },
    { time: "+3h", temp: temperature + 2 },
  ];

  return (
    <div className="h-40 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#181414" />
          <YAxis stroke="#220808" />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#a308a3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;