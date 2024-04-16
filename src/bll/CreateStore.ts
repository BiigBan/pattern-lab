import { CountryCodes } from "@/types/CountryCodesTypes";
import { UpdateStrategy } from "./Strategy";

export interface InventoryData {
  name: string;
  price: number;
  expire: string;
}

export class Store {
  public name: string;
  public openingTime: string;
  public closingTime: string;
  public inventorySize: number;
  private inventoryData: InventoryData[] = [];
  private updateStrategy: UpdateStrategy;
  private countryCode: CountryCodes = "UA";

  constructor(
    name: string,
    countryCodes: CountryCodes,
    openingTime: string,
    closingTime: string,
    inventorySize: number,
    updateStrategy: UpdateStrategy,
  ) {
    this.name = name;
    this.countryCode = countryCodes;
    this.openingTime = openingTime;
    this.closingTime = closingTime;
    this.inventorySize = inventorySize;
    this.updateStrategy = updateStrategy;
  }

  set setInventory(data: InventoryData[]) {
    this.inventoryData = data;
  }

  get getInventory(): InventoryData[] {
    return this.inventoryData;
  }

  get getCountryCode(): CountryCodes {
    return this.countryCode;
  }
  update(updatedStore: InventoryData): void {
    this.updateStrategy.update(this, updatedStore);
  }
}
//Singleton
class StoreFactory {
  private static instance: StoreFactory;

  private constructor() {}

  public static getInstance(): StoreFactory {
    if (!StoreFactory.instance) {
      StoreFactory.instance = new StoreFactory();
    }
    return StoreFactory.instance;
  }

  create(
    name: string,
    countryCodes: CountryCodes,
    openingTime: string,
    closingTime: string,
    inventorySize: number,
    updateStrategy: UpdateStrategy,
  ): Store {
    return new Store(name, countryCodes, openingTime, closingTime, inventorySize, updateStrategy);
  }
}

export default StoreFactory;
