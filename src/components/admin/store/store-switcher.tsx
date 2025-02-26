"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Button } from "../../ui/button";
import { Check, Plus, Store as Storeicon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../ui/command";
import { cn } from "@/lib/utils";

type PopOverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
interface StoreSwicherProps extends PopOverTriggerProps {
  items: Store[];
}
export default function StoreSwicher({
  className,
  items = [],
}: StoreSwicherProps) {
  const router = useRouter();
  const params = useParams();
  const storeModal = useStoreModal();
  const [open, setOpen] = useState(false);

  const formatedItems = items.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const currentStore = formatedItems.find(
    (item) => item.id === params.storeid
  );

  const onStoreSelect = (store: { id: string; name: string }) => {
    setOpen(false);
    router.push(`/admin/store/${store.id}`);
  };

  // console.log(currentStore, "id: ", params.storeid)


  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="text-white">
            <Storeicon color="white" />
            {currentStore?.name}
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <Command>
            <CommandInput placeholder="Search store" />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandList>
              <CommandGroup heading="Stores">
                {formatedItems.map((store) => (
                  <CommandItem
                    key={store.id}
                    onSelect={() => onStoreSelect(store)}
                    className="cursor-pointer hover:bg-gray-200" 
                  >
                    <Storeicon />
                    {store.name}
                    <Check className={cn(currentStore?.id === store.id) ? "opacity-100" : "opacity-0"}/>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator/>
            <Button className="text-white" onClick={() => storeModal.onOpen()}>
              <Plus/> Add new store
            </Button>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
