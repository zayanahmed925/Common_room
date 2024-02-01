import React, { useState } from 'react';
import backgroundImage from '../../utilities/img/tt-img1.avif';
import Register_slot from './Slot_booking/Register_slot';
import Table_slot from './Slot_booking/Table_slot';

const Home = () => {
    const initialSlots = {
        'Slot 1': { registrations: 0, persons: [] },
        'Slot 2': { registrations: 0, persons: [] },
        'Slot 3': { registrations: 0, persons: [] },
        'Slot 4': { registrations: 0, persons: [] },
    };

    const [slots, setSlots] = useState(initialSlots);

    const handleRegister = (dateTime, person) => {
        setSlots((prevSlots) => {
            const existingSlot = prevSlots[dateTime];

            if (existingSlot !== undefined) {
                const updatedSlot = {
                    ...existingSlot,
                    registrations: existingSlot.registrations + 1,
                    persons: [...existingSlot.persons, person],
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
                    },
                };
            }
        });
    };

    return (
        <div className="w-screen h-screen bg-opacity-80 mx-auto p-6 rounded-md relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>

            <div className="w-full  flex items-center justify-center">

                <div className="flex w-full flex-col items-center">
                    {/* <h1 className="text-4xl text-black font-semibold mb-8">Table Tennis Scheduler</h1> */}
                    <Register_slot slots={slots} onRegister={handleRegister} />

                    {/* Conditionally render the Table_slot only if there are registrations */}
                    {Object.keys(slots).some((slot) => slots[slot].registrations > 0) && (
                        <div className="mt-8">
                            <Table_slot slots={slots} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;