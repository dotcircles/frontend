import { AvatarMap, myAddress, NameMap } from "@/legacy/app/lib/mock";
import getApi from "@/legacy/app/lib/polkadot";
import {
  getActiveRoscaParticipantsOrder,
  getActiveRoscasDetails,
  getCurrentContributors,
  getDefaulters,
  getEligibleRecipient,
  getInvitedParticipants,
  getSecurityDeposits,
  getWaitingParticipiants,
} from "@/legacy/app/lib/queries";
import RoscaInfo from "@/legacy/components/detailsBlock";
import InvitedParticipantTable from "@/legacy/components/invitedParticipants";

import SecurityDepositsTable from "@/legacy/components/securityDepositsTable";
import { Avatar } from "@heroui/avatar";
import { redirect } from "next/navigation";

import { createDefaulterTableData, createDepositRows } from "@/legacy/app/lib/helpers";

import DefaultersTable from "@/legacy/components/defaultersTable";
import ContributorsTable from "@/legacy/components/contributorsTable";
import PendingContributorsTable from "@/legacy/components/pendingContributorsTable";
import { title } from "@/legacy/components/primitives";
import Recipient from "@/legacy/components/recipientCard";

export default async function Page({
  params,
}: {
  params: { roscaId: string };
}) {
  const address = myAddress;
  const { roscaId } = await params;
  const api = await getApi();
  const roscaDetails: any = await getActiveRoscasDetails(roscaId);
  const securityDeposits: any = await getSecurityDeposits(roscaId);
  const currentBlockNumber = (await api.derive.chain.bestNumber()).toNumber();
  const depositRows = createDepositRows(securityDeposits);
  console.log(depositRows);
  const activeParticipants: any = await getActiveRoscaParticipantsOrder(
    roscaId
  );
  const eligbleRecipient: any = await getEligibleRecipient(roscaId);

  if (!roscaDetails || !activeParticipants.length) {
    redirect("/");
  }

  const defaultCount = await getDefaulters(1);
  const defaultRows = createDefaulterTableData(defaultCount);

  const currentContributors = await getCurrentContributors(roscaId);

  const pendingContributors = activeParticipants.filter(
    (participant: any) => !currentContributors.includes(participant)
  );

  const contributorRows: any = currentContributors.map((contributor: any) => {
    return {
      key: contributor,
      avatar: (
        <Avatar
          src={AvatarMap[contributor as string]}
          name={NameMap[contributor as string]}
          size="lg"
        />
      ),
      name: NameMap[contributor as string],
    };
  });

  const pendingContributorsRows: any = pendingContributors
    .map((pendingContributor: any) => {
      return {
        key: pendingContributor,
        avatar: (
          <Avatar
            src={AvatarMap[pendingContributor as string]}
            name={NameMap[pendingContributor as string]}
            size="lg"
          />
        ),
        name: NameMap[pendingContributor as string],
        showButton: pendingContributor == myAddress,
      };
    })
    .filter((account: any) => account.key != eligbleRecipient);

  console.log(pendingContributorsRows);

  return (
    <div>
      <section className="pb-7 mb-8 flex justify-between">
        <section>
          <RoscaInfo
            name={roscaDetails.name}
            type={roscaDetails.randomOrder ? "Random" : "Fixed Order"}
            start={roscaDetails.startByBlock}
            contributionAmount={roscaDetails.contributionAmount}
            contributionFrequency={
              roscaDetails.contributionFrequency == 100800
                ? "Weekly"
                : "Monthly"
            }
            totalParticipants={roscaDetails.numberOfParticipants}
            minParticipants={roscaDetails.minimumParticipantThreshold}
          />
        </section>
        <section className="flex-4">
          <Recipient
            recipient={NameMap[eligbleRecipient]}
            imageUrl={AvatarMap[eligbleRecipient]}
            title={"Current Recipient"}
          />
        </section>
      </section>

      <div className="flex justify-between space-x-10">
        <section className="flex-1 pb-7 text-center">
          <div className={title()}>Contributors</div>
          <ContributorsTable rows={contributorRows} />
        </section>

        <section className="flex-1 pb-7 text-center">
          <div className={title()}>Pending Contributors</div>
          <PendingContributorsTable
            rows={pendingContributorsRows}
            roscaId={roscaId}
          />
        </section>
      </div>
      <section className="pb-7 text-center">
        <div className={title()}>Current Security Deposits</div>
        <SecurityDepositsTable rows={depositRows} roscaId={roscaId} />
      </section>
      {defaultCount.length ? (
        <section className="pb-7 text-center">
          <div className={title()}>Defaulters Participants</div>
          <DefaultersTable rows={defaultRows} />
        </section>
      ) : (
        ""
      )}
    </div>
  );
}
