/**
 * Copyright (c) 2017 Netflix, Inc.  All rights reserved.
 */

(function(require, module) {
    "use strict";
    
    const WebCryptoAlgorithm = require('../../../../../core/src/main/javascript/crypto/WebCryptoAlgorithm.js');
    
    /** JSON Web Key algorithms. */
    var JsonWebKeyAlgorithm = module.exports = {
        /** HMAC-SHA256 */
        HS256: "HS256",
        /** RSA PKCS#1 v1.5 */
        RSA_15: "RSA1_5",
        /** RSA OAEP */
        RSA_OAEP: "RSA-OAEP",
        /** AES-128 Key Wrap */
        A128KW: "A128KW",
        /** AES-128 CBC */
        A128CBC: "A128CBC",
    };
    
    /**
     * <p>Return the JSON Web Key algorithm corresponding to the provided Web
     * Crypto algorithm.</p>
     * 
     * @param {WebCryptoAlgorithm} wcAlgo Web Crypto algorithm.
     * @param {?NodeCryptoKey} nCryptoKey Web Crypto compatible crypto key.
     * @return {JsonWebKeyAlgorithm} the JSON Web Key algorithm corresponding
     *         to the provided Web Crypto Algorithm or {@code null} if there is
     *         none.
     */
    var JsonWebKeyAlgorithm$fromWebCryptoAlgorithm = function JsonWebKeyAlgorithm$fromWebCryptoAlgorithm(wcAlgo, nCryptoKey) {
        // We must compare by name because Web Crypto algorithm objects are not
        // strictly defined.
        switch (wcAlgo['name']) {
            case WebCryptoAlgorithm.HMAC_SHA256['name']:
                if (wcAlgo['hash'] && wcAlgo['hash']['name'] == WebCryptoAlgorithm.HMAC_SHA256['hash']['name'])
                    return JsonWebKeyAlgorithm.HS256;
                return null;
            case WebCryptoAlgorithm.RSASSA['name']:
                return JsonWebKeyAlgorithm.RSA_15;
            case WebCryptoAlgorithm.RSA_OAEP['name']:
                return JsonWebKeyAlgorithm.RSA_OAEP;
            case WebCryptoAlgorithm.A128KW['name']:
                var rawkey = nCryptoKey.rawkey;
                if (rawkey.length == 128/8)
                    return JsonWebKeyAlgorithm.A128KW;
                return null;
            case WebCryptoAlgorithm.AES_CBC['name']:
                var rawkey = nCryptoKey.rawkey;
                if (rawkey.length == 128/8)
                    return JsonWebKeyAlgorithm.A128CBC;
                return null;
            default:
                return null;
        }
    };
    
    /**
     * <p>Return the Web Crypto algorithm corresponding to the provided JSON
     * Web Key algorithm.</p>
     * 
     * @param {JsonWebKeyAlgorithm} jwkAlgo JSON Web Key algorithm.
     * @return {WebCryptoAlgorithm} the Web Crypto Algorithm corresponding to
     *         the provided JSON Web Key algorithm or {@code null} if there is
     *         none.
     */
    var JsonWebKeyAlgorithm$toWebCryptoAlgorithm = function JsonWebKeyAlgorithm$toWebCryptoAlgorithm(jwkAlgo) {
        switch (jwkAlgo) {
            case JsonWebKeyAlgorithm.HS256:
                return WebCryptoAlgorithm.HMAC_SHA256;
            case JsonWebKeyAlgorithm.RSA_15:
                return WebCryptoAlgorithm.RSAES;
            case JsonWebKeyAlgorithm.RSA_OAEP:
                return WebCryptoAlgorithm.RSA_OAEP;
            case JsonWebKeyAlgorithm.A128KW:
                return WebCryptoAlgorithm.A128KW;
            case JsonWebKeyAlgorithm.A128CBC:
                return WebCryptoAlgorithm.AES_CBC;
            default:
                return null;
        }
    };
    
    // Exports.
    Object.defineProperties(JsonWebKeyAlgorithm, {
        fromWebCryptoAlgorithm: { value: JsonWebKeyAlgorithm$fromWebCryptoAlgorithm, writable: false, enumerable: false, configurable: false },
        toWebCryptoAlgorithm: { value: JsonWebKeyAlgorithm$toWebCryptoAlgorithm, writable: false, enumerable: false, configurable: false },
    });
})(require, (typeof module !== 'undefined') ? module : mkmodule('JsonWebKeyAlgorithm'));