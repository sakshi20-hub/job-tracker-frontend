import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-slate-200 bg-white p-3 shadow-lg text-sm">
      <p className="font-medium text-slate-700">{label}</p>
      <p className="text-blue-600">{payload[0].value} applications</p>
    </div>
  )
}

const MonthlyChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="flex h-56 items-center justify-center text-sm text-slate-400">
        No data available yet
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={224}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
        <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default MonthlyChart
