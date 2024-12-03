document.addEventListener('DOMContentLoaded', () => {
    // Swiper Initialization
    const swiperContainer = document.querySelector('.card-content');
    let swiperCards;

    if (swiperContainer) {
        swiperCards = new Swiper('.card-content', {
            loop: true,
            spaceBetween: 32,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                600: {
                    slidesPerView: 2,
                },
                968: {
                    slidesPerView: 2,
                },
            },
        });
        console.log('Swiper instance created:', swiperCards);
    }

    // Menu Toggle Functionality
    const menu = document.querySelector(".menu");
    const openMenuBtn = document.querySelector(".open-menu-btn");
    const closeMenuBtn = document.querySelector(".close-menu-btn");

    if (menu && openMenuBtn && closeMenuBtn) {
        [openMenuBtn, closeMenuBtn].forEach(btn => {
            btn.addEventListener("click", (event) => {
                event.stopPropagation();
                menu.classList.toggle("open");
                console.log('Menu toggled. Current classes:', menu.classList);

                // Update Swiper after menu state changes
                if (swiperCards) {
                    setTimeout(() => {
                        swiperCards.update();
                        console.log('Swiper updated.');
                    }, 500); // Delay to ensure the transition is complete
                }
            });
        });

        menu.addEventListener("transitionend", () => {
            menu.removeAttribute("style");
        });

        // Handle dropdown toggling
        menu.querySelectorAll(".dropdown > i").forEach(arrow => {
            arrow.addEventListener("click", (event) => {
                event.stopPropagation();
                const dropdown = arrow.closest(".dropdown");
                dropdown.classList.toggle("active");
                console.log('Dropdown toggled. Current classes:', dropdown.classList);
            });
        });
    } else {
        console.error('One or more menu elements not found.');
    }

    // Click outside to close menu
    document.addEventListener("click", (event) => {
        if (menu && menu.classList.contains("open") && !menu.contains(event.target)) {
            menu.classList.remove("open");
            console.log('Menu closed by clicking outside.');
        }
    });

    // FAQ Toggle Functionality
    document.querySelectorAll('.question button').forEach(button => {
        button.addEventListener('click', () => {
            const faq = button.nextElementSibling; // The <p> tag
            const icon = button.querySelector('.d-arrow'); // The icon inside the button

            if (faq && icon) {
                faq.classList.toggle('show');
                icon.classList.toggle('rotate');
            } else {
                console.error('FAQ or icon not found');
            }
        });
    });
});


let allvalues = document.querySelectorAll(".value");
allvalues.forEach((singlevalue) => {
    let startValue = 0;
    let endValue = parseInt(singlevalue.getAttribute("data-value"));
    let duration = Math.floor(2000 / endValue);



    let counter = setInterval(function(){
        startValue +=1;
        singlevalue.textContent = startValue;

        if(startValue == endValue){
            clearInterval(counter);
        }
    } , duration );
});


document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();  // Prevent default form submission

    let formData = new FormData(this);  // Get form data

    try {
        let response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            alert("Message sent successfully!");  // Success alert
        } else {
            alert("There was an issue sending the message. Please try again.");  // Error alert
        }
    } catch (error) {
        alert("Network error. Please try again later.");  // Network error alert
    }
});