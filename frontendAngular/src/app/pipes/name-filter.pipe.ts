import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  // Takes an array of notes and filters them down to only include notes with titles
  // containing characters that are in the given search input
  transform(value: any, ...args: any[]): any {
    if (!args[0] || args[0] == '') {
      return value
    }

    let tempNotes = []; // Temporarily stores notes that are within the given date range
    let newNotes = []; // Used to arrange the new list of notes in the proper format

    // Filter notes by the given search input
    for (let i = 0; i < value.length; i++){
      for (let y = 0; y < value[i].length; y++){
        if (value[i][y]['title'].toLowerCase().indexOf(args[0].toLowerCase()) >= 0){
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
