const oauth = require("nativescript-oauth2");
const providers = require("nativescript-oauth2/providers");
import * as app from 'tns-core-modules/application';

var client = null;

function configureProviders() {
    oauth.configureTnsOAuth([
        //configureMicrosoft(),
        configureGoogle(),
        configureFacebook()
    ]);
}

function configureGoogle() {

    if (app.android) {
        var googleProviderOptions = {
            openIdSupport: "oid-full",
            clientId: "827628876469-4irgblh5h7esfa736v089pf2e2j5n2pp.apps.googleusercontent.com",
            redirectUri: "com.googleusercontent.apps.827628876469-4irgblh5h7esfa736v089pf2e2j5n2pp:/auth",
            urlScheme: "com.googleusercontent.apps.827628876469-4irgblh5h7esfa736v089pf2e2j5n2pp",
            scopes: ["email"]
        };
    }

    if (app.ios) {
        var googleProviderOptions = {
            openIdSupport: "oid-full",
            clientId: "827628876469-rlmguhic9pkulinv0jls1ctr6hg5sn1b.apps.googleusercontent.com",
            redirectUri: "com.googleusercontent.apps.827628876469-rlmguhic9pkulinv0jls1ctr6hg5sn1b:/auth",
            urlScheme: "com.googleusercontent.apps.827628876469-rlmguhic9pkulinv0jls1ctr6hg5sn1b",
            scopes: ["email"]
        };
    }

    return new providers.TnsOaProviderGoogle(googleProviderOptions);
}

function configureFacebook() {

    let facebookProviderOptions = {
        openIdSupport: "oid-none",
        clientId: "367149670558681",
        clientSecret: "00e84808247e43fa99333ef42939d7f3",
        redirectUri: "https://www.facebook.com/connect/login_success.html",
        scopes: ["email"]
    };

    return new providers.TnsOaProviderFacebook(facebookProviderOptions);
}

// function configureMicrosoft() {
//
//     let microsoftProviderOptions = {
//         openIdSupport: "oid-full",
//         clientId: "f376fa87-64a9-49a1-8b56-e0d48fc0810b",
//         // redirectUri: "urn:ietf:wg:oauth:2.0:oob",
//         redirectUri: "msalf376fa87-64a9-49a1-8b56-e0d48fc0810b://auth",
//         urlScheme: "msalf376fa87-64a9-49a1-8b56-e0d48fc0810b",
//         scopes: ["https://outlook.office.com/mail.read"]
//     };
//
//     return new providers.TnsOaProviderMicrosoft(microsoftProviderOptions);
// }


function login(providerType, callback) {

    client = new oauth.TnsOAuthClient(providerType);

    client.loginWithCompletion(function (tokenResult, error) {
        if (callback) return callback(error, tokenResult);
    });

}

function logout() {
    if (client) {
        client.logout();
    }
}

export default {
    configureProviders,
    login,
    logout
};
