export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token?: string;
}

// export class User {    
//     email: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     token?: string;
// }


export class UserProfile {    
    "legal_name": string;
    "short_name": string;
    "department": string;
    "street": string;
    "town": string;
    "postcode": number;
    "country": string;
    "webpage": string; 
    "location": string;
    "invoice_street": string;
    "invoice_town": string;
    "invoice_postcode": number;
    "invoice_country": string;
    "invoice_web": string;
    "vatNumber": string;
    "email": string;
    "phone": string;
    "fax": string;
    "invoice_terms": string;
    "legal_status": string;
    "industrial_sector": string;
    "how_meet_us": string;    
    "contactPersons": [
        {
            "firstName": string;
            "lastName": string;           
            "email": string;
            "phone": string;
            "fax": string;
            "position": string;
        }
    ]
}