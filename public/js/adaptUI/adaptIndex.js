document.addEventListener('DOMContentLoaded', function() {
    const generalText = document.getElementById('general_text');
    const images = document.getElementById('images');
    const action = document.getElementById('action');
    const actionButtons = document.querySelectorAll('#action button'); 

    function adjustLayout() {
        if (window.innerWidth < 768) {
            generalText.style.removeProperty('float');
            images.style.removeProperty('float');
            generalText.style.margin = '2.5%';
            images.style.margin = '2.5%';
            generalText.style.width = '92.5%';
            images.style.width = '92.5%';
            action.style.alignself = 'center';
            actionButtons.forEach(button => {
                button.style.removeProperty('float');
                button.style.margin = "2%";
                button.style.width = '95%'; 
            });
        } else {
            generalText.style.float = 'left';
            images.style.float = 'left';
            images.style.marginTop = '0%';
            generalText.style.width = '55%';
            images.style.width = '35%';
        }
    }

    adjustLayout();
    window.onresize = adjustLayout;
});
