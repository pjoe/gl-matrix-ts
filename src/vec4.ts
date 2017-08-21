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

import { EPSILON, mat4type, quattype, vec4type } from "./common"

export type valueType = vec4type

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
export function create() {
    const out = new Float32Array(4)
    out[0] = 0
    out[1] = 0
    out[2] = 0
    out[3] = 0
    return out
}

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
export function clone(a: vec4type) {
    const out = new Float32Array(4)
    out[0] = a[0]
    out[1] = a[1]
    out[2] = a[2]
    out[3] = a[3]
    return out
}

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
export function fromValues(x: number, y: number, z: number, w: number) {
    const out = new Float32Array(4)
    out[0] = x
    out[1] = y
    out[2] = z
    out[3] = w
    return out
}

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
export function copy(out: vec4type, a: vec4type) {
    out[0] = a[0]
    out[1] = a[1]
    out[2] = a[2]
    out[3] = a[3]
    return out
}

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
export function set(out: vec4type, x: number, y: number, z: number, w: number) {
    out[0] = x
    out[1] = y
    out[2] = z
    out[3] = w
    return out
}

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
export function add(out: vec4type, a: vec4type, b: vec4type) {
    out[0] = a[0] + b[0]
    out[1] = a[1] + b[1]
    out[2] = a[2] + b[2]
    out[3] = a[3] + b[3]
    return out
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
export function subtract(out: vec4type, a: vec4type, b: vec4type) {
    out[0] = a[0] - b[0]
    out[1] = a[1] - b[1]
    out[2] = a[2] - b[2]
    out[3] = a[3] - b[3]
    return out
}

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
export { subtract as sub }

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
export function multiply(out: vec4type, a: vec4type, b: vec4type) {
    out[0] = a[0] * b[0]
    out[1] = a[1] * b[1]
    out[2] = a[2] * b[2]
    out[3] = a[3] * b[3]
    return out
}

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
export { multiply as mul }

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
export function divide(out: vec4type, a: vec4type, b: vec4type) {
    out[0] = a[0] / b[0]
    out[1] = a[1] / b[1]
    out[2] = a[2] / b[2]
    out[3] = a[3] / b[3]
    return out
}

/**
 * Alias for {@link vec4.divide}
 * @function
 */
export { divide as div }

/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to ceil
 * @returns {vec4} out
 */
export function ceil(out: vec4type, a: vec4type) {
    out[0] = Math.ceil(a[0])
    out[1] = Math.ceil(a[1])
    out[2] = Math.ceil(a[2])
    out[3] = Math.ceil(a[3])
    return out
}

/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to floor
 * @returns {vec4} out
 */
export function floor(out: vec4type, a: vec4type) {
    out[0] = Math.floor(a[0])
    out[1] = Math.floor(a[1])
    out[2] = Math.floor(a[2])
    out[3] = Math.floor(a[3])
    return out
}

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
export function min(out: vec4type, a: vec4type, b: vec4type) {
    out[0] = Math.min(a[0], b[0])
    out[1] = Math.min(a[1], b[1])
    out[2] = Math.min(a[2], b[2])
    out[3] = Math.min(a[3], b[3])
    return out
}

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
export function max(out: vec4type, a: vec4type, b: vec4type) {
    out[0] = Math.max(a[0], b[0])
    out[1] = Math.max(a[1], b[1])
    out[2] = Math.max(a[2], b[2])
    out[3] = Math.max(a[3], b[3])
    return out
}

/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to round
 * @returns {vec4} out
 */
export function round(out: vec4type, a: vec4type) {
    out[0] = Math.round(a[0])
    out[1] = Math.round(a[1])
    out[2] = Math.round(a[2])
    out[3] = Math.round(a[3])
    return out
}

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
export function scale(out: vec4type, a: vec4type, b: number) {
    out[0] = a[0] * b
    out[1] = a[1] * b
    out[2] = a[2] * b
    out[3] = a[3] * b
    return out
}

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} s the amount to scale b by before adding
 * @returns {vec4} out
 */
export function scaleAndAdd(
    out: vec4type,
    a: vec4type,
    b: vec4type,
    s: number
) {
    out[0] = a[0] + b[0] * s
    out[1] = a[1] + b[1] * s
    out[2] = a[2] + b[2] * s
    out[3] = a[3] + b[3] * s
    return out
}

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
export function distance(a: vec4type, b: vec4type) {
    const x = b[0] - a[0]
    const y = b[1] - a[1]
    const z = b[2] - a[2]
    const w = b[3] - a[3]
    return Math.sqrt(x * x + y * y + z * z + w * w)
}

