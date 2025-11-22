// =========================================
// 1. MOBILE MENU TOGGLE
// =========================================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// =========================================
// 2. TYPING EFFECT
// =========================================
const text = "பிறப்பொக்கும் எல்லா உயிர்க்கும்...";
const typingElement = document.getElementById("typing-text");
let i = 0;
function typeWriter() {
    if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}
window.onload = typeWriter;

// =========================================
// 3. SMART NUMBER COUNTER (DECIMAL & UNITS)
// =========================================
const counters = document.querySelectorAll('.counter');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const unit = counter.getAttribute('data-unit') || "";
            
            // If target is small (less than 10), count slowly with decimals
            // If target is big (like 50000), count fast with integers
            const isDecimal = target < 20000000 && target % 1 !== 0; 
            const speed = 100; // Higher = Slower
            const increment = target / speed; 
            
            const updateCount = () => {
                // Get current number (cleans text to just number)
                const currentText = counter.innerText.replace(/[^\d.]/g, ''); 
                const count = +currentText;

                if(count < target) {
                    let nextVal = count + increment;
                    
                    // Logic: Show decimals for small numbers, Integers for big ones
                    if (target <= 10) {
                        counter.innerText = nextVal.toFixed(1); // Example: 0.1, 0.2...
                    } else {
                        counter.innerText = Math.ceil(nextVal); // Example: 1, 2, 3...
                    }
                    
                    setTimeout(updateCount, 20);
                } else {
                    // Final Finish: Add Unit and +
                    counter.innerText = target + " " + unit + " +";
                }
            };
            
            // Start counting
            updateCount();
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

// =========================================
// 4. FLOATING CARD COUNTER
// =========================================
let liveCount = 1240;
setInterval(() => {
    liveCount += Math.floor(Math.random() * 5);
    document.getElementById('live-counter').innerText = liveCount;
}, 3000);

// =========================================
// 5. DISTRICT ADMIN DATA & FILTER
// =========================================
const districtAdmins = [
    { name: "Chennai", admin: "Thiru. S. Ramesh", role: "District Secretary", contact: "98765 11111", url: "chennai.html" },
    { name: "Coimbatore", admin: "Thiru. K. Palani", role: "District Secretary", contact: "98765 22222", url: "coimbatore.html" },
    { name: "Madurai", admin: "Thiru. M. Karthik", role: "District Secretary", contact: "98765 33333", url: "madurai.html" },
    { name: "Trichy", admin: "திரு.ரவிசங்கர்", role: "District Secretary", contact: "98765 44444", url: "pages/Trichy/trichy.html" },
    { name: "Salem", admin: "Thiru. P. Kumar", role: "District Secretary", contact: "98765 55555", url: "salem.html" },
    { name: "Tirunelveli", admin: "Thiru. R. Suresh", role: "District Secretary", contact: "98765 66666", url: "tirunelveli.html" },
];

function loadAdmins(data) {
    const tbody = document.querySelector('#adminTable tbody');
    tbody.innerHTML = '';
    data.forEach(d => {
        tbody.innerHTML += `
            <tr>
                <td>
                    <a href="${d.url}" class="district-link">
                        ${d.name} <i class="fas fa-arrow-right"></i>
                    </a>
                </td>
                <td>${d.admin}</td>
                <td><span class="role-badge">${d.role}</span></td>
                <td><a href="tel:${d.contact}" style="color:var(--primary)"><i class="fas fa-phone"></i> Call</a></td>
            </tr>
        `;
    });
}
loadAdmins(districtAdmins);

function filterAdmins() {
    const query = document.getElementById('adminSearch').value.toLowerCase();
    const filtered = districtAdmins.filter(d => d.name.toLowerCase().includes(query));
    loadAdmins(filtered);
}

// =========================================
// 6. MODAL & CHAT FUNCTIONS
// =========================================
function openModal() { document.getElementById('memberModal').style.display = 'flex'; }
function closeModal() { document.getElementById('memberModal').style.display = 'none'; }

function toggleChat() {
    const win = document.getElementById('chatWindow');
    win.style.display = win.style.display === 'flex' ? 'none' : 'flex';
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const body = document.getElementById('chatBody');
    if(input.value.trim() === "") return;
    
    // User Msg
    body.innerHTML += `<div style="background:#dbeafe; padding:8px; border-radius:8px; margin:10px 0; align-self:flex-end; text-align:right;">${input.value}</div>`;
    input.value = '';
    
    // Bot Reply (Simulated)
    setTimeout(() => {
        body.innerHTML += `<div style="background:#e5e7eb; padding:10px; border-radius:8px; margin:10px 0; font-size:0.9rem;">நன்றி! எங்கள் நிர்வாகி உங்களை விரைவில் தொடர்பு கொள்வார். (Thank you! Our admin will contact you shortly.)</div>`;
        body.scrollTop = body.scrollHeight;
    }, 1000);
}

// =========================================
// 7. LIGHTBOX GALLERY FUNCTIONALITY
// =========================================

// Select all images in the gallery
const galleryImages = document.querySelectorAll('.gallery-img');
let imageUrls = [];
let imageCaptions = [];

// Populate arrays
if(galleryImages.length > 0) {
    galleryImages.forEach(img => {
        imageUrls.push(img.src);
        // Getting the caption from the sibling div (Check if caption exists)
        const captionDiv = img.closest('.photo-card').querySelector('.photo-caption p');
        imageCaptions.push(captionDiv ? captionDiv.innerText : "");
    });
}

let currentSlideIndex = 0;

function openLightbox(index) {
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImage');
    const captionText = document.getElementById('lightboxCaption');

    currentSlideIndex = index;
    
    // Set Image and Caption
    lightboxImg.src = imageUrls[currentSlideIndex];
    captionText.innerText = imageCaptions[currentSlideIndex];
    
    // Show Modal
    lightbox.style.display = "block";
    
    // Disable scrolling on body
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    document.getElementById('lightboxModal').style.display = "none";
    // Enable scrolling on body
    document.body.style.overflow = "auto";
}

function changeSlide(n) {
    currentSlideIndex += n;
    
    // Loop back if at end or beginning
    if (currentSlideIndex >= imageUrls.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = imageUrls.length - 1;
    }
    
    // Update Image and Caption
    document.getElementById('lightboxImage').src = imageUrls[currentSlideIndex];
    document.getElementById('lightboxCaption').innerText = imageCaptions[currentSlideIndex];
}

// Close lightbox if user clicks outside the image
window.onclick = function(event) {
    const lightbox = document.getElementById('lightboxModal');
    if (event.target == lightbox) {
        closeLightbox();
    }
}

// Keyboard navigation (Left/Right arrows and Escape)
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightboxModal');
    if (lightbox && lightbox.style.display === "block") {
        if (event.key === "ArrowLeft") {
            changeSlide(-1);
        } else if (event.key === "ArrowRight") {
            changeSlide(1);
        } else if (event.key === "Escape") {
            closeLightbox();
        }
    }
});