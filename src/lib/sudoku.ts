export const board = Array(81).fill(0);
export const fixed = Array(81).fill(false);

export function init() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let rc = i / 3 | 0;
            let ind = i * 9 + j;
            let val = (i * 3 + j + rc) % 9 + 1;
            board[ind] = val;
        }
    }
    for (let i = 0; i < 9; i += 3) shuffle(i, i + 3, swapBRows)
    for (let i = 0; i < 9; i += 3) shuffle(i, i + 3, swapBCols)
    shuffle(0, 3, swapBRowChunks)
    shuffle(0, 3, swapBColChunks)
    substituteBRandomly()
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let ind = i * 9 + j;
            fixed[ind] = getPosInfo(ind).aid == 7
        }
    }
}


function sparsen(n: number) {
    let order = randPerm(81);
    function backtrack(order: number[], i: number) {
        if (i == n) return;
        let ind = order[i];

    }
}


function checkSolvable() {
    let colU = Array(9).fill(0).map(() => new Set<number>());
    let rowU = Array(9).fill(0).map(() => new Set<number>());
    let aidU = Array(9).fill(0).map(() => new Set<number>());
    for (let i = 0; i < 81; i++) {
        let val = board[i]
        let { x, y, aid } = getPosInfo(i);
        if (val != 0) {
            aidU[aid].add(val);
            colU[x].add(val);
            rowU[y].add(val);
        }
    }
    function backtrack(i: number) {
        let val = board[i]
        let { x, y, aid } = getPosInfo(i);

    }
}


function getPosInfo(i: number) {
    let x = i % 9
    let y = (i / 9) | 0
    let cc = (x / 3) | 0
    let rc = (y / 3) | 0
    return { x, y, aid: rc * 3 + cc };
}

function swap<T>(arr: T[], i: number, j: number) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}
function swapB(i: number, j: number) {
    swap(board, i, j);
}
function swapBRows(r1: number, r2: number) {
    for (let i = 0; i < 9; i++) swapB(9 * r1 + i, 9 * r2 + i)
}
function swapBCols(c1: number, c2: number) {
    for (let i = 0; i < 9; i++) swapB(9 * i + c1, 9 * i + c2)
}
function swapBRowChunks(rc1: number, rc2: number) {
    let root1 = rc1 * 27;
    let root2 = rc2 * 27;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 3; j++) {
            let offset = 9 * j + i;
            swapB(root1 + offset, root2 + offset)
        }
    }
}
function swapBColChunks(cc1: number, cc2: number) {
    let root1 = cc1 * 3;
    let root2 = cc2 * 3;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 3; j++) {
            let offset = 9 * i + j;
            swapB(root1 + offset, root2 + offset)
        }
    }
}

function substituteBRandomly() {
    let map = randPerm(9);
    for (let i = 0; i < 81; i++) {
        board[i] = map[board[i] - 1] + 1;
    }
}

function randPerm(n: number): number[] {
    let arr = Array(n).fill(0);
    for (let i = 0; i < n; i++) arr[i] = i;
    shuffle(0, n, (i, j) => swap(arr, i, j))
    return arr;
}
function shuffle(l: number, r: number, swapEls: (i: number, j: number) => any) {
    let n = r - l;
    for (let i = n - 1; i > 0; i--) {
        let j = (Math.random() * (i + 1)) | 0;
        swapEls(l + i, l + j);
    }
}