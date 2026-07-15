// 부드러운 스크롤 애니메이션
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 페이지 로드 시 환영 메시지
window.addEventListener('load', function() {
    console.log('포트폴리오 페이지에 오신 것을 환영합니다!');
});