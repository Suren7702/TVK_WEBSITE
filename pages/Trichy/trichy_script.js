// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      overlay.style.display = 'none';
    } else {
      sidebar.classList.add('active');
      overlay.style.display = 'block';
    }
  }
  
  // Mock Submit Alert
  function submitComplaint(e) {
    e.preventDefault();
    alert("நன்றி! உங்கள் புகார் வெற்றிகரமாக பதிவு செய்யப்பட்டது. விரைவில் நடவடிக்கை எடுக்கப்படும்.");
    e.target.reset();
  }