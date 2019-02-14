export class Transaction {
    constructor(
        public ActNo: number,
        public TXN_ID: number,
        public TXN_GWY_ID: number,
        public TXN_TimeStamp: number,
        public TXN_FromAccount: number,
        public TXN_ToAccount: number,
        public TXN_Desc: string,
        public TXN_Total_Amt: number,
        public TXN_GST_HST_Amt: number,
        public TXN_Merchant_Amt: number,
        public TXN_Discount_Amt: number,
        public TXN_AppService_Amt: number,
        public TXN_Final_Amt: number,
        public TXN_GWY_ProcessedAmt: number,
        public TXN_Status: string
        
    ) {}
}