// Cart functionality
let cartCount = 0;
const cartCounter = document.querySelector('.absolute.top-0.right-0');
const addToCartButtons = document.querySelectorAll('.button.bg-yellow-400');

// Add to cart event listeners
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        updateCartCounter();
        showAddedToCartMessage(button);
    });
});

function updateCartCounter() {
    cartCounter.textContent = cartCount;
    cartCounter.classList.remove('hidden');
}

function showAddedToCartMessage(button) {
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.classList.add('bg-green-500', 'hover:bg-green-600');
    button.classList.remove('bg-yellow-400', 'hover:bg-yellow-500');
    
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-green-500', 'hover:bg-green-600');
        button.classList.add('bg-yellow-400', 'hover:bg-yellow-500');
    }, 2000);
}

// Search functionality
const searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        alert(`Searching for: ${searchTerm}`);
        // In a real implementation, this would redirect to search results
    }
}

// Mobile menu toggle
const mobileMenuButton = document.querySelector('.fa-bars').parentElement;
mobileMenuButton.addEventListener('click', () => {
    alert('Mobile menu would open here');
});

// Account dropdown
const accountLink = document.querySelectorAll('.link')[0];
accountLink.addEventListener('click', () => {
    alert('Account dropdown would appear here');
});

// Product hover effects
const productCards = document.querySelectorAll('.relative.m-5.bg-white');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('shadow-lg', 'transform', '-translate-y-1');
    });
    card.addEventListener('mouseleave', () => {
        card.classList.remove('shadow-lg', 'transform', '-translate-y-1');
    });
});

// Seller Page Functionality
if (document.getElementById('imageUpload')) {
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    
    imageUpload.addEventListener('change', function(e) {
        imagePreview.innerHTML = '';
        const files = e.target.files;
        
        for (let i = 0; i < Math.min(files.length, 10); i++) {
            const file = files[i];
            if (!file.type.match('image.*')) continue;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'w-24 h-24 object-cover rounded border';
                imagePreview.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('productForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Product submitted successfully!');
        // In real implementation, would send to server
    });
}
