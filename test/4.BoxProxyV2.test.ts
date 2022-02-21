// test/4.BoxProxyV2.test.ts
import { expect } from "chai"
import { ethers, upgrades } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("Box (proxy) V2", function () {
  let box:Contract
  let boxV2:Contract

  beforeEach(async function () {
    const Box = await ethers.getContractFactory("Box")
    const BoxV2 = await ethers.getContractFactory("BoxV2")

    //initilize with 42
    box = await upgrades.deployProxy(Box, [42], {initializer: 'store'})
    // console.log(box.address," box/proxy")
    // console.log(await upgrades.erc1967.getImplementationAddress(box.address)," getImplementationAddress")
    // console.log(await upgrades.erc1967.getAdminAddress(box.address), " getAdminAddress")   

    boxV2 = await upgrades.upgradeProxy(box.address, BoxV2)
    // console.log(boxV2.address," box/proxy after upgrade")
    // console.log(await upgrades.erc1967.getImplementationAddress(boxV2.address)," getImplementationAddress after upgrade")
    // console.log(await upgrades.erc1967.getAdminAddress(boxV2.address)," getAdminAddress after upgrade")   
  })

  it("should retrieve value previously stored and increment correctly", async function () {
    expect(await boxV2.retrieve()).to.equal(BigNumber.from('42'))

    await boxV2.increment()
    //result = 42 + 1 = 43
    expect(await boxV2.retrieve()).to.equal(BigNumber.from('43'))

    await boxV2.store(100)
    expect(await boxV2.retrieve()).to.equal(BigNumber.from('100'))
  })

})
