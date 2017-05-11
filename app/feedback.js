import {USER_SUCCESS} from "./reducers/user.actions";
import {LOGOUT} from "./reducers/auth.actions";

function updateOptions(options) {
    console.log("Updating options");
    window.doorbellOptions = options;
    if (window.doorbell !== undefined) {
        Object.keys(options).map((key) => {
            window.doorbell.setOption(key, options[key]);
        });
        window.doorbell.refresh();
    }
}

function anonymousFeedback() {
    updateOptions({
        hideEmail: false,
        email: "",
        name: ``,
        properties: {
            loggedIn: false,
        }
    });
}

function userFeedback(user) {
    if (user.id !== "my")
        return;
    updateOptions({
        hideEmail: true,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        properties: { // Optional, a Javascript object of custom properties you want to set
            loggedIn: true,
        }
    });
}

export default function stateListener(store) {
    anonymousFeedback();
    return () => {
        let lastAction = store.getState().lastAction;
        switch (lastAction.type) {
            case (USER_SUCCESS):
                userFeedback(lastAction.payload);
                break;
            case (LOGOUT):
                anonymousFeedback();
                break;
        }
    }
}