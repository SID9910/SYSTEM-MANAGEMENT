import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo', 
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  localItem : string | null;
  todoForm !: FormGroup;
  tasks: ITask [] = [];
  inprogress: ITask [] = [];
  done: ITask  [] = [];
  updateIndex!: any;
  isEditEnabled : boolean = false;
  currentDate: Date;
  constructor(private fb: FormBuilder){
    this.currentDate = new Date();

    this.localItem = localStorage.getItem('tasks');
  if(this.localItem ==null){
    this.tasks =[];
  }else{
    this.tasks =JSON.parse(this.localItem);
  } 

  }
  
  ngOnInit(): void {
      this.todoForm = this.fb.group({
        item: ['',Validators.required],
        item2:['',Validators.required],
        item3:['' ,Validators.required],
        item4:['',Validators.required]
      })
  }

  addTask(){
    this.tasks.push({
      description:this.todoForm.value.item,
      description1:this.todoForm.value.item2,
      date:this.todoForm.value.item3,
      status:this.todoForm.value.item4,
      done:false,
      
      
    });
    this.todoForm.reset();
    localStorage.setItem("tasks",JSON.stringify(this.tasks));
   
  }
  Updatetask(){
     this.tasks[this.updateIndex].description = this.todoForm.value.item;
     this.tasks[this.updateIndex].description1 = this.todoForm.value.item2;
     this.tasks[this.updateIndex].date = this.todoForm.value.item3;
     this.tasks[this.updateIndex].status = this.todoForm.value.item4;
     this.tasks[this.updateIndex].done = false;
     this.todoForm.reset();
     this.updateIndex = undefined;
     this.isEditEnabled = false;
     localStorage.setItem("tasks",JSON.stringify(this.tasks));
  }

  onEdit(item: ITask, item2: ITask,item3: ITask,item4: ITask, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.todoForm.controls['item2'].setValue(item2.description1);
    this.todoForm.controls['item3'].setValue(item3.date);
    this.todoForm.controls['item4'].setValue(item4.status);
    this.updateIndex = i;
    this.isEditEnabled = true;
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
  
  deleteTask(i: number ){
    this.tasks.splice(i,1);
    
    localStorage.setItem("tasks",JSON.stringify(this.tasks));

  }
  deleteinprogressTask(i: number){
    this.inprogress.splice(i,1);
    localStorage.setItem("tasks",JSON.stringify(this.tasks));
  }

  deletedoneTask(i: number){
    this.done.splice(i,1);
    localStorage.setItem("tasks",JSON.stringify(this.tasks));
  }
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
