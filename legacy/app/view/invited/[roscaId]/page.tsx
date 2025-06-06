import { AvatarMap, myAddress, NameMap } from "@/legacy/app/lib/mock";
import getApi from "@/legacy/app/lib/polkadot";
import {
  getInvitedParticipants,
  getPendingRoscasDetails,
  getSecurityDeposits,
  getWaitingParticipiants,
} from "@/legacy/app/lib/queries";
import RoscaInfo from "@/legacy/components/detailsBlock";
import InvitedParticipantTable from "@/legacy/components/invitedParticipants";
import SecurityDepositsTable from "@/legacy/components/securityDepositsTable";
import StartRoscaBtn from "@/legacy/components/startRosca";
import { Avatar } from "@heroui/avatar";
import { redirect } from "next/navigation";
import { title } from "@/legacy/components/primitives";
import { blockNumberToDate, createDepositRows } from "@/legacy/app/lib/helpers";
import { Toaster } from "sonner";

export default async function Page({
  params,
}: {
  params: { roscaId: string };
}) {
  const address = myAddress;
  const { roscaId } = await params;
  const api = await getApi();
  const currentBlockNumber = (await api.derive.chain.bestNumber()).toNumber();
  const roscaDetails: any = await getPendingRoscasDetails(roscaId);
  const securityDeposits: any = await getSecurityDeposits(roscaId);
  const depositRows = createDepositRows(securityDeposits);
  if (!roscaDetails) {
    redirect("/");
  }
  const invitedParticipants = await getInvitedParticipants(roscaId);
  const joinedParticipants: any = await getWaitingParticipiants(roscaId);

  const displayRows: any = [];

  let currentJoinCount = 0;

  invitedParticipants.forEach((participant: any) => {
    let joined = joinedParticipants.includes(participant[0] as string);
    let row: any = {
      key: participant[0],
      avatar: (
        <Avatar
          src={AvatarMap[participant[0] as string]}
          name={NameMap[participant[0] as string]}
          size="lg"
        />
      ),
      name: (
        <div className="font-extrabold text-2xl">
          <span className={joined ? "text-green-400" : ""}>
            {NameMap[participant[0] as string]}
          </span>
        </div>
      ),
      joined,
    };
    if (participant[0] == address) {
      row["showButton"] = joinedParticipants.includes(address)
        ? "leave"
        : "join";
    }
    displayRows.push(row);
    if (joined) currentJoinCount++;
  });

  return (
    <div>
      <section className="pb-7">
        <RoscaInfo
          name={roscaDetails.name}
          type={roscaDetails.randomOrder ? "Random" : "Fixed Order"}
          start={blockNumberToDate(
            currentBlockNumber,
            roscaDetails.startByBlock
          )}
          contributionFrequency={
            roscaDetails.contributionFrequency == "100,800"
              ? "Weekly"
              : "Monthly"
          }
          contributionAmount={roscaDetails.contributionAmount}
          totalParticipants={roscaDetails.numberOfParticipants}
          minParticipants={roscaDetails.minimumParticipantThreshold}
        />
      </section>
      <section className="pb-7 flex justify-center">
        <div>
          <StartRoscaBtn
            roscaId={roscaId}
            startable={
              currentJoinCount >= roscaDetails.minimumParticipantThreshold
            }
          />
        </div>
      </section>

      <section className="pb-7 text-center">
        <div className={title()}>Invited Participants</div>
        <InvitedParticipantTable rows={displayRows} roscaId={roscaId} />
      </section>

      <section className="pb-7 text-center">
        <div className={title()}>Current Security Deposits</div>
        <SecurityDepositsTable rows={depositRows} roscaId={roscaId} />
      </section>
    </div>
  );
}
