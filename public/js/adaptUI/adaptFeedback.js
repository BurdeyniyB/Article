document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    const choose = document.getElementById('choose');
    const feedbackText = document.getElementById('feedback_text');
    const inputs = document.querySelectorAll('#feedbackInfo input'); 

    function adjustLayout() {
        if (window.innerWidth < 768) {
            feedbackForm.style.justifyContent = 'left';
            feedbackText.style.removeProperty('margin-bottom');
            feedbackText.style.width = '100%'; 
            inputs.forEach(input => {
                input.style.marginLeft = '0';
                input.style.width = '182.5%'; 
            });
            choose.style.width = '200%';
        } else {
            feedbackText.style.marginBottom = '1%';
            feedbackText.style.width = '48%'; 
            inputs.forEach(input => {
                input.style.width = '86%'; 
            });
        }
    }

    adjustLayout();
    window.onresize = adjustLayout;
});
