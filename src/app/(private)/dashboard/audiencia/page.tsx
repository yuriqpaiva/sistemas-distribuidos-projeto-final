import { Mailbox, PlusCircle, Users } from "lucide-react";
import { AllContactsTable } from "./components/all-contacts-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AllGroupsTable } from "./components/all-groups-table";
import { CreateContactDialog } from "./components/create-contact-dialog";
import { CreateGroupDialog } from "./components/create-group-dialog";

export default function Page() {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-3xl font-semibold">Audiência</h1>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold flex items-center">
            <Users className="h-6 w-6 mr-3" strokeWidth={2.5} />
            Todos os seus contatos
          </h2>
          <CreateContactDialog>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" strokeWidth={2.5} />
              Adicionar contato
            </Button>
          </CreateContactDialog>
        </div>
        <div className="border rounded-md p-5 flex flex-col gap-6">
          <Input placeholder="Buscar por nome, e-mail ou celular" />
          <AllContactsTable />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold flex items-center">
            <Mailbox className="h-6 w-6 mr-3" strokeWidth={2.5} />
            Todos os seus grupos
          </h2>
          <CreateGroupDialog>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" strokeWidth={2.5} />
              Adicionar grupo
            </Button>
          </CreateGroupDialog>
        </div>
        <div className="border rounded-md p-5 flex flex-col gap-6">
          <Input placeholder="Buscar por nome, e-mail ou celular" />
          <AllGroupsTable />
        </div>
      </div>
    </div>
  );
}
