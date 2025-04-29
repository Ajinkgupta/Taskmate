import { useState } from 'react';
import PropTypes from 'prop-types';

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, priority });
    setTitle('');
    setDescription('');
    setPriority('Low');
  };

  return (
    <div className="mx-auto my-8">
      <form 
        onSubmit={handleSubmit} 
        className="space-y-6 bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Add New Task</h2>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
            className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your task here"
            rows={4}
            className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Add Task
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 text-center">
          Press enter or click the button to submit
        </div>
      </form>
    </div>
  );
}

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};