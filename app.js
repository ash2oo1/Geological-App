// app.js - محرك التطبيق الجغرافي

document.addEventListener('DOMContentLoaded', () => {
    
    // تحديد العناصر في الصفحة الرئيسية التي نريد تغييرها ديناميكياً
    const locationTitle = document.querySelector('.location-title');
    const weatherInfo = document.querySelector('.weather-info');

    // 1. بدء طلب صلاحية الموقع الجغرافي من هاتف السائح
    function initApp() {
        // تغيير النص مؤقتاً لإخبار المستخدم أننا نبحث عن موقعه
        if(locationTitle) {
            locationTitle.innerHTML = 'Locating... <i class="fas fa-spinner fa-spin" style="font-size:14px;"></i>';
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        } else {
            errorLocation();
        }
    }

    // 2. في حال نجاح الاتصال وتحديد الإحداثيات (GPS)
    function successLocation(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        /* 
         مستقبلاً: هنا نضع رابط API حقيقي (مثل OpenWeatherMap) 
         fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_KEY`)
        */

        // محاكاة الاتصال بالسيرفر العالمي (تأخير ثانية واحدة لتبدو حقيقية)
        setTimeout(() => {
            updateUI("Baghdad, Iraq", "32°C Clear", "14km/h NW", "fa-sun", "#fbbf24");
        }, 1200);
    }

    // 3. في حال رفض السائح إعطاء الصلاحية أو فشل الـ GPS
    function errorLocation() {
        // عرض بيانات افتراضية آمنة حتى لا ينهار تصميم التطبيق
        updateUI("Offline Mode", "22°C Unknown", "-- km/h", "fa-cloud", "#a1a1aa");
    }

    // 4. دالة تحديث الواجهة (DOM Manipulation)
    function updateUI(cityName, weatherStr, windStr, weatherIcon, iconColor) {
        if(locationTitle && weatherInfo) {
            // تحديث اسم المدينة
            locationTitle.innerHTML = `${cityName} <i class="fas fa-chevron-down"></i>`;
            
            // تحديث الطقس وسرعة الرياح
            weatherInfo.innerHTML = `
                <span><i class="fas ${weatherIcon}" style="color: ${iconColor};"></i> ${weatherStr}</span>
                <span><i class="fas fa-wind"></i> ${windStr}</span>
            `;
        }
    }

    // تشغيل المحرك
    initApp();
});
