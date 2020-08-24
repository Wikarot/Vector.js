/**
 * A two-dimensional vector class.
 */
export class Vec2 {
  /**
   * Creates a two-dimensional vector pointing to X and Y.
   * @param {number} x A numeric expression.
   * @param {number} y A numeric expression.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {Vec2} A new vector equals to A plus B.
   */
  static add(a, b) {
    return new Vec2(a.x + b.x, a.y + b.y);
  }

  /**
   * Returns the angle between A and B.
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} The angle between A and B (in radians).
   */
  static angleBetween(a, b) {
    const MAG_A = a.magnitude;
    const MAG_B = b.magnitude;
    if (MAG_A === 0 || MAG_B === 0) return;
    return Math.acos(Vec2.dotProduct(a, b) / (MAG_A * MAG_B));
  }

  /**
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} The (Euclidian) distance from A to B.
   */
  static distance(a, b) {
    const S = (a.x - b.x);
    const T = (a.y - b.y);
    return Math.sqrt((S * S) + (T * T));
  }

  /**
   * "Also known as the Chessboard distance, it is somewhat similar
   * to the Manhattan distance, but with 45 degrees rotation."
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} Chebyshev distance from A to B.
   */
  static distanceChebyshev(a, b) {
    return Math.max(
      Math.abs(a.x - b.x),
      Math.abs(a.y - b.y));
  }

  /**
   * "Inspired by the grid-like organization of Manhattan, this
   * is distance to the nearest points when you can only travel
   * around the boundaries."
   * 
   * In other words: 
   * Only horizontal, vertical and diagonal (45 deg.) movements.
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} Manhattan distance from A to B.
   */
  static distanceManhattan(a, b) {
    return Math.sqrt(
      Math.abs(a.x - b.x) +
      Math.abs(a.y - b.y));
  }

	/**
   * It takes an exponent parameter (e), and the results can be similar
   * or even equivalent to Chebyshev, Euclidian and Manhattan metrics.
   * 
   * - If { p = 1 }: It'll be equivalent to Manhattan distance.
   * 
   * - If { p = 2 }: It'll be equivalent to Euclidian distance.
   * 
   * - If { p = infinite }: It'll be equivalent to Chebyshev distance.
	 * @param {Vec2} a A vector.
	 * @param {Vec2} b A vector.
   * @param {number} e A numeric expression.
   * @returns {number} Minkowski distance from A to B.
	 */
  static distanceMinkowski(a, b, e) {
    return ((
      Math.abs(a.x - b.x) ** e +
      Math.abs(a.y - b.y) ** e
    ) ** (1 / e));
  }

  /**
   * The sum of the product of each component.
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} The dot product of these two vectors.
   */
  static dotProduct(a, b) {
    return (
      a.x * b.x +
      a.y * b.y);
  }

  /**
   * @param {Vec2} a A vector.
   * @returns {Vec2} A new vector identical to A.
   */
  static fromCopy(a) {
    return new Vec2(
      { ...a }.x,
      { ...a }.y);
  }

  /**
   * @param {number} radius Numeric expression.
   * @param {number} phi Numeric expression (angle from x axis measured in radians).
   * @returns {Vec2} A new vector created from Polar Coordinates.
   */
  static fromPolarCoords(radius, phi) {
    return new Vec2(
      radius * Math.cos(phi),
      radius * Math.sin(phi)
    );
  }

  /**
   * Orthogonal projection of A onto B.
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {Vec2} The component of A projected on B (in direction of B).
   */
  static project(a, b) {
    const P_MAG = a.magnitude * Math.cos(Vec2.angleBetween(a, b));
    const P = Vec2.fromCopy(b);
    P.normalize();
    P.scale(P_MAG);
    return P;
  }

  /**
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {Vec2} A new vector equals to A minus B.
   */
  static subtract(a, b) {
    return new Vec2(a.x - b.x, a.y - b.y);
  }

