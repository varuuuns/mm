export default function SearchBar({query, onQueryChange, category, categories, onCategoryChange}) {
    return (
        <section className="search">
            <label className="visually-hidden" htmlFor="query">Search courses</label>
            <input type="search" id="query" placeholder="Seach courses.."
                value={query} onChange={(e) => onQueryChange(e.target.value)} aria-label="Search courses by name or caategory" />
            
            <label className="visually-hidden" htmlFor="category">Filter by Category</label>
            <select id="category" value={category} onChange={(e)=>onCategoryChange(e.target.value)}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </section>
    )
}