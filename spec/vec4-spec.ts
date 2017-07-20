/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

import { vec3, vec4 } from "../src/index"

describe("vec4", () => {
    let out: vec4.vec4type
    let vecA: vec4.vec4type
    let vecB: vec4.vec4type
    let result: any

    beforeEach(() => {
        vecA = [1, 2, 3, 4]
        vecB = [5, 6, 7, 8]
        out = [0, 0, 0, 0]
    })

    describe("create", () => {
        beforeEach(() => {
            result = vec4.create()
        })
        it("should return a 4 element array initialized to 0s", () => {
            expect(result).toBeEqualish([0, 0, 0, 0])
        })
    })

    describe("clone", () => {
        beforeEach(() => {
            result = vec4.clone(vecA)
        })
        it("should return a 4 element array initialized to the values in vecA", () => {
            expect(result).toBeEqualish(vecA)
        })
    })

    describe("fromValues", () => {
        beforeEach(() => {
            result = vec4.fromValues(1, 2, 3, 4)
        })
        it("should return a 4 element array initialized to the values passed", () => {
            expect(result).toBeEqualish([1, 2, 3, 4])
        })
    })

    describe("copy", () => {
        beforeEach(() => {
            result = vec4.copy(out, vecA)
        })
        it("should place values into out", () => {
            expect(out).toBeEqualish([1, 2, 3, 4])
        })
        it("should return out", () => {
            expect(result).toBe(out)
        })
    })

    describe("set", () => {
        beforeEach(() => {
            result = vec4.set(out, 1, 2, 3, 4)
        })
        it("should place values into out", () => {
            expect(out).toBeEqualish([1, 2, 3, 4])
        })
        it("should return out", () => {
            expect(result).toBe(out)
        })
    })

    describe("add", () => {
        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vec4.add(out, vecA, vecB)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([6, 8, 10, 12])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
            it("should not modify vecB", () => {
                expect(vecB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                result = vec4.add(vecA, vecA, vecB)
            })

            it("should place values into vecA", () => {
                expect(vecA).toBeEqualish([6, 8, 10, 12])
            })
            it("should return vecA", () => {
                expect(result).toBe(vecA)
            })
            it("should not modify vecB", () => {
                expect(vecB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when vecB is the output vector", () => {
            beforeEach(() => {
                result = vec4.add(vecB, vecA, vecB)
            })

            it("should place values into vecB", () => {
                expect(vecB).toBeEqualish([6, 8, 10, 12])
            })
            it("should return vecB", () => {
                expect(result).toBe(vecB)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
        })
    })

    describe("subtract", () => {
        it("should have an alias called 'sub'", () => {
            expect(vec4.sub).toEqual(vec4.subtract)
        })

        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vec4.subtract(out, vecA, vecB)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([-4, -4, -4, -4])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
            it("should not modify vecB", () => {
                expect(vecB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                result = vec4.subtract(vecA, vecA, vecB)
            })

            it("should place values into vecA", () => {
                expect(vecA).toBeEqualish([-4, -4, -4, -4])
            })
            it("should return vecA", () => {
                expect(result).toBe(vecA)
            })
            it("should not modify vecB", () => {
                expect(vecB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when vecB is the output vector", () => {
            beforeEach(() => {
                result = vec4.subtract(vecB, vecA, vecB)
            })

            it("should place values into vecB", () => {
                expect(vecB).toBeEqualish([-4, -4, -4, -4])
            })
            it("should return vecB", () => {
                expect(result).toBe(vecB)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
        })
    })

    describe("multiply", () => {
        it("should have an alias called 'mul'", () => {
            expect(vec4.mul).toEqual(vec4.multiply)
        })

        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vec4.multiply(out, vecA, vecB)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([5, 12, 21, 32])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
            it("should not modify vecB", () => {
                expect(vecB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                result = vec4.multiply(vecA, vecA, vecB)
            })

            it("should place values into vecA", () => {
                expect(vecA).toBeEqualish([5, 12, 21, 32])
            })
            it("should return vecA", () => {
                expect(result).toBe(vecA)
            })
            it("should not modify vecB", () => {
                expect(vecB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when vecB is the output vector", () => {
            beforeEach(() => {
                result = vec4.multiply(vecB, vecA, vecB)
            })

            it("should place values into vecB", () => {
                expect(vecB).toBeEqualish([5, 12, 21, 32])
            })
            it("should return vecB", () => {
                expect(result).toBe(vecB)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
        })
    })

    describe("divide", () => {
        it("should have an alias called 'div'", () => {
            expect(vec4.div).toEqual(vec4.divide)
        })

        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vec4.divide(out, vecA, vecB)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([0.2, 0.333333, 0.428571, 0.5])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
            it("should not modify vecB", () => {
                expect(vecB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                result = vec4.divide(vecA, vecA, vecB)
            })

            it("should place values into vecA", () => {
                expect(vecA).toBeEqualish([0.2, 0.333333, 0.428571, 0.5])
            })
            it("should return vecA", () => {
                expect(result).toBe(vecA)
            })
            it("should not modify vecB", () => {
                expect(vecB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when vecB is the output vector", () => {
            beforeEach(() => {
                result = vec4.divide(vecB, vecA, vecB)
            })

            it("should place values into vecB", () => {
                expect(vecB).toBeEqualish([0.2, 0.333333, 0.428571, 0.5])
            })
            it("should return vecB", () => {
                expect(result).toBe(vecB)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
        })
    })

    describe("ceil", () => {
        beforeEach(() => {
            vecA = [Math.E, Math.PI, Math.SQRT2, Math.SQRT1_2]
        })

        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vec4.ceil(out, vecA)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([3, 4, 2, 1])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([
                    Math.E,
                    Math.PI,
                    Math.SQRT2,
                    Math.SQRT1_2
                ])
            })
        })

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                result = vec4.ceil(vecA, vecA)
            })

            it("should place values into vecA", () => {
                expect(vecA).toBeEqualish([3, 4, 2, 1])
            })
            it("should return vecA", () => {
                expect(result).toBe(vecA)
            })
        })
    })

    describe("floor", () => {
        beforeEach(() => {
            vecA = [Math.E, Math.PI, Math.SQRT2, Math.SQRT1_2]
        })

        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vec4.floor(out, vecA)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([2, 3, 1, 0])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([
                    Math.E,
                    Math.PI,
                    Math.SQRT2,
                    Math.SQRT1_2
                ])
            })
        })

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                result = vec4.floor(vecA, vecA)
            })

            it("should place values into vecA", () => {
                expect(vecA).toBeEqualish([2, 3, 1, 0])
            })
            it("should return vecA", () => {
                expect(result).toBe(vecA)
            })
        })
    })

    describe("min", () => {
        beforeEach(() => {
            vecA = [1, 3, 1, 3]
            vecB = [3, 1, 3, 1]
        })

        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vec4.min(out, vecA, vecB)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([1, 1, 1, 1])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 3, 1, 3])
            })
            it("should not modify vecB", () => {
                expect(vecB).toBeEqualish([3, 1, 3, 1])
            })
        })

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                result = vec4.min(vecA, vecA, vecB)
            })

            it("should place values into vecA", () => {
                expect(vecA).toBeEqualish([1, 1, 1, 1])
            })
            it("should return vecA", () => {
                expect(result).toBe(vecA)
            })
            it("should not modify vecB", () => {
                expect(vecB).toBeEqualish([3, 1, 3, 1])
            })
        })

        describe("when vecB is the output vector", () => {
            beforeEach(() => {
                result = vec4.min(vecB, vecA, vecB)
            })

            it("should place values into vecB", () => {
                expect(vecB).toBeEqualish([1, 1, 1, 1])
            })
            it("should return vecB", () => {
                expect(result).toBe(vecB)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 3, 1, 3])
            })
        })
    })

    describe("max", () => {
        beforeEach(() => {
            vecA = [1, 3, 1, 3]
            vecB = [3, 1, 3, 1]
        })

        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vec4.max(out, vecA, vecB)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([3, 3, 3, 3])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 3, 1, 3])
            })
            it("should not modify vecB", () => {
                expect(vecB).toBeEqualish([3, 1, 3, 1])
            })
        })

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                result = vec4.max(vecA, vecA, vecB)
            })

            it("should place values into vecA", () => {
                expect(vecA).toBeEqualish([3, 3, 3, 3])
            })
            it("should return vecA", () => {
                expect(result).toBe(vecA)
            })
            it("should not modify vecB", () => {
                expect(vecB).toBeEqualish([3, 1, 3, 1])
            })
        })

        describe("when vecB is the output vector", () => {
            beforeEach(() => {
                result = vec4.max(vecB, vecA, vecB)
            })

            it("should place values into vecB", () => {
                expect(vecB).toBeEqualish([3, 3, 3, 3])
            })
            it("should return vecB", () => {
                expect(result).toBe(vecB)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 3, 1, 3])
            })
        })
    })

    describe("round", () => {
        beforeEach(() => {
            vecA = [Math.E, Math.PI, Math.SQRT2, Math.SQRT1_2]
        })

        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vec4.round(out, vecA)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([3, 3, 1, 1])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([
                    Math.E,
                    Math.PI,
                    Math.SQRT2,
                    Math.SQRT1_2
                ])
            })
        })

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                result = vec4.round(vecA, vecA)
            })

            it("should place values into vecA", () => {
                expect(vecA).toBeEqualish([3, 3, 1, 1])
            })
            it("should return vecA", () => {
                expect(result).toBe(vecA)
            })
        })
    })

    describe("scale", () => {
        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vec4.scale(out, vecA, 2)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([2, 4, 6, 8])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
        })

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                result = vec4.scale(vecA, vecA, 2)
            })

            it("should place values into vecA", () => {
                expect(vecA).toBeEqualish([2, 4, 6, 8])
            })
            it("should return vecA", () => {
                expect(result).toBe(vecA)
            })
        })
    })

    describe("scaleAndAdd", () => {
        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vec4.scaleAndAdd(out, vecA, vecB, 0.5)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([3.5, 5, 6.5, 8])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
            it("should not modify vecB", () => {
                expect(vecB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                result = vec4.scaleAndAdd(vecA, vecA, vecB, 0.5)
            })

            it("should place values into vecA", () => {
                expect(vecA).toBeEqualish([3.5, 5, 6.5, 8])
            })
            it("should return vecA", () => {
                expect(result).toBe(vecA)
            })
            it("should not modify vecB", () => {
                expect(vecB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when vecB is the output vector", () => {
            beforeEach(() => {
                result = vec4.scaleAndAdd(vecB, vecA, vecB, 0.5)
            })

            it("should place values into vecB", () => {
                expect(vecB).toBeEqualish([3.5, 5, 6.5, 8])
            })
            it("should return vecB", () => {
                expect(result).toBe(vecB)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
        })
    })

    describe("distance", () => {
        it("should have an alias called 'dist'", () => {
            expect(vec4.dist).toEqual(vec4.distance)
        })

        beforeEach(() => {
            result = vec4.distance(vecA, vecB)
        })

        it("should return the distance", () => {
            expect(result).toBeCloseTo(8)
        })
    })

    describe("squaredDistance", () => {
        it("should have an alias called 'sqrDist'", () => {
            expect(vec4.sqrDist).toEqual(vec4.squaredDistance)
        })

        beforeEach(() => {
            result = vec4.squaredDistance(vecA, vecB)
        })

        it("should return the squared distance", () => {
            expect(result).toEqual(64)
        })
    })

    describe("length", () => {
        it("should have an alias called 'len'", () => {
            expect(vec4.len).toEqual(vec4.length)
        })

        beforeEach(() => {
            result = vec4.length(vecA)
        })

        it("should return the length", () => {
            expect(result).toBeCloseTo(5.477225)
        })
    })

    describe("squaredLength", () => {
        it("should have an alias called 'sqrLen'", () => {
            expect(vec4.sqrLen).toEqual(vec4.squaredLength)
        })

        beforeEach(() => {
            result = vec4.squaredLength(vecA)
        })

        it("should return the squared length", () => {
            expect(result).toEqual(30)
        })
    })

    describe("negate", () => {
        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vec4.negate(out, vecA)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([-1, -2, -3, -4])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
        })

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                result = vec4.negate(vecA, vecA)
            })

            it("should place values into vecA", () => {
                expect(vecA).toBeEqualish([-1, -2, -3, -4])
            })
            it("should return vecA", () => {
                expect(result).toBe(vecA)
            })
        })
    })

    describe("normalize", () => {
        beforeEach(() => {
            vecA = [5, 0, 0, 0]
        })

        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vec4.normalize(out, vecA)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([1, 0, 0, 0])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([5, 0, 0, 0])
            })
        })

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                result = vec4.normalize(vecA, vecA)
            })

            it("should place values into vecA", () => {
                expect(vecA).toBeEqualish([1, 0, 0, 0])
            })
            it("should return vecA", () => {
                expect(result).toBe(vecA)
            })
        })
    })

    describe("dot", () => {
        beforeEach(() => {
            result = vec4.dot(vecA, vecB)
        })

        it("should return the dot product", () => {
            expect(result).toEqual(70)
        })
        it("should not modify vecA", () => {
            expect(vecA).toBeEqualish([1, 2, 3, 4])
        })
        it("should not modify vecB", () => {
            expect(vecB).toBeEqualish([5, 6, 7, 8])
        })
    })

    describe("lerp", () => {
        describe("with a separate output vector", () => {
            beforeEach(() => {
                result = vec4.lerp(out, vecA, vecB, 0.5)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([3, 4, 5, 6])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
            it("should not modify vecB", () => {
                expect(vecB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when vecA is the output vector", () => {
            beforeEach(() => {
                result = vec4.lerp(vecA, vecA, vecB, 0.5)
            })

            it("should place values into vecA", () => {
                expect(vecA).toBeEqualish([3, 4, 5, 6])
            })
            it("should return vecA", () => {
                expect(result).toBe(vecA)
            })
            it("should not modify vecB", () => {
                expect(vecB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when vecB is the output vector", () => {
            beforeEach(() => {
                result = vec4.lerp(vecB, vecA, vecB, 0.5)
            })

            it("should place values into vecB", () => {
                expect(vecB).toBeEqualish([3, 4, 5, 6])
            })
            it("should return vecB", () => {
                expect(result).toBe(vecB)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
        })
    })

    describe("random", () => {
        describe("with no scale", () => {
            beforeEach(() => {
                result = vec4.random(out)
            })

            it("should result in a unit length vector", () => {
                expect(vec4.length(out)).toBeCloseTo(1.0)
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
        })

        describe("with a scale", () => {
            beforeEach(() => {
                result = vec4.random(out, 5.0)
            })

            it("should result in a unit length vector", () => {
                expect(vec4.length(out)).toBeCloseTo(5.0)
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
        })
    })

    describe("forEach", () => {
        let vecArray: number[]

        beforeEach(() => {
            vecArray = [1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0, 0]
        })

        describe("when performing operations that take no extra arguments", () => {
            beforeEach(() => {
                result = vec4.forEach(vecArray, 0, 0, 0, vec4.normalize)
            })

            it("should update all values", () => {
                expect(vecArray).toBeEqualish([
                    0.182574,
                    0.365148,
                    0.547722,
                    0.730296,
                    0.379049,
                    0.454858,
                    0.530668,
                    0.606478,
                    0,
                    0,
                    0,
                    0
                ])
            })
            it("should return vecArray", () => {
                expect(result).toBe(vecArray)
            })
        })

        describe("when performing operations that takes one extra arguments", () => {
            beforeEach(() => {
                result = vec4.forEach(vecArray, 0, 0, 0, vec4.add, vecA)
            })

            it("should update all values", () => {
                expect(vecArray).toBeEqualish([
                    2,
                    4,
                    6,
                    8,
                    6,
                    8,
                    10,
                    12,
                    1,
                    2,
                    3,
                    4
                ])
            })
            it("should return vecArray", () => {
                expect(result).toBe(vecArray)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
        })

        describe("when specifying an offset", () => {
            beforeEach(() => {
                result = vec4.forEach(vecArray, 0, 4, 0, vec4.add, vecA)
            })

            it("should update all values except the first vector", () => {
                expect(vecArray).toBeEqualish([
                    1,
                    2,
                    3,
                    4,
                    6,
                    8,
                    10,
                    12,
                    1,
                    2,
                    3,
                    4
                ])
            })
            it("should return vecArray", () => {
                expect(result).toBe(vecArray)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
        })

        describe("when specifying a count", () => {
            beforeEach(() => {
                result = vec4.forEach(vecArray, 0, 0, 2, vec4.add, vecA)
            })

            it("should update all values except the last vector", () => {
                expect(vecArray).toBeEqualish([
                    2,
                    4,
                    6,
                    8,
                    6,
                    8,
                    10,
                    12,
                    0,
                    0,
                    0,
                    0
                ])
            })
            it("should return vecArray", () => {
                expect(result).toBe(vecArray)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
        })

        describe("when specifying a stride", () => {
            beforeEach(() => {
                result = vec4.forEach(vecArray, 8, 0, 0, vec4.add, vecA)
            })

            it("should update all values except the second vector", () => {
                expect(vecArray).toBeEqualish([
                    2,
                    4,
                    6,
                    8,
                    5,
                    6,
                    7,
                    8,
                    1,
                    2,
                    3,
                    4
                ])
            })
            it("should return vecArray", () => {
                expect(result).toBe(vecArray)
            })
            it("should not modify vecA", () => {
                expect(vecA).toBeEqualish([1, 2, 3, 4])
            })
        })

        describe("when calling a function that does not modify the out variable", () => {
            beforeEach(() => {
                result = vec3.forEach(
                    vecArray,
                    0,
                    0,
                    0,
                    (o: vec4.vec4type, vec: vec4.vec4type) => null
                )
            })

            it("values should remain unchanged", () => {
                expect(vecArray).toBeEqualish([
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    0,
                    0,
                    0,
                    0
                ])
            })
            it("should return vecArray", () => {
                expect(result).toBe(vecArray)
            })
        })
    })

    describe("str", () => {
        beforeEach(() => {
            result = vec4.str(vecA)
        })

        it("should return a string representation of the vector", () => {
            expect(result).toEqual("vec4(1, 2, 3, 4)")
        })
    })

    describe("exactEquals", () => {
        let vecC: vec4.vec4type
        let r0: boolean
        let r1: boolean
        beforeEach(() => {
            vecA = [0, 1, 2, 3]
            vecB = [0, 1, 2, 3]
            vecC = [1, 2, 3, 4]
            r0 = vec4.exactEquals(vecA, vecB)
            r1 = vec4.exactEquals(vecA, vecC)
        })

        it("should return true for identical vectors", () => {
            expect(r0).toBe(true)
        })
        it("should return false for different vectors", () => {
            expect(r1).toBe(false)
        })
        it("should not modify vecA", () => {
            expect(vecA).toBeEqualish([0, 1, 2, 3])
        })
        it("should not modify vecB", () => {
            expect(vecB).toBeEqualish([0, 1, 2, 3])
        })
    })

    describe("equals", () => {
        let vecC: vec4.vec4type
        let vecD: vec4.vec4type
        let r0: boolean
        let r1: boolean
        let r2: boolean
        beforeEach(() => {
            vecA = [0, 1, 2, 3]
            vecB = [0, 1, 2, 3]
            vecC = [1, 2, 3, 4]
            vecD = [1e-16, 1, 2, 3]
            r0 = vec4.equals(vecA, vecB)
            r1 = vec4.equals(vecA, vecC)
            r2 = vec4.equals(vecA, vecD)
        })
        it("should return true for identical vectors", () => {
            expect(r0).toBe(true)
        })
        it("should return false for different vectors", () => {
            expect(r1).toBe(false)
        })
        it("should return true for close but not identical vectors", () => {
            expect(r2).toBe(true)
        })
        it("should not modify vecA", () => {
            expect(vecA).toBeEqualish([0, 1, 2, 3])
        })
        it("should not modify vecB", () => {
            expect(vecB).toBeEqualish([0, 1, 2, 3])
        })
    })
})
