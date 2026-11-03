import { Link } from "react-router"
import Heading from "../components/Headings"

export const MainHeader = () => {
    return (
        <header className="py-6 bg-surface border-b-2 border-border">
            <div className="max-w-7xl mx-auto px-3">
                <Heading level={1} className="mb-0!"><Link to="/">💈 Barbería<span className="text-accent">.</span></Link></Heading>
                <p>Estilo y precisión en cada corte</p>
            </div>
        </header>
    )
}
