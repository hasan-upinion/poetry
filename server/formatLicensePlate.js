const MAX_LENGTH = 6;
const PLATES = [
    'xx99kxx',
    'xxx99x',
    '99xxx9',
    '999xx9',
    'x999xx',
    '9999xx',
    '9xxxxx',
    '9xxxx9',
];

function nextSameType(stack, arr, i) {
    return (
        Number.isInteger(Number(stack[stack.length - 1])) ===
        Number.isInteger(Number(arr[i + 1]))
    );
}
/**
 *
 * @param {String} plate the license plate to format.
 * @returns {String} the formatted license plate.
 */
const format = (plate) => {
    if (plate.length !== MAX_LENGTH) return;

    const plateArr = plate.split('');
    let stack = [];
    let result = '';
    let invalid = false;
    plateArr.forEach((p, i, arr) => {
        stack.push(p);
        const length = stack.length;
        const sameType = nextSameType(stack, arr, i);
        if (length > 4) {
            invalid = true;
            return;
        }

        if (!sameType && length < 4) {
            result += `${stack.join('')}${i + 1 === arr.length ? '' : '-'}`;
            stack = [];
        } else if (length === 4) {
            stack.splice(2, 0, '-');
            if (i + 1 !== MAX_LENGTH) {
                stack.push('-');
            }
            result += stack.join('');
            if(nextSameType(stack.concat(stack[length - 1]), arr, i)) {
                invalid = true;
            }
            stack = [];
        }
    });
    return invalid ? undefined : `${result}${stack.join('')}`;
};

for (const plate of PLATES) {
    console.log(format(plate));
}
