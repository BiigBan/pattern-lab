import { Store, InventoryData } from "./CreateStore";
import { UpdateStrategy } from "./Strategy";

class MockUpdateStrategy implements UpdateStrategy {
  update(store: Store, data: InventoryData): void {
    // Додайте код мокування тут, якщо потрібно
  }
}

describe("Store", () => {
  let store: Store;
  let mockUpdateStrategy: MockUpdateStrategy;
  let inventoryData: InventoryData;

  beforeEach(() => {
    mockUpdateStrategy = new MockUpdateStrategy();
    store = new Store("Test Store", "09:00", "18:00", 100, mockUpdateStrategy);
    inventoryData = { name: "Item 1", price: 10, expire: "2024-04-01" };
  });

  it("should set inventory", () => {
    const newData: InventoryData[] = [inventoryData];
    store.setInventory = newData;
    expect(store.getInventory).toEqual(newData);
  });

  it("should update inventory", () => {
    const newData: InventoryData[] = [inventoryData];
    store.setInventory = newData;
    const updatedData: InventoryData = { expire: "2024-04-01", name: "Item 1", price: 10 };
    store.update(updatedData);
    expect(store.getInventory).toContain([updatedData]);
  });
});
