import { Injectable } from '@angular/core';
import { Address, User } from './user';
import  *  as  data  from  './data.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
    this.getUser();
   }

  user: User;
  async getUser(): Promise<User> {
    let _address: Address;
    let user
    return await fetch('https://randomuser.me/api/')
      .then(res => {
        if (res.ok)
          return res.json();
        else
          throw Error(res.statusText);
      })
      .then(data => {
        let userData = data.results[0];
        let location = userData.location;
        _address = {
          streetName: location.street.name,
          streetNr: location.street.number,
          postCode: location.postcode,
          city: location.city,
          country: location.country
        }
        
        return user= {
          firstName : userData.name.first,
          lastName : userData.name.last,
          nationality : userData.nat,
          age : userData.dob.age,
          email : userData.email,
          phone : userData.phone,
          pictureUrl : userData.picture.large,
          address : _address,
          job : this.generateRandomJob()
        };
      })
      .catch(err => {
        console.log("Error occured: " + err);
        return null;
      })
  }

  
  setUser(user: User) {
    this.user = user;
  }

  generateRandomJob(): string {
    let jobs: any[] = data;
    var randNum =  Math.floor(Math.random() * 970);
    return jobs[randNum];    
  }

}
