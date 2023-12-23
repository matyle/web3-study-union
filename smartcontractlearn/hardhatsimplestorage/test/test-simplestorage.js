const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", async () => {
  let simpleStorage;
  let simpleStorageFactory;
  //beforeEach
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });
  //it
  it("Should be initialized with 0", async () => {
    const currentNumber = await simpleStorage.retrieve();
    const expectedNumber = "0";
    assert.equal(currentNumber.toString(), expectedNumber);
  });

  it("Should be able to set a new number", async () => {
    const newNumber = "10";
    await simpleStorage.store(newNumber);
    const currentNumber = await simpleStorage.retrieve();
    assert.equal(currentNumber.toString(), newNumber);
  });
  it("Should work correctly with the people struct and array", async () => {
    const expectedPersonName = "Patrick";
    const expectedFavoriteNumber = "16";
    const transactionResponse = await simpleStorage.addPerson(
      expectedPersonName,
      expectedFavoriteNumber
    );
    await transactionResponse.wait(1);
    const { favoriteNumber, name } = await simpleStorage.people(0);
    // We could also do it like this
    // const person = await simpleStorage.people(0)
    // const favNumber = person.favoriteNumber
    // const pName = person.name

    assert.equal(name, expectedPersonName);
    assert.equal(favoriteNumber, expectedFavoriteNumber);
  });
});
