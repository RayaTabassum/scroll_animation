//jshint esversion: 6 
function scrollTrigger(selector, options = {}) {
    let els = document.querySelectorAll(selector);
    els = Array.from(els);
    els.forEach(el => {
        addObserver(el, options);
    });
}

function addObserver(el, options) {
    if (!('IntersectionObserver' in window)) {
        if (options.cb) {
            options.cb(el);
        } else {
            entry.target.classList.add('active');
        }
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (options.cb) {
                    options.cb(el);
                } else {
                    entry.target.classList.add('active');
                }
                observer.unobserve(entry.target);
            }
        });
    } ,options);
    observer.observe(el);
}

scrollTrigger('.intro-text', {rootMargin: '100px'});
scrollTrigger('.scroll-reveal', {
    rootMargin: '10px',
});
scrollTrigger('.loader', {
    rootMargin: '-200px',
    cb: function (el) {
        el.innerText = 'Guess what happens next...';
        setTimeout(() => {
            el.innerText = 'You guessed right!';
        }, 2000);
    }
});
