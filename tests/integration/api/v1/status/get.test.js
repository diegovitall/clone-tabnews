import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

      const postgresVersion = await responseBody.dependencies.postgres_version;
      expect(postgresVersion).toMatch("16.0");

      const maxConnections = await responseBody.dependencies.max_connections;
      expect(maxConnections).toEqual(100);

      const openedConnections =
        await responseBody.dependencies.opened_connections;
      expect(openedConnections).toEqual(1);
    });
  });
});
