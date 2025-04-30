clear();

(function() {
  const originalVisibilityState = Object.getOwnPropertyDescriptor(document, 'visibilityState');
  const originalVisibilityChange = document.visibilitychange;

  Object.defineProperty(document, 'hidden', {
    get: function() {
      return false; // Always return false, indicating the page is not hidden
    }
  });

  Object.defineProperty(document, 'visibilityState', {
    get: function() {
      return 'visible'; // Always return 'visible', simulating the page is in focus
    }
  });

  document.addEventListener('visibilitychange', function(event) {
    event.stopImmediatePropagation();
  });

  const originalPageVisibility = {
    hidden: document.hidden,
    visibilityState: document.visibilityState,
  };

  const visibilityHandler = function() {
    document.hidden = false;
    document.visibilityState = 'visible';
  };

  setInterval(visibilityHandler, 500);

  window.addEventListener('blur', function(event) {
    event.preventDefault(); // Prevent the blur event
    event.stopImmediatePropagation();
    visibilityHandler(); // Ensure the page remains in the active state
  });

  window.addEventListener('focus', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  });

  document.addEventListener('visibilitychange', function(event) {
    visibilityHandler();
  });

  console.log('Always Active Window Extension Simulated');
})();

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

var checkAndMove = setInterval(() => {
    const currentLength = checkSvgLength();
    console.log("Current Length=" + currentLength + " | Previous Length="+previousLength);

    if (currentLength !== previousLength) {
        console.log('SVG elements length changed:', currentLength);
        clickNextButton();
        console.log('Clicked Next!');
        previousLength = currentLength;
        setTimeout(function(){ console.log("Waiting to Click Play") }, 10000);

        playVideo();
                
    }
}, 1000);

function playVideo() {
    const playButton = document.querySelector('button.w-big-play-button');
    if (playButton) {
      playButton.style.pointerEvents = 'auto';
      playButton.style.width = '1px';
      playButton.style.height = '1px';
      playButton.click();
      setTimeout(() => {
        playButton.style.pointerEvents = 'none';
        playButton.style.width = '0px';
        playButton.style.height = '0px';
      }, 100);
    } else {
      console.error('Play Video button not found');
    }

    const settingsButton = document.querySelector('button[aria-label="Show settings menu"]');
    if (settingsButton) {
      settingsButton.style.pointerEvents = 'auto';
      settingsButton.style.width = '1px';
      settingsButton.style.height = '1px';
      settingsButton.click();
      setTimeout(() => {
        settingsButton.style.pointerEvents = 'none';
        settingsButton.style.width = '0px';
        settingsButton.style.height = '0px';
      }, 100);
    } else {
      console.error('Settings button not found');
    }
    
    const speedButton = document.querySelector('button[data-handle="playbackRate"]');
    if (speedButton) {
      speedButton.style.pointerEvents = 'auto';
      speedButton.style.width = '1px';
      speedButton.style.height = '1px';
      speedButton.click();
      setTimeout(() => {
        speedButton.style.pointerEvents = 'none';
        speedButton.style.width = '0px';
        speedButton.style.height = '0px';
      }, 100);
    } else {
      console.error('Speed button not found');
    }
    
    const speed2xInput = document.querySelector('input[type="radio"][name="Speed"][value="2x"]');
    if (speed2xInput) {
      speed2xInput.checked = true;
      speed2xInput.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      console.error('2x speed input not found');
    }
}

