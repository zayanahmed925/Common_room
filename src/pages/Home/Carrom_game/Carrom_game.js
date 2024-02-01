import React, { useState } from 'react';
import backgroundImage from '../../../utilities/img/carrom_bg.jpg';
import Carrom_register from '../../Home/Carrom_game/Carrom_register';
import Carrom_table_slot from '../../Home/Carrom_game/Carrom_table_slot';

const Carrom_game = () => {
    const initialSlots = {
        'Slot 1': { registrations: 0, persons: [], boards: {} },
        'Slot 2': { registrations: 0, persons: [], boards: {} },
        'Slot 3': { registrations: 0, persons: [], boards: {} },
        'Slot 4': { registrations: 0, persons: [], boards: {} },
    };

    const [slots, setSlots] = useState(initialSlots);
    const [selectedBoard, setSelectedBoard] = useState('Board 1'); // Default selected board

    const handleRegister = (dateTime, person, board) => {
        setSlots((prevSlots) => {
            const existingSlot = prevSlots[dateTime];

            if (existingSlot !== undefined) {
                const updatedSlot = {
                    ...existingSlot,
                    registrations: existingSlot.registrations + 1,
                    persons: [...existingSlot.persons, person],
                    boards: {
                        ...existingSlot.boards,
                        [board]: (existingSlot.boards[board] || 0) + 1,
                    },
                };

                return {
                    ...prevSlots,
                    [dateTime]: updatedSlot,
                };
            } else {
                return {
                    ...prevSlots,
                    [dateTime]: {
                        registrations: 1,
                        persons: [person],
                        boards: { [board]: 1 },
                    },
                };
            }
        });
    };

    return (
        <div className="w-screen h-screen bg-opacity-80 mx-auto p-6 rounded-md relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="w-full  flex items-center justify-center">
                <div className="flex w-full flex-col items-center">
                    <Carrom_register slots={slots} onRegister={handleRegister} selectedBoard={selectedBoard} setSelectedBoard={setSelectedBoard} />
                    {Object.keys(slots).some((slot) => slots[slot].registrations > 0) && (
                        <div className="mt-8">
                            <Carrom_table_slot slots={slots} selectedBoard={selectedBoard} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Carrom_game;