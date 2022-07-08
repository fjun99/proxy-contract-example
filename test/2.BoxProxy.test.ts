// test/2.BoxProxy.test.ts
import { expect } from "chai"
import { ethers, upgrades } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("Box (proxy)", function () {
  let box:Contract

  beforeEach(async function () {
    const Box = await ethers.getContractFactory("Box")
    //initialize with 42
    box = await upgrades.deployProxy(Box, [42], {initializer: 'store'})
    })

  it("should retrieve value previously stored", async function () {    
    // console.log(box.address," box(proxy)")
    // console.log(await upgrades.erc1967.getImplementationAddress(box.address)," getImplementationAddress")
    // console.log(await upgrades.erc1967.getAdminAddress(box.address), " getAdminAddress")   

    expect(await box.retrieve()).to.equal(BigNumber.from('42'))

    await box.store(100)
    expect(await box.retrieve()).to.equal(BigNumber.from('100'))
  })
  
})
