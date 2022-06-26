import { IGroup } from './../../models/IGroup';
import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.contactService.getAllGroups().subscribe(
      (data) => {
        this.groups = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }

  public isNotEmpty() {
    return Object.keys(this.groups).length > 0;
  }

  public submitNewContact() {
    this.contactService.createContact(this.contact).subscribe(
      (data) => {
        this.router.navigate(['/']).then();
      },
      (error) => {
        this.errorMessage = error;
        this.router.navigate(['/contacts/add']).then();
      }
    );
  }
}
