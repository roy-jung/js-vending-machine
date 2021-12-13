import { CoinValues, ErrorMsgs } from '../constants.js';
const singleCoinCalculator = (source, coin) => {
    const count = Math.floor(source / coin);
    const remains = source - count * coin;
    return { count, remains };
};
const chargeCalculator = (source) => {
    const res = [source];
    const finalRemains = [...CoinValues]
        .sort(() => Math.random() - 0.5)
        .reduce((prevSource, c) => {
        const { count, remains } = singleCoinCalculator(prevSource, c);
        res[CoinValues.indexOf(c) + 1] = count;
        return remains;
    }, source);
    if (finalRemains > 0)
        throw Error(ErrorMsgs.machine_CalculateError);
    return res;
};
export { chargeCalculator };
//# sourceMappingURL=coinCalculator.js.map