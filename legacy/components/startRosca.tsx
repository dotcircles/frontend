"use client";

import { useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";

import { myAddress } from "@/legacy/app/lib/mock";
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from "@polkadot/extension-dapp";

import { Button } from "@heroui/button";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { start } from "repl";

export default function StartRoscaBtn({ roscaId, startable }: any) {
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [isApiReady, setIsApiReady] = useState(false);

  useEffect(() => {
    const initApi = async () => {
      try {
        // Initialize the provider to connect to the node
        const provider = new WsProvider(process.env.NEXT_PUBLIC_RPC);

        // Create the API and wait until ready
        const api = await ApiPromise.create({ provider });
        await api.isReady;

        // Update state
        setApi(api);
        setIsApiReady(true);
      } catch (error) {
        console.error("Failed to initialize API", error);
      }
    };

    initApi();

    // Cleanup when the component unmounts
    return () => {
      if (api) {
        api.disconnect();
      }
    };
  }, []);

  const handleStart = async () => {
    if (!isApiReady) {
      console.log("API is not ready");
      return;
    }
    let resolvePromise: any, rejectPromise: any;
    const promise = new Promise((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
    });
    toast.promise(promise, {
      loading: "Loading...",
      success: () => "Circle started",
      error: "Transaction failed",
    });

    try {
      const extensions = await web3Enable("DOTCIRCLES");
      const acc = await web3FromAddress(myAddress);
      // Replace with your actual extrinsic submission logic
      const tx = api!.tx.rosca.startRosca(roscaId);

      const unsub = await tx.signAndSend(
        myAddress,
        {
          signer: acc.signer,
          nonce: -1,
        },
        ({ events = [], status, txHash }) => {
          console.log("Broadcasting create");
          if (status.isFinalized) {
            console.log("Tx finalize");
            events.forEach(({ phase, event: { data, method, section } }) => {
              console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
            });
            const roscaStarted = events.find(({ event }: any) =>
              api!.events.rosca.RoscaStarted.is(event)
            );
            if (roscaStarted) {
              resolvePromise();
            } else {
              rejectPromise();
            }
            unsub();
          }
        }
      );
    } catch (error) {
      console.error("Failed to submit extrinsic", error);
    }
  };
  return (
    <Button
      onClick={handleStart}
      radius="full"
      className={
        "bg-gradient-to-tr from-lime-500 to-cyan-500 shadow-lg w-full text-white"
      }
      isDisabled={!startable}
      // color={
      //   startable
      //     ? "bg-gradient-to-tr from-rose-500 to-purple-500 text-white shadow-lg"
      //     : "default"
      // }
    >
      {startable ? "Start" : "Waiting For Participants"}
    </Button>
  );
}