  /**
   * Values between PI and -PI.
   * @returns {number} Angle relative to the positive x-axis (in radians).
   */
  get angleX() {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Values between PI and -PI.
   * @returns {number} Angle relative to the positive y-axis (in radians).
   */
  get angleY() {
    return Math.atan2(this.x, this.y);
  }

  /**
   * @returns {number} The magnitude of this vector.
   */
  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Limits the maximum length of this vector to the A value.
   * @param {number} a A numeric expression.
   */
  set limit(a) {
    if (this.magnitude > a) {
      this.normalize();
      this.scale(a);
    }
  }

  /**
   * Sets the magnitude of this vector.
   * @param {number} a A numeric expression.
   */
  set magnitude(a) {
    this.normalize();
    this.scale(a);
  }

  /**
   * Adds A to this vector.
   * @param {Vec2} a A vector.
   */
  add(a) {
    this.x = this.x + a.x;
    this.y = this.y + a.y;
  }

  /**
   * Copy the coordinates of A to this vector.
   * @param {Vec2} a A vector.
   */
  copy(a) {
    this.x = { ...a }.x;
    this.y = { ...a }.y;
  }

  /**
   * Sets the magnitude of this vector to 1 (Unit Vector).
   */
  normalize() {
    let mag = this.magnitude;
    if (mag === 0) mag = 1;
    this.x = this.x * mag;
    this.y = this.y * mag;
  }

  /**
   * Scales this vector by A.
   * @param {number} a A numeric expression.
   */
  scale(a) {
    this.x = this.x * a;
    this.y = this.y * a;
  }

  /**
   * Subtracts A from this vector.
   * @param {Vec2} a A vector.
   */
  subtract(a) {
    this.x = this.x - a.x;
    this.y = this.y - a.y;
  }
}

/**
 * A three-dimensional vector class.
 */
export class Vec3 {
  /**
   * Creates a three-dimensional vector pointing to X, Y and Z.
   * @param {number} x A numeric expression.
   * @param {number} y A numeric expression.
   * @param {number} z A numeric expression.
   */
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {Vec3} A new vector equals to A plus B.
   */
  static add(a, b) {
    return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
  }

  /**
   * Returns the angle between A and B.
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {number} The angle between A and B (in radians).
   */
  static angleBetween(a, b) {
    const MAG_A = a.magnitude;
    const MAG_B = b.magnitude;
    if (MAG_A === 0 || MAG_B === 0) return;
    return Math.acos(Vec3.dotProduct(a, b) / (MAG_A * MAG_B));
  }

  /**
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {number} The (Euclidian) distance from A to B.
   */
  static distance(a, b) {
    const S = (a.x - b.x);
    const T = (a.y - b.y);
    const P = (a.z - b.z);
    return Math.sqrt((S * S) + (T * T) + (P * P));
  }

  /**
   * "Also known as the Chessboard distance, it is somewhat similar
   * to the Manhattan distance, but with 45 degrees rotation."
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {number} Chebyshev distance from A to B.
   */
  static distanceChebyshev(a, b) {
    return Math.max(
      Math.abs(a.x - b.x),
      Math.abs(a.y - b.y),
      Math.abs(a.z - b.z));
  }

  /**
   * "Inspired by the grid-like organization of Manhattan, this
   * is distance to the nearest points when you can only travel
   * around the boundaries."
   * 
   * In other words: 
   * Only horizontal, vertical and diagonal (45 deg.) movements.
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {number} Manhattan distance from A to B.
   */
  static distanceManhattan(a, b) {
    return Math.sqrt(
      Math.abs(a.x - b.x) +
      Math.abs(a.y - b.y) +
      Math.abs(a.z - b.z));
  }

	/**
   * It takes an exponent parameter (e), and the results can be similar
   * or even equivalent to Chebyshev, Euclidian and Manhattan metrics.
   * 
   * - If { p = 1 }: It'll be equivalent to Manhattan distance.
   * 
   * - If { p = 2 }: It'll be equivalent to Euclidian distance.
   * 
   * - If { p = infinite }: It'll be equivalent to Chebyshev distance.
	 * @param {Vec3} a A vector.
	 * @param {Vec3} b A vector.
   * @param {number} e A numeric expression.
   * @returns {number} Minkowski distance from A to B.
	 */
  static distanceMinkowski(a, b, e) {
    return ((
      Math.abs(a.x - b.x) ** e +
      Math.abs(a.y - b.y) ** e +
      Math.abs(a.z - b.z) ** e
    ) ** (1 / e));
  }

  /**
   * The sum of the product of each component.
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {number} The dot product of these two vectors.
   */
  static dotProduct(a, b) {
    return (
      a.x * b.x +
      a.y * b.y +
      a.z * b.z);
  }

  /**
   * @param {Vec3} a A vector.
   * @returns {Vec3} A new vector identical to A.
   */
  static fromCopy(a) {
    return new Vec3(
      { ...a }.x,
      { ...a }.y,
      { ...a }.z);
  }

