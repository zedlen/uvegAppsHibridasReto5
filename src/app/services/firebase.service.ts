import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  CollectionReference,
  addDoc,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Entry {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
  path: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  item$: Observable<Entry[]>;
  itemsCollection: CollectionReference;
  firestore: Firestore = inject(Firestore);
  constructor() {
    console.log(this.firestore.toJSON());
    this.itemsCollection = collection(this.firestore, 'entry');
    this.item$ = collectionData(this.itemsCollection, {
      idField: 'id',
    }) as Observable<Entry[]>;
  }

  async addEntry(newEntry: Entry): Promise<Boolean> {
    await addDoc(this.itemsCollection, newEntry);
    return true;
  }

  async deleteEntry(entry: Entry): Promise<void> {
    deleteDoc(doc(this.itemsCollection, entry.id));
  }
}
