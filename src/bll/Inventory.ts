import { InventoryData, Store } from "@/bll/CreateStore";

class Inventory {
  private observers: Store[] = [];
  private inventoryData: InventoryData[] = [];

  addObserver(observer: Store): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Store): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(store: InventoryData): void {
    this.observers.forEach((observer) => observer.update(store));
  }

  addInventoryData(data: InventoryData): void {
    this.inventoryData.push(data);
    this.notify(data);
  }

  get getInventoryData(): InventoryData[] {
    return this.inventoryData;
  }
}

export default Inventory;
