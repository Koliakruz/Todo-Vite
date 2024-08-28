import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
}

export const useTodos = () => {
    const queryClient = useQueryClient();

    const { data: todos, refetch } = useQuery<TodoItem[]>({
        queryKey: ["todos"],
        queryFn: async () => {
            const response = await fetch("https://66c8103c732bf1b79fa81b5e.mockapi.io/api/v1/todos", {
                headers: {
                    "Cache-Control": "no-cache",
                },
            });
            const data = await response.json();
            return data.map((todo: { id: number; title: string; completed: boolean }) => ({
                id: todo.id.toString(),
                text: todo.title,
                completed: todo.completed,
            }));
        },
        refetchOnWindowFocus: false,
    });

    const addTodo = useMutation({
        mutationFn: async (newTask: string) => {
            const response = await fetch("https://66c8103c732bf1b79fa81b5e.mockapi.io/api/v1/todos", {
                method: "POST",
                body: JSON.stringify({
                    title: newTask,
                    completed: false,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            });
        },
    }).mutateAsync;

    const deleteTodo = async (id: string) => {
        const response = await fetch(`https://66c8103c732bf1b79fa81b5e.mockapi.io/api/v1/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            await refetch();
        }
    };

    const editTodo = async (id: string, title: string) => {
        const response = await fetch(`https://66c8103c732bf1b79fa81b5e.mockapi.io/api/v1/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
            }),
        });
        if (response.ok) {
            await refetch();
        }
    };

    const toggleComplete = async (id: string) => {
        const todoToToggle = todos?.find(todo => todo.id === id);
        if (todoToToggle) {
            const response = await fetch(`https://66c8103c732bf1b79fa81b5e.mockapi.io/api/v1/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: todoToToggle.text,
                    completed: !todoToToggle.completed,
                }),
            });
            if (response.ok) {
                await refetch();
            }
        }
    };

    return {
        todos,
        refetchTodos: refetch,
        addTodo,
        deleteTodo,
        editTodo,
        toggleComplete,
    };
};