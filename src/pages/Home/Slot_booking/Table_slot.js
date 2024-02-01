import React from 'react';

const Table_slot = ({ slots }) => {
    // Filter out slots with zero registrations
    const filteredSlots = Object.entries(slots)
        .filter(([_, slot]) => slot.registrations > 0)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-black border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Slot</th>
                        <th className="py-2 px-4 border-b">Registrations</th>
                        <th className="py-2 px-4 border-b">Registered Persons</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(filteredSlots).map((slot) => (
                        <tr key={slot} className="hover:bg-red-500">
                            <td className="py-2 px-4 border-b">{slot}</td>
                            <td className="py-2 px-4 border-b">{filteredSlots[slot].registrations}</td>
                            <td className="py-2 px-4 border-b">
                                {filteredSlots[slot].persons.length > 0 ? (
                                    <ul>
                                        {filteredSlots[slot].persons.map((person, index) => (
                                            <li key={index}>{person}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    'No registrations'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table_slot;