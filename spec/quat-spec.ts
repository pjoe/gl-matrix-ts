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

import { vec3type } from "../src/common"
import { quat, vec3 } from "../src/index"

type quattype = number[] | Float32Array

describe("quat", () => {
    let out: any
    let quatA: quattype
    let quatB: quattype
    let result: any
    let vec: vec3type
    let id: quattype
    let deg90: number

    beforeEach(() => {
        quatA = [1, 2, 3, 4]
        quatB = [5, 6, 7, 8]
        out = [0, 0, 0, 0]
        vec = [1, 1, -1]
        id = [0, 0, 0, 1]
        deg90 = Math.PI / 2
    })

    describe("slerp", () => {
        describe("the normal case", () => {
            beforeEach(() => {
                result = quat.slerp(out, [0, 0, 0, 1], [0, 1, 0, 0], 0.5)
            })

            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should calculate proper quat", () => {
                expect(result).toBeEqualish([0, 0.707106, 0, 0.707106])
            })
        })

        describe("where a == b", () => {
            beforeEach(() => {
                result = quat.slerp(out, [0, 0, 0, 1], [0, 0, 0, 1], 0.5)
            })

            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should calculate proper quat", () => {
                expect(result).toBeEqualish([0, 0, 0, 1])
            })
        })

        describe("where theta == 180deg", () => {
            beforeEach(() => {
                quat.rotateX(quatA, [1, 0, 0, 0], Math.PI) // 180 deg
                result = quat.slerp(out, [1, 0, 0, 0], quatA, 1)
            })

            it("should calculate proper quat", () => {
                expect(result).toBeEqualish([0, 0, 0, -1])
            })
        })

        describe("where a == -b", () => {
            beforeEach(() => {
                result = quat.slerp(out, [1, 0, 0, 0], [-1, 0, 0, 0], 0.5)
            })

            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should calculate proper quat", () => {
                expect(result).toBeEqualish([1, 0, 0, 0])
            })
        })
    })

    describe("rotateX", () => {
        beforeEach(() => {
            result = quat.rotateX(out, id, deg90)
        })

        it("should return out", () => {
            expect(result).toBe(out)
        })
        it("should transform vec accordingly", () => {
            vec3.transformQuat(vec, [0, 0, -1], out)
            expect(vec).toBeEqualish([0, 1, 0])
        })
    })

    describe("rotateY", () => {
        beforeEach(() => {
            result = quat.rotateY(out, id, deg90)
        })

        it("should return out", () => {
            expect(result).toBe(out)
        })
        it("should transform vec accordingly", () => {
            vec3.transformQuat(vec, [0, 0, -1], out)
            expect(vec).toBeEqualish([-1, 0, 0])
        })
    })

    describe("rotateZ", () => {
        beforeEach(() => {
            result = quat.rotateZ(out, id, deg90)
        })

        it("should return out", () => {
            expect(result).toBe(out)
        })
        it("should transform vec accordingly", () => {
            vec3.transformQuat(vec, [0, 1, 0], out)
            expect(vec).toBeEqualish([-1, 0, 0])
        })
    })

    describe("fromMat3", () => {
        let matr: number[]

        describe("legacy", () => {
            beforeEach(() => {
                matr = [1, 0, 0, 0, 0, -1, 0, 1, 0]
                result = quat.fromMat3(out, matr)
            })

            it("should set dest to the correct value", () => {
                expect(result).toBeEqualish([-0.707106, 0, 0, 0.707106])
            })
        })

        describe("where trace > 0", () => {
            beforeEach(() => {
                matr = [1, 0, 0, 0, 0, -1, 0, 1, 0]
                result = quat.fromMat3(out, matr)
            })

            it("should return out", () => {
                expect(result).toBe(out)
            })

            it("should produce the correct transformation", () => {
                expect(vec3.transformQuat([], [0, 1, 0], out)).toBeEqualish([
                    0,
                    0,
                    -1
                ])
            })
        })

        // describe("from a normal matrix looking 'backward'", () => {
        //     beforeEach(() => {
        //         matr = mat3.create()
        //         mat3.transpose(
        //             matr,
        //             mat3.invert(
        //                 matr,
        //                 mat3.fromMat4(
        //                     matr,
        //                     mat4.lookAt(
        //                         mat4.create(),
        //                         [0, 0, 0],
        //                         [0, 0, 1],
        //                         [0, 1, 0]
        //                     )
        //                 )
        //             )
        //         )
        //         result = quat.fromMat3(out, matr)
        //     })

        //     it("should return out", () => {
        //         expect(result).toBe(out)
        //     })

        //     it("should produce the same transformation as the given matrix", () => {
        //         expect(
        //             vec3.transformQuat([], [3, 2, -1], quat.normalize(out, out))
        //         ).toBeEqualish(vec3.transformMat3([], [3, 2, -1], matr))
        //     })
        // })

        // describe("from a normal matrix looking 'left' and 'upside down'", () => {
        //     beforeEach(() => {
        //         matr = mat3.create()
        //         mat3.transpose(
        //             matr,
        //             mat3.invert(
        //                 matr,
        //                 mat3.fromMat4(
        //                     matr,
        //                     mat4.lookAt(
        //                         mat4.create(),
        //                         [0, 0, 0],
        //                         [-1, 0, 0],
        //                         [0, -1, 0]
        //                     )
        //                 )
        //             )
        //         )
        //         result = quat.fromMat3(out, matr)
        //     })

        //     it("should return out", () => {
        //         expect(result).toBe(out)
        //     })

        //     it("should produce the same transformation as the given matrix", () => {
        //         expect(
        //             vec3.transformQuat([], [3, 2, -1], quat.normalize(out, out))
        //         ).toBeEqualish(vec3.transformMat3([], [3, 2, -1], matr))
        //     })
        // })

        // describe("from a normal matrix looking 'upside down'", () => {
        //     beforeEach(() => {
        //         matr = mat3.create()
        //         mat3.transpose(
        //             matr,
        //             mat3.invert(
        //                 matr,
        //                 mat3.fromMat4(
        //                     matr,
        //                     mat4.lookAt(
        //                         mat4.create(),
        //                         [0, 0, 0],
        //                         [0, 0, -1],
        //                         [0, -1, 0]
        //                     )
        //                 )
        //             )
        //         )
        //         result = quat.fromMat3(out, matr)
        //     })

        //     it("should return out", () => {
        //         expect(result).toBe(out)
        //     })

        //     it("should produce the same transformation as the given matrix", () => {
        //         expect(
        //             vec3.transformQuat([], [3, 2, -1], quat.normalize(out, out))
        //         ).toBeEqualish(vec3.transformMat3([], [3, 2, -1], matr))
        //     })
        // })
    })

    describe("setAxes", () => {
        let r
        beforeEach(() => {
            r = vec3.create()
        })

        describe("looking left", () => {
            let view: number[]
            let up: number[]
            let right: number[]
            beforeEach(() => {
                view = [-1, 0, 0]
                up = [0, 1, 0]
                right = [0, 0, -1]
                result = quat.setAxes([], view, right, up)
            })

            it("should transform local view into world left", () => {
                r = vec3.transformQuat([], [0, 0, -1], result)
                expect(r).toBeEqualish([1, 0, 0])
            })

            it("should transform local right into world front", () => {
                r = vec3.transformQuat([], [1, 0, 0], result)
                expect(r).toBeEqualish([0, 0, 1])
            })
        })

        describe("given opengl defaults", () => {
            let view: number[]
            let up: number[]
            let right: number[]
            beforeEach(() => {
                view = [0, 0, -1]
                up = [0, 1, 0]
                right = [1, 0, 0]
                result = quat.setAxes(out, view, right, up)
            })

            it("should return out", () => {
                expect(result).toBe(out)
            })

            it("should produce identity", () => {
                expect(out).toBeEqualish([0, 0, 0, 1])
            })
        })

        describe("legacy example", () => {
            let view: number[]
            let up: number[]
            let right: number[]
            beforeEach(() => {
                right = [1, 0, 0]
                up = [0, 0, 1]
                view = [0, -1, 0]
                result = quat.setAxes(out, view, right, up)
            })

            xit("should set correct quat4 values", () => {
                expect(result).toBeEqualish([0.707106, 0, 0, 0.707106])
            })
        })
    })

    describe("rotationTo", () => {
        let r: vec3type
        beforeEach(() => {
            r = vec3.create()
        })

        describe("at right angle", () => {
            beforeEach(() => {
                result = quat.rotationTo(out, [0, 1, 0], [1, 0, 0])
            })

            it("should return out", () => {
                expect(result).toBe(out)
            })

            it("should calculate proper quaternion", () => {
                expect(out).toBeEqualish([0, 0, -0.707106, 0.707106])
            })
        })

        describe("when vectors are parallel", () => {
            beforeEach(() => {
                result = quat.rotationTo(out, [0, 1, 0], [0, 1, 0])
            })

            it("should return out", () => {
                expect(result).toBe(out)
            })

            it("multiplying A should produce B", () => {
                expect(vec3.transformQuat(r, [0, 1, 0], out)).toBeEqualish([
                    0,
                    1,
                    0
                ])
            })
        })

        describe("when vectors are opposed X", () => {
            beforeEach(() => {
                result = quat.rotationTo(out, [1, 0, 0], [-1, 0, 0])
            })

            it("should return out", () => {
                expect(result).toBe(out)
            })

            it("multiplying A should produce B", () => {
                expect(vec3.transformQuat(r, [1, 0, 0], out)).toBeEqualish([
                    -1,
                    0,
                    0
                ])
            })
        })

        describe("when vectors are opposed Y", () => {
            beforeEach(() => {
                result = quat.rotationTo(out, [0, 1, 0], [0, -1, 0])
            })

            it("should return out", () => {
                expect(result).toBe(out)
            })

            it("multiplying A should produce B", () => {
                expect(vec3.transformQuat(r, [0, 1, 0], out)).toBeEqualish([
                    0,
                    -1,
                    0
                ])
            })
        })

        describe("when vectors are opposed Z", () => {
            beforeEach(() => {
                result = quat.rotationTo(out, [0, 0, 1], [0, 0, -1])
            })

            it("should return out", () => {
                expect(result).toBe(out)
            })

            it("multiplying A should produce B", () => {
                expect(vec3.transformQuat(r, [0, 0, 1], out)).toBeEqualish([
                    0,
                    0,
                    -1
                ])
            })
        })
    })

    describe("create", () => {
        beforeEach(() => {
            result = quat.create()
        })
        it("should return a 4 element array initialized to an identity quaternion", () => {
            expect(result).toBeEqualish([0, 0, 0, 1])
        })
    })

    describe("clone", () => {
        beforeEach(() => {
            result = quat.clone(quatA)
        })
        it("should return a 4 element array initialized to the values in quatA", () => {
            expect(result).toBeEqualish(quatA)
        })
    })

    describe("fromValues", () => {
        beforeEach(() => {
            result = quat.fromValues(1, 2, 3, 4)
        })
        it("should return a 4 element array initialized to the values passed", () => {
            expect(result).toBeEqualish([1, 2, 3, 4])
        })
    })

    describe("copy", () => {
        beforeEach(() => {
            result = quat.copy(out, quatA)
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
            result = quat.set(out, 1, 2, 3, 4)
        })
        it("should place values into out", () => {
            expect(out).toBeEqualish([1, 2, 3, 4])
        })
        it("should return out", () => {
            expect(result).toBe(out)
        })
    })

    describe("identity", () => {
        beforeEach(() => {
            result = quat.identity(out)
        })
        it("should place values into out", () => {
            expect(result).toBeEqualish([0, 0, 0, 1])
        })
        it("should return out", () => {
            expect(result).toBe(out)
        })
    })

    describe("setAxisAngle", () => {
        beforeEach(() => {
            result = quat.setAxisAngle(out, [1, 0, 0], Math.PI * 0.5)
        })
        it("should place values into out", () => {
            expect(result).toBeEqualish([0.707106, 0, 0, 0.707106])
        })
        it("should return out", () => {
            expect(result).toBe(out)
        })
    })

    describe("getAxisAngle", () => {
        describe("for a quaternion representing no rotation", () => {
            beforeEach(() => {
                result = quat.setAxisAngle(out, [0, 1, 0], 0.0)
                deg90 = quat.getAxisAngle(vec, out)
            })
            it("should return a multiple of 2*PI as the angle component", () => {
                expect(deg90 % (Math.PI * 2.0)).toBeEqualish(0.0)
            })
        })

        describe("for a simple rotation about X axis", () => {
            beforeEach(() => {
                result = quat.setAxisAngle(out, [1, 0, 0], 0.7778)
                deg90 = quat.getAxisAngle(vec, out)
            })
            it("should return the same provided angle", () => {
                expect(deg90).toBeEqualish(0.7778)
            })
            it("should return the X axis as the angle", () => {
                expect(vec).toBeEqualish([1, 0, 0])
            })
        })

        describe("for a simple rotation about Y axis", () => {
            beforeEach(() => {
                result = quat.setAxisAngle(out, [0, 1, 0], 0.879546)
                deg90 = quat.getAxisAngle(vec, out)
            })
            it("should return the same provided angle", () => {
                expect(deg90).toBeEqualish(0.879546)
            })
            it("should return the X axis as the angle", () => {
                expect(vec).toBeEqualish([0, 1, 0])
            })
        })

        describe("for a simple rotation about Z axis", () => {
            beforeEach(() => {
                result = quat.setAxisAngle(out, [0, 0, 1], 0.123456)
                deg90 = quat.getAxisAngle(vec, out)
            })
            it("should return the same provided angle", () => {
                expect(deg90).toBeEqualish(0.123456)
            })
            it("should return the X axis as the angle", () => {
                expect(vec).toBeEqualish([0, 0, 1])
            })
        })

        describe("for a slightly irregular axis and right angle", () => {
            beforeEach(() => {
                result = quat.setAxisAngle(
                    out,
                    [0.707106, 0, 0.707106],
                    Math.PI * 0.5
                )
                deg90 = quat.getAxisAngle(vec, out)
            })
            it("should place values into vec", () => {
                expect(vec).toBeEqualish([0.707106, 0, 0.707106])
            })
            it("should return a numeric angle", () => {
                expect(deg90).toBeEqualish(Math.PI * 0.5)
            })
        })

        describe("for a very irregular axis and negative input angle", () => {
            beforeEach(() => {
                quatA = quat.setAxisAngle(
                    quatA,
                    [0.65538555, 0.49153915, 0.57346237],
                    8.8888
                )
                deg90 = quat.getAxisAngle(vec, quatA)
                quatB = quat.setAxisAngle(quatB, vec, deg90)
            })
            it("should return an angle between 0 and 2*PI", () => {
                expect(deg90).toBeGreaterThan(0.0)
                expect(deg90).toBeLessThan(Math.PI * 2.0)
            })
            it("should create the same quaternion from axis and angle extracted", () => {
                expect(quatA).toBeEqualish(quatB)
            })
        })
    })

    describe("add", () => {
        describe("with a separate output quaternion", () => {
            beforeEach(() => {
                result = quat.add(out, quatA, quatB)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([6, 8, 10, 12])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify quatA", () => {
                expect(quatA).toBeEqualish([1, 2, 3, 4])
            })
            it("should not modify quatB", () => {
                expect(quatB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when quatA is the output quaternion", () => {
            beforeEach(() => {
                result = quat.add(quatA, quatA, quatB)
            })

            it("should place values into quatA", () => {
                expect(quatA).toBeEqualish([6, 8, 10, 12])
            })
            it("should return quatA", () => {
                expect(result).toBe(quatA)
            })
            it("should not modify quatB", () => {
                expect(quatB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when quatB is the output quaternion", () => {
            beforeEach(() => {
                result = quat.add(quatB, quatA, quatB)
            })

            it("should place values into quatB", () => {
                expect(quatB).toBeEqualish([6, 8, 10, 12])
            })
            it("should return quatB", () => {
                expect(result).toBe(quatB)
            })
            it("should not modify quatA", () => {
                expect(quatA).toBeEqualish([1, 2, 3, 4])
            })
        })
    })

    describe("multiply", () => {
        it("should have an alias called 'mul'", () => {
            expect(quat.mul).toEqual(quat.multiply)
        })

        describe("with a separate output quaternion", () => {
            beforeEach(() => {
                result = quat.multiply(out, quatA, quatB)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([24, 48, 48, -6])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify quatA", () => {
                expect(quatA).toBeEqualish([1, 2, 3, 4])
            })
            it("should not modify quatB", () => {
                expect(quatB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when quatA is the output quaternion", () => {
            beforeEach(() => {
                result = quat.multiply(quatA, quatA, quatB)
            })

            it("should place values into quatA", () => {
                expect(quatA).toBeEqualish([24, 48, 48, -6])
            })
            it("should return quatA", () => {
                expect(result).toBe(quatA)
            })
            it("should not modify quatB", () => {
                expect(quatB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when quatB is the output quaternion", () => {
            beforeEach(() => {
                result = quat.multiply(quatB, quatA, quatB)
            })

            it("should place values into quatB", () => {
                expect(quatB).toBeEqualish([24, 48, 48, -6])
            })
            it("should return quatB", () => {
                expect(result).toBe(quatB)
            })
            it("should not modify quatA", () => {
                expect(quatA).toBeEqualish([1, 2, 3, 4])
            })
        })
    })

    describe("scale", () => {
        describe("with a separate output quaternion", () => {
            beforeEach(() => {
                result = quat.scale(out, quatA, 2)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([2, 4, 6, 8])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify quatA", () => {
                expect(quatA).toBeEqualish([1, 2, 3, 4])
            })
        })

        describe("when quatA is the output quaternion", () => {
            beforeEach(() => {
                result = quat.scale(quatA, quatA, 2)
            })

            it("should place values into quatA", () => {
                expect(quatA).toBeEqualish([2, 4, 6, 8])
            })
            it("should return quatA", () => {
                expect(result).toBe(quatA)
            })
        })
    })

    describe("length", () => {
        it("should have an alias called 'len'", () => {
            expect(quat.len).toEqual(quat.length)
        })

        beforeEach(() => {
            result = quat.length(quatA)
        })

        it("should return the length", () => {
            expect(result).toBeCloseTo(5.477225)
        })
    })

    describe("squaredLength", () => {
        it("should have an alias called 'sqrLen'", () => {
            expect(quat.sqrLen).toEqual(quat.squaredLength)
        })

        beforeEach(() => {
            result = quat.squaredLength(quatA)
        })

        it("should return the squared length", () => {
            expect(result).toEqual(30)
        })
    })

    describe("normalize", () => {
        beforeEach(() => {
            quatA = [5, 0, 0, 0]
        })

        describe("with a separate output quaternion", () => {
            beforeEach(() => {
                result = quat.normalize(out, quatA)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([1, 0, 0, 0])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify quatA", () => {
                expect(quatA).toBeEqualish([5, 0, 0, 0])
            })
        })

        describe("when quatA is the output quaternion", () => {
            beforeEach(() => {
                result = quat.normalize(quatA, quatA)
            })

            it("should place values into quatA", () => {
                expect(quatA).toBeEqualish([1, 0, 0, 0])
            })
            it("should return quatA", () => {
                expect(result).toBe(quatA)
            })
        })
    })

    describe("lerp", () => {
        describe("with a separate output quaternion", () => {
            beforeEach(() => {
                result = quat.lerp(out, quatA, quatB, 0.5)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([3, 4, 5, 6])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify quatA", () => {
                expect(quatA).toBeEqualish([1, 2, 3, 4])
            })
            it("should not modify quatB", () => {
                expect(quatB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when quatA is the output quaternion", () => {
            beforeEach(() => {
                result = quat.lerp(quatA, quatA, quatB, 0.5)
            })

            it("should place values into quatA", () => {
                expect(quatA).toBeEqualish([3, 4, 5, 6])
            })
            it("should return quatA", () => {
                expect(result).toBe(quatA)
            })
            it("should not modify quatB", () => {
                expect(quatB).toBeEqualish([5, 6, 7, 8])
            })
        })

        describe("when quatB is the output quaternion", () => {
            beforeEach(() => {
                result = quat.lerp(quatB, quatA, quatB, 0.5)
            })

            it("should place values into quatB", () => {
                expect(quatB).toBeEqualish([3, 4, 5, 6])
            })
            it("should return quatB", () => {
                expect(result).toBe(quatB)
            })
            it("should not modify quatA", () => {
                expect(quatA).toBeEqualish([1, 2, 3, 4])
            })
        })
    })

    /*describe("slerp", () => {
        describe("with a separate output quaternion", () => {
            beforeEach(() => { result = quat.slerp(out, quatA, quatB, 0.5); });

            it("should place values into out", () => { expect(out).toBeEqualish([3, 4, 5, 6]); });
            it("should return out", () => { expect(result).toBe(out); });
            it("should not modify quatA", () => { expect(quatA).toBeEqualish([1, 2, 3, 4]); });
            it("should not modify quatB", () => { expect(quatB).toBeEqualish([5, 6, 7, 8]); });
        });

        describe("when quatA is the output quaternion", () => {
            beforeEach(() => { result = quat.slerp(quatA, quatA, quatB, 0.5); });

            it("should place values into quatA", () => { expect(quatA).toBeEqualish([3, 4, 5, 6]); });
            it("should return quatA", () => { expect(result).toBe(quatA); });
            it("should not modify quatB", () => { expect(quatB).toBeEqualish([5, 6, 7, 8]); });
        });

        describe("when quatB is the output quaternion", () => {
            beforeEach(() => { result = quat.slerp(quatB, quatA, quatB, 0.5); });

            it("should place values into quatB", () => { expect(quatB).toBeEqualish([3, 4, 5, 6]); });
            it("should return quatB", () => { expect(result).toBe(quatB); });
            it("should not modify quatA", () => { expect(quatA).toBeEqualish([1, 2, 3, 4]); });
        });
    });*/

    // TODO: slerp, calcuateW, rotateX, rotateY, rotateZ

    describe("invert", () => {
        describe("with a separate output quaternion", () => {
            beforeEach(() => {
                result = quat.invert(out, quatA)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([-0.033333, -0.066666, -0.1, 0.133333])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify quatA", () => {
                expect(quatA).toBeEqualish([1, 2, 3, 4])
            })
        })

        describe("when quatA is the output quaternion", () => {
            beforeEach(() => {
                result = quat.invert(quatA, quatA)
            })

            it("should place values into quatA", () => {
                expect(quatA).toBeEqualish([
                    -0.033333,
                    -0.066666,
                    -0.1,
                    0.133333
                ])
            })
            it("should return quatA", () => {
                expect(result).toBe(quatA)
            })
        })
    })

    describe("conjugate", () => {
        describe("with a separate output quaternion", () => {
            beforeEach(() => {
                result = quat.conjugate(out, quatA)
            })

            it("should place values into out", () => {
                expect(out).toBeEqualish([-1, -2, -3, 4])
            })
            it("should return out", () => {
                expect(result).toBe(out)
            })
            it("should not modify quatA", () => {
                expect(quatA).toBeEqualish([1, 2, 3, 4])
            })
        })

        describe("when quatA is the output quaternion", () => {
            beforeEach(() => {
                result = quat.conjugate(quatA, quatA)
            })

            it("should place values into quatA", () => {
                expect(quatA).toBeEqualish([-1, -2, -3, 4])
            })
            it("should return quatA", () => {
                expect(result).toBe(quatA)
            })
        })
    })

    describe("str", () => {
        beforeEach(() => {
            result = quat.str(quatA)
        })

        it("should return a string representation of the quaternion", () => {
            expect(result).toEqual("quat(1, 2, 3, 4)")
        })
    })

    describe("exactEquals", () => {
        let quatC: quattype
        let r0: boolean
        let r1: boolean
        beforeEach(() => {
            quatA = [0, 1, 2, 3]
            quatB = [0, 1, 2, 3]
            quatC = [1, 2, 3, 4]
            r0 = quat.exactEquals(quatA, quatB)
            r1 = quat.exactEquals(quatA, quatC)
        })

        it("should return true for identical quaternions", () => {
            expect(r0).toBe(true)
        })
        it("should return false for different quaternions", () => {
            expect(r1).toBe(false)
        })
        it("should not modify quatA", () => {
            expect(quatA).toBeEqualish([0, 1, 2, 3])
        })
        it("should not modify quatB", () => {
            expect(quatB).toBeEqualish([0, 1, 2, 3])
        })
    })

    describe("equals", () => {
        let quatC: quattype
        let quatD: quattype
        let r0: boolean
        let r1: boolean
        let r2: boolean
        beforeEach(() => {
            quatA = [0, 1, 2, 3]
            quatB = [0, 1, 2, 3]
            quatC = [1, 2, 3, 4]
            quatD = [1e-16, 1, 2, 3]
            r0 = quat.equals(quatA, quatB)
            r1 = quat.equals(quatA, quatC)
            r2 = quat.equals(quatA, quatD)
        })
        it("should return true for identical quaternions", () => {
            expect(r0).toBe(true)
        })
        it("should return false for different quaternions", () => {
            expect(r1).toBe(false)
        })
        it("should return true for close but not identical quaternions", () => {
            expect(r2).toBe(true)
        })
        it("should not modify quatA", () => {
            expect(quatA).toBeEqualish([0, 1, 2, 3])
        })
        it("should not modify quatB", () => {
            expect(quatB).toBeEqualish([0, 1, 2, 3])
        })
    })
})
