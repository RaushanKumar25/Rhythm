document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.createElement('button');
  toggleButton.classList.add('theme-toggle');
  toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
  document.body.appendChild(toggleButton);

  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
  }

  
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    toggleButton.innerHTML = isDark 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});




