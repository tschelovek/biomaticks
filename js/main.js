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
    const modal = document.getElementById('modal');

    // modal.querySelector('.modal__dialog').addEventListener('click', e => {
    //   if (e.target === e.currentTarget) handlerCloseModal()
    // });
    // modal.querySelector('.btn_close').addEventListener('click', () => handlerCloseModal());

    // document.querySelectorAll('.callback_init')
    //   .forEach(button => button.addEventListener('click', e => handlerOpenCallback(e.currentTarget)));

    document.form_callback.addEventListener('submit', async e => {
        e.preventDefault();

        const form = e.target;
        const messageContainer = form.querySelector('.callback__status');

        messageContainer.textContent = '';
        messageContainer.style.color = 'inherit'

        try {
            const myMessage = getStringFromInputs();

            await postData(POST_FORM_URL, {message: myMessage})
                .then((res) => {
                    if (res.ok) {
                        messageContainer.textContent = SUCCESS_MESSAGE;
                        // очистка формы в случае успеха
                        form.reset();
                    } else {
                        messageContainer.textContent = ERROR_MESSAGE;
                        messageContainer.style.color = 'red'
                    }
                })
        } catch (err) {
            messageContainer.textContent = ERROR_MESSAGE;
            messageContainer.style.color = 'red'
            console.error(err);
        }
    })

    function handlerOpenCallback(eTarget) {
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('open'), 50);

        modal.querySelector('.btn_submit').textContent = eTarget.textContent;
        modal.querySelector('.modal__title').textContent = eTarget.dataset.title;
        document.form_callback.elements.modalName.value = eTarget.textContent;

        document.addEventListener(
            'keydown',
            e => {
                if (e.key === "Escape") handlerCloseModal()
            },
            {once: true}
        )
    }

    function handlerCloseModal() {
        modal.classList.remove('open');
        modal.querySelector('.modal__status').textContent = '';
        setTimeout(() => modal.style.display = 'none', 600);
    }

    async function postData(url = '', data = {}) {
        await fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .catch(() => {
                throw Error
            })
    }

    function getStringFromInputs() {
        const inputNameValue = document.getElementById('callback_name')?.value.trim();
        const inputEmailValue = document.getElementById('callback_email')?.value.trim();
        const inputPhoneValue = document.getElementById('callback_tel')?.value.trim();

        return `${inputNameValue}, ${inputPhoneValue}, ${inputEmailValue}`
    }

    /**
     *
     * Бургер меню
     *
     */
    document.getElementById('burgerButton')?.addEventListener('click', e => {
        e.preventDefault();
        e.currentTarget.classList.toggle('active');
        document.querySelector('.header__right-block')?.classList.toggle('active');
    })

    document.querySelectorAll('.nav_header .header__link')
        .forEach(link => link.addEventListener('click', () => {
                document.querySelector('.nav_header').classList.remove('active');
                document.getElementById('burgerButton').classList.remove('active');
            }
        ))

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
            {transform: 'rotateY()', easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)'},
            {transform: 'rotateY(180deg)', easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)'},
        ],
        keyframesOut: [
            {transform: 'rotateY(180deg)', easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)'},
            {transform: 'rotateY(360deg)', easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)'},
        ]
    }

    document.querySelectorAll('.systema__item')
        .forEach(item => item
            .addEventListener('click', () => {
                item.classList.toggle('active');
                item.classList.contains('active')
                    ? item.animate([...animFlipParams.keyframesIn], {...animFlipParams.options})
                    : item.animate([...animFlipParams.keyframesOut], {...animFlipParams.options})
            })
        )

    /**
     * Масштабирование айфреймов по ширине обёртки
     */

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
     * Открытие карточки .problem__fact
     */

    document.querySelectorAll('.problem__fact .btn_fact')
        .forEach(btn => btn.addEventListener('click', () => {
            btn.closest('.problem__fact').classList.toggle('hide')
        }));
})
