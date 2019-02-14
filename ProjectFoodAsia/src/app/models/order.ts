export class Order {
    

    constructor(
                public CustId: string, 
                public ActNo: number,
                public merchantName: string,
                public productName: string,
                public savings: number,
                public additionalOffers: string,
                public name: string,
                public strtdate: any,
                public enddate: string,
                public pay: number,
                public bengname : string,
                public benrelation: string,
                public cardBrand: string,
                public cardlast4: number,
                public cardId: any,
                public imageURL: any,
                public SubStatus: string,
                
            ) {}
}