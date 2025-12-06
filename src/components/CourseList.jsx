import CourseCard from "./CourseCard"

export default function CourseList({courses}) {
    if (!courses.length) {
        return <p className="muted">No courses match your search</p>
    }

    return (
        <ul className="grid">
            {courses.map(c => {
                <li key={c.id}>
                    <CourseCard course={c}/>
                </li>
            })}
        </ul>
    )
}