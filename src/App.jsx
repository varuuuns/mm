import { useEffect, useMemo, useState } from "react";
import coursesData from "./data/courses.js";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import CourseList from "./components/CourseList";

export default function App() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");
    const [quote, setQuote] = useState({ content: "", author: "" });
    const [isLoadingQuote, setIsLoadingQuote] = useState(false);
    const [quoteError, setQuoteError] = useState("");

    useEffect(() => {
        let mounted = true;

        //function expression calling itself
        (async () => {
            try {
                setIsLoadingQuote(true);
                setQuoteError("");

                const response = await fetch('https://zenquotes.io/api/random');
                if (!response.ok) throw new Error('Failed to fetch quote');

                const data = await response.json();
                if (mounted) setQuote({ content: data.content, author: data.author });
            }
            catch {
                if (mounted) setQuoteError("Couldn't load quote, try refreshign");
            }
            finally {
                if (mounted) setIsLoadingQuote(false);
            }
        })();
        return () => { mounted = false };
    }, []);

    const categories = useMemo(() => {
        const set = new Set(coursesData.map(c => c.category));
        return ["all", ...Array.from(set)];
    }, [])

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return coursesData.filter(c => {
            const matchesText = !q || c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
            const matchesCat = category === "all" || c.category === category;
            return matchesText && matchesCat;
        })
    }, [query, category]);

    return (
        <>
            <div className="container">
                <Header />

                <section className="quote" aria-live="polite">
                    {isLoadingQuote ? (<p className="muted">Loading a quick boost…</p>) :
                        quoteError ? (<p className="error">{quoteError}</p>) :
                            (quote.content && (
                                <blockquote>
                                    “{quote.content}” <span>— {quote.author}</span>
                                </blockquote>
                            )
                            )}
                </section>

                <SearchBar
                    query={query}
                    onQueryChange={setQuery}
                    category={category}
                    categories={categories}
                    onCategoryChange={setCategory}
                />

                <CourseList courses={filtered} />

                <footer className="footer">
                    <p>Built for the Marketing Mojito Web Developer Intern assignment.</p>
                </footer>

            </div>
        </>
    )
}