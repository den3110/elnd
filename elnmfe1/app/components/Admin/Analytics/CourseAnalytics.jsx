import React from "react"
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList
} from "recharts"
import Loader from "../../Loader/Loader"
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi"
import { styles } from "@/app/styles/style"

const CourseAnalytics = props => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({})

  const analyticsData = []

  data &&
    data.courses.last12Months.forEach(item => {
      analyticsData.push({ name: item.month, uv: item.count })
    })

  const minValue = 0

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen flex flex-col justify-center items-center">
          <div className="mt-[50px] text-center">
            <h1 className={`${styles.title} px-5`}>Course Analytics</h1>
            <p className={`${styles.label} px-5`}>
              Last 12 months analytics data
            </p>
          </div>

          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  )
}

export default CourseAnalytics
