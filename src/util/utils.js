//格式化时间（根据对象）
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

//格式化时间（根据time）
export function formatTime(time, fmt) {
    if (time) {
        return formatDate(new Date(time), fmt)
    } else {
        return ""
    }
}

export function parseTime(time, string) {
    if (string) {
        return formatTime(time, string)
    } else {
        return formatTime(time, 'yyyy-MM-dd hh:mm:ss')
    }
}


//计算耗时（精度： h,m,s)
export function autoTime(millisecond, accuracy) {
    let fmt = "";
    let s = 1000,
        mi = 1000 * 60,
        h = 1000 * 60 * 60,
        d = 1000 * 60 * 60 * 24
    let t = {
        d: parseInt(millisecond / d), //得到天
        h: parseInt(millisecond % d / h), //得到小时
        mi: parseInt(millisecond % h / mi), //得到分钟
        s: parseInt(millisecond % mi / s), //得到秒
        mis: millisecond % s //得到毫秒
    }
    let acc = { d: '天', h: '小时', mi: '分', s: '秒', mis: '毫秒' }
    for (let key in t) {
        if (t[key]) {
            fmt += t[key] + acc[key]
        }
        if (accuracy == key) {
            if (fmt == "") {
                fmt = 1 + acc[accuracy]
            }
            break;
        }
    }
    return fmt
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

//剔除元素本身
export function removeSelf(tree, id) {
    tree.some(node => {
        if (node.id === id) {
            tree.splice(_.indexOf(tree, node), 1)
            return true;
        } else if (node.children && node.children.length > 0) {
            removeSelf(node.children, id);
        }
    })
}


export function arrayClearSame(colection, fields = []) {
    if (!fields.length) {
        for (let i = 0; i < colection.length; i++) {
            let one = colection[i]
            for (let j = colection.length - 1; j > i; j--) {
                let two = colection[j]
                if (_.isEqual(one, two)) {
                    colection.splice(j, 1)
                }
            }
        }
    } else {
        for (let i = 0; i < colection.length; i++) {
            let one = colection[i]
                // console.log('one',one)
            for (let j = colection.length - 1; j > i; j--) {
                let flag = 0;
                let two = colection[j]
                    // console.log('two',two)
                for (let k = 0; k < fields.length; k++) {
                    // console.log('one',one[fields[k]])
                    // console.log('two',two[fields[k]])
                    if (typeof(one[fields[k]]) === "object" && typeof(two[fields[k]]) === "object") {
                        if (_.isEqual(one[fields[k]], two[fields[k]])) {
                            flag++;
                        }
                    } else if (one[fields[k]] === two[fields[k]]) {
                        flag++;
                    }
                }
                // console.log(flag)
                if (flag === fields.length) {
                    colection.splice(j, 1)
                }
            }
        }
    }
}

//线程等待
export function sleep(time) {
    function resolve() {

    }
    return new Promise((resolve) => setTimeout(resolve, time));
}