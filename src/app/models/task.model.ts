export type TaskStatus = "pendinete" | "en progreso" | "listo";
export type TaskPriority = "baja" | "media" | "alta" | "urgente";

export interface Task {
    id: string;
    titulo: string;
    descripcion: string;
    fechaCreacion: string;
    fechaLimite: string;
    estado: TaskStatus;
    prioridad: TaskPriority;
    categoria: string;
    completada: boolean;
    

}