  /**
   * @param {number} radius Numeric expression.
   * @param {number} phi Numeric expression (angle from x axis measured in radians).
   * @param {number} theta Numeric expression (angle from z axis measured in radians).
   * @returns {Vec3} A new vector created from Spherical Coordinates.
   */
  static fromSphericalCoords(radius, phi, theta) {
    return new Vec3(
      radius * Math.cos(phi) * Math.sin(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(theta)
    );
  }

  /**
   * Orthogonal projection of A onto B.
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {Vec3} The component of A projected on B (in direction of B).
   */
  static project(a, b) {
    const P_MAG = a.magnitude * Math.cos(Vec3.angleBetween(a, b));
    const P = Vec3.fromCopy(b);
    P.normalize();
    P.scale(P_MAG);
    return P;
  }

  /**
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {Vec2} A new vector equals to A minus B.
   */
  static subtract(a, b) {
    return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  /**
   * Values between PI and -PI.
   * @returns {number} Angle relative to the positive x-axis (in radians).
   */
  get angleX() {
    return Math.atan2(Math.sqrt(this.y ** 2 + this.z ** 2), this.x);
  }

  /**
   * Values between PI and -PI.
   * @returns {number} Angle relative to the positive y-axis (in radians).
   */
  get angleY() {
    return Math.atan2(Math.sqrt(this.x ** 2 + this.z ** 2), this.y);
  }

  /**
   * Values between PI and -PI.
   * @returns {number} Angle relative to the positive z-axis (in radians).
   */
  get angleZ() {
    return Math.atan2(Math.sqrt(this.x ** 2 + this.y ** 2), this.z);
  }

  /**
   * @returns {number} The magnitude of this vector.
   */
  get magnitude() {
    return Math.sqrt(
      this.x * this.x +
      this.y * this.y +
      this.z * this.z
    );
  }

  /**
   * Limits the maximum length of this vector to the A value.
   * @param {number} a A numeric expression.
   */
  set limit(a) {
    if (this.magnitude > a) {
      this.normalize();
      this.scale(a);
    }
  }

  /**
   * Sets the magnitude of this vector.
   * @param {number} a A numeric expression.
   */
  set magnitude(a) {
    this.normalize();
    this.scale(a);
  }

  /**
   * Adds A to this vector.
   * @param {Vec3} a A vector.
   */
  add(a) {
    this.x = this.x + a.x;
    this.y = this.y + a.y;
    this.z = this.z + a.z;
  }

  /**
   * Copy the coordinates of A to this vector.
   * @param {Vec3} a A vector.
   */
  copy(a) {
    this.x = { ...a }.x;
    this.y = { ...a }.y;
    this.z = { ...a }.z;
  }

  /**
   * Sets the magnitude of this vector to 1 (Unit Vector).
   */
  normalize() {
    let mag = this.magnitude;
    if (mag === 0) mag = 1;
    this.x = this.x * mag;
    this.y = this.y * mag;
    this.z = this.z * mag;
  }

  /**
   * Scales this vector by A.
   * @param {number} a A numeric expression.
   */
  scale(a) {
    this.x = this.x * a;
    this.y = this.y * a;
    this.z = this.z * a;
  }

  /**
   * Subtracts A from this vector.
   * @param {Vec3} a A vector.
   */
  subtract(a) {
    this.x = this.x - a.x;
    this.y = this.y - a.y;
    this.z = this.z - a.z;
  }
}

/**
 * A four-dimensional vector class.
 */
export class Vec4 {
  /**
   * Creates a four-dimensional vector pointing to X, Y, Z and W.
   * @param {number} x A numeric expression.
   * @param {number} y A numeric expression.
   * @param {number} z A numeric expression.
   * @param {number} w A numeric expression.
   */
  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  /**
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {Vec4} A new vector equals to A plus B.
   */
  static add(a, b) {
    return new Vec4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
  }

  /**
   * Returns the angle between A and B.
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {number} The angle between A and B (in radians).
   */
  static angleBetween(a, b) {
    const MAG_A = a.magnitude;
    const MAG_B = b.magnitude;
    if (MAG_A === 0 || MAG_B === 0) return;
    return Math.acos(Vec4.dotProduct(a, b) / (MAG_A * MAG_B));
  }

  /**
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {number} The (Euclidian) distance from A to B.
   */
  static distance(a, b) {
    const S = (a.x - b.x);
    const T = (a.y - b.y);
    const P = (a.z - b.z);
    const Q = (a.w - b.w);
    return Math.sqrt((S * S) + (T * T) + (P * P) + (Q * Q));
  }

  /**
   * "Also known as the Chessboard distance, it is somewhat similar
   * to the Manhattan distance, but with 45 degrees rotation."
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {number} Chebyshev distance from A to B.
   */
  static distanceChebyshev(a, b) {
    return Math.max(
      Math.abs(a.x - b.x),
      Math.abs(a.y - b.y),
      Math.abs(a.z - b.z),
      Math.abs(a.w - b.w));
  }

  /**
   * "Inspired by the grid-like organization of Manhattan, this
   * is distance to the nearest points when you can only travel
   * around the boundaries."
   * 
   * In other words: 
   * Only horizontal, vertical and diagonal (45 deg.) movements.
   * @param {Vec4} a a vector.
   * @param {Vec4} b A vector.
   * @returns {number} Manhattan distance from A to B.
   */
  static distanceManhattan(a, b) {
    return Math.sqrt(
      Math.abs(a.x - b.x) +
      Math.abs(a.y - b.y) +
      Math.abs(a.z - b.z) +
      Math.abs(a.w - b.w));
  }

	/**
   * It takes an exponent parameter (e), and the results can be similar
   * or even equivalent to Chebyshev, Euclidian and Manhattan metrics.
   * 
   * - If { p = 1 }: It'll be equivalent to Manhattan distance.
   * 
   * - If { p = 2 }: It'll be equivalent to Euclidian distance.
   * 
   * - If { p = infinite }: It'll be equivalent to Chebyshev distance.
	 * @param {Vec4} a A vector.
	 * @param {Vec4} b A vector.
   * @param {number} e A numeric expression.
   * @returns {number} Minkowski distance from A to B.
	 */
  static distanceMinkowski(a, b, e) {
    return ((
      Math.abs(a.x - b.x) ** e +
      Math.abs(a.y - b.y) ** e +
      Math.abs(a.z - b.z) ** e +
      Math.abs(a.w - b.w) ** e
    ) ** (1 / e));
  }

  /**
   * The sum of the product of each component.
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {number} The dot product of these two vectors.
   */
  static dotProduct(a, b) {
    return (
      a.x * b.x +
      a.y * b.y +
      a.z * b.z +
      a.w * b.w);
  }

  /**
   * @param {Vec4} a A vector.
   * @returns {Vec4} A new vector identical to A.
   */
  static fromCopy(a) {
    return new Vec4(
      { ...a }.x,
      { ...a }.y,
      { ...a }.z,
      { ...a }.w);
  }

  /**
   * Orthogonal projection of A onto B.
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {Vec4} The component of A projected on B (in direction of B).
   */
  static project(a, b) {
    const P_MAG = a.magnitude * Math.cos(Vec4.angleBetween(a, b));
    const P = Vec4.fromCopy(b);
    P.normalize();
    P.scale(P_MAG);
    return P;
  }

  /**
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {Vec2} A new vector equals to A minus B.
   */
  static subtract(a, b) {
    return new Vec4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
  }

  /**
   * Values between PI and -PI.
   * @returns {number} Angle relative to the positive x-axis (in radians).
   */
  get angleX() {
    return Math.atan2(Math.sqrt(this.y ** 2 + this.z ** 2), this.x);
  }

  /**
   * Values between PI and -PI.
   * @returns {number} Angle relative to the positive y-axis (in radians).
   */
  get angleY() {
    return Math.atan2(Math.sqrt(this.x ** 2 + this.z ** 2), this.y);
  }

  /**
   * Values between PI and -PI.
   * @returns {number} Angle relative to the positive z-axis (in radians).
   */
  get angleZ() {
    return Math.atan2(Math.sqrt(this.x ** 2 + this.y ** 2), this.z);
  }

  /**
   * @returns {number} The magnitude of this vector.
   */
  get magnitude() {
    return Math.sqrt(
      this.x * this.x +
      this.y * this.y +
      this.z * this.z +
      this.w * this.w
    );
  }

  /**
   * Limits the maximum length of this vector to the A value.
   * @param {number} a A numeric expression.
   */
  set limit(a) {
    if (this.magnitude > a) {
      this.normalize();
      this.scale(a);
    }
  }

  /**
   * Sets the magnitude of this vector.
   * @param {number} a A numeric expression.
   */
  set magnitude(a) {
    this.normalize();
    this.scale(a);
  }

  /**
   * Adds A to this vector.
   * @param {Vec4} a A vector.
   */
  add(a) {
    this.x = this.x + a.x;
    this.y = this.y + a.y;
    this.z = this.z + a.z;
    this.w = this.w + a.w;
  }

  /**
   * Copy the coordinates of A to this vector.
   * @param {Vec4} a A vector.
   */
  copy(a) {
    this.x = { ...a }.x;
    this.y = { ...a }.y;
    this.z = { ...a }.z;
    this.w = { ...a }.w;
  }

  /**
   * Sets the magnitude of this vector to 1 (Unit Vector).
   */
  normalize() {
    let mag = this.magnitude;
    if (mag === 0) mag = 1;
    this.x = this.x * mag;
    this.y = this.y * mag;
    this.z = this.z * mag;
    this.w = this.w * mag;
  }

  /**
   * Scales this vector by A.
   * @param {number} a A numeric expression.
   */
  scale(a) {
    this.x = this.x * a;
    this.y = this.y * a;
    this.z = this.z * a;
    this.w = this.w * a;
  }

  /**
   * Subtracts A from this vector.
   * @param {Vec4} a A vector.
   */
  subtract(a) {
    this.x = this.x - a.x;
    this.y = this.y - a.y;
    this.z = this.z - a.z;
    this.w = this.w - a.w;
  }
}
