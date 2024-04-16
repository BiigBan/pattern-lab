import { UpdateStrategy, UpdateStrategy1000ms } from "@/bll/Strategy";
import { COUNTRIES, COUNTRIES_CODES } from "@/constants/countries";
import { CountryCodes } from "@/types/CountryCodesTypes";
import React, { FormEvent, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { Store } from "@/bll/CreateStore";

interface IProps {
  setStores: (value: Store[]) => void;
}

export default function AddStore({ setStores }: IProps) {
  const [update, setUpdate] = useState(false);
  const { storeFactory } = useAppContext();
  const handleUpdateUI = () => {
    setUpdate((current) => !current);
  };

  const [formData, setFormData] = useState<{
    name: string;
    countryCodes: CountryCodes;
    openingTime: string;
    closingTime: string;
    inventorySize: number;
  }>({
    name: "",
    countryCodes: "UA",
    openingTime: "",
    closingTime: "",
    inventorySize: 100,
  });

  const strategy1000ms = new UpdateStrategy1000ms(handleUpdateUI);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newStore = storeFactory.create(
      formData.name,
      formData.countryCodes,
      formData.openingTime,
      formData.closingTime,
      formData.inventorySize,
      strategy1000ms,
    );
    // setStores((current) => [...current, newStore]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name of store
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Deer shop"
            required
          />
        </div>
        <div>
          <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Country
          </label>
          <select
            id="countries"
            name="countryCodes"
            value={formData.countryCodes}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={COUNTRIES_CODES.UA}>{COUNTRIES.UA}</option>
            <option value={COUNTRIES_CODES.UK}>{COUNTRIES.UK}</option>
            <option value={COUNTRIES_CODES.PL}>{COUNTRIES.PL}</option>
            <option value={COUNTRIES_CODES.DN}>{COUNTRIES.DN}</option>
          </select>
        </div>
      </div>
      <div className="mb-6">
        <div>
          <label htmlFor="openTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Open time of store
          </label>
          <input
            type="text"
            id="openTime"
            name="openingTime"
            value={formData.openingTime}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="08:00"
            required
          />
        </div>
        <div>
          <label htmlFor="closeTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Close time of store
          </label>
          <input
            type="text"
            id="closeTime"
            name="closingTime"
            value={formData.closingTime}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="22:00"
            required
          />
        </div>
        <div>
          <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Store capacity
          </label>
          <input
            type="number"
            id="capacity"
            name="inventorySize"
            value={formData.inventorySize}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="100"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create Store
      </button>
    </form>
  );
}
