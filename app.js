document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contractForm');
    
    const formData = {
        firstPartyName: '',
        firstPartyAddress: '',
        secondPartyName: '',
        secondPartyAddress: '',
        projectScope: '',
        jurisdiction: '',
        date: ''
    };

    // Update formData when inputs change
    form.addEventListener('input', function(e) {
        const field = e.target;
        formData[field.name] = field.value;
        console.log(formData); // For testing
    });
}); 