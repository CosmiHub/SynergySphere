import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, CheckCircle2, Clock, User } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  status: z.enum(["todo", "in-progress", "review", "completed"], {
    required_error: "Please select a status",
  }),
  priority: z.enum(["low", "medium", "high", "urgent"], {
    required_error: "Please select a priority",
  }),
  owner: z.string().min(1, "Owner is required"),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
});

type TaskFormData = z.infer<typeof taskSchema>;

const statusOptions = [
  { value: "todo", label: "To Do", color: "text-muted-foreground", bgColor: "bg-muted/50", border: "border-muted" },
  { value: "in-progress", label: "In Progress", color: "text-primary", bgColor: "bg-primary/10", border: "border-primary/20" },
  { value: "review", label: "In Review", color: "text-orange", bgColor: "bg-orange/10", border: "border-orange/20" },
  { value: "completed", label: "Completed", color: "text-success", bgColor: "bg-success/10", border: "border-success/20" },
];

const priorityOptions = [
  { value: "low", label: "Low", color: "text-success", bgColor: "bg-success/10", border: "border-success/20" },
  { value: "medium", label: "Medium", color: "text-info", bgColor: "bg-info/10", border: "border-info/20" },
  { value: "high", label: "High", color: "text-warning", bgColor: "bg-warning/10", border: "border-warning/20" },
  { value: "urgent", label: "Urgent", color: "text-destructive", bgColor: "bg-destructive/10", border: "border-destructive/20" },
];

export function TaskCreationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: "todo",
      priority: "medium",
    },
  });

  // Only keep ONE onSubmit
  const onSubmit = async (data: TaskFormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const taskData = {
      ...data,
      createdAt: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9),
    };
    console.log("Task created:", taskData);
    toast({
      title: "Task created successfully!",
      description: `"${data.title}" has been added to your project.`,
    });
    form.reset();
    setIsSubmitting(false);
    navigate("/projects"); // Navigate after submit
  };



  return (
    <Card className="shadow-lg border-0 bg-card relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-rainbow opacity-10 rounded-bl-full"></div>
      <CardHeader className="space-y-1 pb-6 relative z-10">
        <CardTitle className="text-2xl font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          Task Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Task Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter task title..."
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Task Owner
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter owner name or email..."
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className={cn("flex items-center gap-2 px-2 py-1 rounded-md", option.bgColor, option.border)}>
                                <div className={cn("w-2 h-2 rounded-full", option.color.replace('text-', 'bg-'))}></div>
                                <span className={option.color}>{option.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Priority</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorityOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className={cn("flex items-center gap-2 px-2 py-1 rounded-md", option.bgColor, option.border)}>
                                <div className={cn("w-2 h-2 rounded-full", option.color.replace('text-', 'bg-'))}></div>
                                <span className={option.color}>{option.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Due Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "h-11 justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter task description..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isSubmitting}
                className="border-muted hover:border-primary/30 hover:text-primary transition-colors"
              >
                Reset
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
//                onClick={}
                className="bg-gradient-primary hover:shadow-primary transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {isSubmitting ? "Creating..." : "Create Task"}
                </span>
                <div className="absolute inset-0 bg-gradient-rainbow opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}