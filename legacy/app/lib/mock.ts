import { Rosca } from "./types";

export const NameMap: any = {
  "5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY": "Alice Simmons",
  "5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc": "Bob Jacobs",
  "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y": "Charlie Rush",
  "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy": "Dave Broad",
  "5FEda1GYvjMYcBiuRE7rb85QbD5bQNHuZajhRvHYTxm4PPz5": "Connor Circles",
};

export const myAddress = "5FEda1GYvjMYcBiuRE7rb85QbD5bQNHuZajhRvHYTxm4PPz5";

export const AvatarMap: any = {
  "5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY":
    "https://i.pravatar.cc/150?u=1",
  "5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc":
    "https://i.pravatar.cc/150?u=2",
  "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y":
    "https://i.pravatar.cc/150?u=3",
  "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy":
    "https://i.pravatar.cc/150?u=4",
  "5FEda1GYvjMYcBiuRE7rb85QbD5bQNHuZajhRvHYTxm4PPz5": "/selfie.jpeg",
};


export const mockedRoscas: Rosca[] = [
  {
    id: "1",
    roscaId: 1,
    name: "Weekly Dev Circle",
    creator: "5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY",
    randomOrder: false,
    totalParticipants: 3,
    minParticipants: 3,
    contributionAmount: "1000000000000",
    contributionFrequency: "100800",
    startTimestamp: "1710000000",
    completed: false,
    eligibleParticipants: ["5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY", "5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc", "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y"],
    startedBy: "5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY", // Active
    rounds: [],
  },
]