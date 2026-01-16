// Back button functionality
document.querySelectorAll('backBtn').addEventListener('click', () => {
    window.history.back();
});

// Share button functionality
document.querySelectorAll('shareBtn').addEventListener('click', async () => {
    const shareData = {
        title: document.title,
        text: 'Check out this article on Userism',
        url: window.location.href
    };

    // Check if the Web Share API is supported
    if (navigator.share) {
        try {
            await navigator.share(shareData);
            console.log('Article shared successfully');
        } catch (err) {
            // User cancelled or error occurred
            if (err.name !== 'AbortError') {
                fallbackCopyToClipboard();
            }
        }
    } else {
        // Fallback: Copy link to clipboard
        fallbackCopyToClipboard();
    }
});

// About button functionality
document.querySelectorAll('aboutBtn').addEventListener('click', () => {
    window.location.href = '../about.html';
});

// Fallback function to copy link to clipboard
function fallbackCopyToClipboard() {
    const url = window.location.href;
    
    // Try using the modern Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url)
            .then(() => {
                showCopyNotification();
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                // Fallback to older method
                legacyCopyToClipboard(url);
            });
    } else {
        // Use legacy method for older browsers
        legacyCopyToClipboard(url);
    }
}

// Legacy copy method for older browsers
function legacyCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyNotification();
    } catch (err) {
        console.error('Failed to copy: ', err);
        alert('Failed to copy link. Please copy manually: ' + text);
    }
    
    document.body.removeChild(textArea);
}

// Show notification that link was copied
function showCopyNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = 'Link copied to clipboard!';
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #000;
        color: #fff;
        padding: 12px 24px;
        border-radius: 8px;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 2 seconds
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 2000);
}

// Add CSS animation for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
        15% { opacity: 1; transform: translateX(-50%) translateY(0); }
        85% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(10px); }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    // Move image at 50% of scroll speed
    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
});
