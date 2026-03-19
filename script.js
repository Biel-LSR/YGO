document.addEventListener('DOMContentLoaded', function() {
            // Elementos do DOM
            const slides = document.querySelectorAll('.carrossel-slide');
            const indicatorsContainer = document.getElementById('indicators');
            const timerBar = document.getElementById('timerBar');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const pauseBtn = document.getElementById('pauseBtn');
            
            // Variáveis de controle
            let currentSlide = 0;
            let slideInterval;
            let isPaused = false;
            const slideDelay = 4000; 
            
            // Criar indicadores
            slides.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => goToSlide(index));
                indicatorsContainer.appendChild(indicator);
            });
            
            const indicators = document.querySelectorAll('.indicator');
            
            // Função para mostrar slide específico
            function goToSlide(n) {
                // Remover active de todos os slides e indicadores
                slides.forEach(slide => slide.classList.remove('active'));
                indicators.forEach(indicator => indicator.classList.remove('active'));
                
                // Adicionar active ao slide e indicador atual
                slides[n].classList.add('active');
                indicators[n].classList.add('active');
                
                // Atualizar slide atual
                currentSlide = n;
                
                // Reiniciar barra de progresso
                resetTimerBar();
            }
            
            // Função para ir para o próximo slide
            function nextSlide() {
                const next = (currentSlide + 1) % slides.length;
                goToSlide(next);
            }
            
            // Função para ir para o slide anterior
            function prevSlide() {
                const prev = (currentSlide - 1 + slides.length) % slides.length;
                goToSlide(prev);
            }
            
            // Função para iniciar o carrossel automático
            function startCarousel() {
                if (slideInterval) clearInterval(slideInterval);
                
                slideInterval = setInterval(() => {
                    if (!isPaused) {
                        nextSlide();
                    }
                }, slideDelay);
            }
            
            // Função para resetar a barra de progresso
            function resetTimerBar() {
                timerBar.style.transition = 'none';
                timerBar.style.width = '0%';
                
                // Pequeno delay para reiniciar a transição
                setTimeout(() => {
                    timerBar.style.transition = `width ${slideDelay}ms linear`;
                    timerBar.style.width = '100%';
                }, 50);
            }
            
            // Event listeners para os botões
            prevBtn.addEventListener('click', () => {
                prevSlide();
                // Reiniciar o intervalo para evitar conflitos
                startCarousel();
            });
            
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startCarousel();
            });
            
            pauseBtn.addEventListener('click', () => {
                isPaused = !isPaused;
                pauseBtn.textContent = isPaused ? 'Continuar' : 'Pausar';
                pauseBtn.style.background = isPaused ? 'rgba(255, 100, 100, 0.2)' : 'rgba(0, 238, 255, 0.1)';
                pauseBtn.style.borderColor = isPaused ? '#ff6464' : '#00eeff';
                pauseBtn.style.color = isPaused ? '#ff6464' : '#00eeff';
            });
            
            // Iniciar o carrossel
            startCarousel();
            resetTimerBar();
            
            // Adicionar suporte para teclado
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                    startCarousel();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                    startCarousel();
                } else if (e.key === ' ') {
                    // Espaço para pausar/continuar
                    e.preventDefault();
                    pauseBtn.click();
                }
            });
            
            // Preload de imagens para melhor experiência
            slides.forEach(slide => {
                const img = slide.querySelector('img');
                const tempImg = new Image();
                tempImg.src = img.src;
            });
        });