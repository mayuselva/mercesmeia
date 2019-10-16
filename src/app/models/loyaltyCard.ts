export class LoyaltyCard {
    constructor(
        public loyaltyCardSeriesNo?: string,
        public loyaltyCardNo?: string,
        public loyaltySchemeName?: string,
        public loyaltySchemeLevel?: string,
        public loyaltySchemeId: string = '0',
        public customerAccountNumber: string = '0',
        public availablePoints?: number,
        public availableBalance?: number,
        public redeemablePoints?: number,
        public redeemableBalance?: number,
        public assignDate?: string,
        public isActive?: boolean,
        public blockedDate?: string,
        public reasonForBlock?: string,
        public previousLoyaltySchemeId?: string,
        public updateDate?: string,
        public createdUser?: string,
        public updatedUser?: string
    ) {}
}
