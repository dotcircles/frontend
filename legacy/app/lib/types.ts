export type Rosca = {
    id: string;
    roscaId: number;
    name: string;
    creator: string;
    randomOrder: boolean;
    totalParticipants: number;
    minParticipants: number;
    contributionAmount: string;
    contributionFrequency: string;
    startTimestamp: string;
    completed: boolean;
    eligibleParticipants: string[];
    startedBy: string | null;
    rounds: Round[];
  };
  
  export type Round = {
    id: string;
    parentRosca: Rosca;
    chainRoscaId: number;
    roundNumber: number;
    paymentCutoff: string;
    expectedContributors: string[];
    recipient: string;
    defaulters: string[];
  };