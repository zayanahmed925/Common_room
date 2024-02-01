import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Register_slot = ({ onRegister, selectedBoard, setSelectedBoard }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('10:00');
    const [selectedPerson, setSelectedPerson] = useState('Person 1');

    const handleRegister = () => {
        if (selectedDate && selectedTime && selectedPerson) {
            const formattedDateTime = `${selectedDate.toLocaleDateString()} ${selectedTime}`;
            onRegister(formattedDateTime, selectedPerson, selectedBoard);
            console.log('Registering:', formattedDateTime, 'Person:', selectedPerson, 'Board:', selectedBoard);
            setSelectedDate(null);
            setSelectedTime('10:00');
            setSelectedPerson('Person 1');
        }
    };

    const generateTimeOptions = () => {
        const options = [];
        const startTime = new Date();
        startTime.setHours(10, 0, 0);

        for (let i = 0; i < 8; i++) {
            const time = new Date(startTime.getTime() + i * 60 * 60 * 1000);
            options.push(
                <option key={i} value={time.toTimeString().slice(0, 5)}>
                    {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                </option>
            );
        }

        return options;
    };

    const generatePersonOptions = () => {
        const persons = ['Person 1', 'Person 2', 'Person 3', 'Person 4'];
        return persons.map((person) => (
            <option key={person} value={person}>
                {person}
            </option>
        ));
    };

    const generateBoardOptions = () => {
        const boards = ['Board 1', 'Board 2', 'Board 3'];
        return boards.map((board) => (
            <option key={board} value={board}>
                {board}
            </option>
        ));
    };

    return (
        <div>
            <div className="bg-black bg-opacity-80 p-6 rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Slot Registration</h2>
                <div className="mb-4">
                    <label htmlFor="board" className="block text-sm font-medium text-gray-600">
                        Select a board:
                    </label>
                    <select
                        id="board"
                        value={selectedBoard}
                        onChange={(e) => setSelectedBoard(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                        {generateBoardOptions()}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-600">
                        Select a date:
                    </label>
                    <DatePicker
                        id="date"
                        placeholderText="Select a date"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="MMMM d, yyyy"
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="time" className="block text-sm font-medium text-gray-600">
                        Select a time:
                    </label>
                    <select
                        id="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                        {generateTimeOptions()}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="person" className="block text-sm font-medium text-gray-600">
                        Select a person:
                    </label>
                    <select
                        id="person"
                        value={selectedPerson}
                        onChange={(e) => setSelectedPerson(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                        {generatePersonOptions()}
                    </select>
                </div>
                <button
                    onClick={handleRegister}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Register_slot;