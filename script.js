const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
};

// Typing Effect
const typingText = document.querySelector('.typing-text');
const roles = ['Computer Science Engineer','Aspiring Web Developer','Backend Development Learner', 'AI & ML Explorer','Tech Visionary'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
}

typeEffect();

// Dark/Light Theme Toggle
const themeToggle = document.querySelector('#theme-toggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.add(currentTheme + '-theme');
updateThemeIcon(currentTheme);

themeToggle.onclick = () => {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
    }
};

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
    } else {
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
    }
}

// Smooth Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .skill-card, .project-card, .internship-card, .certificate-provider-card, .timeline-item').forEach(el => {
    el.classList.add('animate-element');
    observer.observe(el);
});

// Certificate Provider Cards - Click to show details
const certificateData = {
    oracle: {
        title: 'Oracle Certificates',
        certificates: [
            {
                name: 'Oracle AI Vector Search Certified Professional',
                description: 'Oracle Certified Professional in AI Vector Search technology. Valid until October 31, 2027.',
                image: 'Certificates/oracle1.png'
            },
            {
                name: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
                description: 'Oracle Certified Professional in OCI Generative AI. Valid until September 30, 2027.',
                image: 'Certificates/oracle2.png'
            },
            {
                name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
                description: 'Oracle Certified Foundations Associate in OCI AI. Issued September 09, 2025.',
                image: 'Certificates/oracle3.png'
            }
        ]
    },
    infosys: {
        title: 'Infosys Springboard Certificates',
        certificates: [
            {
                name: 'Introduction to Data Science',
                description: 'Course completion certificate from Infosys Springboard. Issued on August 20, 2023.',
                image: 'Certificates/infosys1.png'
            },
            {
                name: 'Computer Vision 101',
                description: 'Course completion certificate from Infosys Springboard. Issued on August 22, 2023.',
                image: 'Certificates/infosys2.png'
            },
            {
                name: 'Introduction to Artificial Intelligence',
                description: 'Course completion certificate from Infosys Springboard. Issued on August 21, 2023.',
                image: 'Certificates/infosys3.png'
            }
        ]
    },
    mongodb: {
        title: 'MongoDB University Certificates',
        certificates: [
            {
                name: 'Introduction to MongoDB',
                description: 'Proof of completion for Introduction to MongoDB course. Completed on August 07, 2025.',
                image: 'Certificates/mongodb1.png'
            },
            {
                name: 'MongoDB Indexes',
                description: 'Proof of completion for MongoDB Indexes course. Completed on August 07, 2025.',
                image: 'Certificates/mongodb2.png'
            },
            {
                name: 'MongoDB Aggregation',
                description: 'Proof of completion for MongoDB Aggregation course. Completed on August 07, 2025.',
                image: 'Certificates/mongodb3.png'
            }
        ]
    }
};

const providerCards = document.querySelectorAll('.certificate-provider-card');
const certificateDetails = document.getElementById('certificate-details');
const detailsTitle = document.getElementById('details-title');
const certificateList = document.getElementById('certificate-list');
const closeBtn = document.getElementById('close-certificates');

providerCards.forEach(card => {
    card.addEventListener('click', () => {
        const provider = card.getAttribute('data-provider');
        const data = certificateData[provider];
        
        // Update title
        detailsTitle.textContent = data.title;
        
        // Clear and populate certificate list
        certificateList.innerHTML = '';
        data.certificates.forEach(cert => {
            const certItem = document.createElement('div');
            certItem.className = 'certificate-item';
            certItem.innerHTML = `
                ${cert.image ? `<img src="${cert.image}" alt="${cert.name}" style="width: 100%; border-radius: 1rem; margin-bottom: 1rem; cursor: pointer;" onclick="window.open('${cert.image}', '_blank')">` : ''}
                <h4>${cert.name}</h4>
                <p>${cert.description}</p>
            `;
            certificateList.appendChild(certItem);
        });
        
        // Show details section
        certificateDetails.style.display = 'block';
        
        // Smooth scroll to details
        certificateDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});

closeBtn.addEventListener('click', () => {
    certificateDetails.style.display = 'none';
});
