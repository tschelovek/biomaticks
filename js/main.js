document.addEventListener('DOMContentLoaded', () => {
    /**
     *
     * МОДАЛЬНОЕ ОКНО
     * buttons {NodeListOf<Element>} - собираем все кнопки с классом .callback_init
     * чтоб повесить хэндлер открытия модального окна
     *
     */
    const POST_FORM_URL = 'https://lk.gurdy.ru/rest/public/staff/notify';
    const SUCCESS_MESSAGE = 'Ваша заявка успешно отправлена';
    const ERROR_MESSAGE = 'При отправке произошли проблемы! Повторите попытку позже или свяжитесь с нами иными способами.';
    // const modal = document.getElementById('modal');

    // modal.querySelector('.modal__dialog').addEventListener('click', e => {
    //   if (e.target === e.currentTarget) handlerCloseModal()
    // });
    // modal.querySelector('.btn_close').addEventListener('click', () => handlerCloseModal());

    // document.querySelectorAll('.callback_init')
    //   .forEach(button => button.addEventListener('click', e => handlerOpenCallback(e.currentTarget)));

    // document.form_callback.addEventListener('submit', async (e) => {
    //     e.preventDefault();
    //
    //     const form = e.target;
    //     const messageContainer = form.querySelector('.callback__status');
    //
    //     messageContainer.textContent = '';
    //     messageContainer.style.color = 'inherit'
    //
    //     try {
    //         const myMessage = getStringFromInputs();
    //
    //         await postData(POST_FORM_URL, {message: myMessage})
    //             .then((res) => {
    //                 if (res.ok) {
    //                     messageContainer.textContent = SUCCESS_MESSAGE;
    //                     // очистка формы в случае успеха
    //                     form.reset();
    //                 } else {
    //                     messageContainer.textContent = ERROR_MESSAGE;
    //                     messageContainer.style.color = 'red'
    //                 }
    //             })
    //     } catch (err) {
    //         messageContainer.textContent = ERROR_MESSAGE;
    //         messageContainer.style.color = 'red'
    //         console.error(err);
    //     }
    // })

    // function handlerOpenCallback(eTarget) {
    //     modal.style.display = 'block';
    //     setTimeout(() => modal.classList.add('open'), 50);
    //
    //     modal.querySelector('.btn_submit').textContent = eTarget.textContent;
    //     modal.querySelector('.modal__title').textContent = eTarget.dataset.title;
    //     document.form_callback.elements.modalName.value = eTarget.textContent;
    //
    //     document.addEventListener(
    //         'keydown',
    //         e => {
    //             if (e.key === "Escape") handlerCloseModal()
    //         },
    //         {once: true}
    //     )
    // }

    // function handlerCloseModal() {
    //     modal.classList.remove('open');
    //     modal.querySelector('.modal__status').textContent = '';
    //     setTimeout(() => modal.style.display = 'none', 600);
    // }

    // async function postData(url = '', data = {}) {
    //     await fetch(url, {
    //         method: 'POST',
    //         mode: 'cors',
    //         credentials: 'same-origin',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .catch(() => {
    //             throw Error
    //         })
    // }

    // function getStringFromInputs() {
    //     const inputNameValue = document.getElementById('callback_name')?.value.trim();
    //     const inputEmailValue = document.getElementById('callback_email')?.value.trim();
    //     const inputPhoneValue = document.getElementById('callback_tel')?.value.trim();
    //
    //     return `${inputNameValue}, ${inputPhoneValue}, ${inputEmailValue}`
    // }

    /**
     *
     * Бургер меню
     *
     */

    const navMenu = document.querySelector('.header__right-block');
    const menuBtn = document.getElementById('burgerButton')

    menuBtn.addEventListener('click',  (e) => {
        e.preventDefault();
        e.currentTarget.classList.toggle('active');
        navMenu.classList.toggle('active');

        if (navMenu.classList.contains('active')) {
            setTimeout(() => document.addEventListener('click', outClickHandler), 10)
        } else {
            document.removeEventListener('click', outClickHandler)
        }
    })

    document.querySelectorAll('.nav_header .header__link')
        .forEach(link => link.addEventListener('click', () => closeMenu()))

    function outClickHandler(e) {
        if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMenu()
        }
    }

    function closeMenu() {
        menuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    }

    /**
     *
     * @type {Swiper} Инициализация слайдера
     */
    const swiper2 = new Swiper('#slider_benefits', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        loop: true,
        spaceBetween: 20,
        autoplay: {
            delay: 2000,
        },
        speed: 1000,
        breakpoints: {
            480: {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
        }
    })

    /**
     *
     * Анимация переворота карточек .systema__item
     */

    const animFlipParams = {
        options: {duration: 400, fill: "both", direction: 'normal'},
        keyframesIn: [
            {transform: 'rotateY(0deg)', easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)'},
            {transform: 'rotateY(180deg)', easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)'},
        ],
        keyframesOut: [
            {transform: 'rotateY(180deg)', easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)'},
            {transform: 'rotateY(360deg)', easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)'},
        ]
    }
    const systemaItems = document.querySelectorAll('.systema__item');

    systemaItems.forEach(item => item
        .addEventListener('click', () => {
            if (item.classList.contains('flip-vertical-left')) {
                item.classList.add('backflip-vertical-left');
                setTimeout(() => {
                    item.classList.remove('flip-vertical-left');
                    item.classList.remove('backflip-vertical-left');
                }, 450)
            } else {
                item.classList.add('flip-vertical-left');
            }
        })
    )
    /**
     * Масштабирование айфреймов по ширине обёртки
     */

    if (typeof ResizeObserver === 'function') {

        const FULL_IFRAME_WIDTH_RSCIENCE = 1105;
        const FULL_IFRAME_WIDTH_2HARD = 1156;
        const FULL_IFRAME_WIDTH_HIVE = 1620;
        const rocketScience = document.querySelector('.iframe__wrapper_rocketscience');
        const tooHard = document.querySelector('.iframe__wrapper_2hard');
        const hive = document.querySelector('.iframe__wrapper_hive');

        new ResizeObserver(() => fitIframeToWindow(rocketScience, FULL_IFRAME_WIDTH_RSCIENCE)).observe(rocketScience);
        new ResizeObserver(() => fitIframeToWindow(tooHard, FULL_IFRAME_WIDTH_2HARD)).observe(tooHard);
        new ResizeObserver(() => fitIframeToWindow(hive, FULL_IFRAME_WIDTH_HIVE)).observe(hive);

        function fitIframeToWindow(iframeWrapper, fullIframeWidth = 100) {
            const iframe = iframeWrapper.querySelector('iframe');
            if (!iframe) {
                return
            }

            const wrapperWidth = iframeWrapper.getBoundingClientRect().width;
            const ratio = wrapperWidth / fullIframeWidth;

            iframe.style.transform = `scale(${ratio})`;
        }

        /**
         * Проверка на поддержку API и запуск анимации при доскролле
         */

        if (typeof IntersectionObserver === 'function') {

            const optionsIO = {
                root: null,
                rootMargin: "0px",
                threshold: 0.4,
            };

            let observer = new IntersectionObserver(handleIntersect, optionsIO);

            let targets = document.querySelectorAll('.iframe__wrapper');
            targets.forEach(target => observer.observe(target))

            function handleIntersect(entries, observer) {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const wrapper = entry.target;

                        wrapper.querySelector('iframe').style.display = 'block';
                        wrapper.querySelector('img').style.display = 'none';
                    } else {
                        const wrapper = entry.target;

                        wrapper.querySelector('img').style.display = 'block';
                        wrapper.querySelector('iframe').style.display = 'none';
                    }
                })
            }
        }
    }


    /**
     * Открытие карточки .problem__fact
     */

    document.querySelectorAll('.problem__fact .btn_fact')
        .forEach(btn => btn.addEventListener('click', () => {
            btn.closest('.problem__fact').classList.toggle('hide')
        }));
})
