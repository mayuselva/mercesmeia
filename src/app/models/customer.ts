export class Customer {
    constructor(
        public customerAccountNumber?: string,
        public email?: string,
        public password?: string,
        public title?: string,
        public firstName?: string,
        public lastName?: string,
        public address1?: string,
        public address2?: string,
        public city?: string,
        public county?: string,
        public postCode?: string,
        public country?: string,
        public gender?: string,
        public mobileNo?: string,
        public landLineNo?: string,
        public customerCode?: string,
        public createdDate?: string,
        public isActive?: boolean,
        public blockedDate?: string,
        public reasonForBlock?: string,
        public isAssigned?: boolean,
        public createdUser?: string,
        public updatedUser?: string
    ) {}
}
