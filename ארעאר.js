import { Component } from '@angular/core';
import { Message } from '../models/Message.models';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent {
  
  selectedMessage: Message | null = null;
  displayNewMessage: boolean = true;
  idCounter=2
  textSearch!:string
  AllMessageList: Message[] = []
  Date: string = new Date().toLocaleDateString();
  idEZER=0;
  messageList: Message[] = []; 
  loading: boolean = false;

  constructor(private messageService:MessageService )
   { 
   }

 ngOnInit ()
 {
 this.messageService.getMessageList().subscribe((res)=>
 {
  this.messageList= res
  this.AllMessageList=this.messageList;

})
 

 }

 editMessage(message: Message,id:number) {
  this.displayNewMessage = false
  this.selectedMessage = message
  this.idEZER=id;

}
addMessage2() {
  this.displayNewMessage = true
  this.AllMessageList = this.messageList
  this.textSearch = ""

}

 SaveMessage(m:Message)
 {
  this.displayNewMessage=true
  this.textSearch = ""
  for (let index = 0; index < this.messageList.length; index++) {
    if(this.messageList[index].id==this.idEZER)
    {
      this.messageList[index].title=m.title;
      this.messageList[index].body=m.body;
    }
  }
 }


addMessage(m:Message)
 {
  this.idCounter++;
  m.id=this.idCounter;
  m.userId="1234"
  //this.messageList.push(m)
  this.loading = true; 
  this.messageService.addMessageToList(m).subscribe(
  {
    next: (response) => {
      // פעולות לאחר הצלחה 
      alert('השמירה בוצעה בהצלחה!');
    },
    error:(error) => {
      // פעולות במקרה של שגיאה
      alert('שגיאה בשמירה!');
    }
  }
  
  );
this.AllMessageList = this.messageList;
  this.displayNewMessage=true
  this.textSearch = ""

 }

  

 filterMessages() {
  if (this.textSearch.length === 0) {
    this.messageList = this.AllMessageList; // אם החיפוש ריק, הצג את כל ההודעות
  } else {
    this.messageList = this.AllMessageList.filter(a => a.title.includes(this.textSearch));
  }
}
}
