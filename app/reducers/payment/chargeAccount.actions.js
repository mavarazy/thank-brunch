import authService from "service/auth";
import {loadStripe} from 'conf/loadScript';
import {dispatchPromise} from 'service/promiseStates';

export const CHARGE_ACCOUNT_GET = "CHARGE_ACCOUNT_GET";
export const CHARGE_ACCOUNT_SET = "CHARGE_ACCOUNT_SET";

function processToken(token) {
    return (dispatch) => {
        let req = new Request(
            "/api/v1/payment/charge/my/account",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(token.id)
            });
        let p = authService.signAndFetch(req, dispatch);
        dispatchPromise(p, CHARGE_ACCOUNT_SET, dispatch);
    }
}

export function getChargeAccount() {
    return (dispatch) => {
        let req = new Request(
            "/api/v1/payment/charge/my/account",
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        let p = authService.signAndFetch(req, dispatch);
        dispatchPromise(p, CHARGE_ACCOUNT_GET, dispatch);
    }
}

export function connectChargeAccount() {
    return (dispatch) => {
        loadStripe(() => {
            StripeButton.open({
                key: 'pk_test_l8X6IIKp6dumjWWwqsuowf5p',
                locale: 'auto',
                token: (token) => dispatch(processToken(token))
            });
        });
    }
}