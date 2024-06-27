document.addEventListener('DOMContentLoaded', () => {
    fetch('/api')
        .then(response => response.json())
        .then(data => {
            document.getElementById('content').textContent = data.message;
        });

    // Add more JavaScript as needed
});
