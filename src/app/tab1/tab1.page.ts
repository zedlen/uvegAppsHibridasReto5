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
      this.items = items;
    });
  }

  deleteItem(entry: Entry): void {
    this.firebaseService.deleteEntry(entry);
  }
}
