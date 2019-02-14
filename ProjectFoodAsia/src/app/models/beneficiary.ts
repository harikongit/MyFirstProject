export class Beneficiary {
    constructor( 
                  public CustID: string,
                  public BenefID: number,
                  public BenefGen: string,
                  public BenefName: string,
                  public BenefDOB: Date,
                  public BenefAdd: string,
                  public BenefRel: string,
                  public BenefPh: number,
                  public Benefemail: string,
                  public BenefPhoto: any

    ) {}
}

export class Ben {
  
    constructor( public gname : string, 
                 public lname : string,
                 public relation : string,
                 public address: string,
                 // public benPhone: number, 
                 // public benEmail : string,
                 // public benPhoto: string,
                 // public benDOB : Date,
                 ) {}
 }