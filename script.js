// Cart functionality
let cartCount = 0;
const cartCounter = document.querySelector('.absolute.top-0.right-0');
const addToCartButtons = document.querySelectorAll('.button.bg-yellow-400');

// Add to cart event listeners
if (addToCartButtons.length > 0 && cartCounter) {
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            updateCartCounter();
            showAddedToCartMessage(button);
        });
    });
}

function updateCartCounter() {
    if (cartCounter) {
        cartCounter.textContent = cartCount;
        cartCounter.classList.remove('hidden');
    }
}

function showAddedToCartMessage(button) {
    if (button) {
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
}

// Search functionality - only if element exists
const searchInput = document.querySelector('input[type="text"]');
if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}`);
            }
        }
    });
}

// Mobile menu toggle - only if element exists
const menuBars = document.querySelector('.fa-bars');
if (menuBars) {
    const mobileMenuButton = menuBars.parentElement;
    mobileMenuButton.addEventListener('click', () => {
        alert('Mobile menu would open here');
    });
}

// Account dropdown - only if element exists
const accountLinks = document.querySelectorAll('.link');
if (accountLinks.length > 0) {
    accountLinks[0].addEventListener('click', () => {
        alert('Account dropdown would appear here');
    });
}

// Product hover effects
const productCards = document.querySelectorAll('.relative.m-5.bg-white');
if (productCards.length > 0) {
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('shadow-lg', 'transform', '-translate-y-1');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('shadow-lg', 'transform', '-translate-y-1');
        });
    });
}

// Seller Page Functionality
if (document.getElementById('imageUpload')) {
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const dropZone = document.getElementById('dropZone');
    
    if (imageUpload && imagePreview && dropZone) {
        // Handle file selection
        imageUpload.addEventListener('change', handleFiles);
        
        // Drag and drop functionality
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });

        dropZone.addEventListener('drop', handleDrop, false);

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        function highlight() {
            dropZone.classList.add('active');
        }

        function unhighlight() {
            dropZone.classList.remove('active');
        }

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            imageUpload.files = files;
            handleFiles({ target: imageUpload });
        }

        function handleFiles(e) {
            imagePreview.innerHTML = '';
            const files = e.target.files;
            
            if (files.length > 10) {
                alert('Maximum 10 images allowed');
                return;
            }

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!file.type.match('image.*')) {
                    alert('Only image files are allowed');
                    continue;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imgContainer = document.createElement('div');
                    imgContainer.className = 'relative';
                    
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'w-24 h-24 object-cover rounded border';
                    
                    const removeBtn = document.createElement('button');
                    removeBtn.innerHTML = '&times;';
                    removeBtn.className = 'absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs';
                    removeBtn.onclick = () => imgContainer.remove();
                    
                    imgContainer.appendChild(img);
                    imgContainer.appendChild(removeBtn);
                    imagePreview.appendChild(imgContainer);
                }
                reader.readAsDataURL(file);
            }
        }

        const productForm = document.getElementById('productForm');
        if (productForm) {
            productForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (!validateForm()) return;
                
                // Simulate upload progress
                const submitBtn = e.target.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
                    
                    setTimeout(() => {
                        alert('Product submitted successfully!');
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Save Product';
                        e.target.reset();
                        imagePreview.innerHTML = '';
                    }, 1500);
                }
            });
        }

        function validateForm() {
            const requiredFields = document.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('border-red-500');
                    isValid = false;
                } else {
                    field.classList.remove('border-red-500');
                }
            });

            if (!isValid) {
                alert('Please fill all required fields');
                return false;
            }

            if (!imageUpload.files.length) {
                alert('Please upload at least one product image');
                return false;
            }

            return true;
        }
    }
}
