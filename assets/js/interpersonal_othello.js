'use strict';

var game_status = 'Ready';
var now_player = 'Black';
var doc = {
    'Black': 'white_stone',
    'White': 'black_stone'
};
var change_doc = {
    'Black': 'black_stone',
    'White': 'white_stone'
};
var change_player = {
    'Black': 'White',
    'White': 'Black'
}

// 初期設定
function StartUp(){
    document.getElementById('4_4').className = 'white_stone';
    document.getElementById('4_5').className = 'black_stone';
    document.getElementById('5_4').className = 'black_stone';
    document.getElementById('5_5').className = 'white_stone';
    var start_button = document.getElementById('start_button');
    start_button.style.display = 'None';
    SetTurnInfo(now_player);
    game_status = 'Start';
    var ret = CountStones();
    DisplayCanSet(now_player);
};

function SetTurnInfo(player) {
    document.getElementById('turn_info').innerHTML = player + ' のターンです';
}

function SetStone(player, x_y) {
    // 石を置く
    if (player == 'Black') {
        var set_stone = 'black_stone';
    } else if (player == 'White') {
        var set_stone = 'white_stone';
    }
    document.getElementById(x_y).className = set_stone;
    // 石をひっくり返す
    // 上方向
    ChangeStones(player, x_y, -1, 0);
    // 右上方向
    ChangeStones(player, x_y, -1, 1);
    // 右方向
    ChangeStones(player, x_y, 0, 1);
    // 右下方向
    ChangeStones(player, x_y, 1, 1);
    // 下方向
    ChangeStones(player, x_y, 1, 0);
    // 左下方向
    ChangeStones(player, x_y, 1, -1);
    // 左方向
    ChangeStones(player, x_y, 0, -1);
    // 左上方向
    ChangeStones(player, x_y, -1, -1);
}

function ChangeStones(player, x_y, tate, yoko) {
    var r = x_y.split('_');
    var x = Number(r[0]) + tate;
    var y = Number(r[1]) + yoko;
    var change_list = [];
    while ( document.getElementById(String(x) + '_' + String(y)).className === doc[player] ) {
        change_list.push(String(x) + '_' + String(y));
        x += tate;
        y += yoko;
    }
    if (document.getElementById(String(x) + '_' + String(y)).className === change_doc[player]) {
        for (let i = 0; i < change_list.length; i++) {
            document.getElementById(change_list[i]).className = change_doc[player];
        }
    }
}

function DisplayCanSet(player) {
    var can_set_list = [];
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var s_info = document.getElementById(String(i) + '_' + String(j));
            if (s_info.className === doc[player]) {
                // 上方向
                var set_x_y = CheckCanSet(player, i, j, -1, 0)
                if (set_x_y !== '') {
                    can_set_list.push(set_x_y);
                }
                // 右上方向
                var set_x_y = CheckCanSet(player, i, j, -1, 1)
                if (set_x_y !== '') {
                    can_set_list.push(set_x_y);
                }
                // 右方向
                var set_x_y = CheckCanSet(player, i, j, 0, 1)
                if (set_x_y !== '') {
                    can_set_list.push(set_x_y);
                }
                // 右下方向
                var set_x_y = CheckCanSet(player, i, j, 1, 1)
                if (set_x_y !== '') {
                    can_set_list.push(set_x_y);
                }
                // 下方向
                var set_x_y = CheckCanSet(player, i, j, 1, 0)
                if (set_x_y !== '') {
                    can_set_list.push(set_x_y);
                }
                // 左下方向
                var set_x_y = CheckCanSet(player, i, j, 1, -1)
                if (set_x_y !== '') {
                    can_set_list.push(set_x_y);
                }
                // 左下方向
                var set_x_y = CheckCanSet(player, i, j, 0, -1)
                if (set_x_y !== '') {
                    can_set_list.push(set_x_y);
                }
                // 左上方向
                var set_x_y = CheckCanSet(player, i, j, -1, -1)
                if (set_x_y !== '') {
                    can_set_list.push(set_x_y);
                }
            }
        }
    }
    for (var csl of can_set_list) {
        if (document.getElementById(csl).className === 'no_stone') {
            document.getElementById(csl).className = 'can_set_stone';
        }
    }
}

function CheckCanSet(player, now_x, now_y, tate, yoko) {
    var set_x = now_x + tate;
    var set_y = now_y + yoko;
    var x_y = '';
    if (document.getElementById(String(set_x) + '_' + String(set_y).className !== 'no_stone')) {
        return x_y;
    }
    var x = now_x - tate;
    var y = now_y - yoko;
    while ( document.getElementById(String(x) + '_' + String(y)).className === doc[player] ) {
        x -= tate;
        y -= yoko;
    }
    if ( document.getElementById(String(x) + '_' + String(y)).className === change_doc[player] ) {
        x_y = String(set_x) + '_' + String(set_y);
    }
    return x_y;
}

function ResetCanSet() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var s_info = document.getElementById(String(i) + '_' + String(j));
            if ( s_info.className === 'can_set_stone' ) {
                s_info.className = 'no_stone';
            }
        }
    }
}

function CountStones() {
    var black_score = 0;
    var white_score = 0;
    var no_score = 0;
    var can_set_score = 0;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var s_info = document.getElementById(String(i) + '_' + String(j));
            if ( s_info.className === 'black_stone' ) {
                black_score += 1;
            } else if ( s_info.className === 'white_stone' ) {
                white_score += 1;
            } else if ( s_info.className === 'no_stone' ) {
                no_score += 1;
            } else if ( s_info.className === 'can_set_stone' ) {
                can_set_score += 1;
            }
        }
    }
    var score_info = document.getElementById('score_info');
    if (black_score === 0) {
        alert(String(white_score) + ' - ' + String(black_score) + ' で白の勝ちです！');
        location.reload();
    } else if (white_score === 0) {
        alert(String(black_score) + ' - ' + String(white_score) + ' で黒の勝ちです！');
        location.reload();
    } else if (no_score === 0) {
        if (black_score > white_score){
            alert(String(black_score) + ' - ' + String(white_score) + ' で黒の勝ちです！');
            location.reload();
        } else if (white_score > black_score){
            alert(String(white_score) + ' - ' + String(black_score) + ' で白の勝ちです！');
            location.reload();
        } else {
            alert('引き分けです')
            location.reload();
        }
    } else {
        score_info.innerHTML = '（黒）' + String(black_score) + ' - ' + String(white_score) + '（白）';
    }
    return [black_score, white_score, no_score, can_set_score];
}

window.onclick = function(e) {
    if (game_status !== 'Ready') {
        if ((e.path.length === 10 || e.path.length === 13 ) && e.path[1]['className'] === 'can_set_stone') {
            ResetCanSet();
            var x_y = e.path[1]['id'];
            var error_message = document.getElementById('error_message');
            // 石を置ける場合
            error_message.innerHTML = '';
            SetStone(now_player, x_y);
            DisplayCanSet(change_player[now_player]);
            var ret = CountStones();
            ResetCanSet();
            // 置けるならプレーヤーを交代
            if (ret[3] !== 0) {
                if (now_player === 'Black') {
                    now_player = 'White';
                } else if (now_player === 'White') {
                    now_player = 'Black';
                }
            }
            SetTurnInfo(now_player);
            DisplayCanSet(now_player);
        }
    }
}
