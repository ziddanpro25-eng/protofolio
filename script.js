document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Dark Mode / Light Mode Toggle ---
    const themeBtn = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;
    const themeIcon = themeBtn.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // --- 2. Mobile Menu ---
    const mobileMenu = document.getElementById('mobileMenu');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const bars = mobileMenu.querySelectorAll('.bar');
        mobileMenu.classList.toggle('open');
        if (mobileMenu.classList.contains('open')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('open');
            const bars = mobileMenu.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // --- 3. Sticky Navbar & Scroll Spy ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- 4. Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active-reveal');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- 5. Contact Form (Simulasi) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            btn.disabled = true;
            setTimeout(() => {
                alert("Pesan berhasil terkirim! (Ini hanya demo)");
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        });
    }

    // --- 6. Modal Detail Proyek ---
    // Database Data Proyek Lengkap
    const projectDB = {
        "iot": {
            title: "Smart Obstacle Avoiding Robot",
            category: "Robotics & Embedded System",
            icon: "fa-robot",
            desc: "Sebuah robot mobil cerdas yang dirancang untuk bermanuver secara mandiri. Menggunakan 'otak' Arduino Uno dan 'mata' sensor ultrasonik, robot ini mampu memindai lingkungan sekitar. Ketika sensor mendeteksi penghalang (tembok/benda) dalam jarak tertentu, robot akan berhenti, memindai jalan aman, dan berbelok secara otomatis tanpa bantuan manusia.",
            features: [
                "Mikrokontroler: Arduino Uno R3",
                "Penggerak: L298N Motor Driver",
                "Sensor: Ultrasonic HC-SR04",
                "Power: Baterai Li-ion 18650",
                "Sasis Akrilik 2WD Custom"
            ],
            link: "projek-iot.html"
        },
        "web": {
            title: "Sistem Informasi Manajemen Siswa",
            category: "Fullstack Web Development",
            icon: "fa-globe",
            desc: "Aplikasi berbasis web yang dibangun untuk mendigitalkan administrasi sekolah. Sistem ini menggantikan pencatatan manual kertas menjadi database digital. Guru dapat menginput nilai dan absensi secara online, sementara siswa dapat melihat rekap hasil belajar mereka melalui dashboard yang responsif.",
            features: [
                "CRUD Data Siswa (Create, Read, Update, Delete)",
                "Login Multi-Level (Admin & Guru)",
                "Export Laporan ke PDF/Excel",
                "Database MySQL Terintegrasi",
                "Interface Responsif (Bootstrap 5)"
            ],
            link: "projek-web.html"
        },
        "java": {
            title: "Aplikasi Kasir Toko (Point of Sales)",
            category: "Desktop Application (Java)",
            icon: "fa-java",
            desc: "Software desktop yang handal untuk menangani transaksi penjualan di toko retail atau UMKM. Dibangun menggunakan Java Swing dengan antarmuka (GUI) yang mudah dipahami. Aplikasi ini membantu kasir menghitung total belanjaan, uang kembalian, dan mencetak struk transaksi secara akurat dan cepat.",
            features: [
                "Form Transaksi Interaktif",
                "Perhitungan Total Otomatis",
                "Manajemen Stok Barang",
                "Riwayat Penjualan Harian",
                "Koneksi Database MySQL (JDBC)"
            ],
            link: "projek-java.html"
        }
    };

    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close-btn');
    const detailBtns = document.querySelectorAll('.detail-btn');
    
    const mTitle = document.getElementById('mTitle');
    const mCategory = document.getElementById('mCategory');
    const mDesc = document.getElementById('mDesc');
    const mFeatures = document.getElementById('mFeatures');
    const mLink = document.getElementById('mLink');
    const mIcon = document.getElementById('mIcon');

    // Buka Modal
    detailBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            const data = projectDB[id];

            if (data) {
                mTitle.textContent = data.title;
                mCategory.textContent = data.category;
                mDesc.textContent = data.desc;
                mLink.href = data.link;
                mIcon.className = `fas ${data.icon}`;

                mFeatures.innerHTML = '';
                data.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    mFeatures.appendChild(li);
                });

                modal.classList.add('active');
            }
        });
    });

    // Tutup Modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // --- 7. Game Edukasi Logic ---
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        const questions = [
            { question: "Apa kepanjangan dari HTML?", answers: [{ text: "HyperText Markup Language", correct: true }, { text: "HighTech Made Language", correct: false }, { text: "HyperLink Text Mode", correct: false }, { text: "Home Tool Markup Language", correct: false }] },
            { question: "Bahasa pemrograman mana yang digunakan untuk IoT (Arduino)?", answers: [{ text: "Python", correct: false }, { text: "C++", correct: true }, { text: "PHP", correct: false }, { text: "Swift", correct: false }] },
            { question: "Tag HTML untuk membuat baris baru adalah...", answers: [{ text: "<lb>", correct: false }, { text: "<break>", correct: false }, { text: "<br>", correct: true }, { text: "<newline>", correct: false }] },
            { question: "Apa fungsi CSS dalam website?", answers: [{ text: "Membuat database", correct: false }, { text: "Mengatur tampilan & gaya", correct: true }, { text: "Membuat logika server", correct: false }, { text: "Menyimpan password", correct: false }] },
            { question: "Komponen IoT yang berfungsi mendeteksi lingkungan disebut...", answers: [{ text: "Aktuator", correct: false }, { text: "Mikrokontroler", correct: false }, { text: "Sensor", correct: true }, { text: "Resistor", correct: false }] }
        ];

        let currentQuestionIndex = 0;
        let score = 0;
        const startScreen = document.getElementById('startScreen');
        const quizScreen = document.getElementById('quizScreen');
        const resultScreen = document.getElementById('resultScreen');
        const questionText = document.getElementById('questionText');
        const answerButtons = document.getElementById('answerButtons');
        const scoreDisplay = document.getElementById('scoreDisplay');
        const questionCount = document.getElementById('questionCount');
        const finalScore = document.getElementById('finalScore');
        const resultMessage = document.getElementById('resultMessage');

        document.getElementById('startBtn').addEventListener('click', startGame);
        document.getElementById('restartBtn').addEventListener('click', startGame);

        function startGame() {
            startScreen.style.display = 'none';
            resultScreen.style.display = 'none';
            quizScreen.style.display = 'block';
            currentQuestionIndex = 0;
            score = 0;
            updateScore();
            showQuestion();
        }

        function showQuestion() {
            while (answerButtons.firstChild) answerButtons.removeChild(answerButtons.firstChild);
            
            let currentQuestion = questions[currentQuestionIndex];
            questionText.innerText = currentQuestion.question;
            questionCount.innerText = `Soal ${currentQuestionIndex + 1}/${questions.length}`;
            currentQuestion.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('btn-answer');
                if (answer.correct) button.dataset.correct = answer.correct;
                button.addEventListener('click', selectAnswer);
                answerButtons.appendChild(button);
            });
        }

        function selectAnswer(e) {
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            if (isCorrect) {
                selectedBtn.classList.add('correct');
                score += 20;
                updateScore();
            } else {
                selectedBtn.classList.add('wrong');
            }
            Array.from(answerButtons.children).forEach(button => {
                if (button.dataset.correct === "true") button.classList.add('correct');
                button.disabled = true;
            });
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) showQuestion();
                else showResult();
            }, 1200);
        }

        function updateScore() {
            scoreDisplay.innerText = `Skor: ${score}`;
        }

        function showResult() {
            quizScreen.style.display = 'none';
            resultScreen.style.display = 'block';
            finalScore.innerText = score;
            if (score === 100) resultMessage.innerText = "Sempurna! Kamu Tech Master Sejati! 🏆";
            else if (score >= 60) resultMessage.innerText = "Hebat! Pengetahuanmu cukup luas. 👍";
            else resultMessage.innerText = "Tetap semangat belajar! Coba lagi ya. 💪";
        }
    }

    // --- 8. Guestbook (LocalStorage) ---
    const guestForm = document.getElementById('guestForm');
    const guestList = document.getElementById('guestList');

    if (guestForm && guestList) {
        function loadGuestbook() {
            const storedData = localStorage.getItem('guestbook_ziddan');
            const guests = storedData ? JSON.parse(storedData) : [];
            guestList.innerHTML = '';
            if (guests.length === 0) {
                guestList.innerHTML = '<p style="text-align:center; color:var(--text-light); padding: 20px;">Belum ada pengunjung. Jadilah yang pertama mengisi!</p>';
                return;
            }
            guests.forEach(item => {
                const card = document.createElement('div');
                card.className = 'guest-card glass-effect';
                card.style.animation = 'slideIn 0.5s ease';
                card.innerHTML = `
                    <img src="${item.avatar}" alt="Avatar" class="guest-avatar">
                    <div class="guest-info">
                        <h4>${item.nama}</h4>
                        <span class="guest-date"><i class="far fa-clock"></i> ${item.waktu}</span>
                        <p>${item.pesan}</p>
                    </div>
                `;
                guestList.appendChild(card);
            });
        }
        loadGuestbook();

        guestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const namaInput = document.getElementById('gNama');
            const pesanInput = document.getElementById('gPesan');
            const btn = guestForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...';
            btn.disabled = true;

            setTimeout(() => {
                const newGuest = {
                    nama: namaInput.value,
                    pesan: pesanInput.value,
                    waktu: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                    avatar: 'https://ui-avatars.com/api/?background=random&color=fff&name=' + encodeURIComponent(namaInput.value)
                };
                const existingData = JSON.parse(localStorage.getItem('guestbook_ziddan')) || [];
                existingData.unshift(newGuest);
                localStorage.setItem('guestbook_ziddan', JSON.stringify(existingData));
                
                guestForm.reset();
                loadGuestbook();
                btn.innerHTML = originalText;
                btn.disabled = false;
                alert('Pesan berhasil disimpan! (Mode: Penyimpanan Browser)');
            }, 800);
        });
    }
});
