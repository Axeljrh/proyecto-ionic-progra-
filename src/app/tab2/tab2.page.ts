import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, 
  IonToolbar,
  IonTitle, 
  IonContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonToast,
  ToastController
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { TaskPriority, TaskStatus } from '../models/task.model';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonToast,
    ExploreContainerComponent]
})
export class Tab2Page {
  mostrarToast =  false;
  mensajeToast = '' ;

  form: {
    titulo: string ;
    descripcion: string;
    fechaLimite: string ;
    estado: TaskStatus ;
    prioridad: TaskPriority ;
    categoria: string ;
  } = {
    titulo: '' ,
    descripcion: '' ,
    fechaLimite :'' ,
    estado: 'pendinete' ,
    prioridad: 'media' ,
    categoria: ''
  } ;

  constructor(
    private taskService: TaskService,
    private toastController: ToastController
  ) {}
  async guardar (): Promise<void>{
    if (!this.form.titulo.trim()|| !this.form.fechaLimite){
      this.mensajeToast = 'El titulo y la fecha son obligatorias'
      this.mostrarToast = true ; 
      return;
    }

    await this.taskService.addTask({
      titulo:this.form.titulo,
      descripcion:this.form.descripcion,
      fechaLimite: this.form.fechaLimite,
      estado: this.form.estado,
      prioridad: this.form.prioridad ,
      categoria: this.form.categoria
    });
    this.form = {
    titulo: '' ,
    descripcion: '' ,
    fechaLimite :'' ,
    estado: 'pendinete' ,
    prioridad: 'media' ,
    categoria: ''
    };
    this.mensajeToast = 'tarea guardad correctamente'
    this.mostrarToast = true;
  } 

} 
