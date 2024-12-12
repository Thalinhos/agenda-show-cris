import { useState, useEffect } from "react";

export function CardEvent() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch("http://localhost:3000/getAllPosts");
                const data = await res.json();
                setEvents(data.message); 
                console.log(data.message);
            } catch (error) {
                console.error("Erro ao buscar os eventos:", error);
            }
        }

        getData();
    }, []);

    return (
<div className="flex flex-col items-center py-4 px-2">
    {events && events.length > 0 ? (
        // Grid responsivo
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
                <div 
                    key={event._id} 
                    className="bg-white w-full sm:max-w-sm md:max-w-md lg:max-w-lg p-4 mb-4 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.descricao}</h3>
                    <p className="text-gray-600">
                        <strong>Data:</strong> {new Date(event.data).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-gray-600">
                        <strong>Hora:</strong> {event.hora}
                    </p>
                </div>
            ))}
        </div>
    ) : (
        <p>Carregando eventos...</p>
    )}
</div>

    );
}
