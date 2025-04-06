import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export function JobsSection() {
  const jobs = [
    { title: "Farm Manager", company: "GreenFields Inc.", location: "Nearby Village" },
    { title: "Water Treatment Specialist", company: "AquaPure", location: "District Center" },
    { title: "Community Health Worker", company: "Rural Health Initiative", location: "Your Village" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Job Opportunities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job.title} className="border-b pb-2 last:border-b-0">
              <h3 className="font-medium">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
              <p className="text-sm text-muted-foreground">{job.location}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

