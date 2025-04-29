import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useTasks } from '../hooks/useTasks';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { tasks, isLoading, error, addTask, updateTask, deleteTask } = useTasks();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
        return;
      }
      setUser(session.user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/login');
        return;
      }
      setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Two column layout on desktop */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Form column - takes 5 columns on desktop */}
            <div className="lg:col-span-5 mb-8 lg:mb-0">
              <div className="sticky top-6">
                 <TaskForm onSubmit={addTask} />
                
                {error && (
                  <div className="mt-4 bg-red-50 p-4 rounded-md">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Task list column - takes 7 columns on desktop */}
            <div className="lg:col-span-7">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Tasks</h2>
              {isLoading ? (
                <div className="text-center p-8 bg-white rounded-lg shadow">
                  <div className="animate-pulse flex justify-center">
                    <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                  </div>
                  <p className="text-gray-500 mt-4">Loading tasks...</p>
                </div>
              ) : tasks.length === 0 ? (
                <div className="text-center p-8 bg-white rounded-lg shadow">
                  <p className="text-gray-500">No tasks yet. Add your first task!</p>
                </div>
              ) : (
                <TaskList
                  tasks={tasks}
                  onStatusChange={(id, status) => updateTask(id, { status })}
                  onDelete={deleteTask}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}