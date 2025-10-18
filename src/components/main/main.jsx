import { Card } from "../card/card"

export const Main = () => {
    return (
        <main className="w-full mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </main>
    )
}
