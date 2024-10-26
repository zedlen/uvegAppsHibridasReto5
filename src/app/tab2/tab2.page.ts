import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Entry, FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  group: FormGroup;
  defaultImage: String =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE7NOCw5TXI8NQAQ6cswIYCuRVE9TtjAbggQ&s';
  constructor(
    private firabeaseService: FirebaseService,
    private router: Router
  ) {
    this.group = new FormGroup({
      title: new FormControl('', Validators.required),
      image: new FormControl(this.defaultImage, Validators.required),
      date: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  createEntry(): void {
    if (this.group.invalid) return;
    const { title, image, date, description } = this.group.value;
    this.firabeaseService.addEntry({
      title,
      image,
      date,
      description,
      id: '',
    } as Entry);
    this.group.reset();
    this.router.navigate(['/', 'tabs', 'tab1']);
  }
}
