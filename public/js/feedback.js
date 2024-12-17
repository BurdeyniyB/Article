document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const formData = new FormData(this);
    const xhr = new XMLHttpRequest();
    
    xhr.open('POST', '/feedback', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('message').innerText = xhr.responseText;
            document.getElementById('feedbackForm').reset(); 
        } else {
            document.getElementById('message').innerText = 'Сталася помилка. Будь ласка, спробуйте ще раз.';
        }
    };
    xhr.send(formData);
});
