export default function CourseCard({course}) {
    const { name, category, level, duration, thumbnail, description } = course;
    return (
        <>
            <article className="card" tabIndex={0} aria-label={`${name} course card`}>

                <img className="thumb" src={thumbnail} alt={`${name} thumbnail`} loading="lazy" />

                <div className="card-body">

                    <h3 className="card-title">{name}</h3>
                    <p className="chip">{category}</p>
                    <p className="desc">{description}</p>

                    <div className="meta">
                        <span>{level}</span>
                        <span>•</span>
                        <span>{duration}</span>
                    </div>

                </div>

                <button className="btn" type="button" onClick={()=>alert(`${name} enrolled in ${category}`)}>
                    Enroll
                </button>

            </article>
        </>
    )
}