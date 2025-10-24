document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // Tutup semua item FAQ lain
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = 0;
                }
            });

            // Buka atau tutup item yang diklik
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = 0;
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});
