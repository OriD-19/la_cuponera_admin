import fetchFilter from "../../hooks/fetchFilter";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function EstadosDropdown({ onSelect }) { 
  const { offers, loading, error } = fetchFilter();

  // Extraer estados únicos
  const uniqueStates = [...new Set(offers.map((offer) => offer.offerState))];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md border-3 bg-base border-resaltador px-6 py-2 text-resaltador font-semibold shadow-xs hover:bg-gray-50">
          Estado
          <ChevronDownIcon className="size-5.5 fill-resaltador" />
        </MenuButton>
      </div>

      <MenuItems className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-none">
        <div className="py-1">
          {loading && <p className="px-4 py-2 text-sm text-gray-500">Cargando...</p>}
          {error && <p className="px-4 py-2 text-sm text-red-500">{error}</p>}
          {uniqueStates.map((state) => (
            <MenuItem key={state}>
              <button
                onClick={() => onSelect(state)} 
                className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-resaltador"
              >
                {state}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
