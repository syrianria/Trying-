document.getElementById('absence-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const studentName = document.getElementById('student-name').value;
  const teacherName = "حصه";
  const subject = "رياضيات";
  const reason = "الخروج المؤقت";
  const movementType = document.getElementById('movement-type').value;

  const timestampInput = document.getElementById('timestamp').value;
  const timestamp = timestampInput ? new Date(timestampInput) : new Date();

  let resultMessage = '';

  if (movementType === 'رجوع') {
    const storedExitTime = localStorage.getItem('exitTime');

    if (storedExitTime) {
      const exitTime = new Date(storedExitTime);
      const durationMinutes = Math.floor((timestamp - exitTime) / 60000);

      resultMessage = `
        <h3>تصريح الرجوع</h3>
        <p><strong>اسم الطالبة:</strong> ${studentName}</p>
        <p><strong>اسم المعلمة:</strong> ${teacherName}</p>
        <p><strong>المادة:</strong> ${subject}</p>
        <p><strong>الغرض:</strong> ${reason}</p>
        <p><strong>الوقت:</strong> ${timestamp.toLocaleString()}</p>
        <p><strong>مدة الغياب:</strong> ${durationMinutes} دقيقة</p>
        <p><strong>تصريح الرجوع: تم بنجاح!</strong></p>
      `;
      localStorage.removeItem('exitTime');
    } else {
      resultMessage = "<p style='color:red;'>لا يوجد وقت خروج مسجل. سجلي الخروج أولًا!</p>";
    }

  } else {
    localStorage.setItem('exitTime', timestamp.toString());

    resultMessage = `
      <h3>تصريح الخروج</h3>
      <p><strong>اسم الطالبة:</strong> ${studentName}</p>
      <p><strong>اسم المعلمة:</strong> ${teacherName}</p>
      <p><strong>المادة:</strong> ${subject}</p>
      <p><strong>الغرض:</strong> ${reason}</p>
      <p><strong>الوقت:</strong> ${timestamp.toLocaleString()}</p>
      <p><strong>تصريح الخروج: تم بنجاح!</strong></p>
    `;
  }

  document.getElementById('result').innerHTML = resultMessage;
});
