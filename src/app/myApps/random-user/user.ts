export class User {
    firstName: string = '';
    lastName: string = '';
    nationality: string = '';
    age: number = 0;
    email: string = '';
    phone: string = '';
    pictureUrl: string = '';
    job: string ='';
    address: Address = new Address();
}

export class Address {
    streetName: string;
    streetNr: number;
    postCode: number;
    city: string;
    country: string
}