/**
 * Alias for {@link vec4.distance}
 * @function
 */
export { distance as dist }

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
export function squaredDistance(a: vec4type, b: vec4type) {
    const x = b[0] - a[0]
    const y = b[1] - a[1]
    const z = b[2] - a[2]
    const w = b[3] - a[3]
    return x * x + y * y + z * z + w * w
}

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
export { squaredDistance as sqrDist }

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
export function length(a: vec4type) {
    const x = a[0]
    const y = a[1]
    const z = a[2]
    const w = a[3]
    return Math.sqrt(x * x + y * y + z * z + w * w)
}

/**
 * Alias for {@link vec4.length}
 * @function
 */
export { length as len }

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
export function squaredLength(a: vec4type) {
    const x = a[0]
    const y = a[1]
    const z = a[2]
    const w = a[3]
    return x * x + y * y + z * z + w * w
}

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
export { squaredLength as sqrLen }

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
export function negate(out: vec4type, a: vec4type) {
    out[0] = -a[0]
    out[1] = -a[1]
    out[2] = -a[2]
    out[3] = -a[3]
    return out
}

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
export function inverse(out: vec4type, a: vec4type) {
    out[0] = 1.0 / a[0]
    out[1] = 1.0 / a[1]
    out[2] = 1.0 / a[2]
    out[3] = 1.0 / a[3]
    return out
}

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
export function normalize(out: vec4type, a: vec4type) {
    const x = a[0]
    const y = a[1]
    const z = a[2]
    const w = a[3]
    let len = x * x + y * y + z * z + w * w
    if (len > 0) {
        len = 1 / Math.sqrt(len)
        out[0] = x * len
        out[1] = y * len
        out[2] = z * len
        out[3] = w * len
    }
    return out
}

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
export function dot(a: vec4type, b: vec4type) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
}

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
export function lerp(out: vec4type, a: vec4type, b: vec4type, t: number) {
    const ax = a[0]
    const ay = a[1]
    const az = a[2]
    const aw = a[3]
    out[0] = ax + t * (b[0] - ax)
    out[1] = ay + t * (b[1] - ay)
    out[2] = az + t * (b[2] - az)
    out[3] = aw + t * (b[3] - aw)
    return out
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [s] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
export function random(out: vec4type, s: number = 1.0) {
    // TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = Math.random()
    out[1] = Math.random()
    out[2] = Math.random()
    out[3] = Math.random()
    normalize(out, out)
    scale(out, out, s)
    return out
}

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
export function transformMat4(out: vec4type, a: vec4type, m: mat4type) {
    const x = a[0]
    const y = a[1]
    const z = a[2]
    const w = a[3]
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w
    return out
}

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
export function transformQuat(out: vec4type, a: vec4type, q: quattype) {
    const x = a[0]
    const y = a[1]
    const z = a[2]
    const qx = q[0]
    const qy = q[1]
    const qz = q[2]
    const qw = q[3]
    // calculate quat * vec
    const ix = qw * x + qy * z - qz * y
    const iy = qw * y + qz * x - qx * z
    const iz = qw * z + qx * y - qy * x
    const iw = -qx * x - qy * y - qz * z

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx
    out[3] = a[3]
    return out
}

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
export function forEach(
    a: vec4type,
    stride: number,
    offset: number,
    count: number,
    fn: (out: vec4type, vec: vec4type, arg: any) => void,
    arg?: any
) {
    // TODO: pre-allocate?
    const vec = create()

    let i
    let l
    if (!stride) {
        stride = 4
    }

    if (!offset) {
        offset = 0
    }

    l = count ? Math.min(count * stride + offset, a.length) : a.length

    for (i = offset; i < l; i += stride) {
        vec[0] = a[i]
        vec[1] = a[i + 1]
        vec[2] = a[i + 2]
        vec[3] = a[i + 3]
        fn(vec, vec, arg)
        a[i] = vec[0]
        a[i + 1] = vec[1]
        a[i + 2] = vec[2]
        a[i + 3] = vec[3]
    }

    return a
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
export function str(a: vec4type) {
    return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export function exactEquals(a: vec4type, b: vec4type) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export function equals(a: vec4type, b: vec4type) {
    const a0 = a[0]
    const a1 = a[1]
    const a2 = a[2]
    const a3 = a[3]
    const b0 = b[0]
    const b1 = b[1]
    const b2 = b[2]
    const b3 = b[3]
    return (
        Math.abs(a0 - b0) <=
            EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
        Math.abs(a1 - b1) <=
            EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
        Math.abs(a2 - b2) <=
            EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
        Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3))
    )
}
