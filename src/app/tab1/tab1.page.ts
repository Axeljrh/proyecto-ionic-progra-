import { Component, OnInit } from '@angular/core';
import { IonHeader,
         IonToolbar,
         IonTitle, 
         IonContent,
         IonList,
        IonItem,
        IonLabel,
        IonButton,
        IonButtons,
        IonIcon,
        IonBadge,
        IonSelect,
        IonSelectOption
 } from '@ionic/angular/standalone';
 import { CommonModule } from '@angular/common';
 import { TaskService } from '../services/task.service';
 import { Task, TaskStatus } from '../models/task.model';
 import { addIcons } from 'ionicons';
 import { trash,create,checkmarkDone } from 'ionicons/icons';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, 
            IonToolbar, 
            IonTitle, 
            IonContent, 
            CommonModule,
            IonList,
            IonItem,
            IonLabel,
            IonButton,
            IonButtons,
            IonIcon,
            IonBadge,
            IonSelect,
            IonSelectOption
            ]
})
export class Tab1Page implements OnInit {
  tasks: Task[] =[]
  constructor(private taskService: TaskService) {
    addIcons({trash,create,checkmarkDone})
  }
  ngOnInit(): void {
    this.cargarTareas();
  }
  IonViewWillEnter(): void{
    this.cargarTareas();
  }
  cargarTareas(): void{
    this.tasks = this.taskService.getTasks();
  }
  async eliminar(id: string): Promise<void>{
    await this.taskService.deleteTask(id);
    this.cargarTareas();
  }
  async cambiarEstado(id: string, estado:TaskStatus):Promise<void>{
    await this.taskService.changeStatus(id,estado);
    this.cargarTareas();
  }
}
  