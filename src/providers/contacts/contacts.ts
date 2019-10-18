import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

const STORAGE_KEY = 'contacts';

/*
  Generated class for the ContactsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ContactsProvider {

  constructor(public storage: Storage) {
    console.log('Hello ContactsProvider Provider');
  }

  getContacts(){
    return this.storage.get(STORAGE_KEY);
  }

  addContact(data){
    return this.getContacts().then(result => {
        if (result) {
            data['id'] = result.length + 1;
            result.push(data);
            return this.storage.set(STORAGE_KEY, result);
          } else {
            data['id'] = 1;
            return this.storage.set(STORAGE_KEY, [data]);
          }
    });
}

destroyContact(id: number) {

  console.log("Dentro do destroycontact  --> id: " + id);


  return this.getContacts().then(result => {
    id = this.procuraContatoRtIndex(result, id)
    if (result) {

      console.log('<------------ Teste implementação --------------->');

      console.log('O contato a ser deletado é : ' + result[id]['name']);
      let removed = result.splice(id, 1);
      console.log('Contato removido: ' + removed[0]['name']);
      console.log('Contatos restantes: ');
      for (let i = 0; i < result.length; i++) {
        console.log(result[i]['name']);
      }


      console.log('<------------ Teste implementação --------------->');
      return this.storage.set(STORAGE_KEY, result);
    } else {
      console.log('Não existes contatos!');
    }
  });
}

updateContact(id: number, contact: Contact) {

  console.log("Dentro do updateContact  --> id: " + id);


  return this.getContacts().then(result => {
    id = this.procuraContatoRtIndex(result, id)
    if (result) {
      if (this.procuraContato(result, contact)) {       
        if (this.procuraContatoByName(result, result[id]['name']) == this.procuraContatoByName(result, contact['name'])) {
        
          result[id]['id'] = contact['id'];
          result[id]['name'] = contact['name'];
          result[id]['gender'] = contact['gender'];

          return this.storage.set(STORAGE_KEY, result);

        } else {
          return  Promise.reject('error');
        }

      }else{

        result[id]['id'] = contact['id'];
        result[id]['name'] = contact['name'];
        result[id]['gender'] = contact['gender'];
        return this.storage.set(STORAGE_KEY, result);
      }

    }

  });
}

//verefica se o contato ja existe
procuraContato(array, contato) {
  for (let i = 0; i < array.length; i++) {
    if (contato['name'] == array[i]['name'])
      return true;
  }
  return false;
}


procuraContatoRtIndex(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (id == array[i]['id'])
      return i;
  }
  return null;

}

procuraContatoByName(array, name) {
  for (let i = 0; i < array.length; i++) {
    if (name == array[i]['name'])
      return i;
  }
  return null;

}

}

export class Contact {
name: string;
gender: string;
birthday: string;
employed: boolean;
salary: string;
photo: string;

}
