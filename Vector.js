/**
 * A two-dimensional vector class for JavaScript.
 */
class Vector {
    /**
     * Creates a two-dimensional vector pointing to X and Y.
     * @param {number} x Numeric expression.
     * @param {number} y Numeric expression.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    ////////////////////
    // STATIC METHODS //
    ////////////////////

    /**
     * Returns a Vector equals to A plus B.
     * @param {Vector} a Vector.
     * @param {number | Vector} b A numeric expression or a Vector.
     */
    static add(a, b) {
        return b instanceof Vector ?
            new Vector(a.x + b.x, a.y + b.y) :
            new Vector(a.x + b, a.y + b);
    }

    /**
     * Creates a Vector using Polar Coordinates (radius and angle).
     * @param {number} radius Numeric expression.
     * @param {number} angle Numeric expression (angle measured in radians).
     */
    static byPolarCoords(radius, angle) {
        return new Vector(
            radius * Math.cos(angle),
            radius * Math.sin(angle)
        );
    }

    /**
     * Returns the Chebyshev Distance.
     * 
     * - "Also known as the Chessboard Distance, it is somewhat similar
     * to the Manhattan distance, but with 45 degrees rotation."
     * @param {Vector} a A Vector.
     * @param {Vector} b A Vector.
     * @returns {number}
     */
    static distanceChebyshev(a, b) {
        return Math.max(
            Math.abs(a.x - b.x),
            Math.abs(a.y - b.y)
        );
    }

    /**
     * Returns the Euclidian Distance of A to B.
     * @param {Vector} a A Vector.
     * @param {Vector} b A Vector.
     */
    static distanceEuclidian(a, b) {
        const U = (a.x - b.x);
        const V = (a.y - b.y);
        return Math.sqrt(U * U + V * V);
    }

    /**
     * Returns the Manhattan Distance.
     * 
     * - "Inspired by the grid-like organization of Manhattan, this
     * is distance to the nearest points when you can only travel
     * around the boundaries."
     * 
     * - In other words: 
     * Only horizontal, vertical and diagonal (45 deg.) movements.
     * @param {Vector} a A Vector.
     * @param {Vector} b A Vector.
     */
    static distanceManhattan(a, b) {
        return Math.sqrt(
            Math.abs(a.x - b.x) +
            Math.abs(a.y - b.y)
        );
    }

    /**
     * Returns the division of A by B.
     * @param {Vector} a A Vector.
     * @param {number | Vector} b A numeric expression or a Vector.
     */
    static divide(a, b) {
        return b instanceof Vector ?
            new Vector(a.x / b.x, a.y / b.y) :
            new Vector(a.x / b, a.y / b);
    }

    /**
     * Returns the product of A by B.
     * @param {Vector} a A Vector.
     * @param {number | Vector} b A numeric expression or a Vector
     */
    static multiply(a, b) {
        return b instanceof Vector ?
            new Vector(a.x * b.x, a.y * b.y) :
            new Vector(a.x * b, a.y * b);
    }

    /**
     * Returns a Vector equals to A minus B.
     * @param {Vector} a A Vector.
     * @param {number | Vector} b A numeric expression or a Vector.
     */
    static subtract(a, b) {
        return b instanceof Vector ?
            new Vector(a.x - b.x, a.y - b.y) :
            new Vector(a.x - b, a.y - b);
    }

    //////////////////////
    // INSTANCE METHODS //
    //////////////////////

    /**
     * Adds A to 'this' Vector.
     * @param {number | Vector} a A numeric expression or a Vector.
     */
    add(a) {
        a instanceof Vector ?
            (this.x += a.x, this.y += a.y) :
            (this.x += a, this.y += a);
    }

    /**
     * Copy the X and Y coordinates of A to 'this' Vector.
     * @param {Vector} a A Vector.
     */
    copy(a) {
        this.x = a.x, this.y = a.y;
    }

    /**
     * Divides 'this' Vector by A.
     * @param {number | Vector} a A numeric expression or a Vector.
     */
    divide(a) {
        a instanceof Vector ?
            (this.x = this.x / a.x, this.y = this.y / a.y) :
            (this.x = this.x / a, this.y = this.y / a);
    }

    /**
     * Returns the angle of 'this' Vector (in radians).
     * Values between PI and -PI.
     */
    getAngle() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Returns the magnitude (size) of 'this' Vector (Pythagorean theorem).
     */
    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Limits the maximum size of 'this' Vector to the A value.
     * @param {number} a A numeric expression.
     */
    limit(a) {
        if (this.getMagnitude() > a) this.normalize(), this.multiply(a);
    }

    /**
     * Multiplies 'this' Vector by A.
     * @param {number | Vector} a A numeric expression or a Vector.
     */
    multiply(a) {
        a instanceof Vector ?
            (this.x = this.x * a.x, this.y = this.y * a.y) :
            (this.x = this.x * a, this.y = this.y * a);
    }

    /**
     * Sets to 1 'this' Vector's magnitude (Unit Vector).
     */
    normalize() {
        const MA = this.getMagnitude();
        this.x = this.x / MA, this.y = this.y / MA;
    }

    /**
     * Sets to A 'this' Vector's magnitude.
     * @param {number | Vector} a A numeric expression or a Vector.
     */
    setMagnitude(a) {
        this.normalize(), this.multiply(a);
    }

    /**
     * Subtracts A to 'this' Vector.
     * @param {number | Vector} a A numeric expression or a Vector.
     */
    subtract(a) {
        a instanceof Vector ?
            (this.x -= a.x, this.y -= a.y) :
            (this.x -= a, this.y -= a);
    }
}
