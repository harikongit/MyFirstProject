

export class CustomerDet {

   constructor(
                public custId: string,
                public custName: string,
                public custPhoneMobile: number,
                public custEmailId: string,
                public custGender: string,
                public custDOB: Date,
                public custStatus: string,
                // public custProfession: string,
                // public custPhoneOffice: number,
                // public custAddress: Address,
                // public custCity: string,
                // public custCountry: string,
                // public custPostalCode: number,
                // public custPhone1: number,
                // public custPhone2: number,
                // public custFax: number,
              ) {} 
}

export class CustomerDetAtSignUp {

  constructor(
               public custId: string,
               public custFirstName: string,
               public custLastName: string,
               public custPhoneMobile: number,
               public custEmailId: string,
               public custGiftVoucherIssued: string,
               public custGiftAmount: number,
             ) {} 
}

export class Address {
  constructor( public custProfession: string,
               public custHNo : number,
               public custlandmark: string,
               public custAddress1: string,
               public custAddress2: string,
               public custPostalCode: number,
               public custCity: string,
               public custCountry: string,
               public custcat: string,
               public custAltnumber: number,

              ) {}
}

export class Addressnew {
  constructor( public custStreetAddress: string,
               public custZipCode: number,
               public custState: string,
               public custCity: string,
               public custCountry: string,
               
              ) {}
}

