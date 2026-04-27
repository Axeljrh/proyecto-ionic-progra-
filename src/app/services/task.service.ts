/* Trae herramientas que el service necesita para funcionar */
import {Injectable} from "@angular/core";
import {Preferences} from "@capacitor/preferences";
import {Task, TaskStatus} from "../models/task.model";

/* Crear una sola instancia para la app */
@Injectable({
    providedIn:'root'
})
export class TaskService{
    /* Define la clave con las que se guardaron las tareas */
    private readonly STORAGE_KEY = 'tasks';
    /* Arreglo q guarda en memoria caundo la app esta activa(antes de guardarlo en el dispositivo) */
    private tasks: Task[] = [];

    /* carga desde almacenamiento local las tareas que se habian guardado antes */
    async init(): Promise<void>{
        const {value}=await Preferences.get({key: this.STORAGE_KEY});
        this.tasks=value ? JSON.parse(value):[];
    }
    /* Devuelve la lista de tareas */
    getTasks(): Task [] {
        return [...this.tasks]

    }

    /* Busca una tarea por su ID */
    getTaskById(id:string): Task | undefined {
        return this.tasks.find(task => task.id ===id);
    }

    /* Agrega una tarea nueva */
    async addTask(TaskData: Omit<Task, 'id'|'fechaCreacion'|'completada'>):
    Promise<void>{
        const newTask: Task={
            ...TaskData,
            id: crypto.randomUUID(),
            fechaCreacion: new Date() .toISOString(),
            completada: TaskData.estado === 'listo'
        };
        this.tasks.unshift(newTask);
        await this.saveTask();

    }

    /* Actualiza la tarea existente */
    async updateTask(updateTask:Task): Promise<void>{
        const index = this.tasks.findIndex(task => task.id === updateTask.id);
        if(index === -1)return;

        updateTask.completada = updateTask.estado === 'listo';
        this.tasks[index]={...updateTask};
        await this.saveTask();
    }
    /* Elimina la tarea existente por id */
    async deleteTask(id:string):Promise<void>{
        this.tasks = this.tasks.filter(tasks => tasks.id !== id);
        await this.saveTask();
    }

    /* Cambia solo el estado de una tarea */
    async changeStatus(id:string, estado:TaskStatus): Promise<void>{
        const task = this.tasks.find(task => task.id === id);
        if (!task) return;

        task.estado = estado;
        task.completada = estado === 'listo';
        await this.saveTask();
    }

    /* calcula estadisticas del arreglo de tareas */
    getSummary(){
        const total =this.tasks.length;
        const pendinete = this.tasks.filter(t => t.estado === 'pendinete').length;
        const enProgreso = this.tasks.filter(t => t.estado === 'en progreso').length;
        const listas = this.tasks.filter(t => t.estado === 'listo').length;

        const hoy = new Date();
        const vencidas = this.tasks.filter(t => t.estado !== 'listo' && new Date(t.fechaLimite)< hoy).length;

        return{
            total,
            pendinete,
            enProgreso,
            listas,
            vencidas
        };
    }

    /* Guarde el arreglo tasks en el almacenamiento local */
    private async saveTask(): Promise<void>{
        await Preferences.set({
            key:this.STORAGE_KEY,
            value:JSON.stringify(this.tasks)
        });
    }


}