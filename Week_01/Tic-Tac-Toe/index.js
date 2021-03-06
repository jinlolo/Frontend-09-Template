let pattern = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
]

let color = 1;

function show() {
    let board = document.getElementById("board");

    board.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.innerText =
                pattern[i * 3 + j] == 2 ? "❌" :
                    pattern[i * 3 + j] == 1 ? "⭕" : "";
            cell.addEventListener("click", () => userMove(j, i));
            board.appendChild(cell);
        }
        board.appendChild(document.createElement("br"));
    }
}

function userMove(x, y) {
    pattern[y * 3 + x] = color;
    if (check(pattern, color)) {
        alert(color == 2 ? "❌ is winner!" : "⭕ is winner!")
    }
    show();
    color = 3 - color;
    computerMove();
    console.log(bestChoice(pattern, color));
}

function computerMove() {
    let choice = bestChoice(pattern, color);
    if (choice.point) pattern[choice.point[1] * 3 + choice.point[0]] = color;
    if (check(pattern, color)) {
        alert(color == 2 ? "❌ is winner!" : "⭕ is winner!")
    }
    color = 3 - color;
    show();
}

function check(pattern, color) {
    for (let i = 0; i < 3; i++) {
        let win = true;
        for (let j = 0; j < 3; j++) {
            if (pattern[i * 3 + j] != color) win = false;
        }
        if (win) return true;
    }


    for (let j = 0; j < 3; j++) {
        let win = true;
        for (let i = 0; i < 3; i++) {
            if (pattern[i * 3 + j] != color) win = false;
        }
        if (win) return true;
    }

    {
        let win = true;
        for (let i = 0; i < 3; i++) {
            if (pattern[i * 2 + 2] != color) win = false;
        }
        if (win) return true;
    }

    {
        let win = true;
        for (let i = 0; i < 3; i++) {
            if (pattern[i * 4] != color) win = false;
        }
        if (win) return true;
    }
}

function clone(pattern) {
    return Object.create(pattern);
}

function willWin(pattern, color) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (pattern[i * 3 + j] !== 0) continue;
            let temp = clone(pattern);
            temp[i * 3 + j] = color;
            if (check(temp, color)) {
                // 对应 x,y
                return [j, i];
            }
        }
    }
    return null;
}

function bestChoice(pattern, color) {
    let p;
    if (p = willWin(pattern, color)) {
        return {
            point: p,
            result: 1
        }
    }

    let result = -2;
    let point = null;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (pattern[i * 3 + j]) continue;
            let temp = clone(pattern);
            temp[i * 3 + j] = color;
            let r = bestChoice(temp, 3 - color).result;
            if (-r >= result) {
                result = -r;
                point = [j, i];
            }
        }
    }
    return {
        point: point,
        result: point ? result : 0
    }

}
show(pattern);