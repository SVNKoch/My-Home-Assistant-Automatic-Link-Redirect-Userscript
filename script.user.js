// ==UserScript==
// @name         Automatic Redirect on My Home Assistant Links to Local Instance
// @description  Automatically follows the link to your local instance. If you go back in history, it will not re-redirect again.
// @version      1.0.0
// @grant        none
// @match        https://my.home-assistant.io/redirect/*
// @exclude      https://my.home-assistant.io/redirect/_change/*
// @namespace    https://github.com/SVNKoch
// @author       SVNKoch
// @homepageURL  https://github.com/SVNKoch/my-home-assistant-automatic-link-redirect-userscript
// @supportURL   https://github.com/SVNKoch/my-home-assistant-automatic-link-redirect-userscript/issues
// @license      MIT
// ==/UserScript==

waitForLinkElementToLoad(function() {
	if (!isBackNavigation()) {
        redirectToHomeAssistantInstance();
    }
});

function waitForLinkElementToLoad(callback) {
    const targetElement = document.querySelector('a.open-link');
    if (targetElement) {
        callback(targetElement);
    } else {
        const observer = new MutationObserver(function(mutationsList, observer) {
            const targetElement = document.querySelector('a.open-link');
            if (targetElement) {
                observer.disconnect();
                callback(targetElement);
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }
}

function redirectToHomeAssistantInstance() {
    const openLink = document.querySelector('a.open-link');
	if (openLink) {
		window.location.href = openLink.href;
	}
}

function isBackNavigation() {
    const navigationEntries = window.performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
        const navType = navigationEntries[0].type;
        return navType === 'back_forward';
    }
    return false;
}
