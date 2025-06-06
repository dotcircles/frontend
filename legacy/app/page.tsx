import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/legacy/components/primitives";
import { GithubIcon } from "@/legacy/components/icons";
import RoscaDetailsTable from "@/legacy/components/roscaDetailsTable";
import {
  activeRoscasForAddress,
  getAllActiveRoscas,
  getAllPendingRoscas,
  getCurrentPendingParticipantsCount,
  pendingInvitedRoscas,
} from "./lib/queries";
import { getCookieStorage } from "./lib/storage";
import { Button } from "@heroui/button";
import getApi from "./lib/polkadot";
import { myAddress } from "./lib/mock";
import CreateRosca from "@/legacy/components/createRosca";
import { blockNumberToDate } from "./lib/helpers";

function createTableRows(
  data: any,
  blockNumber: number,
  state: "active" | "invited" | "completed"
) {
  return data
    .map(([roscaId, roscaDetails]: [any, any]) => {
      let expired = blockNumber >= roscaDetails.startByBlock;
      let nameFromBytes = Buffer.from(
        roscaDetails.name.slice(2),
        "hex"
      ).toString("utf8");
      return {
        key: roscaId,
        name: nameFromBytes ? nameFromBytes : roscaDetails.name,
        type: roscaDetails.randomOrder ? "Random" : "Fixed Order",
        number_of_participants: roscaDetails.numberOfParticipants,
        min_participants: roscaDetails.minimumParticipantThreshold,
        contribution_amount: roscaDetails.contributionAmount,
        contribution_frequency:
          roscaDetails.contributionFrequency == 100800 ? "Weekly" : "Monthly",
        start_by_date: blockNumberToDate(
          blockNumber,
          roscaDetails.startByBlock
        ).toString(),
        view: (
          <Button
            radius="full"
            href={`view/${state}/${roscaId}`}
            as={Link}
            showAnchorIcon
            className="bg-gradient-to-tr from-rose-500 to-purple-500"
          >
            {expired ? "Expired" : "View"}
          </Button>
        ),
        expired,
      };
    })
    .sort(
      (a: { start_by_date: number }, b: { start_by_date: number }) =>
        b.start_by_date - a.start_by_date
    );
}

export default async function Home() {
  const api = await getApi();
  const address = myAddress;
  const invitedPendingRosca = await pendingInvitedRoscas(address);
  const activeRoscas = await activeRoscasForAddress(address);
  const currentBlockNumber = (await api.derive.chain.bestNumber()).toNumber();
  const roscaRows = createTableRows(
    invitedPendingRosca,
    currentBlockNumber,
    "invited"
  );
  const activeRoscasRows = createTableRows(
    activeRoscas,
    currentBlockNumber,
    "active"
  );

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center pt-6">
          <div className={title()}>Invites</div>
        </div>
        <div>
          <RoscaDetailsTable rows={roscaRows} type="Pending" />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center gap py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <div className={title()}>Active Circles</div>
        </div>
        <div>
          {/* <RoscaDetailsTable rows={activeRoscasRows} type="Active" /> */}
        </div>
      </section>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* <CreateRosca /> */}
      </section>
    </>
  );
}
