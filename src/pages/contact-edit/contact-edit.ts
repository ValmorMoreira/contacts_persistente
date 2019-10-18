import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {ContactsProvider} from '../../providers/contacts/contacts';
import {ContactsListPage} from "../contacts-list/contacts-list";


// @ts-ignore
@IonicPage()
@Component({
  selector: 'page-contact-edit',
  templateUrl: 'contact-edit.html',
})
export class ContactEditPage {
  model: Contact;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private contactProvider: ContactsProvider
  ){
    if (this.navParams.data.contact) {
      this.model = this.navParams.data.contact;
    } else {
      this.model = new Contact();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactEditPage');

  }

  saveContact() {
    console.log('Dentro do saveContact');
    this.contactProvider.updateContact(this.model.id, this.model)
      .then((result: any) => {
        this.toast.create({ message: 'Usuário salvo' , duration : 1000}).present();
      }).catch((error: any) => {
        this.toast.create({ message: error.error , duration : 1000 }).present();
      });

  }

}
export class Contact {
  id;
  name: string;
  gender: string;
  birthday: string;
  employed: boolean;
  salary: string;
  photo: string;

}