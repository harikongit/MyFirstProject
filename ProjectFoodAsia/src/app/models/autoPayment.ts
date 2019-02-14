export class AutoPayment {

    constructor(
                public CustId: string,
                public ActNo: number,
                public Custuid: string,
                public InstDate: any,
                public InstAmount: number,
                public payStatus: string,
                public voucherId: any,
                public cardId: string,
                public taxes: number,
                public appFee: number,
                public merchantId: number,
                public desc: string,
                public baseCode: any,
                public merchantVoucherId: any,
                public voucherType: any,           
    ) {}
}