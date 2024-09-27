clear();

function clickNextButton() {
    const buttons = Array.from(document.querySelectorAll('button[role="tab"]'));
    const selectedButton = buttons.find(button => button.getAttribute('aria-selected') === 'true');

    if (selectedButton) {
        const currentIndex = buttons.indexOf(selectedButton);
        const nextIndex = (currentIndex + 1) % buttons.length;

        const nextButton = buttons[nextIndex];
        if (nextButton && nextButton.getAttribute('aria-selected') !== 'true') {
            nextButton.click();
            nextButton.setAttribute('aria-selected', 'true'); 
            selectedButton.setAttribute('aria-selected', 'false');
            console.log('Clicked next button:', nextButton.innerText);
        }
    }
}

function checkSvgLength() {
    const svgElements = document.querySelectorAll('svg[data-test-id="video_watched"]');
    return svgElements.length;
}

let previousLength = checkSvgLength();

(function() {
    const docProxy = new Proxy(document, {
        get: function(target, prop) {
            if (prop === 'visibilityState') {
                return 'visible';
            }
            if (prop === 'hidden') {
                return false;
            }
            return target[prop];
        }
    });

    window.document = docProxy;

    document.addEventListener('visibilitychange', function(event) {
        event.stopImmediatePropagation();
    }, true);
})();

const playButton = document.getElementsByClassName('w-big-play-button w-css-reset-button-important w-vulcan-v2-button')[0];

setInterval(() => {
    const currentLength = checkSvgLength();
    console.log("current length" + currentLength);

    if (currentLength !== previousLength) {
        console.log('SVG elements length changed:', currentLength);
        clickNextButton();
        playButton.click();
        console.log("prev length" + previousLength);
        previousLength = currentLength;
    }
}, 1000);


