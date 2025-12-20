import StatDisplayCard, { StatDisplayElement } from "./StatDisplayCard";


export interface StatDisplayProps {
    stats: StatDisplayElement[]
}

function StatDisplay({ stats } : StatDisplayProps) {

    // Check if stats passed in are of the correct length
    if (stats.length === 0 || stats.length > 4) {
        if (process.env.NODE_ENV === 'development') {
            console.error(
                `StatDisplay received ${stats.length} elements. Limit 1 - 4 elements per stat display object`,
            );
        }
        return null;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
            <StatDisplayCard  
                key={`stat-display-${index}`}
                {...stat}
            />
        ))}
        </div>
    );
}

export default StatDisplay;