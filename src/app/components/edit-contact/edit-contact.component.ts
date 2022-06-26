import { IGroup } from './../../models/IGroup';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public group: IGroup = {} as IGroup;
  public groups: IGroup[] = [] as IGroup[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });

    if (this.contactId) {
      this.loading = true;
      this.contactService.getSingleContact(this.contactId).subscribe(
        (data) => {
          this.contact = data;
          this.loading = false;
          this.contactService.getSingleGroup(data).subscribe((data) => {
            this.group = data;
          });
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
        },
        (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
    }
  }

  public isNotEmpty() {
    return (
      Object.keys(this.contact).length > 0 &&
      Object.keys(this.group).length > 0 &&
      Object.keys(this.groups).length > 0
    );
  }

  public onUpdateContact() {
    if (this.contactId) {
      this.contactService.updateContact(this.contact, this.contactId).subscribe(
        (data) => {
          this.router.navigate(['/']).then();
        },
        (error) => {
          this.errorMessage = error;
          this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
        }
      );
    }
  }
}
