import React from 'react';

const TaskDetailsModal = ({ taskDetails, onClosemodal }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-4 w-1/3">
                <h2 className="text-xl font-bold">task details</h2>
                <p><strong>Assigned To:</strong>Assigned To</p>
                <p><strong>Status:</strong>Status</p>
                <p><strong>Completion:</strong> Completed</p>
                <h3 className="mt-4 font-semibold">Comments:</h3>
                {/* <ul>
                    {taskDetails.comments.map((comment, index) => (
                        <li key={index} className="border-b py-2">{comment}</li>
                    ))}
                </ul> */}
                <textarea placeholder="Add your comment..." className="border rounded w-full p-2 mt-2" />
                <button onClick={onClosemodal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
            </div>
        </div>
    );
};

export default TaskDetailsModal;
