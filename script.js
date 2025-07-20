
        document.addEventListener('DOMContentLoaded', function() {

            /*=============== HEADER SCROLL & ACTIVE LINK ===============*/
            const header = document.getElementById('header');
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('section[id]');

            function scrollHeader() {
                if (window.scrollY >= 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }

            function setActiveLink() {
                const scrollY = window.pageYOffset;
                let currentSectionId = '';

                sections.forEach(current => {
                    const sectionHeight = current.offsetHeight;
                    const sectionTop = current.offsetTop - (header.offsetHeight + 20);
                    const sectionId = current.getAttribute('id');

                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        currentSectionId = sectionId;
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${currentSectionId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
            
            window.addEventListener('scroll', () => {
                scrollHeader();
                setActiveLink();
            });

            /*=============== MOBILE MENU ===============*/
            const navMenu = document.getElementById('nav-menu');
            const mobileToggle = document.getElementById('mobile-toggle');
            const navCloseIcon = '<i class="fas fa-times"></i>';
            const navOpenIcon = '<i class="fas fa-bars"></i>';
            
            if (mobileToggle) {
                mobileToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    // Toggle icon
                    if (navMenu.classList.contains('active')) {
                        mobileToggle.innerHTML = navCloseIcon;
                    } else {
                        mobileToggle.innerHTML = navOpenIcon;
                    }
                });
            }

            // Close mobile menu when a link is clicked
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileToggle.innerHTML = navOpenIcon;
                    }
                });
            });

            /*=============== SCROLL REVEAL ANIMATION ===============*/
            const revealElements = document.querySelectorAll('.reveal');

            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.dataset.delay || 0;
                        setTimeout(() => {
                            entry.target.classList.add('is-visible');
                        }, parseInt(delay));
                    
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            });

            revealElements.forEach(element => {
                revealObserver.observe(element);
            });

            /*=============== SWIPER JS INITIALIZATION ===============*/
            var swiper = new Swiper(".mySwiper", {
                effect: "coverflow",
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: "auto",
                loop: true,
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
            });

        });
