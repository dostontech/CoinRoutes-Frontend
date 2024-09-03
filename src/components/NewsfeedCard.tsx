import React from 'react';

interface NewsfeedCardProps {
    title: string;
    description: string;
    timestamp: string;
}

const NewsfeedCard: React.FC<NewsfeedCardProps> = ({ title, description, timestamp }) => {
    return (
        <div className="bg-gray-700 p-4 mb-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="text-sm text-gray-400">{timestamp}</p>
            <p className="mt-2 text-gray-300">{description}</p>
        </div>
    );
};

export default NewsfeedCard;
