import { Pipe, PipeTransform } from '@angular/core';
import { BackendService } from '../services/backend-service.service';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  constructor(private server: BackendService) {}

  // Takes in an array of notes and filters them down to notes created on the given day
  transform(value: any, ...args: any[]): any {
    if (!args[0] || args[0] == '') {
      return value
    }
    
    // Get the date range allowed for any notes
    let date = new Date(args[0]);
    let futureDate = new Date(date.getTime() + (24*60*60*1000));

    let tempNotes = []; // Temporarily stores notes that are within the given date range
    let newNotes = []; // Used to arrange the new list of notes in the proper format

    // Filter notes by date
    for (let i = 0; i < value.length; i++){
      for (let y = 0; y < value[i].length; y++){
        let noteDate = new Date(value[i][y]['dateCreated'])
        if (noteDate >= date && noteDate < futureDate){
          tempNotes.push(value[i][y]);
        }
      }
    }

    // Format the list of notes into a new object to be returned
    for (let i = 0; i < Math.ceil(tempNotes.length / 3); i++) {
      let tempNoteArray = [];
      for (let y = 0; y < 3; y++){
        if (tempNotes[(i*3)+y]){
          tempNoteArray.push(tempNotes[(i*3)+y]);
        }
      }
      newNotes.push(tempNoteArray);
    }
    
    return newNotes;
  }
}
