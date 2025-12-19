document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Animated Particle Background ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 120;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(255, 214, 0, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = Math.sqrt(
                    Math.pow(particlesArray[a].x - particlesArray[b].x, 2) +
                    Math.pow(particlesArray[a].y - particlesArray[b].y, 2)
                );
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(255, 214, 0, ${0.3 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });


    // --- 2. Cool Heading Animation (Fixed for Persian) ---
    const animateHeading = (element) => {
        const text = element.innerText;
        element.innerHTML = '';
        const words = text.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.innerText = word;
            span.style.animationDelay = `${index * 0.15}s`;
            element.appendChild(span);
        });
    };
    
    document.querySelectorAll('.animate-heading').forEach(heading => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateHeading(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(heading);
    });


    // --- 3. Interactive Venn Diagram (Improved Parsing) ---
    const calculateVennBtn = document.getElementById('calculate-venn-btn');
    const setAInput = document.getElementById('setA-input');
    const setBInput = document.getElementById('setB-input');
    const vennLabelsGroup = document.getElementById('venn-labels');

    const parseSet = (inputString) => {
        if (!inputString || !inputString.includes('{')) return [];
        try {
            const items = inputString
                .slice(1, -1)
                .replace(/،/g, ',')
                .split(',')
                .map(item => item.trim());
            const uniqueItems = [...new Set(items)];
            return uniqueItems.filter(item => item !== '');
        } catch (e) {
            return [];
        }
    };

    const updateVennDiagram = (setA, setB) => {
        vennLabelsGroup.innerHTML = '';
        const intersection = setA.filter(item => setB.includes(item));
        const onlyInA = setA.filter(item => !setB.includes(item));
        const onlyInB = setB.filter(item => !setA.includes(item));

        const addTextToSvg = (text, x, y) => {
            if (text.length === 0) return;
            const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textElement.setAttribute('x', x);
            textElement.setAttribute('y', y);
            textElement.setAttribute('text-anchor', 'middle');
            textElement.setAttribute('font-family', 'Vazirmatn');
            textElement.setAttribute('font-size', '14');
            textElement.setAttribute('fill', 'white');
            textElement.textContent = text.join(', ');
            vennLabelsGroup.appendChild(textElement);
        };
        
        addTextToSvg(onlyInA, 130, 200);
        addTextToSvg(onlyInB, 370, 200);
        addTextToSvg(intersection, 250, 200);
    };

    calculateVennBtn.addEventListener('click', () => {
        const setA = parseSet(setAInput.value);
        const setB = parseSet(setBInput.value);
        if (setA.length > 0 || setB.length > 0) {
            updateVennDiagram(setA, setB);
        } else {
            alert("لطفاً مجموعه‌ها را با فرمت صحیح وارد کنید. مثال: {a, b, c}");
        }
    });


    // --- 4. Dynamic Exercise Questions (Modal Feedback) ---
    const questions = [
        { question: "اشتراک دو مجموعه زیر چیست؟", setA: "A = {1, 2, 3, 4, 5}", setB: "B = {4, 5, 6, 7}", answer: "{4, 5}", explanation: "اشتراک دو مجموعه، عناصری هستند که در هر دو مجموعه وجود دارند. در اینجا هر دو مجموعه دارای اعداد 4 و 5 هستند. پس پاسخ صحیح <code>{4, 5}</code> است." },
        { question: "اجتماع دو مجموعه زیر چیست؟", setA: "A = {الف, ب, ج}", setB: "B = {ج, د, هـ}", answer: "{الف, ب, ج, د, هـ}", explanation: "اجتماع دو مجموعه، شامل تمام عناصری است که در حداقل یکی از دو مجموعه وجود دارند. کافی است تمام عناصر را بدون تکرار بنویسیم. پس پاسخ صحیح <code>{الف, ب, ج, د, هـ}</code> است." },
        { question: "تفاضل A \\ B چیست؟ (عناصری که در A هستند ولی در B نیستند)", setA: "A = {مربع، دایره، مثلث}", setB: "B = {مثلث، لوزی}", answer: "{مربع، دایره}", explanation: "تفاضل A\\B، عناصری هستند که در مجموعه A وجود دارند اما در مجموعه B نیستند. پس \"مربع\" و \"دایره\" باقی می‌مانند." },
        { question: "کدام گزینه یک مجموعه تهی است؟", setA: "A = {}", setB: "B = {∅}", answer: "{}", explanation: "مجموعه تهی مجموعه‌ای است که هیچ عضوی ندارد و با {} نشان داده می‌شود. مجموعه B دارای یک عضو به خودِ \"مجموعه تهی\" است، پس تهی نیست." },
        { question: "مجموعه اعداد فرد کوچکتر از ۱۰ کدام است؟", setA: "A = {1, 2, 3, 4, 5, 6, 7, 8, 9}", setB: "", answer: "{1, 3, 5, 7, 9}", explanation: "اعداد فرد اعدادی هستند که بر 2 بخش‌پذیر نیستند. اعداد فرد کوچکتر از 10 عبارتند از: 1, 3, 5, 7, 9." },
        { question: "اشتراک دو مجموعه زیر کدام است؟", setA: "A = {پرندگان}", setB: "B = {ماهی‌ها}", answer: "مجموعه تهی", explanation: "چون هیچ عنصری همزمان در هر دو مجموعه \"پرندگان\" و \"ماهی‌ها\" وجود ندارد، اشتراک آن‌ها یک مجموعه تهی است." },
        { question: "اجتماع دو مجموعه زیر چیست؟", setA: "A = {2, 4, 6}", setB: "B = {1, 3, 5}", answer: "{1, 2, 3, 4, 5, 6}", explanation: "اجتماع این دو مجموعه، شامل تمام اعداد زوج و فرد کوچکتر از 7 می‌شود. پس پاسخ صحیح <code>{1, 2, 3, 4, 5, 6}</code> است." },
        { question: "کدام یک از اعداد زیر در مجموعه اعداد اول قرار نمی‌گیرد؟", setA: "A = {2, 3, 5, 7, 11}", setB: "", answer: "9", explanation: "عدد اول، عددی طبیعی بزرگتر از 1 است که فقط به خودش و 1 بخش‌پذیر باشد. عدد 9 به غیر از 1 و خودش، به 3 نیز بخش‌پذیر است. پس عدد اول نیست." },
        { question: "تفاضل B \\ A چیست؟", setA: "A = {قرمز، آبی}", setB: "B = {قرمز، سبز، زرد}", answer: "{سبز، زرد}", explanation: "تفاضل B\\A، عناصری هستند که در B هستند ولی در A نیستند. پس \"سبز\" و \"زرد\" باقی می‌مانند." },
        { question: "اشتراک دو مجموعه زیر چیست؟", setA: "A = {a, b, c, d, e}", setB: "B = {x, y, z}", answer: "مجموعه تهی", explanation: "این دو مجموعه هیچ عنصر مشترکی با هم ندارند، بنابراین اشتراک آن‌ها یک مجموعه تهی است." },
        { question: "اگر A = {حروف الفبا} و B = {حروف صدادار}، تفاضل A \\ B چیست؟", setA: "A = {ا، ب، پ، ...}", setB: "B = {ا، و، ی}", answer: "حروف بی‌صدا", explanation: "تفاضل A\\B، عناصری از مجموعه حروف الفبا هستند که صدادار نیستند. پس پاسخ صحیح \"حروف بی‌صدا\" است." },
        { question: "اجتماع دو مجموعه زیر چیست؟", setA: "A = {مربع، مستطیل}", setB: "B = {مربع}", answer: "{مربع، مستطیل}", explanation: "اجتماع دو مجموعه، شامل تمام عناصر منحصر به فرد هر دو مجموعه است. در اینجا \"مربع\" در هر دو وجود دارد اما فقط یک بار نوشته می‌شود." }
    ];

    // --- NEW: Helper function to normalize input strings ---
    const normalizeAnswer = (str) => {
        return str
            .replace(/[{}]/g, '')
            .replace(/،/g, ',')
            .replace(/,/g, ' ')
            .trim()
            .split(/\s+/)
            .filter(item => item.length > 0)
            .map(item => item.trim().toLowerCase())
            .sort()
            .join(',');
    };

    // --- Modal Elements ---
    const modal = document.getElementById('incorrect-answer-modal');
    const modalExplanation = document.getElementById('modal-explanation');
    const modalNextBtn = document.getElementById('modal-next-btn');

    let currentQuestionIndex = 0;
    let shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

    const questionTextEl = document.getElementById('question-text');
    const questionSetsEl = document.getElementById('question-sets');
    const answerInput = document.getElementById('answer-input');
    const checkAnswerBtn = document.getElementById('check-answer-btn');
    const feedbackMessage = document.getElementById('feedback-message');
    const nextQuestionBtn = document.getElementById('next-question-btn');

    const loadQuestion = () => {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        questionTextEl.innerText = currentQuestion.question;
        
        questionSetsEl.innerHTML = `
            ${currentQuestion.setA ? `<code>${currentQuestion.setA}</code>` : ''}
            ${currentQuestion.setB ? `<code>${currentQuestion.setB}</code>` : ''}
        `;
        
        answerInput.value = '';
        feedbackMessage.innerText = '';
        feedbackMessage.className = '';
        nextQuestionBtn.style.display = 'none';
        checkAnswerBtn.style.display = 'inline-block';
        answerInput.disabled = false;
    };

    const closeModal = () => {
        modal.classList.remove('show-modal');
    };

    checkAnswerBtn.addEventListener('click', () => {
        const userAnswer = normalizeAnswer(answerInput.value);
        const correctAnswer = normalizeAnswer(shuffledQuestions[currentQuestionIndex].answer);

        if (userAnswer === correctAnswer) {
            feedbackMessage.innerHTML = 'آفرین! پاسخ شما درست است.';
            feedbackMessage.className = 'correct';
            nextQuestionBtn.style.display = 'inline-block';
        } else {
            // Show modal with explanation
            modalExplanation.innerHTML = shuffledQuestions[currentQuestionIndex].explanation;
            modal.classList.add('show-modal');
        }
        checkAnswerBtn.style.display = 'none';
        answerInput.disabled = true;
    });

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex = (currentQuestionIndex + 1) % shuffledQuestions.length;
        if (currentQuestionIndex === 0) {
            shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
        }
        loadQuestion();
    });

    modalNextBtn.addEventListener('click', () => {
        closeModal();
        currentQuestionIndex = (currentQuestionIndex + 1) % shuffledQuestions.length;
        if (currentQuestionIndex === 0) {
            shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
        }
        loadQuestion();
    });

    // Close modal if overlay is clicked
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    loadQuestion();

    // --- Other existing functionalities (Hamburger, Scroll Reveal, Like Button) ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const observerOptions = { root: null, threshold: 0.1, rootMargin: '0px' };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    const likeBtn = document.getElementById('like-btn');
    const likeCountSpan = document.getElementById('like-count');
    let likeCount = parseInt(localStorage.getItem('pageLikeCount')) || 0;
    likeCountSpan.textContent = likeCount;

    likeBtn.addEventListener('click', () => {
        likeCount++;
        likeCountSpan.textContent = likeCount;
        localStorage.setItem('pageLikeCount', likeCount);
        likeBtn.style.transform = 'scale(0.95)';
        setTimeout(() => { likeBtn.style.transform = 'scale(1.05)'; }, 100);
        setTimeout(() => { likeBtn.style.transform = 'scale(1)'; }, 200);
    });

});