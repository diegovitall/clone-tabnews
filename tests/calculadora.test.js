const calculadora = require("../models/calculadora.js");

test("testa a função soma", () => {
  expect(calculadora.somar(1, 2)).toBe(3);
});
