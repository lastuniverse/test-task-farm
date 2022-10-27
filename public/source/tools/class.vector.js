export class Matrix {
	static multiply(a, b) {
		const m = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				m[i][j] = a[i][0] * b[0][j] +
					a[i][1] * b[1][j] +
					a[i][2] * b[2][j] +
					a[i][3] * b[3][j];
			}
		}

		return m;
	}
	static getTranslation(dx, dy, dz) {
		return [
			[1, 0, 0, dx],
			[0, 1, 0, dy],
			[0, 0, 1, dz],
			[0, 0, 0, 1],
		]
	}
	static getScale(sx, sy, sz) {
		return [
			[sx, 0, 0, 0],
			[0, sy, 0, 0],
			[0, 0, sz, 0],
			[0, 0, 0, 1],
		]
	}
	static getRotationX(angle) {
		// const rad = Math.PI / 180 * angle;

		return [
			[1, 0, 0, 0],
			[0, Math.cos(angle), -Math.sin(angle), 0],
			[0, Math.sin(angle), Math.cos(angle), 0],
			[0, 0, 0, 1],
		];
	}

	static getRotationY(angle) {
		// const rad = Math.PI / 180 * angle;

		return [
			[Math.cos(angle), 0, Math.sin(angle), 0],
			[0, 1, 0, 0],
			[-Math.sin(angle), 0, Math.cos(angle), 0],
			[0, 0, 0, 1],
		];
	}

	static getRotationZ(angle) {
		// const rad = Math.PI / 180 * angle;

		return [
			[Math.cos(angle), -Math.sin(angle), 0, 0],
			[Math.sin(angle), Math.cos(angle), 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 1],
		];
	}
	static getLookAt(from, target, up) {
		const vz = from.subtract(target).normalize();
		const vx = up.normalize().cross(vz);
		const vy = vz.normalize().cross(vx);

		return Matrix.multiply(
			Matrix.getTranslation(-from.x, -from.y, -eye.z),
			[
				[vx.x, vx.y, vx.z, 0],
				[vy.x, vy.y, vy.z, 0],
				[vz.x, vz.y, vz.z, 0],
				[0, 0, 0, 1]
			]);
	}

	static getPerspectiveProjection(fovy, aspect, n, f) {
		const radians = Math.PI / 180 * fovy
		const sx = (1 / Math.tan(radians / 2)) / aspect;
		const sy = (1 / Math.tan(radians / 2));
		const sz = (f + n) / (f - n);
		const dz = (-2 * f * n) / (f - n);
		return [
			[sx, 0, 0, 0],
			[0, sy, 0, 0],
			[0, 0, sz, dz],
			[0, 0, -1, 0],
		]
	}

	static multiplyVector(m, v) {
		return new Vector3(
			m[0][0] * v.x + m[0][1] * v.y + m[0][2] * v.z + m[0][3] * v.w,
			m[1][0] * v.x + m[1][1] * v.y + m[1][2] * v.z + m[1][3] * v.w,
			m[2][0] * v.x + m[2][1] * v.y + m[2][2] * v.z + m[2][3] * v.w,
			m[3][0] * v.x + m[3][1] * v.y + m[3][2] * v.z + m[3][3] * v.w,
		)
	}

	static divideVector(m, v) {
		return new Vector3(
			m[0][0] / v.x + m[0][1] / v.y + m[0][2] / v.z + m[0][3] / v.w,
			m[1][0] / v.x + m[1][1] / v.y + m[1][2] / v.z + m[1][3] / v.w,
			m[2][0] / v.x + m[2][1] / v.y + m[2][2] / v.z + m[2][3] / v.w,
			m[3][0] / v.x + m[3][1] / v.y + m[3][2] / v.z + m[3][3] / v.w,
		)
	}
}

export class Vector3 {
	x = 0;
	y = 0;
	z = 0;
	w = 1;

	constructor(x, y, z, w = 1) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	// инвертировать вектор
	negative() {
		return new Vector3(-this.x, -this.y, -this.z);
	};

	// сложить с вектором или скаляром
	add(v) {
		if (v instanceof Vector3) return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
		else return new Vector3(this.x + v, this.y + v, this.z + v);
	}

	// вычесть вектор или скаляр
	subtract(v) {
		if (v instanceof Vector3) return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
		else return new Vector3(this.x - v, this.y - v, this.z - v);
	};

	// умножить на вектор или скаляр
	multiply(v) {
		if (v instanceof Vector3) return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
		else return new Vector3(this.x * v, this.y * v, this.z * v);
	};

