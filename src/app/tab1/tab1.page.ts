import { Component } from '@angular/core';

import { Entry, FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  items: Entry[] = [];

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.item$.subscribe((items: Entry[]) => {
      this.items = items.sort((entry1: Entry, entry2: Entry) => {
        const date1 = new Date(entry1.date);
        const date2 = new Date(entry2.date);
        console.log(date1, date2);
        return date1.getTime() < date2.getTime() ? 1 : 0;
      });
    });
  }

  deleteItem(entry: Entry): void {
    this.firebaseService.deleteEntry(entry);
  }
}
