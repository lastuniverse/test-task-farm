import { Vector2 } from './class.vector.js'

function calcInterpolatePoints(points, step = 0) {
	var list = [];
	if (points.length <= 2) return list;
	if (step <= 0) return list;

	points = [...points];
	const eps = 0.1;
	// const speed = 40;

	let startPoint = points[0];
	startPoint = new Vector2(startPoint.x, startPoint.y);
	let currentPoint = new Vector2(startPoint.x, startPoint.y);

	let endPoint = points[points.length - 1];
	endPoint = new Vector2(endPoint.x, endPoint.y);

	let vector = endPoint.subtract(startPoint);
	const length = vector.length();

	let dist = 0;
	let count = 0;




	for (let i = 0; i <= length; i += eps) {
		let positionPoint = vector.normalize().multiply(i).add(startPoint);

		const p = 3;

		let sw = 0;
		points.some(point => {
			const dy = point.y - positionPoint.y;
			const dx = point.x - positionPoint.x;
			const d = Math.abs(Math.pow(dx, p));
			if (d === 0) return true;
			const w = 1 / d;
			sw += w;
			return false;
		});


		let y = 0;
		points.some(point => {
			const dy = point.y - positionPoint.y;
			const dx = point.x - positionPoint.x;
			const d = Math.abs(Math.pow(dx, p));
			if (d == 0) {
				y = dy;
				return true;
			} else {
				const w = 1 / d;
				y += (w * dy) / sw
			}
			return false;
		});

		positionPoint.y += y;
		dist += positionPoint.subtract(currentPoint).length();
		currentPoint = positionPoint;

		if (dist >= step) {
			count++;
			dist = 0;
			list.push(new Phaser.Point(positionPoint.x, positionPoint.y));
		}
	}
	console.log('points', list.length, list[0])
	return list;
}

export default class PathInterpolate {
	constructor(x1 = 0, y1 = 0, x2 = 100, y2 = 100, points = [], step = 1) {
		this.sourcePoints = points;
		this.points = [];
		this.step = step || 1;
		this.startPoint = new Phaser.Point(x1, y1);
		this.endPoint = new Phaser.Point(x2, y2);
		// this.pathTransform = new Phaser.Matrix();
		this.targetPoints = this.transformPoints(points);
		this.targetPoints = this.transformPoints(this.targetPoints);
		this.formBezier(this.targetPoints, step)
	}
	transformPoints(points = []) {
		if (points.length < 2) return points;
		const tdx = this.endPoint.x - this.startPoint.x;
		const tdy = this.endPoint.y - this.startPoint.y;
		const tangle = Math.atan2(tdy, tdx);
		const tdist = Math.hypot(tdx, tdy);

		const p1 = points[0] ?? new Phaser.Point(0, 0)
		const p2 = points[points.length - 1] ?? new Phaser.Point(100, 100)

		const sdx = p2.x - p1.x;
		const sdy = p2.y - p1.y;
		const sangle = Math.atan2(sdy, sdx);
		const sdist = Math.hypot(sdx, sdy);

		const dangle = tangle - sangle;
		const dscale = tdist / sdist;
		points = points.map(point => {
			point = { ...point };
			point.x -= p1.x;
			point.y -= p1.y;
			const angle = Math.atan2(point.y, point.x) + dangle;
			const dist = Math.hypot(point.x, point.y) * dscale;
			point.x = Math.cos(angle) * dist + this.startPoint.x;
			point.y = Math.sin(angle) * dist + this.startPoint.y;
			return point;
		})
		points.unshift({
			...points[0],
			x: points[0].x-50
		});
		points.push({
			...points[points.length-1],
			x: points[points.length-1].x+50
		});
		return points;
	}
	formBezier(points, step) {
		if (points.length == 0)
			return;

		if (step <= 0)
			return;

		this.points = calcInterpolatePoints(points, step);

		let position = this.points[0];
		this.length = this.points.reduce((length, point) => {
			const dx = position.x - point.x;
			const dy = position.y - point.y;
			position = point;
			const dist = Math.hypot(dx, dy);
			return length + dist;
		}, 0);

		this.step = step;
	}
	getPosition(length) {
		if (length >= this.length) {
			length = length % this.length;
			// return { ...this.points[this.points.length - 1], direction: 0 };
		}

		let position = this.points[0];
		// const pointStop = this.points[this.points.length-1];
		this.points.every(point => {
			if (length <= 0) return false;

			const dx = point.x - position.x;
			const dy = point.y - position.y;
			const dist = Math.hypot(dx, dy);
			length -= dist;

			if (length > dist) {
				position = point;
				return true;
			} else {
				const scale = length / dist;
				position = {
					direction: Math.atan2(dy, dx),
					x: position.x + dx * scale,
					y: position.y + dy * scale,
				}
				return false;
			}
		});
		return position;
	}
}


