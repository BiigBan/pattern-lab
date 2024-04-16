import { Store, InventoryData } from "@/bll/CreateStore";

export interface UpdateStrategy {
  update(store: Store, data: InventoryData): void;
}

export class UpdateStrategy1000ms implements UpdateStrategy {
  updateUI: () => void;

  constructor(updateUI: () => void) {
    this.updateUI = updateUI;
  }
  update(store: Store, data: InventoryData): void {
    setTimeout(() => {
      const currentInventory = store.getInventory;
      store.setInventory = [...currentInventory, data];
      this.updateUI();
    }, 1000);
  }
}

export class UpdateStrategy10000ms implements UpdateStrategy {
  updateUI: () => void;

  constructor(updateUI: () => void) {
    this.updateUI = updateUI;
  }
  update(store: Store, data: InventoryData): void {
    setTimeout(() => {
      const currentInventory = store.getInventory;
      store.setInventory = [...currentInventory, data];
      this.updateUI();
    }, 10000);
  }
}

export class UpdateStrategy600ms implements UpdateStrategy {
  updateUI: () => void;

  constructor(updateUI: () => void) {
    this.updateUI = updateUI;
  }
  update(store: Store, data: InventoryData): void {
    setTimeout(() => {
      const currentInventory = store.getInventory;
      store.setInventory = [...currentInventory, data];
      this.updateUI();
    }, 600);
  }
}
