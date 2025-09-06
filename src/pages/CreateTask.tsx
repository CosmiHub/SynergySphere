import { TaskCreationForm } from "@/components/TaskCreationForm";

const CreateTask = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-purple rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-pink rounded-full opacity-15 animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-teal rounded-full opacity-10 animate-pulse delay-2000"></div>
      <div className="absolute bottom-20 right-1/3 w-12 h-12 bg-gradient-orange rounded-full opacity-20 animate-pulse delay-500"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-rainbow bg-clip-text text-transparent">Create New Task</h1>
            <p className="text-muted-foreground text-lg">
              Add a new task to your project and track its progress
            </p>
          </div>
          <TaskCreationForm />
        </div>
      </div>
    </div>
  );
};

export default CreateTask;