import Inventory from "@/bll/Inventory";
import { InventoryData, Store } from "@/bll/CreateStore";
import { UpdateStrategy } from "./Strategy";

class MockUpdateStrategy implements UpdateStrategy {
  update(store: Store, data: InventoryData): void {}
}
describe("Inventory", () => {
  let inventory: Inventory;
  let store1: Store;
  let store2: Store;
  let inventoryData1: InventoryData;
  let inventoryData2: InventoryData;
  beforeEach(() => {
    inventory = new Inventory();
    const func = new MockUpdateStrategy();
    store1 = new Store("Store 1", "09:00", "18:00", 100, func);
    store2 = new Store("Store 2", "10:00", "19:00", 150, func);
    inventoryData1 = { name: "Item 1", price: 10, expire: "2024-04-01" };
    inventoryData2 = { name: "Item 2", price: 20, expire: "2024-04-02" };
  });

  it("should add observer", () => {
    inventory.addObserver(store1);
    inventory.addObserver(store2);
    expect(inventory["observers"]).toEqual([store1, store2]);
  });

  it("should remove observer", () => {
    inventory.addObserver(store1);
    inventory.addObserver(store2);
    inventory.removeObserver(store1);
    expect(inventory["observers"]).toEqual([store2]);
  });

  it("should notify observers when inventory data is added", () => {
    const updateMock = jest.fn();
    store1.update = updateMock;
    inventory.addObserver(store1);
    inventory.addInventoryData(inventoryData1);
    expect(updateMock).toHaveBeenCalledWith(inventoryData1);
  });

  it("should add inventory data", () => {
    inventory.addInventoryData(inventoryData1);
    expect(inventory["inventoryData"]).toEqual([inventoryData1]);
  });

  it("should return inventory data", () => {
    inventory.addInventoryData(inventoryData1);
    inventory.addInventoryData(inventoryData2);
    expect(inventory.getInventoryData).toEqual([inventoryData1, inventoryData2]);
  });
});
