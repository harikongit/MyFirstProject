export class Voucher {
    

    constructor(
                public CustId: string, 
                public ActNo: number,
                public merchantName: string,
                public productName: string,
                public name: string,
                public savings: number,
                public additionalOffers: string,
                public InstDate:any,
                public InstAmount: number,
                public RedStatus: string,
                public payStatus: string,
                public term: number,
                public freq: string,
                public imageURL: any,
                public voucherId: any,
                public txnId: string,
                public inTxnId: string,
                public merchantId: number,
                public cardBrand: string,
                public cardlast4: number,
                public cardId: string,
                public custUid: string,
                public promoValue: number,
                public merchantVoucherId: any,
                public balAmount: number,
                public termsAndconditions: string,
                public benefitsAndcancellation: string,
                public promoExpire : any,
               

                
                       
    ){}
}