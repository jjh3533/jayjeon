// 페이지 로드 애니메이션
document.addEventListener('DOMContentLoaded', function() {
    // 부드러운 스크롤 활성화
    enableSmoothScroll();
    
    // 스크롤 애니메이션
    observeElements();
    
    console.log('Portfolio loaded successfully 🎨');
});

// 부드러운 스크롤 링크 처리
function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer를 사용한 스크롤 애니메이션
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 애니메이션할 요소들
    const elementsToAnimate = document.querySelectorAll(
        '.project-card, .skill-item, .award-item, .timeline-item'
    );

    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// 네비게이션 하이라이트 (선택사항)
function highlightActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// 마우스 움직임에 따른 미묘한 효과 (선택사항)
function addHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
}

// 성능 최적화를 위한 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addHoverEffects);
} else {
    addHoverEffects();
}

// 프로젝트 필터 기능 (나중에 추가할 수 있음)
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    
    if (category === 'all') {
        cards.forEach(card => {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease-in';
        });
    } else {
        cards.forEach(card => {
            const cardCategory = card.querySelector('.project-category').textContent.trim();
            
            if (cardCategory === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-in';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// 페이지 로드 애니메이션
window.addEventListener('load', function() {
    // 이미지 또는 리소스 로딩 완료 후 애니메이션
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.animation = 'fadeInDown 0.8s ease-out';
    }
});
