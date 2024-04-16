import { UpdateStrategy1000ms, UpdateStrategy10000ms, UpdateStrategy600ms } from "./Strategy";
import { Store, InventoryData } from "./CreateStore";

describe("UpdateStrategy1000ms", () => {
  it("should update the store inventory after 1000ms", async () => {
    const mockUpdateUI = jest.fn();
    const strategy = new UpdateStrategy1000ms(mockUpdateUI);
    const store = new Store("Test Store", "09:00", "18:00", 100, strategy);
    const inventoryData: InventoryData = { name: "Item 1", price: 10, expire: "2024-04-01" };

    store.update(inventoryData);

    // Wait for 1000ms for the update to occur
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(store.getInventory).toContain(inventoryData);
    expect(mockUpdateUI).toHaveBeenCalled();
  });
});

describe("UpdateStrategy10000ms", () => {
  it("should update the store inventory after 10000ms", async () => {
    const mockUpdateUI = jest.fn();
    const strategy = new UpdateStrategy10000ms(mockUpdateUI);
    const store = new Store("Test Store", "09:00", "18:00", 100, strategy);
    const inventoryData: InventoryData = { name: "Item 1", price: 10, expire: "2024-04-01" };

    store.update(inventoryData);

    // Wait for 10000ms for the update to occur
    await new Promise((resolve) => setTimeout(resolve, 10000));

    expect(store.getInventory).toContain(inventoryData);
    expect(mockUpdateUI).toHaveBeenCalled();
  });
});

describe("UpdateStrategy600ms", () => {
  it("should update the store inventory after 600ms", async () => {
    const mockUpdateUI = jest.fn();
    const strategy = new UpdateStrategy600ms(mockUpdateUI);
    const store = new Store("Test Store", "09:00", "18:00", 100, strategy);
    const inventoryData: InventoryData = { name: "Item 1", price: 10, expire: "2024-04-01" };

    store.update(inventoryData);

    // Wait for 600ms for the update to occur
    await new Promise((resolve) => setTimeout(resolve, 600));

    expect(store.getInventory).toContain(inventoryData);
    expect(mockUpdateUI).toHaveBeenCalled();
  });
});
