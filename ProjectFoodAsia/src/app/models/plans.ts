

export class Plan {
    

    constructor(
                public CustId: string, 
                public ActNo: number,
                public merchantId: number,
                public merchantName: string,
                public productName: string,
                public savings: number,
                public additionalOffers: string,
                public name: string,
                public strtdate: any,
                public enddate: string,
                public monthlyPay: number,
                public merchantPay: number,
                public totAmnt: number,
                public redemAmt: number,
                public term: number,
                public freq: string,
                public per: number,
                public SubStatus: string,
                // public redemStatus: string,
                public goalStatus: string,
                public reasonCancel: string,
                public nxtDueDate: string,
                public bengname : string,
                public benrelation: string,
                public cardBrand: string,
                public cardlast4: number,
                public cardId: any,
                public imageURL: any,
                public merchantLogo: any,
                public termsAndconditions: string,
                public benefitsAndcancellation: string,
                public productType: string,
                public taxes: number,
                public appFee: number,
                public payStatus: string,
                public instaPaid: number,
                public instaAmt: number,
                public promoDis: number,
                public promoExpire: any,
                public balAmount: number,
                public balVouchers: number,
                public redeemedAmt: number,
                public custUid: any,
           
                // public merchantDesc: string,
                // public productDesc: string,
                // public subscMatured: boolean, 
                // public subscRedeemed: boolean,
            ) {}
}


export class GroPlan {


    constructor(
        public CustId: string, 
        public ActNo: number,
        public merchantId: number,
        public merchantName: string,
        public productName: string,
        public savings: number,
        public additionalOffers: string,
        public name: string,
        public strtdate: any,
        public enddate: string,
        public monthlyPay: number,
        public totAmnt: number,
        public redemAmt: number,
        public term: number,
        public freq: string,
        public per: number,
        public SubStatus: string,
        public reasonCancel: string,
        public nxtDueDate: string,
        public cardBrand: string,
        public cardlast4: number,
        public cardId: any,
        public imageURL: any,
        public merchantLogo: any,
        public termsAndconditions: string,
        public benefitsAndcancellation: string,
        public productType: string,
        public taxes: number,
        public appFee: number,
        public payStatus: string,
        public instaPaid: number,
        public instaAmt: number,
        public promoDis: number,
        public custUid: any,
   
    ) {}

}