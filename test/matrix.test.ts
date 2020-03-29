import * as assert from 'assert';
import {mat2d, vec2} from 'gl-matrix';

function degreeToRadian(degree: number): number {
    return degree * Math.PI / 180;
}

function changeDirection(x: number, y: number, mvX: number, mvY: number) {
    const mat2 = mat2d.create();
    mat2d.rotate(mat2, mat2, Math.atan2(y,x));
    mat2d.multiply(mat2, mat2, mat2d.fromValues(-1, 0, 0, 1, 0, 0));
    mat2d.rotate(mat2, mat2, -Math.atan2(y, x));

    const result = vec2.transformMat2d(vec2.create(), [mvX, mvY], mat2);
    return result;
}

describe('matrix calculation', function () {
    describe('mat2d', function () {
        it('transformMat2d', function () {
            const mat2 = mat2d.create();

            const result = vec2.transformMat2d(vec2.create(), [10, 10], mat2);
            assert.deepStrictEqual(result, vec2.clone([10, 10]));
        });

        it('move', function () {
            const mat2 = mat2d.create();
            mat2d.translate(mat2, mat2, [10, 10]);
            const result = vec2.transformMat2d(vec2.create(), [10, 10], mat2);
            assert.deepStrictEqual(result, vec2.clone([20, 20]));

        });

        it('rotate', function () {
            const mat2 = mat2d.create();
            // mat2d.translate(mat2, mat2, [10, 10]);
            // console.log(Math.atan2(4,3) * 180 / Math.PI);
            mat2d.rotate(mat2, mat2, Math.atan2(1,1));
            const result = vec2.transformMat2d(vec2.create(), [1, 1], mat2);
            assert.deepStrictEqual(result, vec2.clone([ 0, Math.sqrt(2)]));
        });

        it('reflection', function () {
            const mat2 = mat2d.fromValues(-1, 0, 0, 1, 0, 0);

            const result = vec2.transformMat2d(vec2.create(), [3, 4], mat2);
            assert.deepStrictEqual(result, vec2.clone([ -3, 4]));
        });

        it('multiply', function () {
            const mat2 = mat2d.create();
            mat2d.rotate(mat2, mat2, Math.atan2(4,3));
            mat2d.multiply(mat2, mat2, mat2d.fromValues(-1, 0, 0, 1, 0, 0));
            mat2d.rotate(mat2, mat2, -Math.atan2(4,3));

            const result = vec2.transformMat2d(vec2.create(), [3, 4], mat2);
            assert.deepStrictEqual(result.map((v: number) => Math.round(v)), vec2.clone([ -3, -4]));
        });
    });

    describe('change Direction', function () {
        it.only('x > y > 0, mvX > 0,  mvY > 0', function () {
            const result = changeDirection(2, 1, 1, 1 );
            assert.deepStrictEqual(result, vec2.clone([ -1, -1]));
        });

        it('y > x > 0, mvX > mvY > 0', function () {
            const result = changeDirection(1, 2, 1, 1 );
            console.log(Math.atan2(result[1], result[0]) * 180 / Math.PI );

            // assert.deepStrictEqual(result.map((v: number) => Math.round(v)), vec2.clone([ -4, -3]));
        });

    });
});