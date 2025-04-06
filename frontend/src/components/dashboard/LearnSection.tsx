import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export function LearnSection() {
  const courses = [
    { title: "Introduction to Agriculture", progress: 75 },
    { title: "Water Conservation Techniques", progress: 50 },
    { title: "Basic Health and Hygiene", progress: 90 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {courses.map((course) => (
            <li key={course.title} className="flex items-center">
              <div className="w-full">
                <p className="text-sm font-medium">{course.title}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
              <span className="ml-4 text-sm font-medium">{course.progress}%</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

