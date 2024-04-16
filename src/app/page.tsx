"use client";

import StoreFactory, { InventoryData, Store } from "@/bll/CreateStore";
import Inventory from "@/bll/Inventory";
import { UpdateStrategy1000ms, UpdateStrategy10000ms, UpdateStrategy600ms } from "@/bll/Strategy";
import Card, { withCountryCode } from "@/components/Card/Card";
import { useAppContext } from "@/components/contexts/AppContext";
import AddStore from "@/components/Store/AddStore";
import StoreFolder from "@/components/Store/Store";
import { COUNTRIES_CODES } from "@/constants/countries";
import { CountryCodes } from "@/types/CountryCodesTypes";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [update, setUpdate] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);
  const { inventory, storeFactory } = useAppContext();

  const [formData, setFormData] = useState<InventoryData>({
    name: "",
    price: 0,
    expire: "",
  });

  const handleUpdateUI = () => {
    setUpdate((current) => !current);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    inventory.addInventoryData(formData);
    setUpdate((current) => !current);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!storeFactory) return;
    const strategy1000ms = new UpdateStrategy1000ms(handleUpdateUI);
    const strategy10000ms = new UpdateStrategy10000ms(handleUpdateUI);
    const strategy600ms = new UpdateStrategy600ms(handleUpdateUI);
    const store = storeFactory.create("Deer shop", "UA", "08:00", "22:00", 100, strategy600ms);
    const store2 = storeFactory.create("Duck shop", "DN", "10:00", "23:59", 100, strategy1000ms);
    const store3 = storeFactory.create("24/7 Shop", "UK", "00:00", "23:55", 100, strategy10000ms);

    setStores([store, store2, store3]);
  }, [storeFactory]);

  useEffect(() => {
    if (!inventory && !stores) return;

    stores.forEach((store) => inventory.addObserver(store));
  }, [inventory, stores]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900">
      <div className="z-10  w-full items-center justify-between font-mono text-sm ">
        {/* <AddStore setStores={setStores} /> */}
        <StoreFolder formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
      <div className="flex flex-col gap-4 w-full mt-5">
        {stores.map((store, index) => {
          const storeData = store.getInventory;
          const countryCode = store.getCountryCode;
          const CardByCountry = withCountryCode(Card, countryCode);
          return (
            <div className="w-full" key={index}>
              <h2>Store - {store.name}</h2>
              <h3>Open time - {store.openingTime}</h3>
              <h5>Inventory size - {`${storeData.length}/${store.inventorySize}`}</h5>
              <div className="flex items-stretch gap-4 flex-wrap mt-5">
                {storeData.map((productData, index) => {
                  return <CardByCountry {...productData} key={`${productData.name}_${index}`} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
