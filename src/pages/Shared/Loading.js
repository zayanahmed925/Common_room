import React, { useState } from 'react';
import { GridLoader } from 'react-spinners';

const Loading = () => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="flex justify-center items-center h-screen">
            <GridLoader loading={loading} color="#36d7b7" />
        </div>
    );
};

export default Loading;