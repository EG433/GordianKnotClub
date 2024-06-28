document.addEventListener("DOMContentLoaded", function() {
    const joinTeamButton = document.getElementById('ij832');
  
    if (joinTeamButton) {
      joinTeamButton.addEventListener('click', function() {
        window.location.href = 'Team.html';
      });
    } else {
      console.error("Join the team button not found.");
    }
  });
  