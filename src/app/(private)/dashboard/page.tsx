import { Scroll, Send, Users } from "lucide-react";
import { SummarySection } from "./components/summary-section";
import { RecentAddedUsersTable } from "./components/recent-added-users-table";
import { LastCampaignSentTable } from "./components/last-campaign-sent-table";
import { verifyToken } from "@/client/verify-token";
import { redirect } from "next/navigation";
import { LogsTable } from "./components/logs-table";

export interface LogResponse {
  id: number;
  ip: string;
  pathname: string;
  createdAt: Date;
  statusReq: string;
  dataLength: string | null;
}


async function getLogs() {
  const token = verifyToken();

  const response = await fetch("http://localhost:3000/api/logs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    redirect("/acessar");
  }

  const logs = (await response.json()) as LogResponse[];

  return logs;
}

export default async function Page() {
  const logs = await getLogs();

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-semibold">Início</h1>
        {/* <SummarySection /> */}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold flex items-center">
          {/* <Users className="h-6 w-6 mr-3" strokeWidth={2.5} /> */}
          {/* Últimos contatos adicionados */}
          <Scroll className="h-6 w-6 mr-3" strokeWidth={2.5} />
          Últimos logs
        </h2>
        <div className="border rounded-md p-5">
          {/* <RecentAddedUsersTable /> */}
          <LogsTable logs={logs} />
        </div>
      </div>

      {/* <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold flex items-center">
          <Send className="h-6 w-6 mr-3" strokeWidth={2.3} />
          Últimas campanhas enviadas
        </h2>
        <div className="border rounded-md p-5">
          <LastCampaignSentTable />
        </div>
      </div> */}
    </div>
  );
}
