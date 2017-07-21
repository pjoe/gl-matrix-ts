/*
* common.js unit test
*/

import { glMatrix } from "../src/index"

describe("glMatrix", () => {
    let result: any

    describe("toRadian", () => {
        beforeEach(() => {
            result = glMatrix.toRadians(180)
        })
        it("should return a value of 3.141592654(Math.PI)", () => {
            expect(result).toBeEqualish(Math.PI)
        })
    })

    describe("equals", () => {
        let r0: boolean
        let r1: boolean
        let r2: boolean
        beforeEach(() => {
            r0 = glMatrix.equals(1.0, 0.0)
            r1 = glMatrix.equals(1.0, 1.0)
            r2 = glMatrix.equals(1.0 + glMatrix.EPSILON / 2, 1.0)
        })
        it("should return false for different numbers", () => {
            expect(r0).toBe(false)
        })
        it("should return true for the same number", () => {
            expect(r1).toBe(true)
        })
        it("should return true for numbers that are close", () => {
            expect(r2).toBe(true)
        })
    })
})
