import { Button } from "@/components/ui/button";

const courses = [
  {
    name: "BSCS 1",
    semester: 1,
  },
  {
    name: "BSCS 1",
    semester: 2,
  },
  {
    name: "BSCS 2",
    semester: 1,
  },
  {
    name: "BSCS 2",
    semester: 2,
  },
];

export default function DepartmentCoursesWithSemesters() {
  // Group courses by their name
  const groupedCourses = courses.reduce((acc, course) => {
    const { name, semester } = course;
    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push(semester);
    return acc;
  }, {});

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Available Courses and Semesters
      </h1>

      {/* Display the grouped courses and semesters */}
      <div className="space-y-6">
        {Object.keys(groupedCourses).map((courseName) => (
          <div key={courseName} className="space-y-4">
            <h2 className="text-2xl font-semibold">{courseName}</h2>

            {/* Display semesters for each course */}
            <div className="space-y-2">
              {groupedCourses[courseName].map((semester, idx) => (
                <Button key={idx} variant="outline" className="w-full">
                  {courseName} -{" "}
                  {semester === 1 ? "1st Semester" : "2nd Semester"}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
