document.addEventListener("DOMContentLoaded", function() {
    const joinUsButton = document.getElementById('ij832');
  
    if (joinUsButton) {
      joinUsButton.addEventListener('click', function() {
        window.location.href = 'mailto:gordianknot.capital03@gmail.com?subject=Join%20Gordian%20Knot%20Capital';
      });
    } else {
      console.error("Join us button not found.");
    }
  });