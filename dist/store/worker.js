import { StateKey, InitialState, CoinKeys, ErrorMsgs, } from '../constants.js';
import errorHandler from '../util/errorHandler.js';
import localStorageReducer from './localStorageReducer.js';
import { Actions } from './actions.js';
import { chargeCalculator } from '../service/coinCalculator.js';
const worker = {
    [Actions.init]: store => {
        const storedState = (localStorageReducer.getAll() || {});
        store.setValue({ ...InitialState, ...storedState }, false);
    },
    [Actions.route_change]: (store, { route }) => {
        store.setValue({ route });
    },
    [Actions.inventory_addProduct]: (store, newProduct) => {
        if (!validationChecker[Actions.inventory_addProduct](newProduct))
            return;
        const inventoryMap = new Map((store.get(StateKey.inventory) || []).map(inventory => [inventory.name, inventory]));
        inventoryMap.set(newProduct.name, newProduct);
        const inventory = [...inventoryMap.values()];
        store.setValue({ inventory });
    },
    [Actions.machine_addSaving]: (store, { money }) => {
        const saving = { ...store.get(StateKey.saving) };
        const res = chargeCalculator(money);
        CoinKeys.forEach((key, i) => {
            saving[key] += res[i];
        });
        store.setValue({ saving });
    },
};
const validationChecker = {
    [Actions.inventory_addProduct]: ({ name, amount, price }) => {
        let errorMsg;
        if (name.match(/\s/))
            errorMsg = ErrorMsgs.inventory_spaceBetween;
        if (price < 100)
            errorMsg = ErrorMsgs.inventory_PriceMinimum;
        if (price % 10 > 0)
            errorMsg = ErrorMsgs.inventory_PriceLimit;
        if (amount <= 0)
            errorMsg = ErrorMsgs.inventory_AmountMinimum;
        if (!errorMsg)
            return true;
        throw Error(errorMsg);
    },
};
const workerWithErrorCatcher = (dispatcher, actionType) => (store, data) => {
    try {
        dispatcher(store, data);
    }
    catch (err) {
        errorHandler(`worker@${actionType}`, err);
    }
};
export default (actionType) => {
    const workerItem = worker[actionType];
    if (!workerItem)
        return () => { };
    return workerWithErrorCatcher(workerItem, actionType);
};
//# sourceMappingURL=worker.js.map