	// разделить на вектор или скаляр
	divide(v) {
		if (v instanceof Vector3) return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z);
		else return new Vector3(this.x / v, this.y / v, this.z / v);
	};

	// длинна вектора
	length() {
		return Math.hypot(this.x, this.y, this.z);
	};
	// нормализация вектора (длина вектора становится равна 1)	
	normalize() {
		return this.divide(this.length())
	};

	// скалярное перемножение векторов	
	dot(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	};

	cross(v) {
		return new Vector3(
			this.y * v.z - this.z * v.y,
			this.z * v.x - this.x * v.z,
			this.x * v.y - this.y * v.x,
		)
	}

	// получить нормаль к вектору
	normal() {
		return new Vector3(-this.y, this.x, this.z);
	};
}


export class Vector2 {
	constructor(x, y, type) {
		this.init(x, y, type);
	}

	// переинициализировать вектор
	init(x, y, type) {
		if (type === 'rad') {
			this.angle = x;
			this.dist = y;
			this.x = this.dist * Math.cos(this.angle);
			this.y = this.dist * Math.sin(this.angle);
		} else if (type === 'grad') {
			this.angle = x * Math.PI / 180;
			this.dist = y;
			this.x = this.dist * Math.cos(this.angle);
			this.y = this.dist * Math.sin(this.angle);
		} else {
			this.x = x ?? 0;
			this.y = y ?? 0;
			const angle = this.toAngle();
			this.angle = isNaN(angle) ? (this.angle || 0) : angle;
			this.dist = this.length();
		}
		return this;
	};


	rotate(deltaAngle) {
		this.angle += deltaAngle * Math.PI / 180;
		this.x = this.dist * Math.cos(this.angle);
		this.y = this.dist * Math.sin(this.angle);
	}
	rotateRad(deltaAngle) {
		this.angle += deltaAngle;
		this.x = this.dist * Math.cos(this.angle);
		this.y = this.dist * Math.sin(this.angle);
	}

	// инвертировать вектор
	negative() {
		return new Vector2(-this.x, -this.y);
	};

	// сложить с вектором или скаляром
	add(v) {
		if (v instanceof Vector2) return new Vector2(this.x + v.x, this.y + v.y);
		else return new Vector2(this.x + v, this.y + v);
	};

	// вычесть вектор или скаляр
	subtract(v) {
		if (v instanceof Vector2) return new Vector2(this.x - v.x, this.y - v.y);
		else return new Vector2(this.x - v, this.y - v);
	};

	// умножить на вектор или скаляр
	multiply(v) {
		if (v instanceof Vector2) return new Vector2(this.x * v.x, this.y * v.y);
		else return new Vector2(this.x * v, this.y * v);
	};

	// разделить на вектор или скаляр
	divide(v) {
		if (v instanceof Vector2) return new Vector2(this.x / v.x, this.y / v.y);
		else return new Vector2(this.x / v, this.y / v);
	};

	// сравнить с вектором
	equals(v) {
		return this.x == v.x && this.y == v.y;
	};

	// скалярное перемножение векторов	
	dot(v) {
		return this.x * v.x + this.y * v.y;
	};

	// ???
	cross(v) {
		return new Vector2(
			this.y * v.x - this.x * v.y,
			this.x * v.y - this.y * v.x
		);
	};

	// длинна вектора
	length() {
		return Math.hypot(this.x, this.y);
	};

	// нормализация вектора
	unit() {
		return this.divide(this.length());
	};
	normalize() {
		return this.divide(this.length()||0.00000000001)
	};

	min() {
		return Math.min(this.x, this.y);
	};

	max() {
		return Math.max(this.x, this.y);
	};

	// получение угла между вектором и осью X
	toAngle() {
		// return Math.asin(this.y / this.length());
		return Math.atan2(this.y, this.x);
	};

	// получение угла между двумя вектороми
	angleTo(v) {
		return Math.acos(this.dot(v) / (this.length() * v.length()));
	};

	// создать массив из вектора
	toArray(n) {
		return [this.x, this.y].slice(0, n || 3);
	};

	// слонировать вектор
	clone() {
		return new Vector2(this.x, this.y);
	};

	// получить нормаль к вектору
	normal() {
		return new Vector2(-this.y, this.x);
	};

	// получить объект Point
	toLocate() {
		return {
			x: this.x,
			y: this.y
		}
	}
	// Vector2.fromAngle = function(angle) {
	// 	return new Vector2(Math.cos(angle), Math.sin(angle));
	// };
	// Vector2.randomDirection = function() {
	// 	return Vector2.fromAngle(Math.random() * Math.PI * 2);
	// };
	// Vector2.min = function(a, b) {
	// 	return new Vector2(Math.min(a.x, b.x), Math.min(a.y, b.y));
	// };
	// Vector2.max = function(a, b) {
	// 	return new Vector2(Math.max(a.x, b.x), Math.max(a.y, b.y));
	// };
	// Vector2.lerp = function(a, b, fraction) {
	// 	return b.subtract(a).multiply(fraction).add(a);
	// };
	// Vector2.fromArray = function(a) {
	// 	return new Vector2(a[0], a[1]);
	// };
	// Vector2.angleBetween = function(a, b) {
	// 	return a.angleTo(b);
	// };	


};




