export interface WalletDetailsProps {
    balance: number;
    balanceAda: number;
    delegationAge: number;
    index: {
        balanceIndex: number;
        openWalletScore: number;
        policyCountIndex: number;
        reportedIndex: number;
        stakeDateIndex: number;
        totalTxIndex: number;
        walletAgeIndex: number;
    };

    policyCount: number;
    stakepool: string;
    transactionCount: number;
    walletAge: number;
    walletAgeString: string;
}
